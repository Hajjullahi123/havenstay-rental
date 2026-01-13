import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  // If no SMTP_USER is provided, just log to console (useful for development)
  if (!process.env.SMTP_USER) {
    console.log('--- MOCK EMAIL SENT ---');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`HTML: ${html.substring(0, 100)}...`);
    console.log('------------------------');
    return { messageId: 'mock' };
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error('Email send error:', error);
    return null;
  }
};

export const Templates = {
  BookingConfirmation: (booking, property) => ({
    subject: `Booking Confirmed: ${property.title}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #d4af37;">Booking Confirmed!</h1>
        <p>Your booking for <strong>${property.title}</strong> has been successfully received.</p>
        <hr />
        <p><strong>Check-in Date:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</p>
        <p><strong>Check-out Date:</strong> ${booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'}</p>
        <p><strong>Amount Paid:</strong> $${booking.amount.toLocaleString()}</p>
        <p><strong>Address:</strong> ${property.address}</p>
        <hr />
        <p>Manage your booking at <a href="${process.env.NEXTAUTH_URL}/dashboard">your dashboard</a>.</p>
      </div>
    `
  }),
  RegistrationWelcome: (userName) => ({
    subject: 'Welcome to HavenStay!',
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h1 style="color: #d4af37;">Welcome, ${userName}!</h1>
        <p>We're thrilled to have you join HavenStay. You can now browse luxury properties and book your next stay seamlessly.</p>
        <p><a href="${process.env.NEXTAUTH_URL}/properties" style="background: #d4af37; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Explore Properties</a></p>
      </div>
    `
  }),
  AdminNewBooking: (booking, property, user) => ({
    subject: `NEW BOOKING: ${property.title}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h1>New Booking Alert</h1>
        <p>Tenant: <strong>${user.name}</strong> (${user.email})</p>
        <p>Property: <strong>${property.title}</strong></p>
        <p>Duration: ${new Date(booking.checkIn).toLocaleDateString()} - ${booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : '...'}</p>
        <p>Amount: $${booking.amount.toLocaleString()}</p>
        <p><a href="${process.env.NEXTAUTH_URL}/admin">View Admin Dashboard</a></p>
      </div>
    `
  })
};
