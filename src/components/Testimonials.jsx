import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: 'Sarah Johnson',
      role: 'Tenant',
      text: 'HavenStay made finding my new apartment so simple. The verified listings gave me total peace of mind during the process.',
      avatar: 'SJ',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Business Owner',
      text: 'Booking my office space through this platform was a breeze. Professional, fast, and the interface is stunning.',
      avatar: 'MC',
      rating: 5
    },
    {
      name: 'David Okafor',
      role: 'Expat',
      text: 'Best rental agency in the city. The digital payments and instant booking features are a game changer for someone new to town.',
      avatar: 'DO',
      rating: 4
    },
  ];

  return (
    <section style={{ padding: '120px 5%', background: 'var(--bg-main)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: '900', marginBottom: '20px' }}>
            Trusted by <span style={{ color: 'var(--accent)' }}>Stayers</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Join thousands of happy residents who found their home through HavenStay.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
          {reviews.map((r, i) => (
            <div key={i} className="glass" style={{
              padding: '60px 40px 40px', borderRadius: '32px', position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)',
              transition: 'var(--transition)'
            }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
            >
              <div style={{
                position: 'absolute', top: '-30px', left: '40px', width: '64px', height: '64px',
                background: 'var(--accent)', borderRadius: '20px', display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontWeight: '900',
                color: 'var(--bg-main)', fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.3)'
              }}>
                {r.avatar}
              </div>

              <Quote size={40} style={{ position: 'absolute', right: '40px', top: '40px', opacity: 0.05, color: 'var(--accent)' }} />

              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} size={16} fill={idx < r.rating ? "var(--accent)" : "transparent"} color="var(--accent)" />
                ))}
              </div>

              <p style={{
                color: 'var(--text-main)', fontSize: '1.1rem', lineHeight: '1.8',
                fontStyle: 'italic', marginBottom: '32px', minHeight: '100px'
              }}>
                "{r.text}"
              </p>

              <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
                <p style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '4px' }}>{r.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase' }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
