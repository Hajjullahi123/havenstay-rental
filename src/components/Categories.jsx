import { Building2, Home, Briefcase, Landmark } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'Apartments', count: '120+', icon: <Building2 size={40} /> },
    { name: 'Villas', count: '45+', icon: <Landmark size={40} /> },
    { name: 'Offices', count: '25+', icon: <Briefcase size={40} /> },
    { name: 'Houses', count: '10+', icon: <Home size={40} /> },
  ];

  return (
    <section style={{ padding: '0 5% 80px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px'
      }}>
        {categories.map((cat, index) => (
          <div key={index} className="glass-card" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <div style={{ color: 'var(--accent)', marginBottom: '16px' }}>{cat.icon}</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{cat.name}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{cat.count} listings</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
