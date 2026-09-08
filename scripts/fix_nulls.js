const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('./read-mongo-env');
const { uri, dbName } = readMongoEnv();
const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db(dbName);

  // Check exact type of slug field in pages
  const pages = await db.collection('pages').find().toArray();
  pages.forEach(p => {
    console.log(`slug type: ${typeof p.slug}, value: ${JSON.stringify(p.slug)}, id: ${p._id}`);
  });

  const testimonials = await db.collection('testimonials').find().toArray();
  testimonials.forEach(t => {
    console.log(`id type: ${typeof t.id}, value: ${JSON.stringify(t.id)}, _id: ${t._id}`);
  });

  // Delete pages where slug is null (actual null) or missing
  const pDel = await db.collection('pages').deleteMany({ $or: [ { slug: null }, { slug: { $exists: false } } ] });
  console.log(`\nDeleted ${pDel.deletedCount} pages with null slug`);

  // Delete testimonial where id is null
  const tDel = await db.collection('testimonials').deleteMany({ $or: [ { id: null }, { id: { $exists: false } } ] });
  console.log(`Deleted ${tDel.deletedCount} testimonials with null id`);

  // Final state
  const finalPages = await db.collection('pages').find().toArray();
  console.log('\n=== FINAL PAGES ===');
  finalPages.forEach(p => console.log(`  slug: ${JSON.stringify(p.slug)}, sections: ${p.sections?.length || 0}`));

  const finalTestis = await db.collection('testimonials').find().toArray();
  console.log('\n=== FINAL TESTIMONIALS ===');
  finalTestis.forEach(t => console.log(`  id: ${JSON.stringify(t.id)}, name: ${JSON.stringify(t.name)}`));

  await client.close();
}).catch(console.error);
