const { MongoClient } = require('mongodb');
const uri = 'mongodb://cs530885_db_user:uhKijf1PLxANW4pv@ac-jrejbqh-shard-00-00.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-01.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-02.yctt4gm.mongodb.net:27017/tours_travel?ssl=true&authSource=admin&replicaSet=atlas-6oz9oy-shard-0&retryWrites=true&w=majority';

const client = new MongoClient(uri);

async function searchAndReplace(str) {
  return str
    .replace(/HOTEL GRAND EAGLE/gi, 'HOTEL LUXORA')
    .replace(/Hotel Grand Eagle/g, 'Hotel Luxora')
    .replace(/GRAND EAGLE/g, 'LUXORA')
    .replace(/Grand Eagle/g, 'Luxora')
    .replace(/grand eagle/g, 'luxora')
    .replace(/grandeagle/gi, 'hotelluxora')
    .replace(/hotelgrandeagle/gi, 'hotelluxora');
}

function replaceInValue(val) {
  if (typeof val === 'string') return searchAndReplace(val);
  if (Array.isArray(val)) return val.map(replaceInValue);
  if (typeof val === 'object' && val !== null) {
    const result = {};
    for (const key of Object.keys(val)) {
      result[key] = replaceInValue(val[key]);
    }
    return result;
  }
  return val;
}

function hasGrandEagle(val) {
  const str = JSON.stringify(val);
  return /grand eagle/i.test(str);
}

client.connect().then(async () => {
  const db = client.db('hotel_management');
  const collections = await db.listCollections().toArray();
  
  for (const coll of collections) {
    const col = db.collection(coll.name);
    const docs = await col.find().toArray();
    
    for (const doc of docs) {
      if (hasGrandEagle(doc)) {
        const { _id, ...rest } = doc;
        const updated = replaceInValue(rest);
        await col.updateOne({ _id }, { $set: updated });
        console.log(`Updated in collection [${coll.name}] doc _id: ${_id}`);
      }
    }
  }
  
  console.log('Done!');
  await client.close();
}).catch(console.error);
