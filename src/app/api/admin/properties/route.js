import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "../../../../lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, price, location, address, lat, lng, type, beds, baths, area, amenities, image } = body;

    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        priceLabel: `$${parseFloat(price).toLocaleString()}/mo`,
        location,
        address,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        type,
        beds: parseInt(beds),
        baths: parseInt(baths),
        area,
        amenities,
        image,
        status: 'AVAILABLE'
      }
    });

    return NextResponse.json(property, { status: 201 });
  } catch (error) {
    console.error("Admin add property error:", error);
    return NextResponse.json({ error: "Failed to add property" }, { status: 500 });
  }
}
