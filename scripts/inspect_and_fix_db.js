const { MongoClient } = require('mongodb');
const uri = 'mongodb://cs530885_db_user:uhKijf1PLxANW4pv@ac-jrejbqh-shard-00-00.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-01.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-02.yctt4gm.mongodb.net:27017/tours_travel?ssl=true&authSource=admin&replicaSet=atlas-6oz9oy-shard-0&retryWrites=true&w=majority';

const client = new MongoClient(uri);

// Detect and fix any {} (empty object) values that came from corrupted Date objects
function findEmptyObjects(val, path = '') {
  if (val === null || val === undefined) return [];
  if (typeof val !== 'object') return [];
  if (Array.isArray(val)) {
    const results = [];
    val.forEach((item, i) => results.push(...findEmptyObjects(item, `${path}[${i}]`)));
    return results;
  }
  const keys = Object.keys(val);
  if (keys.length === 0 && path !== '') {
    return [path];
  }
  const results = [];
  keys.forEach(k => results.push(...findEmptyObjects(val[k], path ? `${path}.${k}` : k)));
  return results;
}

// Fix empty objects: replace {} with null or empty string based on context
function fixEmptyObjects(val) {
  if (val === null || val === undefined) return val;
  if (typeof val !== 'object') return val;
  if (Array.isArray(val)) return val.map(fixEmptyObjects);
  const keys = Object.keys(val);
  if (keys.length === 0) return null; // replace {} with null
  const result = {};
  keys.forEach(k => { result[k] = fixEmptyObjects(val[k]); });
  return result;
}

client.connect().then(async () => {
  const db = client.db('hotel_management');
  const collections = await db.listCollections().toArray();

  for (const coll of collections) {
    const col = db.collection(coll.name);
    const docs = await col.find().toArray();

    for (const doc of docs) {
      const { _id, ...rest } = doc;
      const emptyPaths = findEmptyObjects(rest);
      if (emptyPaths.length > 0) {
        console.log(`\n[${coll.name}] _id: ${_id}`);
        console.log('  Corrupted fields (empty objects):', emptyPaths);
        console.log('  Full doc:', JSON.stringify(rest, null, 2).substring(0, 500));
        
        const fixed = fixEmptyObjects(rest);
        await col.updateOne({ _id }, { $set: fixed });
        console.log('  Fixed!');
      }
    }
  }
  
  console.log('\nDone!');
  await client.close();
}).catch(console.error);
