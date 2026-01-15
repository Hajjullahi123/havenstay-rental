import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import BookingClient from '@/components/BookingClient';
import dynamic from 'next/dynamic';
import {
  Wifi,
  Car,
  Wind,
  Waves,
  ShieldCheck,
  Cctv,
  Power,
  FlameKindling,
  MapPin,
  Maximize,
  Bed,
  Bath
} from 'lucide-react';

const amenityIcons = {
  'High-speed WiFi': <Wifi size={20} />,
  'Parking': <Car size={20} />,
  'Air Conditioning': <Wind size={20} />,
  'Swimming Pool': <Waves size={20} />,
  'Gym': <ShieldCheck size={20} />,
  '24/7 Security': <Cctv size={20} />,
  'Backup Generator': <Power size={20} />,
  'Water Heater': <FlameKindling size={20} />,
};

const PropertyMap = dynamic(() => import('@/components/PropertyMap'), {
  loading: () => <div style={{ height: '500px', width: '100%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>Loading Map...</div>
});

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id: parseInt(id) }
  });

  return {
    title: property ? `${property.title} | HavenStay` : 'Property Not Found',
  };
}

const PropertyDetails = async ({ params }) => {
  const { id } = await params;
  const property = await prisma.property.findUnique({
    where: { id: parseInt(id) }
  });

  if (!property) {
    return (
      <div style={{ paddingTop: '160px', textAlign: 'center' }}>
        <h1>Property Not Found</h1>
        <Link href="/properties" style={{ color: 'var(--accent)' }}>View all properties</Link>
      </div>
    );
  }

  // Handle SQLite String compatibility for amenities
  const amenities = typeof property.amenities === 'string' ? JSON.parse(property.amenities) : property.amenities;
  property.amenities = amenities;

  const gallery = [
    property.image,
    'https://placehold.co/600x400/1e293b/d4af37?text=Modern+Kitchen',
    'https://placehold.co/600x400/1e293b/d4af37?text=Bedroom+View'
  ];

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%' }}>
      <Link href="/properties" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '20px', fontWeight: '500' }}>
        ← Back to Listings
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
        {/* Left Column: Images and Details */}
        <div>
          <div style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', boxShadow: 'var(--shadow-lg)' }}>
            <img src={gallery[0]} alt={property.title} style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
            <img src={gallery[1]} alt="Interior" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} />
            <img src={gallery[2]} alt="Interior" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px' }} />
          </div>

          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>{property.title}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={22} color="var(--accent)" /> {property.address}
          </p>

          <div style={{ display: 'flex', gap: '40px', marginBottom: '40px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Bed size={24} color="var(--accent)" />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>BEDROOMS</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{property.beds} Rooms</p>
              </div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Bath size={24} color="var(--accent)" />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>BATHROOMS</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{property.baths} Baths</p>
              </div>
            </div>
            <div style={{ width: '1px', background: 'var(--glass-border)' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Maximize size={24} color="var(--accent)" />
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>SQUARE AREA</p>
                <p style={{ fontSize: '1.2rem', fontWeight: '600' }}>{property.area}</p>
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Description</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px' }}>{property.description}</p>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Amenities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {property.amenities.map((item, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: 'var(--text-main)',
                padding: '16px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid var(--glass-border)'
              }}>
                <span style={{ color: 'var(--accent)' }}>
                  {amenityIcons[item] || <ShieldCheck size={20} />}
                </span>
                <span style={{ fontSize: '0.9rem' }}>{item}</span>
              </div>
            ))}
          </div>

          {property.lat && property.lng && (
            <>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '16px' }}>Location on Map</h2>
              <PropertyMap properties={[property]} center={[property.lat, property.lng]} zoom={15} />
            </>
          )}
        </div>

        {/* Right Column: Booking Card */}
        <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
          <BookingClient property={property} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
