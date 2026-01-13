import React from 'react';
import prisma from '../../../lib/prisma';
import BookingForm from '../../../components/BookingForm';

export const metadata = {
  title: 'Confirm Booking | HavenStay',
};

const BookingPage = async ({ params }) => {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id: parseInt(id) }
  });

  if (!property) return <div style={{ paddingTop: '120px', textAlign: 'center' }}>Property not found</div>;

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Confirm Your <span style={{ color: 'var(--accent)' }}>Booking</span></h1>
        <BookingForm property={property} />
      </div>
    </div>
  );
};

export default BookingPage;
