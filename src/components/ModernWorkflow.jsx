'use client';
import React from 'react';
import { Search, Calendar, Key, CheckCircle2 } from 'lucide-react';

const ModernWorkflow = () => {
  const steps = [
    {
      title: 'Discover',
      desc: 'Browse through our curated collection of verified premium properties with high-res galleries.',
      icon: <Search size={32} />,
      color: '#d4af37'
    },
    {
      title: 'Book Stay',
      desc: 'Select your dates using our interactive calendar and secure your stay with instant digital payments.',
      icon: <Calendar size={32} />,
      color: '#4ade80'
    },
    {
      title: 'Verify',
      desc: 'Your booking is instantly processed and verified by our automated financial engine.',
      icon: <CheckCircle2 size={32} />,
      color: '#3b82f6'
    },
    {
      title: 'Move In',
      desc: 'Receive your digital keys and move into your new home. Stress-free and purely digital.',
      icon: <Key size={32} />,
      color: '#f472b6'
    }
  ];

  return (
    <section style={{ padding: '100px 5%', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>The HavenStay <span style={{ color: 'var(--accent)' }}>Workflow</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>Our streamlined process ensures you find and secure your dream home without the traditional hassles of rental markets.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', position: 'relative' }}>
          {/* Connecting Line (Desktop) */}
          <div style={{
            position: 'absolute', top: '50px', left: '10%', right: '10%',
            height: '2px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)',
            zIndex: 0, display: 'none'
          }} className="workflow-line"></div>

          {steps.map((step, i) => (
            <div key={i} className="glass" style={{
              padding: '48px 32px', borderRadius: '32px', textAlign: 'center',
              transition: 'var(--transition)', cursor: 'default', position: 'relative', zIndex: 1,
              border: '1px solid var(--glass-border)'
            }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                width: '80px', height: '80px', borderRadius: '24px',
                background: `rgba(255,255,255,0.03)`, border: `1px solid ${step.color}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 32px', color: step.color,
                boxShadow: `0 10px 30px ${step.color}11`
              }}>
                {step.icon}
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', fontWeight: '800' }}>{step.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>{step.desc}</p>

              <div style={{
                marginTop: '24px', fontSize: '0.8rem', fontWeight: '900',
                color: 'var(--accent)', opacity: 0.3
              }}>0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 1024px) {
          .workflow-line { display: block !important; }
        }
      `}</style>
    </section>
  );
};

export default ModernWorkflow;
