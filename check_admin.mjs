import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf-8');
const mongoUriMatch = envFile.match(/MONGODB_URI=(.*)/);
const mongoDbMatch = envFile.match(/MONGODB_DB=(.*)/);

const MONGODB_URI = mongoUriMatch ? mongoUriMatch[1].trim().replace(/^"|"$/g, '') : null;
const MONGODB_DB = mongoDbMatch ? mongoDbMatch[1].trim().replace(/^"|"$/g, '') : null;

import { MongoClient } from 'mongodb';

const ADMIN_EMAIL = 'business@grandeagle.com';
const ADMIN_PASSWORD = '1234567899';
const ADMIN_NAME = 'Grand Eagle Admin';

(async () => {
  if (!MONGODB_URI) return;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);
  
  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.default.genSalt(10);
  const hashedPassword = await bcrypt.default.hash(ADMIN_PASSWORD, salt);

  await db.collection('users').updateOne(
    { email: ADMIN_EMAIL },
    {
      $set: {
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        phone: null,
        password: hashedPassword,
        role: 'admin',
        updatedAt: new Date()
      },
      $setOnInsert: {
        createdAt: new Date()
      }
    },
    { upsert: true }
  );

  console.log(`Ensured admin with email: ${ADMIN_EMAIL}, password: ${ADMIN_PASSWORD}`);

  const admins = await db.collection('users').find({ role: 'admin' }).toArray();
  console.log('Admins found:');
  admins.forEach(u => console.log('Email:', u.email, 'Phone:', u.phone, 'Role:', u.role));
  
  await client.close();
})();
