import { MongoClient, Db, ObjectId } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to .env.local!");
}

const uri = process.env.MONGODB_URI;
const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function getClientPromise(): Promise<MongoClient> {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((err) => {
      global._mongoClientPromise = undefined;
      throw err;
    });
  }
  return global._mongoClientPromise;
}

export const clientPromise: Promise<MongoClient> = getClientPromise();

export async function getDatabase(): Promise<Db> {
  const client = await getClientPromise();

  if (!process.env.MONGODB_DB) {
    throw new Error("MONGODB_DB not defined in .env");
  }

  return client.db(process.env.MONGODB_DB);
}

export async function getTestDatabase(dbname: string): Promise<Db> {
  const client = await getClientPromise();

  if (!dbname) {
    throw new Error("No DB Name Found");
  }

  return client.db(dbname);
}

// Backward-compatible alias
export const getDb = getDatabase;

export function toObjectId(id: string): ObjectId {
  return new ObjectId(id);
}

export function fromObjectId(id: ObjectId): string {
  return id.toString();
}
