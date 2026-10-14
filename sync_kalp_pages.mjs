import fs from 'fs';
import { MongoClient } from 'mongodb';

const envFile = fs.readFileSync('.env', 'utf-8');
const mongoUriMatch = envFile.match(/MONGODB_URI=(.*)/);
const mongoDbMatch = envFile.match(/MONGODB_DB=(.*)/);

const MONGODB_URI = mongoUriMatch ? mongoUriMatch[1].trim().replace(/^"|"$/g, '') : null;
const MONGODB_DB = mongoDbMatch ? mongoDbMatch[1].trim().replace(/^"|"$/g, '') : 'kp_hotel_luxora';

const BIZ_API = 'https://biz.kalptree.xyz/api/cms/pages';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-tenant-db': 'kp_hotel_luxora',
  'x-tenant-slug': 'hotel-luxora',
};

async function syncAll() {
  console.log('Connecting to local MongoDB:', MONGODB_DB);
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  // 1. Fetch existing pages from Biz API
  console.log('Fetching existing pages from Kalp Biz API...');
  const res = await fetch(BIZ_API, { headers: HEADERS });
  const bizData = await res.json();
  const remotePages = bizData.data || [];
  console.log('Found', remotePages.length, 'remote pages on Kalp Biz API.');

  const remoteBySlug = new Map();
  for (const p of remotePages) {
    if (p.slug) remoteBySlug.set(p.slug, p);
  }

  // 2. Fetch local pages from MongoDB
  const localPages = await db.collection('pages').find({}).toArray();
  console.log('Found', localPages.length, 'pages in local MongoDB.');

  for (const local of localPages) {
    const slug = local.slug;
    const remote = remoteBySlug.get(slug);

    const payload = {
      title: local.title,
      slug: local.slug,
      content: local.content || [],
      metaTitle: local.metaTitle,
      metaDescription: local.metaDescription,
      isPublished: local.isPublished ?? true,
      status: local.status || (local.isPublished ? 'published' : 'draft'),
    };

    if (remote) {
      console.log(`Updating existing page '${slug}' (ID: ${remote.id || remote._id})...`);
      const updateRes = await fetch(`${BIZ_API}/${remote.id || remote._id}`, {
        method: 'PUT',
        headers: HEADERS,
        body: JSON.stringify(payload),
      });
      const updateResult = await updateRes.json().catch(() => ({}));
      if (updateRes.ok) {
        console.log(`  ✓ Successfully updated '${slug}'! Sections: ${payload.content.length}`);
      } else {
        console.warn(`  ✗ Failed to update '${slug}':`, updateResult);
      }
    } else {
      console.log(`Creating new page '${slug}' on Kalp Biz API...`);
      const createRes = await fetch(BIZ_API, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(payload),
      });
      const createResult = await createRes.json().catch(() => ({}));
      if (createRes.ok) {
        console.log(`  ✓ Successfully created '${slug}'! Sections: ${payload.content.length}`);
      } else {
        console.warn(`  ✗ Failed to create '${slug}':`, createResult);
      }
    }
  }

  // Handle terms slug alias (terms vs terms-and-conditions)
  const remoteTerms = remoteBySlug.get('terms');
  const localTerms = localPages.find(p => p.slug === 'terms-and-conditions' || p.slug === 'terms');
  if (remoteTerms && localTerms) {
    console.log(`Also syncing local '${localTerms.slug}' content into remote 'terms'...`);
    await fetch(`${BIZ_API}/${remoteTerms.id || remoteTerms._id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify({
        title: localTerms.title,
        slug: 'terms',
        content: localTerms.content || [],
        metaTitle: localTerms.metaTitle,
        metaDescription: localTerms.metaDescription,
        isPublished: true,
        status: 'published',
      }),
    });
    console.log('  ✓ Synced terms alias.');
  }

  console.log('\n--- Final Verification ---');
  const verifyRes = await fetch(BIZ_API, { headers: HEADERS });
  const verifyData = await verifyRes.json();
  for (const p of verifyData.data || []) {
    console.log(`Page: /${p.slug.padEnd(22)} | Title: ${JSON.stringify(p.title)} | Content Blocks: ${p.content?.length || 0}`);
  }

  await client.close();
  console.log('\nSync completed successfully!');
}

syncAll().catch(console.error);
