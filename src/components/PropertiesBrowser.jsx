'use client';
import React, { useState } from 'react';
import FeaturedProperties from './FeaturedProperties';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Search, Grid, Map as MapIcon, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <div style={{ height: '500px', width: '100%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '24px' }}>Loading Map...</div>
});

const PropertiesBrowser = ({ initialProperties }) => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialPrice = searchParams.get('priceRange') || 'All Prices';

  const [type, setType] = useState('All Types');
  const [priceRange, setPriceRange] = useState(initialPrice);
  const [search, setSearch] = useState(initialSearch);
  const [view, setView] = useState('grid'); // 'grid' or 'map'

  const filteredProperties = initialProperties.filter(p => {
    const matchesType = type === 'All Types' || p.type === type;
    const matchesSearch = p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());

    let matchesPrice = true;
    if (priceRange === '$500 - $2000') matchesPrice = p.price >= 500 && p.price <= 2000;
    else if (priceRange === '$2000 - $5000') matchesPrice = p.price > 2000 && p.price <= 5000;
    else if (priceRange === '$5000+') matchesPrice = p.price > 5000;

    return matchesType && matchesSearch && matchesPrice;
  });

  return (
    <>
      <div className="glass-card" style={{ marginBottom: '40px', padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>

          <div style={{ flex: 2, minWidth: '300px', position: 'relative' }}>
            <Search size={18} color="var(--accent)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by city, area, or property name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '14px 14px 14px 48px',
                background: 'rgba(255,255,255,0.03)', color: 'var(--text-main)',
                border: '1px solid var(--glass-border)', borderRadius: '12px',
                outline: 'none', fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
            <Filter size={14} color="var(--accent)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              style={{
                width: '100%', padding: '12px 12px 12px 36px',
                background: 'rgba(255,255,255,0.03)', color: 'var(--text-main)',
                border: '1px solid var(--glass-border)', borderRadius: '12px',
                outline: 'none', cursor: 'pointer', appearance: 'none'
              }}
            >
              <option>All Types</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>House</option>
              <option>Office</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
          </div>

          <div style={{ flex: 1, minWidth: '180px', position: 'relative' }}>
            <SlidersHorizontal size={14} color="var(--accent)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={{
                width: '100%', padding: '12px 12px 12px 36px',
                background: 'rgba(255,255,255,0.03)', color: 'var(--text-main)',
                border: '1px solid var(--glass-border)', borderRadius: '12px',
                outline: 'none', cursor: 'pointer', appearance: 'none'
              }}
            >
              <option>All Prices</option>
              <option>$500 - $2000</option>
              <option>$2000 - $5000</option>
              <option>$5000+</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.5 }} />
          </div>

          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <button
              onClick={() => setView('grid')}
              style={{
                padding: '8px 16px', background: view === 'grid' ? 'var(--accent)' : 'transparent',
                color: view === 'grid' ? 'var(--bg-main)' : 'var(--text-muted)',
                borderRadius: '8px', fontWeight: '700', cursor: 'pointer', border: 'none',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition)'
              }}
            >
              <Grid size={18} /> Grid
            </button>
            <button
              onClick={() => setView('map')}
              style={{
                padding: '8px 16px', background: view === 'map' ? 'var(--accent)' : 'transparent',
                color: view === 'map' ? 'var(--bg-main)' : 'var(--text-muted)',
                borderRadius: '8px', fontWeight: '700', cursor: 'pointer', border: 'none',
                display: 'flex', alignItems: 'center', gap: '8px', transition: 'var(--transition)'
              }}
            >
              <MapIcon size={18} /> Map
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Showing <strong>{filteredProperties.length}</strong> premium properties
        </p>
        <div style={{ height: '1px', flex: 1, background: 'var(--glass-border)', margin: '0 24px' }}></div>
      </div>

      {view === 'grid' ? (
        <FeaturedProperties properties={filteredProperties} />
      ) : (
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px' }}>
          <PropertyMap properties={filteredProperties} />
        </div>
      )}
    </>
  );
};

export default PropertiesBrowser;
