import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId } = await req.json();

    if (!propertyId) {
      return NextResponse.json({ error: "Missing propertyId" }, { status: 400 });
    }

    const userId = session.user.id;
    const pid = parseInt(propertyId);

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId: pid
        }
      }
    });

    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ active: false });
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          propertyId: pid
        }
      });
      return NextResponse.json({ active: true });
    }
  } catch (error) {
    console.error("Favorite toggle error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      include: { property: true }
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Fetch favorites error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
