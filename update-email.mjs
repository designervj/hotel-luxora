import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

async function updateDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set");
    return;
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(); // uses default DB from URI
    const result = await db.collection('hotel_settings').updateOne(
      {},
      { $set: { 
          address: "Hotel Luxora Suites, 4th Floor, Dogma Business Hub, Near Capital High Street Mall, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017",
          contactNumber: "+91 63767 64803",
          phone: "+91 63767 64803"
        } 
      }
    );
    console.log("Updated:", result.modifiedCount);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

updateDb();
