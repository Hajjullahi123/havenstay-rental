import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail, Templates } from "@/lib/mail";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: {
        status: 'CONFIRMED',
        payment: {
          update: {
            status: 'VERIFIED'
          }
        },
        property: {
          update: {
            status: 'RENTED'
          }
        }
      },
      include: {
        user: true,
        property: true
      }
    });

    // Notify Tenant
    await sendEmail({
      to: booking.user.email,
      subject: `Booking Verified: ${booking.property.title}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h1 style="color: #4ade80;">Payment Verified!</h1>
          <p>Your payment for <strong>${booking.property.title}</strong> has been verified by our team.</p>
          <p>You can now view your digital receipt and check-in details in your <a href="${process.env.NEXTAUTH_URL}/dashboard">Dashboard</a>.</p>
        </div>
      `
    });

    return NextResponse.json(booking);
  } catch (error) {
    console.error("Admin verify booking error:", error);
    return NextResponse.json({ error: "Failed to verify booking" }, { status: 500 });
  }
}
