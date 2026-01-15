import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.property.delete({
      where: { id: parseInt(id) }
    });

    return NextResponse.json({ message: "Property deleted" });
  } catch (error) {
    console.error("Admin delete property error:", error);
    return NextResponse.json({ error: "Failed to delete property" }, { status: 500 });
  }
}
