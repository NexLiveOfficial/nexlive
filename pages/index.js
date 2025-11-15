// pages/index.js
import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';

export default function Home() {
  const [mode, setMode] = useState(null); // 'login' | 'signup' | 'demo'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // If already logged in, go straight to dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) {
        window.location.href = '/dashboard';
      }
    });
  }, []);

  // Keyboard shortcuts: L = login, S = signup, D = demo
  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'l') setMode('login');
      if (key === 's') setMode('signup');
      if (key === 'd') setMode('demo');
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setMsg('');

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMsg(error.message);
      return;
    }

    setMsg('Signup successful! Check your email to confirm your account.');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMsg(error.message);
      return;
    }

    window.location.href = '/dashboard';
  };

  return (
    <main className="center">
      <div className="card">
        <h1 className="title">NexLive™</h1>
        <p className="subtitle">
          Where Fans Meet Stars, <strong>Live</strong>.
        </p>

        {/* Main buttons */}
        <div className="row" style={{ marginTop: 16, marginBottom: 8 }}>
          <button className="btn btnPrimary" onClick={() => setMode('login')}>
            Log In
          </button>
          <button className="btn btnPrimary" onClick={() => setMode('signup')}>
            Sign Up
          </button>
          <button className="btn btnPrimary" onClick={() => setMode('demo')}>
            Demo Mode
          </button>
        </div>

        {/* Keyboard shortcut badges */}
        <div className="badgeRow">
          <div className="badge">L = Login</div>
          <div className="badge">S = Sign Up</div>
          <div className="badge">D = Demo</div>
        </div>

        {/* Forms */}
        {mode === 'login' && (
          <form className="form" onSubmit={handleLogin}>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="row">
              <button className="btn btnPrimary" type="submit">
                Enter NexLive
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setMode(null);
                  setMsg('');
                }}
              >
                Cancel
              </button>
            </div>

            <div className="help">
              Trouble logging in? Make sure you confirmed your email.
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form className="form" onSubmit={handleSignup}>
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="input"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="row">
              <button className="btn btnPrimary" type="submit">
                Create Account
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setMode(null);
                  setMsg('');
                }}
              >
                Cancel
              </button>
            </div>

            <div className="help">
              You&apos;ll receive a confirmation email to activate your account.
            </div>
          </form>
        )}

        {mode === 'demo' && (
          <div className="help" style={{ marginTop: 10 }}>
            Demo mode will preview the dashboards and games UI without saving data.
            <div className="row" style={{ marginTop: 12 }}>
              <a className="btn btnPrimary" href="/dashboard">
                Open Demo
              </a>
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setMode(null);
                  setMsg('');
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Status message */}
        {msg && (
          <p className="help" style={{ color: '#89c6ff', marginTop: 12 }}>
            {msg}
          </p>
        )}
      </div>
    </main>
  );
}
