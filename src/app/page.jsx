import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProperties from '../components/FeaturedProperties';
import TrustSection from '../components/TrustSection';
import Testimonials from '../components/Testimonials';
import ModernWorkflow from '../components/ModernWorkflow';
import prisma from '../lib/prisma';
const Home = async () => {
  let featuredProperties = [];
  try {
    featuredProperties = await prisma.property.findMany({
      where: {
        status: 'AVAILABLE',
        featured: true
      },
      take: 3,
      orderBy: { id: 'desc' }
    });

    // Fallback search if no featured items exist
    if (featuredProperties.length === 0) {
      featuredProperties = await prisma.property.findMany({
        where: { status: 'AVAILABLE' },
        take: 3,
        orderBy: { id: 'desc' }
      });
    }

    featuredProperties = featuredProperties.map(p => ({
      ...p,
      amenities: typeof p.amenities === 'string' ? JSON.parse(p.amenities) : p.amenities
    }));
  } catch (e) {
    console.error("Home fetch error:", e);
  }

  return (
    <>
      <Hero />
      <Categories />
      <section style={{ padding: '80px 5%' }}>
        <h2 style={{
          fontSize: '3rem',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          Featured <span style={{ color: 'var(--accent)' }}>Properties</span>
        </h2>
        <FeaturedProperties limit={3} properties={featuredProperties} />
      </section>
      <ModernWorkflow />
      <TrustSection />
      <Testimonials />
    </>
  );
};

export default Home;
