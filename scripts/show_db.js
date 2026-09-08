const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('./read-mongo-env');
const { uri, dbName } = readMongoEnv();

const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db(dbName);
  
  // Show current state of pages and testimonials
  const pages = await db.collection('pages').find().toArray();
  console.log('\n=== PAGES ===');
  pages.forEach(p => {
    console.log(`slug: "${p.slug}", title: "${p.title}", sections: ${p.sections?.length || 0}, published: ${p.isPublished}`);
  });
  
  const testimonials = await db.collection('testimonials').find().toArray();
  console.log('\n=== TESTIMONIALS ===');
  testimonials.forEach(t => {
    console.log(`id: "${t.id}", name: "${t.name}", text: "${String(t.text).substring(0, 50)}"`);
  });
  
  await client.close();
}).catch(console.error);
