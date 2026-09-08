const {MongoClient} = require('mongodb');
const { readMongoEnv } = require('./read-mongo-env');
const { uri, dbName } = readMongoEnv();
const oldBrand = ['Grand', 'Eagle'].join(' ');
const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db(dbName);
  const col = db.collection('hotel_settings');
  const settings = await col.findOne();
  console.log('Current Name:', settings?.name);
  if (settings) {
    await col.updateOne({}, { $set: { name: 'Hotel Luxora', email: 'reservations@hotelluxora.com' } });
    console.log('Updated DB settings');
  }
  
  // also check pages where title or content might say the previous brand
  const pages = db.collection('pages');
  const allPages = await pages.find().toArray();
  for (let page of allPages) {
      let updated = false;
      let newTitle = page.title;
      let newContent = page.content;
      if (newTitle && newTitle.includes(oldBrand)) {
          newTitle = newTitle.replace(new RegExp(oldBrand, 'g'), 'Luxora');
          updated = true;
      }
      if (newContent && newContent.includes(oldBrand)) {
          newContent = newContent.replace(new RegExp(oldBrand, 'g'), 'Luxora');
          updated = true;
      }
      if (updated) {
          await pages.updateOne({ _id: page._id }, { $set: { title: newTitle, content: newContent } });
          console.log('Updated page:', page.slug);
      }
  }

  await client.close();
}).catch(console.error);
