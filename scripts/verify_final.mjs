import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env'), 'utf8');
envContent.split(/\r?\n/).forEach(line => {
  const [k, ...v] = line.split('=');
  if (k && v.length) process.env[k.trim()] = v.join('=').trim().replace(/^['"]|['"]$/g, '');
});

const client = new MongoClient(process.env.MONGODB_URI);
await client.connect();
const db = client.db(process.env.MONGODB_DB || 'kp_hotel_luxora');
const rooms = await db.collection('room_types').find({}).toArray();
console.log('--- VERIFIED ROOM TYPES ---');
rooms.forEach(r => {
  console.log(`- ${r.id}: ${r.roomName} (${r.roomCategory}) | ₹${r.basePrice} | ${r.roomSize}m² | Bed: ${r.bedType} | ${r.images?.length} photos`);
});
await client.close();
