import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 5%',
      background: 'var(--bg-main)'
    }}>
      <div style={{
        fontSize: '10rem',
        fontWeight: '900',
        color: 'var(--accent)',
        opacity: 0.1,
        position: 'absolute',
        zIndex: 0
      }}>404</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '24px' }}>Lost in <span style={{ color: 'var(--accent)' }}>Space?</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '500px', marginBottom: '40px' }}>
          It seems the luxury sanctuary you are looking for has moved or never existed. Let's get you back on track.
        </p>
        <Link href="/" style={{
          padding: '16px 40px',
          background: 'var(--accent)',
          color: 'var(--bg-main)',
          borderRadius: '16px',
          fontWeight: '800',
          textDecoration: 'none',
          boxShadow: '0 10px 20px rgba(212, 175, 55, 0.2)'
        }}>
          Return to Reality
        </Link>
      </div>
    </div>
  );
}
