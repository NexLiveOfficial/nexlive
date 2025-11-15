import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data?.session) {
        // Not logged in – send back to login
        window.location.href = '/login';
        return;
      }

      setUser(data.session.user);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          background: '#05060a',
          color: '#ffffff',
        }}
      >
        <p style={{ opacity: 0.8 }}>Loading your NexLive dashboard…</p>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#05060a',
        color: '#ffffff',
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          padding: '28px 32px',
          borderRadius: '18px',
          background: 'radial-gradient(circle at top, #101524 0, #05060a 55%)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.75)',
          maxWidth: '640px',
          width: '100%',
          border: '1px solid rgba(148, 208, 255, 0.15)',
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            marginBottom: '6px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9ad0ff',
          }}
        >
          NexLive™ Fan Dashboard
        </h1>

        <p style={{ fontSize: '13px', opacity: 0.85, marginBottom: '16px' }}>
          Welcome, <strong>{user?.email}</strong>
        </p>

        <p style={{ fontSize: '14px', marginBottom: '20px', lineHeight: 1.6 }}>
          Play games, earn coins, and get ready for Golden Tickets, Fan
          Passport XP, and live meetups.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            marginBottom: '20px',
          }}
        >
          <a
            href="/games/highlow"
            style={cardStyle}
          >
            <h2 style={cardTitleStyle}>High / Low</h2>
            <p style={cardTextStyle}>Guess and win more NexCoins.</p>
          </a>

          <a
            href="/games/whack"
            style={cardStyle}
          >
            <h2 style={cardTitleStyle}>Whack Game</h2>
            <p style={cardTextStyle}>Fast tap action, higher scores.</p>
          </a>

          <div style={cardStyle}>
            <h2 style={cardTitleStyle}>Wish Button</h2>
            <p style={cardTextStyle}>
              Soon: spend coins to request your favorite creators.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', opacity: 0.7 }}>
          <span>Phase 1 • Prototype</span>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.href = '/';
            }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: '999px',
              padding: '4px 10px',
              color: '#ffffff',
              fontSize: '11px',
              cursor: 'pointer',
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </main>
  );
}

// Small inline style helpers
const cardStyle = {
  padding: '14px 16px',
  borderRadius: '14px',
  background: 'rgba(10, 16, 32, 0.95)',
  border: '1px solid rgba(148, 208, 255, 0.18)',
  textDecoration: 'none',
  color: '#ffffff',
};

const cardTitleStyle = {
  fontSize: '15px',
  marginBottom: '4px',
};

const cardTextStyle = {
  fontSize: '12px',
  opacity: 0.8,
};
