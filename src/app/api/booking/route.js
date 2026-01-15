import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { sendEmail, Templates } from "@/lib/mail";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { propertyId, checkIn, checkOut, paymentMethod, amount } = body;

    if (!propertyId || !checkIn || !paymentMethod || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        propertyId: parseInt(propertyId),
        userId: session.user.id,
        checkIn: new Date(checkIn),
        checkOut: checkOut ? new Date(checkOut) : null,
        amount: parseFloat(amount),
        status: 'PENDING',
        payment: {
          create: {
            method: paymentMethod,
            status: paymentMethod === 'online' ? 'VERIFIED' : 'PENDING'
          }
        }
      },
      include: {
        payment: true,
        property: true
      }
    });

    // Send Confirmation Emails
    const userTemplate = Templates.BookingConfirmation(booking, booking.property);
    const adminTemplate = Templates.AdminNewBooking(booking, booking.property, session.user);

    await Promise.all([
      sendEmail({ to: session.user.email, subject: userTemplate.subject, html: userTemplate.html }),
      sendEmail({ to: 'admin@havenstay.com', subject: adminTemplate.subject, html: adminTemplate.html })
    ]);

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
