const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('../scripts/read-mongo-env');
const { uri, dbName } = readMongoEnv();
const client = new MongoClient(uri);

async function checkHome() {
  try {
    await client.connect();
    const db = client.db(dbName);
    const page = await db.collection('pages').findOne({ slug: 'home' });
    console.log(JSON.stringify(page, null, 2));
  } finally {
    await client.close();
  }
}
checkHome();
