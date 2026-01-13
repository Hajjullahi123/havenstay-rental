import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    const where = {
      status: 'AVAILABLE',
    };

    if (type && type !== 'All Types') {
      where.type = type;
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    const properties = await prisma.property.findMany({
      where,
      orderBy: { id: 'desc' }
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Fetch properties error:", error);
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}
