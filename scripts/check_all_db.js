const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('./read-mongo-env');
const { uri, dbName } = readMongoEnv();
const oldBrand = ['Grand', 'Eagle'].join(' ');
const oldBrandCompact = oldBrand.replace(/\s+/g, '').toLowerCase();
const oldHotelBrand = ['Hotel', oldBrand].join(' ');

const client = new MongoClient(uri);

async function searchAndReplace(str) {
  return str
    .replace(new RegExp(oldHotelBrand, 'gi'), 'Hotel Luxora')
    .replace(new RegExp(oldHotelBrand.toUpperCase(), 'g'), 'HOTEL LUXORA')
    .replace(new RegExp(oldBrand.toUpperCase(), 'g'), 'LUXORA')
    .replace(new RegExp(oldBrand, 'gi'), 'Luxora')
    .replace(new RegExp(oldBrandCompact, 'gi'), 'hotelluxora')
    .replace(new RegExp(`hotel${oldBrandCompact}`, 'gi'), 'hotelluxora');
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

function hasOldBrand(val) {
  const str = JSON.stringify(val);
  return new RegExp(oldBrand, 'i').test(str);
}

client.connect().then(async () => {
  const db = client.db(dbName);
  const collections = await db.listCollections().toArray();
  
  for (const coll of collections) {
    const col = db.collection(coll.name);
    const docs = await col.find().toArray();
    
    for (const doc of docs) {
      if (hasOldBrand(doc)) {
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
