const {MongoClient} = require('mongodb');
const uri = 'mongodb://cs530885_db_user:uhKijf1PLxANW4pv@ac-jrejbqh-shard-00-00.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-01.yctt4gm.mongodb.net:27017,ac-jrejbqh-shard-00-02.yctt4gm.mongodb.net:27017/tours_travel?ssl=true&authSource=admin&replicaSet=atlas-6oz9oy-shard-0&retryWrites=true&w=majority';
const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db('hotel_management');
  const col = db.collection('hotel_settings');
  const settings = await col.findOne();
  console.log('Current Name:', settings?.name);
  if (settings) {
    await col.updateOne({}, { $set: { name: 'Hotel Luxora', email: 'reservations@hotelluxora.com' } });
    console.log('Updated DB settings');
  }
  
  // also check pages where title or content might say "Grand Eagle"
  const pages = db.collection('pages');
  const allPages = await pages.find().toArray();
  for (let page of allPages) {
      let updated = false;
      let newTitle = page.title;
      let newContent = page.content;
      if (newTitle && newTitle.includes('Grand Eagle')) {
          newTitle = newTitle.replace(/Grand Eagle/g, 'Luxora');
          updated = true;
      }
      if (newContent && newContent.includes('Grand Eagle')) {
          newContent = newContent.replace(/Grand Eagle/g, 'Luxora');
          updated = true;
      }
      if (updated) {
          await pages.updateOne({ _id: page._id }, { $set: { title: newTitle, content: newContent } });
          console.log('Updated page:', page.slug);
      }
  }

  await client.close();
}).catch(console.error);
