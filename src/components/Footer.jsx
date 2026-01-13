import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(10px)',
      borderTop: '1px solid var(--glass-border)',
      padding: '80px 5% 40px',
      marginTop: '80px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '60px',
        marginBottom: '60px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--accent)', marginBottom: '24px', fontWeight: '800', letterSpacing: '-1px' }}>HAVENSTAY</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '32px' }}>
            Elevating the rental experience through glassmorphism design and seamless digital workflows. Your dream home is just one click away.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Twitter', 'Instagram', 'LinkedIn'].map(social => (
              <a key={social} href="#" style={{
                color: 'var(--text-main)',
                fontSize: '0.9rem',
                fontWeight: '600',
                textDecoration: 'none',
                opacity: 0.7
              }}>{social}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><Link href="/properties" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Browse Houses</Link></li>
            <li><Link href="/pwa" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Mobile App</Link></li>
            <li><Link href="/admin" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>List Your Property</Link></li>
            <li><Link href="/faq" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Support Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Property Types</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li><Link href="/properties?type=Apartment" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Luxury Apartments</Link></li>
            <li><Link href="/properties?type=Villa" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Beachfront Villas</Link></li>
            <li><Link href="/properties?type=House" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Family Homes</Link></li>
            <li><Link href="/properties?type=Office" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Smart Offices</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Newsletter</h4>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>Join our inner circle for exclusive early access to premium listings.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="email"
              placeholder="Email address"
              style={{
                flex: 1,
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--glass-border)',
                borderRadius: '8px',
                color: 'white',
                outline: 'none'
              }}
            />
            <button style={{
              padding: '12px 20px',
              background: 'var(--accent)',
              color: 'var(--bg-main)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: 'pointer'
            }}>Join</button>
          </div>
        </div>
      </div>

      <div style={{
        paddingTop: '40px',
        borderTop: '1px solid var(--glass-border)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.85rem'
      }}>
        &copy; {new Date().getFullYear()} HavenStay Realty. All rights reserved.
        <span style={{ margin: '0 10px' }}>|</span>
        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
        <span style={{ margin: '0 10px' }}>|</span>
        <a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
