import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createCheckoutSession } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { propertyId, amount } = await req.json();

    const property = await prisma.property.findUnique({
      where: { id: parseInt(propertyId) }
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    // If STRIPE_SECRET_KEY is missing, simulate success (for dev without real keys)
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        url: null,
        simulated: true,
        message: "Stripe mode: SIMULATED (No API key found)"
      });
    }

    const checkoutSession = await createCheckoutSession({
      amount,
      propertyName: property.title,
      propertyId: property.id,
      userEmail: session.user.email
    });

    if (!checkoutSession) {
      return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
