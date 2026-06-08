import { NextResponse } from "next/server";
import { getDatabase } from "@/app/utils/getDatabase";

const DEFAULT_SETTINGS = {
    name: "HOTEL LUXORA",
    shortDescription: "Iconic 5-star urban retreat with panoramic city views.",
    address: "Hotel Luxora Suites, 4th Floor, Dogma Business Hub, Near Capital High Street Mall, Mahal Road, Jagatpura, Jaipur, Rajasthan 302017",
    city: "Jaipur",
    country: "India",
    contactNumber: "8954888990",
    email: "hello@hotelluxora.com",
    checkInTime: "15:00",
    checkOutTime: "12:00",
    starRating: 5,
    logoUrl: "/luxora-white-logo.svg",
    gstNumber: "",
    website: "",
    bankDetails: "",
};

export async function GET() {
    try {
        const db = await getDatabase();
        const doc = await db.collection("hotel_settings").findOne({});
        if (!doc) return NextResponse.json(DEFAULT_SETTINGS);
        const { _id, ...rest } = doc;
        return NextResponse.json(rest);
    } catch {
        return NextResponse.json(DEFAULT_SETTINGS);
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const db = await getDatabase();
        await db.collection("hotel_settings").updateOne(
            {},
            { $set: { ...body, updatedAt: new Date().toISOString() } },
            { upsert: true }
        );
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: String(err) }, { status: 500 });
    }
}
