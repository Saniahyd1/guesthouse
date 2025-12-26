import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.create({
      data: {
        name: body.name,
        phone: body.phone,
        email: body.email,
        guests: Number(body.guests),
        rooms: Number(body.rooms),
        roomType: body.roomType,

        // 🔥 CRITICAL FIX
        checkin: new Date(body.checkin),
        checkout: new Date(body.checkout),
      },
    });

    return NextResponse.json(
      { success: true, booking },
      { status: 201 }
    );
  } catch (error) {
    console.error("BOOKING API ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}