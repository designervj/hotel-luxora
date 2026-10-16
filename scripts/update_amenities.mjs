import { MongoClient } from 'mongodb';

const uri = 'mongodb://deepak:deepak123@2.25.90.170:27017/kp_hotel_luxora?authSource=admin';

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('kp_hotel_luxora');

    const rm1Amenities = [
      'fb1', 'fb2', 'fb3', 'fb4', 'fb5', 'fb6', 'fb7', 'fb8', 'fb9', 'fb10',
      'fr1', 'fr4', 'fr6', 'fr7', 'fr8', 'fr9', 'fr10',
      'ff1', 'ff3', 'ff5',
      'fw1', 'fw2',
      'fs1', 'fs2', 'fs3', 'fs4',
      'ft1', 'ft2',
      'fbz1', 'fbz3'
    ];

    const rm2Amenities = [
      'fb1', 'fb2', 'fb3', 'fb4', 'fb5', 'fb6', 'fb7', 'fb8', 'fb9', 'fb10',
      'fr1', 'fr2', 'fr3', 'fr4', 'fr5', 'fr6', 'fr7', 'fr8', 'fr9', 'fr10',
      'ff1', 'ff2', 'ff3', 'ff4', 'ff5',
      'fw1', 'fw2', 'fw3', 'fw4', 'fw5',
      'fs1', 'fs2', 'fs3', 'fs4',
      'ft1', 'ft2', 'ft3',
      'fbz1', 'fbz2', 'fbz3', 'fbz4'
    ];

    await db.collection('room_types').updateOne(
      { id: 'rm1' },
      { $set: { amenityIds: rm1Amenities } }
    );

    await db.collection('room_types').updateOne(
      { id: 'rm2' },
      { $set: { amenityIds: rm2Amenities } }
    );

    console.log('Successfully updated amenityIds for rm1 and rm2');
  } finally {
    await client.close();
  }
}

run().catch(console.error);
