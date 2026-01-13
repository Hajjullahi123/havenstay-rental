import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const bookings = await prisma.booking.findMany({
      where: {
        propertyId: parseInt(id),
        status: { not: 'CANCELLED' }
      },
      select: {
        checkIn: true,
        checkOut: true
      }
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error("Fetch availability error:", error);
    return NextResponse.json({ error: "Failed to fetch availability" }, { status: 500 });
  }
}
