'use client';
import React from 'react';

const SkeletonPropertyCard = () => {
  return (
    <div className="glass-card" style={{ padding: '0', overflow: 'hidden', height: '450px', background: 'rgba(255,255,255,0.02)' }}>
      <div style={{ height: '240px', background: 'rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }} className="skeleton-pulse"></div>
      <div style={{ padding: '24px' }}>
        <div style={{ height: '24px', width: '70%', background: 'rgba(255,255,255,0.05)', marginBottom: '16px', borderRadius: '4px' }} className="skeleton-pulse"></div>
        <div style={{ height: '16px', width: '40%', background: 'rgba(255,255,255,0.03)', marginBottom: '24px', borderRadius: '4px' }} className="skeleton-pulse"></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: '16px' }}>
          <div style={{ height: '16px', width: '20%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="skeleton-pulse"></div>
          <div style={{ height: '16px', width: '20%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="skeleton-pulse"></div>
          <div style={{ height: '16px', width: '20%', background: 'rgba(255,255,255,0.03)', borderRadius: '4px' }} className="skeleton-pulse"></div>
        </div>
        <div style={{ height: '44px', width: '100%', background: 'rgba(255,255,255,0.05)', marginTop: '20px', borderRadius: '8px' }} className="skeleton-pulse"></div>
      </div>
      <style jsx>{`
        .skeleton-pulse {
          animation: pulse 1.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.3; }
          100% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default SkeletonPropertyCard;
