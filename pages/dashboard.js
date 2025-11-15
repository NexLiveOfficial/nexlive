// pages/dashboard.js

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [demoMode, setDemoMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Demo numbers for now
  const [coins, setCoins] = useState(250);
  const [goldenTickets, setGoldenTickets] = useState(2);
  const [passportXP, setPassportXP] = useState(1200);

  useEffect(() => {
    // Try to load logged-in user
    const loadUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!error && user) {
        setUserEmail(user.email || '');
        setDemoMode(false);
      } else {
        // No user → treat as demo dashboard
        setDemoMode(true);
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="center">
        <div className="card">
          <h1 className="h1">NexLive™ Dashboard</h1>
          <p className="sub">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <header className="dashHeader">
        <div>
          <h1 className="h1">NexLive™ Dashboard</h1>
          <p className="sub">
            {demoMode
              ? 'Demo mode – preview of the fan experience.'
              : `Signed in as ${userEmail}`}
          </p>
        </div>

        {!demoMode && (
          <button className="btn" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </header>

      <section className="statsRow">
        <div className="statCard">
          <h2>Coins</h2>
          <p className="bigNumber">{coins}</p>
          <p className="smallText">Use coins to send Wishes & enter events.</p>
          <button
            className="btn btnPrimary"
            onClick={() => setCoins((c) => c + 20)}
          >
            +20 Coins (demo)
          </button>
        </div>

        <div className="statCard">
          <h2>Golden Tickets</h2>
          <p className="bigNumber">{goldenTickets}</p>
          <p className="smallText">
            VIP entries for live meet-and-greets and special events.
          </p>
        </div>

        <div className="statCard">
          <h2>Passport XP</h2>
          <p className="bigNumber">{passportXP}</p>
          <p className="smallText">
            Your NexLive™ level. Higher XP = better perks.
          </p>
        </div>
      </section>

      <section className="panelRow">
        <div className="panel">
          <h2>Wish Button</h2>
          <p className="smallText">
            Request live moments with your favorite stars – Q&amp;A, shoutouts,
            meetups and more.
          </p>
          <button className="btn btnPrimary">Open Wish Panel (coming soon)</button>
        </div>

        <div className="panel">
          <h2>Fan Dashboard</h2>
          <p className="smallText">
            See your full fan profile, history, and market activity.
          </p>
          <a className="btn" href="/fan_dashboard">
            Go to Fan Dashboard
          </a>
        </div>

        <div className="panel">
          <h2>Marketplace</h2>
          <p className="smallText">
            Buy & sell fan merch, collectibles and creator drops.
          </p>
          <button className="btn">Explore Marketplace (demo)</button>
        </div>
      </section>
    </div>
  );
}
