'use client';
import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { User, LogOut, Heart, LayoutDashboard, Home } from 'lucide-react';

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="glass" style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      height: '80px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 5%',
      zIndex: 1000,
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: 'var(--accent)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '900',
          color: 'var(--bg-main)',
          fontSize: '1.2rem'
        }}>H</div>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0, fontWeight: '800', letterSpacing: '-0.5px' }}>
          Haven<span style={{ color: 'var(--accent)' }}>Stay</span>
        </h2>
      </Link>

      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Home</Link>
        <Link href="/properties" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}>Properties</Link>
        {session && (
          <Link href="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500', fontSize: '0.95rem' }}>
            <LayoutDashboard size={18} /> Dashboard
          </Link>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {session ? (
          <>
            <Link href="/dashboard" style={{ color: 'var(--text-muted)', display: 'flex' }}>
              <Heart size={20} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <User size={18} color="var(--accent)" />
              <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>{session.user.name?.split(' ')[0] || 'User'}</span>
              <button
                onClick={() => signOut()}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  marginLeft: '8px',
                  padding: 0
                }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/login" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>Sign In</Link>
            <Link href="/login">
              <button style={{
                padding: '12px 24px',
                background: 'var(--accent)',
                color: 'var(--bg-main)',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(212, 175, 55, 0.2)'
              }}>Get Started</button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
