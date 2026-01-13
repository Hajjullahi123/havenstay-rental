import React from 'react';
import { Target, Users, ShieldCheck, Heart } from 'lucide-react';

const AboutPage = () => {
  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', paddingLeft: '5%', paddingRight: '5%' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: '900', marginBottom: '24px' }}>
            Elevating the <span style={{ color: 'var(--accent)' }}>Stay Experience</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
            HavenStay was born from a simple idea: that finding a home should be as inspiring as living in one.
            We've combined glassmorphism design with a powerful financial engine to create the first truly digital rental platform.
          </p>
        </header>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px', marginBottom: '100px' }}>
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}><Target size={48} /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Our Mission</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>To democratize access to premium rentals through transparency, speed, and design-first technology.</p>
          </div>
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}><ShieldCheck size={48} /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Verified Only</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>Every property enters our catalog only after a rigorous 20-point digital and physical verification process.</p>
          </div>
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}><Heart size={48} /></div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Community First</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>We don't just list houses; we build communities by ensuring fair treatment for both tenants and landlords.</p>
          </div>
        </section>

        <div className="glass" style={{ padding: '80px', borderRadius: '40px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.05) 0%, transparent 100%)' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '32px' }}>Join the HavenStay Story</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px' }}>
            Whether you are a tenant looking for your next sanctuary or a landlord seeking professional management,
            HavenStay is your partner in the modern rental journey.
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
            <button style={{ padding: '16px 40px', background: 'var(--accent)', color: 'var(--bg-main)', borderRadius: '16px', fontWeight: '800', border: 'none', cursor: 'pointer' }}>Our Openings</button>
            <button style={{ padding: '16px 40px', background: 'transparent', border: '1px solid var(--accent)', color: 'var(--accent)', borderRadius: '16px', fontWeight: '800', cursor: 'pointer' }}>Partner With Us</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
