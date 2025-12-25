import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const booking = await prisma.booking.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        guests: Number(data.guests),
        rooms: Number(data.rooms),
        roomType: data.roomType,
        checkin: new Date(data.checkin),
        checkout: new Date(data.checkout),
      },
    });

    // ✅ MUST return JSON
    return NextResponse.json({ success: true, booking });

  }catch (error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
}
