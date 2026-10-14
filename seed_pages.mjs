import fs from 'fs';
const envFile = fs.readFileSync('.env', 'utf-8');
const mongoUriMatch = envFile.match(/MONGODB_URI=(.*)/);
const mongoDbMatch = envFile.match(/MONGODB_DB=(.*)/);
const MONGODB_URI = mongoUriMatch ? mongoUriMatch[1].trim().replace(/^"|"$/g, '') : null;
const MONGODB_DB = mongoDbMatch ? mongoDbMatch[1].trim().replace(/^"|"$/g, '') : null;

import { MongoClient } from 'mongodb';

const INITIAL_PAGES = [
    {
        id: "pg_about_us",
        title: { en: "About Us" },
        slug: "about-us",
        metaTitle: { en: "About Us | Hotel Luxora" },
        metaDescription: { en: "Learn about Hotel Luxora, our history, rooms, and heritage hospitality in Jaipur." },
        content: [
            {
                id: "sec-about-hero",
                type: "nestcraft.story.feature",
                version: "1.0",
                enabled: true,
                variant: "grid-1",
                content: {
                    items: [
                        { id: "about_h1", type: "heading", level: "h2", text: "Welcome to Hotel Luxora" },
                        { id: "about_p1", type: "paragraph", text: "A sanctuary of luxury and heritage in the heart of Jaipur. Our hotel blends traditional Rajasthani hospitality with modern luxury, offering an unforgettable experience for every traveler." },
                        { id: "about_p2", type: "paragraph", text: "From our beautifully designed rooms to our world-class dining, every detail of your stay is carefully curated to provide the ultimate comfort and elegance." }
                    ],
                    columns: [
                        [
                            { id: "about_h1", type: "heading", level: "h2", text: "Welcome to Hotel Luxora" },
                            { id: "about_p1", type: "paragraph", text: "A sanctuary of luxury and heritage in the heart of Jaipur. Our hotel blends traditional Rajasthani hospitality with modern luxury, offering an unforgettable experience for every traveler." },
                            { id: "about_p2", type: "paragraph", text: "From our beautifully designed rooms to our world-class dining, every detail of your stay is carefully curated to provide the ultimate comfort and elegance." }
                        ]
                    ],
                    adminTitle: "About Us Main"
                },
                props: {
                    legacyEditor: {
                        id: "sec-about-hero",
                        type: "story.feature",
                        layout: "grid-1",
                        props: {},
                        content: [],
                        columns: []
                    }
                },
                dataSource: { kind: "static" },
                visibility: {},
                style: {},
                provenance: {
                    origin: "kalp_admin_page_editor",
                    editor: "page-editor-v2-adapter"
                }
            }
        ],
        isPublished: true,
        status: "published",
        currentRevisionId: "pagerev_about_init",
        headVersion: 1
    },
    {
        id: "pg_privacy_policy",
        title: { en: "Privacy Policy" },
        slug: "privacy-policy",
        metaTitle: { en: "Privacy Policy | Hotel Luxora" },
        metaDescription: { en: "Read the Privacy Policy of Hotel Luxora and understand how your data is protected." },
        content: [
            {
                id: "sec-privacy-1",
                type: "nestcraft.section.grid-1",
                version: "1.0",
                enabled: true,
                variant: "grid-1",
                content: {
                    items: [
                        { id: "priv_h1", type: "heading", level: "h2", text: "Privacy Policy" },
                        { id: "priv_p1", type: "paragraph", text: "At Hotel Luxora, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website or visit our property." },
                        { id: "priv_p2", type: "paragraph", text: "We collect information such as your name, contact details, and payment information to facilitate your bookings and improve our services. We do not sell your personal data to third parties." }
                    ],
                    columns: [
                        [
                            { id: "priv_h1", type: "heading", level: "h2", text: "Privacy Policy" },
                            { id: "priv_p1", type: "paragraph", text: "At Hotel Luxora, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information when you use our website or visit our property." },
                            { id: "priv_p2", type: "paragraph", text: "We collect information such as your name, contact details, and payment information to facilitate your bookings and improve our services. We do not sell your personal data to third parties." }
                        ]
                    ],
                    adminTitle: "Privacy Statement"
                },
                props: {
                    legacyEditor: {
                        id: "sec-privacy-1",
                        type: "section",
                        layout: "grid-1",
                        props: {},
                        content: [],
                        columns: []
                    }
                },
                dataSource: { kind: "static" },
                visibility: {},
                style: {},
                provenance: {
                    origin: "kalp_admin_page_editor",
                    editor: "page-editor-v2-adapter"
                }
            }
        ],
        isPublished: true,
        status: "published",
        currentRevisionId: "pagerev_privacy_init",
        headVersion: 1
    },
    {
        id: "pg_our_facilities",
        title: { en: "Our Facilities" },
        slug: "facilities",
        metaTitle: { en: "Hotel Facilities & Amenities | Hotel Luxora" },
        metaDescription: { en: "Explore our rooftop infinity pool, spa, fitness center, and multi-cuisine restaurants." },
        content: [
            {
                id: "sec-facilities-1",
                type: "nestcraft.section.grid-1",
                version: "1.0",
                enabled: true,
                variant: "grid-1",
                content: {
                    items: [
                        { id: "fac_h1", type: "heading", level: "h2", text: "Our Premium Facilities" },
                        { id: "fac_p1", type: "paragraph", text: "Enjoy a range of premium facilities at Hotel Luxora:\n\n- Rooftop Infinity Pool with a view of the city\n- Full-service Luxury Spa and Wellness Center\n- Multi-cuisine Fine Dining Restaurant\n- State-of-the-art Fitness Center\n- 24/7 Concierge and Room Service\n- High-speed Wi-Fi throughout the property" }
                    ],
                    columns: [
                        [
                            { id: "fac_h1", type: "heading", level: "h2", text: "Our Premium Facilities" },
                            { id: "fac_p1", type: "paragraph", text: "Enjoy a range of premium facilities at Hotel Luxora:\n\n- Rooftop Infinity Pool with a view of the city\n- Full-service Luxury Spa and Wellness Center\n- Multi-cuisine Fine Dining Restaurant\n- State-of-the-art Fitness Center\n- 24/7 Concierge and Room Service\n- High-speed Wi-Fi throughout the property" }
                        ]
                    ],
                    adminTitle: "Facilities List"
                },
                props: {
                    legacyEditor: {
                        id: "sec-facilities-1",
                        type: "section",
                        layout: "grid-1",
                        props: {},
                        content: [],
                        columns: []
                    }
                },
                dataSource: { kind: "static" },
                visibility: {},
                style: {},
                provenance: {
                    origin: "kalp_admin_page_editor",
                    editor: "page-editor-v2-adapter"
                }
            }
        ],
        isPublished: true,
        status: "published",
        currentRevisionId: "pagerev_facilities_init",
        headVersion: 1
    }
];

(async () => {
    if (!MONGODB_URI) { console.log("No MONGODB_URI"); return; }
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(MONGODB_DB);

    // Seed pages
    const existingPages = await db.collection("pages").countDocuments();
    if (existingPages === 0) {
        const now = new Date().toISOString();
        const docs = INITIAL_PAGES.map(pg => ({ ...pg, createdAt: now, updatedAt: now }));
        await db.collection("pages").insertMany(docs);
        console.log(`✅ Seeded ${docs.length} initial pages`);
    } else {
        console.log(`Pages already has ${existingPages} entries, skipping seed.`);
    }

    await client.close();
    console.log("Done!");
})();
