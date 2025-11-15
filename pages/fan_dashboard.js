import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient';

export default function FanDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  // Protect route: only allow logged-in users
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        router.replace('/');
        return;
      }
      setUser(data.session.user);
      // Later we’ll fetch real coins from Supabase
      setCoins(250); // placeholder demo value
      setLoading(false);
    };
    load();
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  if (loading) {
    return (
      <main style={styles.wrap}>
        <div style={styles.card}>Loading your Fan Dashboard…</div>
      </main>
    );
  }

  return (
    <main style={styles.wrap}>
      <div style={styles.card}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>NexLive™ Fan Dashboard</h1>
            <p style={styles.subtitle}>
              Welcome, <strong>{user.email}</strong>
            </p>
          </div>
          <button onClick={signOut} style={styles.signOut}>
            Sign Out
          </button>
        </header>

        <section style={styles.grid}>
          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>💰 Coins</h2>
            <p style={styles.value}>{coins}</p>
            <p style={styles.textSmall}>Use coins to join events, wish, and play games.</p>
            <a href="/store" style={styles.linkButton}>Buy More Coins</a>
          </div>

          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>🌟 Wishes</h2>
            <p style={styles.textSmall}>
              Ask your favorite stars for shoutouts, Q&A sessions, and live meetups.
            </p>
            <a href="/wish" style={styles.linkButton}>Make a Wish</a>
          </div>

          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>🎮 Games</h2>
            <p style={styles.textSmall}>
              Play NexLive mini-games to win bonus coins and Golden Tickets.
            </p>
            <div style={styles.rowButtons}>
              <a href="/games/whack" style={styles.linkButton}>Play Whack</a>
              <a href="/games/highlow" style={styles.linkButton}>High-Low</a>
            </div>
          </div>

          <div style={styles.tile}>
            <h2 style={styles.tileTitle}>🎫 Golden Tickets</h2>
            <p style={styles.textSmall}>
              Track special entries that give you guaranteed attention from creators.
            </p>
            <a href="/golden_tickets" style={styles.linkButton}>View Tickets</a>
          </div>
        </section>

        <footer style={styles.footer}>
          © {new Date().getFullYear()} NexLive™ • Fan World • All rights reserved
        </footer>
      </div>
    </main>
  );
}

const styles = {
  wrap: {
    minHeight: '100vh',
    padding: '24px',
    background: 'radial-gradient(circle at top, #162447 0, #050816 55%, #000 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    color: '#f5f5f5',
  },
  card: {
    width: '100%',
    maxWidth: '1100px',
    background: 'rgba(6, 10, 25, 0.92)',
    borderRadius: '18px',
    padding: '20px 24px 24px',
    boxShadow: '0 18px 60px rgba(0,0,0,0.75)',
    border: '1px solid rgba(120, 180, 255, 0.25)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    gap: '12px',
  },
  title: { margin: 0, fontSize: '24px', color: '#9ad0ff' },
  subtitle: { margin: 0, fontSize: '14px', color: '#cfd8ff' },
  signOut: {
    padding: '8px 14px',
    borderRadius: '999px',
    border: '1px solid rgba(255,255,255,0.2)',
    background: 'rgba(0,0,0,0.4)',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '13px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
    gap: '14px',
    marginTop: '8px',
  },
  tile: {
    background: 'rgba(10, 14, 35, 0.95)',
    borderRadius: '14px',
    padding: '14px',
    border: '1px solid rgba(90, 120, 200, 0.35)',
  },
  tileTitle: {
    margin: 0,
    marginBottom: '6px',
    fontSize: '16px',
    color: '#e3eeff',
  },
  value: {
    fontSize: '28px',
    fontWeight: 700,
    margin: '6px 0',
    color: '#ffdd7f',
  },
  textSmall: {
    fontSize: '13px',
    color: '#b6c2ff',
    margin: '4px 0 10px',
  },
  linkButton: {
    display: 'inline-block',
    padding: '8px 12px',
    borderRadius: '999px',
    border: '1px solid rgba(155, 205, 255, 0.6)',
    textDecoration: 'none',
    fontSize: '13px',
    color: '#d9ecff',
    background: 'linear-gradient(135deg, rgba(60,120,255,0.7), rgba(66,210,255,0.5))',
  },
  rowButtons: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  footer: {
    marginTop: '18px',
    fontSize: '11px',
    color: '#8993c5',
    textAlign: 'right',
  },
};
