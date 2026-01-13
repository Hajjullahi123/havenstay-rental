'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Heart } from 'lucide-react';
import SkeletonPropertyCard from './SkeletonPropertyCard';

const FeaturedProperties = ({ limit, properties: customProperties, isLoading }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);

  if (isLoading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {[...Array(limit || 3)].map((_, i) => <SkeletonPropertyCard key={i} />)}
      </div>
    );
  }

  let properties = customProperties || [];
  if (limit) properties = properties.slice(0, limit);

  useEffect(() => {
    if (session) {
      fetch('/api/favorites')
        .then(res => res.json())
        .then(data => setFavorites(data.map(f => f.propertyId)))
        .catch(err => console.error(err));
    }
  }, [session]);

  const toggleFavorite = async (e, propertyId) => {
    e.stopPropagation();
    if (!session) {
      router.push('/login');
      return;
    }

    try {
      const res = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId })
      });
      const data = await res.json();
      if (data.active) {
        setFavorites([...favorites, propertyId]);
      } else {
        setFavorites(favorites.filter(id => id !== propertyId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '30px'
    }}>
      {properties.map((property) => (
        <div key={property.id} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{
            height: '240px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <img
              src={property.image}
              alt={property.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 5
            }}>
              <button
                onClick={(e) => toggleFavorite(e, property.id)}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(4px)',
                  transition: 'var(--transition)'
                }}
              >
                <Heart
                  size={18}
                  fill={favorites.includes(property.id) ? '#ff4d4d' : 'transparent'}
                  color={favorites.includes(property.id) ? '#ff4d4d' : 'white'}
                />
              </button>
            </div>

            <div style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'var(--accent)',
              color: 'var(--bg-main)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.9rem'
            }}>
              {property.priceLabel}
            </div>
          </div>

          <div style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{property.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span> {property.location}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--glass-border)',
              paddingTop: '16px',
              color: 'var(--text-muted)',
              fontSize: '0.95rem'
            }}>
              <span>🛏️ {property.beds} Beds</span>
              <span>🚿 {property.baths} Baths</span>
              <span>📏 {property.area}</span>
            </div>

            <button style={{
              width: '100%',
              marginTop: '20px',
              padding: '12px',
              background: 'transparent',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
              onClick={() => router.push(`/property/${property.id}`)}
              onMouseOver={(e) => {
                e.target.style.background = 'var(--accent)';
                e.target.style.color = 'var(--bg-main)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = 'var(--accent)';
              }}
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProperties;
