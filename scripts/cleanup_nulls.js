const { MongoClient } = require('mongodb');
const uri = 'mongodb://cs530885_db_user:uhKijf1PLxANW4pv@ac-jrejbqh-shard-00-00.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-01.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-02.yctt4gm.mongodb.net:27017/tours_travel?ssl=true&authSource=admin&replicaSet=atlas-6oz9oy-shard-0&retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db('hotel_management');

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
