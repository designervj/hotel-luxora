import { NextRequest, NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

export async function GET(req: NextRequest) {
    try {
        const db = await getDatabase();
        const slug = req.nextUrl.searchParams.get("slug");
        const publishedOnly = req.nextUrl.searchParams.get("published") === "true";

        if (slug) {
            const query: Record<string, unknown> = { slug };
            if (publishedOnly) query.isPublished = true;
            const page = await db.collection("pages").findOne(query);
            if (!page) {
                return NextResponse.json({ error: "Page not found" }, { status: 404 });
            }
            return NextResponse.json(page);
        }

        const pages = await db.collection("pages").find().sort({ createdAt: -1 }).toArray();
        return NextResponse.json(pages);
    } catch (error) {
        console.error("GET /api/pages error:", error);
        return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const db = await getDatabase();

        if (!body.title || !body.slug) {
            return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
        }

        // Check if slug is unique
        const existing = await db.collection("pages").findOne({ slug: body.slug });
        if (existing) {
            return NextResponse.json({ error: "A page with this slug already exists" }, { status: 409 });
        }

        const now = new Date().toISOString();
        const titleObj = typeof body.title === "object" ? body.title : { en: body.title || "" };
        const metaTitleObj = typeof body.metaTitle === "object" ? body.metaTitle : { en: body.metaTitle || "" };
        const metaDescObj = typeof body.metaDescription === "object" ? body.metaDescription : { en: body.metaDescription || "" };
        const isPublished = Boolean(body.isPublished);
        const revId = body.currentRevisionId || `pagerev_${Math.random().toString(36).substring(2, 10)}${Date.now()}`;

        const newPage = {
            id: body.id || `pg_${Date.now()}`,
            title: titleObj,
            slug: body.slug,
            subtitle: body.subtitle || "",
            sections: body.sections || [],
            content: body.content || [],
            metaTitle: metaTitleObj,
            metaDescription: metaDescObj,
            image: body.image || "",
            isPublished,
            status: body.status || (isPublished ? "published" : "draft"),
            currentRevisionId: revId,
            publishedRevisionId: isPublished ? (body.publishedRevisionId || revId) : undefined,
            headVersion: body.headVersion || 1,
            createdAt: body.createdAt || now,
            updatedAt: now,
        };

        const result = await db.collection("pages").insertOne(newPage);
        return NextResponse.json({ ...newPage, _id: result.insertedId }, { status: 201 });
    } catch (error) {
        console.error("POST /api/pages error:", error);
        return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
    }
}

// PUT /api/pages — upsert by slug
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        const db = await getDatabase();

        if (!body.slug) {
            return NextResponse.json({ error: "Slug is required for upsert" }, { status: 400 });
        }

        const now = new Date().toISOString();
        const titleObj = typeof body.title === "object" ? body.title : { en: body.title || "" };
        const metaTitleObj = typeof body.metaTitle === "object" ? body.metaTitle : { en: body.metaTitle || "" };
        const metaDescObj = typeof body.metaDescription === "object" ? body.metaDescription : { en: body.metaDescription || "" };
        const isPublished = Boolean(body.isPublished);
        const revId = body.currentRevisionId || `pagerev_${Math.random().toString(36).substring(2, 10)}${Date.now()}`;

        const updateData = {
            id: body.id || `pg_${Date.now()}`,
            title: titleObj,
            slug: body.slug,
            subtitle: body.subtitle || "",
            sections: body.sections || [],
            content: body.content || [],
            metaTitle: metaTitleObj,
            metaDescription: metaDescObj,
            image: body.image || "",
            isPublished,
            status: body.status || (isPublished ? "published" : "draft"),
            currentRevisionId: revId,
            publishedRevisionId: isPublished ? (body.publishedRevisionId || revId) : undefined,
            headVersion: (body.headVersion || 0) + 1,
            updatedAt: now,
        };

        await db.collection("pages").updateOne(
            { slug: body.slug },
            { $set: updateData },
            { upsert: true }
        );

        return NextResponse.json({ success: true, page: updateData });
    } catch (error) {
        console.error("PUT /api/pages error:", error);
        return NextResponse.json({ error: "Failed to upsert page" }, { status: 500 });
    }
}
