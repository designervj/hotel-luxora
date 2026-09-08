const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('../scripts/read-mongo-env');
const { uri, dbName } = readMongoEnv();
const client = new MongoClient(uri);

async function checkLegalPages() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const pages = await db.collection('pages').find({ slug: { $in: ['terms-and-conditions', 'privacy-policy'] } }).toArray();
    console.log(JSON.stringify(pages, null, 2));
  } finally {
    await client.close();
  }
}
checkLegalPages();
