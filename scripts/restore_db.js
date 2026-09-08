const { MongoClient } = require('mongodb');
const { readMongoEnv } = require('./read-mongo-env');
const { uri, dbName } = readMongoEnv();

const client = new MongoClient(uri);

client.connect().then(async () => {
  const db = client.db(dbName);

  // 1. Delete pages with null slug (these were corrupted)
  const pagesResult = await db.collection('pages').deleteMany({ slug: 'null' });
  console.log(`Deleted ${pagesResult.deletedCount} corrupted pages (slug: "null")`);

  // 2. Delete the corrupted testimonial
  const testiResult = await db.collection('testimonials').deleteOne({ id: 'null' });
  console.log(`Deleted ${testiResult.deletedCount} corrupted testimonial(s) (id: "null")`);

  // 3. Now insert a fresh clean home page that matches what the site expects
  const now = new Date().toISOString();
  const homePage = {
    id: `page_home_${Date.now()}`,
    slug: 'home',
    title: 'Home',
    subtitle: '',
    content: [],
    isPublished: true,
    metaTitle: 'Hotel Luxora | Premium Luxury Stay in Jaipur',
    metaDescription: 'Experience the timeless grandeur of Rajasthani hospitality at Hotel Luxora.',
    sections: [
      {
        id: 'hero_1',
        type: 'hero',
        title: 'Smart, Simple',
        titleEm: 'Comfort',
        subtitle: 'An intimate retreat in the heart of Sitapura, Jaipur — where affordability meets the warmth of genuine hospitality.',
        primaryButtonLabel: 'Explore Rooms',
        primaryButtonLink: '/book',
        secondaryButtonLabel: 'Our Story',
        secondaryButtonLink: '#about',
        images: [],
        stats: [
          { id: 's1', value: '24+', label: 'Years of Excellence' },
          { id: 's2', value: '340+', label: 'Happy Guests' },
          { id: 's3', value: '4.9', label: 'Guest Rating' },
        ],
      },
      {
        id: 'testi_1',
        type: 'testimonials',
        eyebrow: 'Guest Stories',
        heading: 'Voices of',
        headingEm: 'Luxora',
      },
    ],
    createdAt: now,
    updatedAt: now,
    image: '',
  };

  await db.collection('pages').insertOne(homePage);
  console.log('Inserted fresh home page with hero + testimonials sections');

  // 4. Show final state
  const pages = await db.collection('pages').find().toArray();
  console.log('\n=== FINAL PAGES ===');
  pages.forEach(p => {
    const { _id, ...rest } = p;
    console.log(`slug: "${rest.slug}", title: "${rest.title}", sections: ${rest.sections?.length || 0}`);
  });

  const testimonials = await db.collection('testimonials').find().toArray();
  console.log('\n=== FINAL TESTIMONIALS ===');
  testimonials.forEach(t => {
    console.log(`id: "${t.id}", name: "${t.name}"`);
  });

  await client.close();
  console.log('\nDone!');
}).catch(console.error);
