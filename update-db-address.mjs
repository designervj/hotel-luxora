import { MongoClient } from 'mongodb';
import fs from 'fs';

let env = '';
try {
  env = fs.readFileSync('.env', 'utf8');
} catch (e) {
  try {
    env = fs.readFileSync('.env.local', 'utf8');
  } catch (err) {}
}
const match = env.match(/MONGODB_URI=(.*)/);
const dbMatch = env.match(/MONGODB_DB=(.*)/);
let dbName = dbMatch ? dbMatch[1].trim() : process.env.MONGODB_DB;
if (dbName && (dbName.startsWith('"') || dbName.startsWith("'"))) {
  dbName = dbName.slice(1, -1);
}

let uri = match ? match[1].trim() : process.env.MONGODB_URI;
if (uri && (uri.startsWith('"') || uri.startsWith("'"))) {
  uri = uri.slice(1, -1);
}

async function updateDb() {
  if (!uri) {
    console.error("MONGODB_URI is not set");
    return;
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const result = await db.collection('hotel_settings').updateOne(
      {},
      { $set: { 
          address: "Hotel Luxora Suites, 4th Floor, Dogma Business Hub, Near Capital High Street Mall, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017",
          contactNumber: "8954888990",
          phone: "8954888990"
        } 
      }
    );
    const doc = await db.collection('hotel_settings').findOne({});
    console.log("Doc:", doc);
    console.log("Updated:", result.modifiedCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

updateDb();
