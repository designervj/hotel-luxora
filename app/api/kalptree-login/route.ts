import { NextResponse } from "next/server";
import { login } from "@/app/utils/auth";
import { getDatabase } from "@/app/utils/getDatabase";
import bcrypt from "bcryptjs";

const DEFAULT_ADMIN_EMAIL = process.env.KALPTREE_ADMIN_EMAIL || "business@grandeagle.com";
const DEFAULT_ADMIN_PASSWORD = process.env.KALPTREE_ADMIN_PASSWORD || "1234567899";

export async function POST(req: Request) {
  try {
    const { emailOrPhone, password } = await req.json();

    if (!emailOrPhone || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trimmedInput = emailOrPhone.trim();

    // 1. Try checking database users first
    try {
      const db = await getDatabase();
      const dbUser = await db.collection("users").findOne({
        $or: [{ email: trimmedInput }, { phone: trimmedInput }]
      });

      if (dbUser) {
        const isValid = await bcrypt.compare(password, dbUser.password);
        if (isValid) {
          if (dbUser.role !== "admin") {
            return NextResponse.json({ error: "This account does not have admin access" }, { status: 403 });
          }

          const sessionUser = {
            id: dbUser._id.toString(),
            name: dbUser.name,
            email: dbUser.email,
            phone: dbUser.phone || null,
            role: "admin",
          };

          await login(sessionUser);
          return NextResponse.json({ message: "Success", user: sessionUser }, { status: 200 });
        }
      }
    } catch (dbErr) {
      console.warn("DB check error in kalptree-login, falling back to static config:", dbErr);
    }

    // 2. Fallback check for standard admin credentials (e.g. business@grandeagle.com / admin@hotelluxora.com)
    const isValidDefaultEmail =
      trimmedInput === DEFAULT_ADMIN_EMAIL ||
      trimmedInput === "admin@hotelluxora.com";
    
    const isValidDefaultPassword =
      password === DEFAULT_ADMIN_PASSWORD ||
      password === "luxoraadmin" ||
      password === "1234567899";

    if (isValidDefaultEmail && isValidDefaultPassword) {
      const sessionUser = {
        id: "kalptree-admin",
        name: trimmedInput === "admin@hotelluxora.com" ? "Hotel Luxora Admin" : "Grand Eagle Admin",
        email: trimmedInput,
        phone: null,
        role: "admin",
      };

      await login(sessionUser);
      return NextResponse.json({ message: "Success", user: sessionUser }, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error) {
    console.error("Kalptree login error", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
