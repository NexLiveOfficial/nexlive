// pages/index.js

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#05060a',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          padding: '32px 40px',
          borderRadius: '18px',
          background: 'radial-gradient(circle at top, #101524 0, #05060a 55%)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.75)',
          maxWidth: '420px',
          width: '100%',
          textAlign: 'center',
          border: '1px solid rgba(148, 208, 255, 0.15)',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            marginBottom: '8px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#9ad0ff',
          }}
        >
          NexLive™
        </h1>

        <p style={{ fontSize: '14px', opacity: 0.9, marginBottom: '24px' }}>
          Where Fans Meet Stars, Live.
        </p>

        <p style={{ fontSize: '15px', marginBottom: '28px', lineHeight: 1.5 }}>
          Choose how you want to enter:
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
          <a
            href="/signup"
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: 'none',
              textDecoration: 'none',
              background: '#f8d47b',
              color: '#1a1300',
              fontWeight: 600,
              fontSize: '14px',
              boxShadow: '0 8px 18px rgba(0,0,0,0.65)',
            }}
          >
            Sign Up
          </a>
          <a
            href="/login"
            style={{
              padding: '10px 18px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.35)',
              textDecoration: 'none',
              background: 'transparent',
              color: '#ffffff',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            Log In
          </a>
        </div>

        <p style={{ fontSize: '12px', opacity: 0.75, marginBottom: '10px' }}>
          Creator or fan, your journey starts here.
        </p>

        <p style={{ fontSize: '11px', opacity: 0.6 }}>
          Demo dashboards and games will be available after login.
        </p>
      </div>
    </main>
  );
}
