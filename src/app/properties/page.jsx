import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import PropertiesBrowser from '@/components/PropertiesBrowser';

export const metadata = {
  title: 'All Properties | HavenStay',
  description: 'Browse our collection of premium rental properties.',
};

const PropertiesPage = async () => {
  let properties = [];
  try {
    properties = await prisma.property.findMany({
      where: { status: 'AVAILABLE' },
      orderBy: { id: 'desc' }
    });
    properties = properties.map(p => ({
      ...p,
      amenities: typeof p.amenities === 'string' ? JSON.parse(p.amenities) : p.amenities
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '80px', paddingLeft: '5%', paddingRight: '5%', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
        Find Your <span style={{ color: 'var(--accent)' }}>Perfect Space</span>
      </h1>
      <Suspense fallback={<div>Loading search...</div>}>
        <PropertiesBrowser initialProperties={properties} />
      </Suspense>
    </div>
  );
};

export default PropertiesPage;
