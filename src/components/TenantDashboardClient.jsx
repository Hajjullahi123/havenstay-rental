'use client';
import React, { useState } from 'react';
import FeaturedProperties from './FeaturedProperties';
import Link from 'next/link';

const TenantDashboardClient = ({ bookings, favorites }) => {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <>
      <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', marginBottom: '32px' }}>
        <button
          onClick={() => setActiveTab('bookings')}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            border: 'none',
            color: activeTab === 'bookings' ? 'var(--accent)' : 'var(--text-muted)',
            borderBottom: activeTab === 'bookings' ? '2px solid var(--accent)' : 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          My Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          style={{
            padding: '16px 32px',
            background: 'transparent',
            border: 'none',
            color: activeTab === 'saved' ? 'var(--accent)' : 'var(--text-muted)',
            borderBottom: activeTab === 'saved' ? '2px solid var(--accent)' : 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'var(--transition)'
          }}
        >
          Saved Properties ({favorites.length})
        </button>
      </div>

      {activeTab === 'bookings' ? (
        bookings.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>You haven't made any bookings yet.</p>
            <Link href="/properties" style={{ color: 'var(--accent)', fontWeight: '600' }}>Browse Properties</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bookings.map((booking) => (
              <div key={booking.id} className="glass-card" style={{ display: 'flex', gap: '24px', padding: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
                <img src={booking.property.image} alt={booking.property.title} style={{ width: '120px', height: '120px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ flex: 2, minWidth: '200px' }}>
                  <h3 style={{ marginBottom: '8px' }}>{booking.property.title}</h3>
                  <div style={{ display: 'flex', gap: '20px', fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span><strong>IN:</strong> {new Date(booking.checkIn).toLocaleDateString()}</span>
                    {booking.checkOut && <span><strong>OUT:</strong> {new Date(booking.checkOut).toLocaleDateString()}</span>}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Payment: {booking.payment?.method === 'online' ? 'Digital Card' : 'Bank Transfer'}</p>
                </div>
                <div style={{ flex: 1, textAlign: 'right', minWidth: '150px' }}>
                  <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent)', marginBottom: '8px' }}>${booking.amount.toLocaleString()}</p>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    background: booking.payment?.status === 'VERIFIED' ? 'rgba(74, 222, 128, 0.1)' : 'rgba(212, 175, 55, 0.1)',
                    color: booking.payment?.status === 'VERIFIED' ? '#4ade80' : 'var(--accent)',
                    border: `1px solid ${booking.payment?.status === 'VERIFIED' ? '#4ade8033' : '#d4af3733'}`
                  }}>{booking.payment?.status || 'PENDING'}</span>
                </div>
                <div style={{ marginLeft: '20px' }}>
                  <Link href={`/property/${booking.propertyId}`} style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>→</Link>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        favorites.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>You haven't saved any properties yet.</p>
            <Link href="/properties" style={{ color: 'var(--accent)', fontWeight: '600' }}>Find a home to love</Link>
          </div>
        ) : (
          <FeaturedProperties properties={favorites.map(f => f.property)} />
        )
      )}
    </>
  );
};

export default TenantDashboardClient;
