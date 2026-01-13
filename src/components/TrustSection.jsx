import { ShieldCheck, CreditCard, Headphones } from 'lucide-react';

const TrustSection = () => {
  const features = [
    { title: 'Verified Listings', desc: 'Every house in our catalog undergoes 20-point quality check.', icon: <ShieldCheck size={48} /> },
    { title: 'Secure Payments', desc: 'State of the art encryption for all your financial transactions.', icon: <CreditCard size={48} /> },
    { title: '24/7 Support', desc: 'Our agents are always online to help you find your next move.', icon: <Headphones size={48} /> },
  ];

  return (
    <section style={{ padding: '80px 5%', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {features.map((f, i) => (
          <div key={i} className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ color: 'var(--accent)', marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '16px', color: 'var(--text-main)' }}>{f.title}</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
