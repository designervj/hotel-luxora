const { MongoClient } = require('mongodb');
const uri = 'mongodb://cs530885_db_user:uhKijf1PLxANW4pv@ac-jrejbqh-shard-00-00.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-01.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-02.yctt4gm.mongodb.net:27017/tours_travel?ssl=true&authSource=admin&replicaSet=atlas-6oz9oy-shard-0&retryWrites=true&w=majority';

const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db('hotel_management');
  
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
