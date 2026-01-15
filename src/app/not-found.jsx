'use client';
import React from 'react';
import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
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
      <div style={{
        width: '120px',
        height: '120px',
        background: 'rgba(212, 175, 55, 0.1)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '32px'
      }}>
        <AlertTriangle size={60} color="var(--accent)" />
      </div>
      <h1 style={{ fontSize: '4rem', marginBottom: '16px', fontWeight: '900' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '500px' }}>
        The luxury suite you're looking for seems to have been moved or doesn't exist.
      </h2>
      <Link href="/" style={{
        padding: '16px 32px',
        background: 'var(--accent)',
        color: 'var(--bg-main)',
        borderRadius: '12px',
        textDecoration: 'none',
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        transition: 'var(--transition)'
      }}>
        <Home size={20} /> Back to HavenStay
      </Link>
    </div>
  );
}
