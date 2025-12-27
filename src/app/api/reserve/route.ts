import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ✅ GET — health check */
export async function GET() {
  return NextResponse.json(
    { message: "Reserve API is working. Use POST to create booking." },
    { status: 200 }
  );
}

/* ✅ POST — create booking */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      email,
      guests,
      rooms,
      roomType,
      checkin,
      checkout,
    } = body;

    // 🔒 Basic validation
    if (
      !name ||
      !phone ||
      !email ||
      !guests ||
      !rooms ||
      !roomType ||
      !checkin ||
      !checkout
    ) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        name,
        phone,
        email,
        guests: Number(guests),
        rooms: Number(rooms),
        roomType,
        checkin: new Date(checkin),
        checkout: new Date(checkout),
      },
    });

    return NextResponse.json(
      { success: true, booking },
      { status: 201 }
    );
} catch (error: any) {
  console.error("BOOKING API ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message || "Server error"
    },
    { status: 500 }
  );
}
}