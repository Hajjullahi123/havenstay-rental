import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const createCheckoutSession = async ({ amount, propertyName, propertyId, userEmail }) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: propertyName,
              description: `Booking for property #${propertyId}`,
            },
            unit_amount: Math.round(amount * 100), // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?status=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/booking/${propertyId}?status=cancelled`,
      customer_email: userEmail,
      metadata: {
        propertyId,
      },
    });

    return session;
  } catch (error) {
    console.error('Stripe session error:', error);
    return null;
  }
};

export default stripe;
