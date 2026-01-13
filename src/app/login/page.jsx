'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

const LoginContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get('registered');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password');
      setLoading(false);
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Welcome <span style={{ color: 'var(--accent)' }}>Back</span></h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Sign in to manage your rentals</p>

        {registered && <div style={{ background: 'rgba(74, 222, 128, 0.1)', color: '#4ade80', padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center', fontSize: '0.9rem' }}>Account created! Please sign in.</div>}
        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>EMAIL ADDRESS</label>
            <input
              type="email" required value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px' }}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>PASSWORD</label>
            <input
              type="password" required value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px' }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{ width: '100%', padding: '16px', background: 'var(--accent)', color: 'var(--bg-main)', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', marginTop: '12px' }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Don't have an account? <Link href="/register" style={{ color: 'var(--accent)', fontWeight: '600' }}>Create one</Link>
        </p>
      </div>
    </div>
  );
};

const LoginPage = () => {
  return (
    <Suspense fallback={<div style={{ paddingTop: '160px', textAlign: 'center' }}>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
