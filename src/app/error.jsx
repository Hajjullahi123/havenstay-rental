'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-main)',
      color: 'white',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '900' }}>Something went wrong</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '500px' }}>
        We encountered an error while loading this page. Our team has been notified.
      </p>
      <div style={{ display: 'flex', gap: '20px' }}>
        <button
          onClick={() => reset()}
          style={{
            padding: '16px 32px',
            background: 'var(--glass-border)',
            color: 'white',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <RefreshCcw size={20} /> Try Again
        </button>
        <Link href="/" style={{
          padding: '16px 32px',
          background: 'var(--accent)',
          color: 'var(--bg-main)',
          borderRadius: '12px',
          textDecoration: 'none',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Home size={20} /> Home
        </Link>
      </div>
    </div>
  );
}
