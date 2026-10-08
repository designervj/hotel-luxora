import fs from 'fs';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const envFile = fs.readFileSync('.env', 'utf-8');
const mongoUriMatch = envFile.match(/MONGODB_URI=(.*)/);
const mongoDbMatch = envFile.match(/MONGODB_DB=(.*)/);

const MONGODB_URI = mongoUriMatch ? mongoUriMatch[1].trim().replace(/^"|"$/g, '') : null;
const MONGODB_DB = mongoDbMatch ? mongoDbMatch[1].trim().replace(/^"|"$/g, '') : null;

async function run() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI not found");
    return;
  }
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  const salt = await bcrypt.genSalt(10);
  const hash1 = await bcrypt.hash('1234567899', salt);

  // Update business@grandeagle.com
  await db.collection('users').updateOne(
    { email: 'business@grandeagle.com' },
    {
      $set: {
        name: 'Grand Eagle Admin',
        email: 'business@grandeagle.com',
        password: hash1,
        role: 'admin',
        updatedAt: new Date()
      },
      $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
  );

  // Update admin@hotelluxora.com
  await db.collection('users').updateOne(
    { email: 'admin@hotelluxora.com' },
    {
      $set: {
        name: 'Hotel Luxora Admin',
        email: 'admin@hotelluxora.com',
        password: hash1,
        role: 'admin',
        updatedAt: new Date()
      },
      $setOnInsert: { createdAt: new Date() }
    },
    { upsert: true }
  );

  console.log("Admins successfully configured in MongoDB!");
  const admins = await db.collection('users').find({ role: 'admin' }).toArray();
  console.log("Admin list:", admins.map(a => ({ email: a.email, role: a.role })));

  await client.close();
}

run().catch(console.error);
