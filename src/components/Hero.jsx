'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, DollarSign, ArrowRight } from 'lucide-react';

const Hero = () => {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState('$2000 - $5000');

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('search', location);
    if (budget) params.set('priceRange', budget);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section style={{
      padding: '160px 5% 100px',
      minHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      background: 'radial-gradient(circle at 50% 10%, rgba(212, 175, 55, 0.08) 0%, var(--bg-main) 70%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur */}
      <div style={{ position: 'absolute', top: '-100px', right: '-10%', width: '40%', height: '500px', background: 'var(--accent)', opacity: 0.05, filter: 'blur(100px)', borderRadius: '50%' }}></div>
      <div style={{ position: 'absolute', bottom: '0', left: '-10%', width: '30%', height: '400px', background: 'var(--accent)', opacity: 0.03, filter: 'blur(100px)', borderRadius: '50%' }}></div>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px', borderRadius: '20px', background: 'rgba(212, 175, 55, 0.1)',
        color: 'var(--accent)', marginBottom: '32px', fontSize: '0.85rem', fontWeight: '700',
        letterSpacing: '1px', textTransform: 'uppercase'
      }}>
        ✨ The New Standard in Luxury Rentals
      </div>

      <h1 style={{
        fontSize: 'calc(2.5rem + 3vw)',
        fontWeight: '900',
        marginBottom: '24px',
        maxWidth: '1000px',
        lineHeight: '1',
        letterSpacing: '-2px'
      }}>
        Redefining <span style={{
          background: 'linear-gradient(to right, #d4af37, #f1c40f)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900'
        }}>Living Experiences</span> for the Modern Era
      </h1>
      <p style={{
        fontSize: '1.25rem',
        color: 'var(--text-muted)',
        maxWidth: '700px',
        marginBottom: '60px',
        lineHeight: '1.6'
      }}>
        Experience the most seamless way to find, book, and secure your perfect rental property with AI-assisted discovery and instant verification.
      </p>

      <div className="glass" style={{
        width: '100%',
        maxWidth: '1100px',
        padding: '40px',
        borderRadius: '32px',
        display: 'flex',
        gap: '30px',
        alignItems: 'center',
        flexWrap: 'wrap',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
        border: '1px solid var(--glass-border)',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ flex: 1, textAlign: 'left', minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <MapPin size={16} color="var(--accent)" />
            <label style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px' }}>LOCATION</label>
          </div>
          <input
            type="text"
            placeholder="Search by city or area..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '1.2rem',
              width: '100%',
              outline: 'none',
              fontWeight: '600'
            }}
          />
        </div>

        <div style={{ width: '1px', height: '60px', background: 'var(--glass-border)', display: 'none' }} className="desktop-divider"></div>

        <div style={{ flex: 1, textAlign: 'left', minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <DollarSign size={16} color="var(--accent)" />
            <label style={{ color: 'var(--accent)', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '1px' }}>BUDGET RANGE</label>
          </div>
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontSize: '1.2rem',
              width: '100%',
              outline: 'none',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            <option>$500 - $2000</option>
            <option>$2000 - $5000</option>
            <option>$5000+</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          style={{
            padding: '20px 48px',
            background: 'var(--accent)',
            color: 'var(--bg-main)',
            borderRadius: '20px',
            fontWeight: '800',
            fontSize: '1.1rem',
            cursor: 'pointer',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Explore Now <ArrowRight size={20} />
        </button>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-divider { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
