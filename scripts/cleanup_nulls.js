const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('./read-mongo-env');
const { uri, dbName } = readMongoEnv();

const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db(dbName);

  // Delete pages where slug is the string "null"
  const pagesResult = await db.collection('pages').deleteMany({ slug: 'null' });
  console.log(`Deleted ${pagesResult.deletedCount} corrupted pages`);

  // Delete the corrupted testimonial where id is the string "null"
  const testiResult = await db.collection('testimonials').deleteOne({ id: 'null' });
  console.log(`Deleted ${testiResult.deletedCount} corrupted testimonial(s)`);

  // Final check
  const pages = await db.collection('pages').find().toArray();
  console.log('\n=== FINAL PAGES ===');
  pages.forEach(p => console.log(`  slug: "${p.slug}", title: "${p.title}", sections: ${p.sections?.length || 0}`));

  const testimonials = await db.collection('testimonials').find().toArray();
  console.log('\n=== FINAL TESTIMONIALS ===');
  testimonials.forEach(t => console.log(`  id: "${t.id}", name: "${t.name}"`));

  await client.close();
  console.log('\nDone!');
}).catch(console.error);
