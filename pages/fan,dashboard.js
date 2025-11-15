// pages/fan_dashboard.js

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function FanDashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // Fake numbers for now – just UI
  const [coins, setCoins] = useState(250);
  const [wishPoints, setWishPoints] = useState(40);
  const [level, setLevel] = useState(3);

  useEffect(() => {
    // Get logged-in user, otherwise kick back to login
    const loadUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        // Not logged in → go back to landing/login
        window.location.href = '/';
        return;
      }

      setUserEmail(user.email || '');
      setLoading(false);
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="center">
        <div className="card">
          <h1 className="h1">NexLive™ Fan Dashboard</h1>
          <p className="sub">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header className="dashHeader">
        <div>
          <h1 className="h1">NexLive™ Fan Dashboard</h1>
          <p className="sub">Welcome back, {userEmail}</p>
        </div>
        <button
          className="btn"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = '/';
          }}
        >
          Log Out
        </button>
      </header>

      <section className="statsRow">
        <div className="statCard">
          <h2>Coins</h2>
          <p className="bigNumber">{coins}</p>
          <button
            className="btn btnPrimary"
            onClick={() => setCoins((c) => c + 20)}
          >
            + Buy 20 Coins (demo)
          </button>
        </div>

        <div className="statCard">
          <h2>Wish Points</h2>
          <p className="bigNumber">{wishPoints}</p>
          <p className="smallText">Earned from Wishes & Golden Tickets</p>
        </div>

        <div className="statCard">
          <h2>Fan Level</h2>
          <p className="bigNumber">LVL {level}</p>
          <p className="smallText">Passport XP status</p>
        </div>
      </section>

      <section className="panelRow">
        <div className="panel">
          <h2>Wish Button</h2>
          <p className="smallText">
            Use your coins to request live meetups, shoutouts, Q&amp;As and more.
          </p>
          <button className="btn btnPrimary">Open Wish Panel (soon)</button>
        </div>

        <div className="panel">
          <h2>Golden Tickets</h2>
          <p className="smallText">
            Track your entries for VIP meet-and-greets and exclusive events.
          </p>
          <button className="btn">View Tickets (demo)</button>
        </div>

        <div className="panel">
          <h2>Fan Marketplace</h2>
          <p className="smallText">
            Buy and sell fan merch, collectibles and creator drops.
          </p>
          <button className="btn">Enter Marketplace (demo)</button>
        </div>
      </section>
    </div>
  );
}
