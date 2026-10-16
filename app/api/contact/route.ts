import { NextResponse } from "next/server";
import { sendContactEnquiryNotification } from "@/app/utils/email";
import { getDatabase } from "@/app/utils/getDatabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, checkIn, checkOut, guests, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Save inquiry to database
    try {
      const db = await getDatabase();
      await db.collection("enquiries").insertOne({
        name,
        email,
        phone: phone || "",
        checkIn: checkIn || "",
        checkOut: checkOut || "",
        guests: guests || "",
        message: message || "",
        createdAt: new Date(),
      });
    } catch (dbErr) {
      console.warn("Could not save enquiry to DB:", dbErr);
    }

    // Send email notification with BCC
    await sendContactEnquiryNotification({
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      message,
    });

    return NextResponse.json({ success: true, message: "Enquiry submitted successfully." });
  } catch (error: any) {
    console.error("Enquiry submission error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to process enquiry." },
      { status: 500 }
    );
  }
}
