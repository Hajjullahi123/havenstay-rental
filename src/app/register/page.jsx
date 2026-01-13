'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/login?registered=true');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '160px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', paddingLeft: '5%', paddingRight: '5%' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '40px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '8px', textAlign: 'center' }}>Join <span style={{ color: 'var(--accent)' }}>HavenStay</span></h1>
        <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '32px' }}>Create an account to start booking</p>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>FULL NAME</label>
            <input
              name="name" type="text" required value={formData.name} onChange={handleChange}
              style={{ width: '100%', padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px' }}
              placeholder="John Doe"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>EMAIL ADDRESS</label>
            <input
              name="email" type="email" required value={formData.email} onChange={handleChange}
              style={{ width: '100%', padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px' }}
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>PASSWORD</label>
            <input
              name="password" type="password" required value={formData.password} onChange={handleChange}
              style={{ width: '100%', padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px' }}
              placeholder="••••••••"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>CONFIRM PASSWORD</label>
            <input
              name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange}
              style={{ width: '100%', padding: '14px', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', borderRadius: '12px' }}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit" disabled={loading}
            style={{ width: '100%', padding: '16px', background: 'var(--accent)', color: 'var(--bg-main)', borderRadius: '12px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', marginTop: '12px' }}
          >
            {loading ? 'Creating Account...' : 'Register Now'}
          </button>
        </form>

        <p style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--accent)', fontWeight: '600' }}>Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
