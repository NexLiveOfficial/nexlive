import { useState, useEffect } from 'react';
import { supabase } from './lib/supabaseClient';

export default function Home() {
  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'demo'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  // If already logged in, go straight to dashboard
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) window.location.href = '/dashboard';
    });
  }, []);

  // Keyboard shortcuts: L = login, G = signup, D = demo
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key.toLowerCase();
      if (k === 'l') setMode('login');
      if (k === 'g') setMode('signup');
      if (k === 'd') setMode('demo');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const signup = async (e) => {
    e.preventDefault();
    setMsg('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    setMsg('Signup successful! Check your email to confirm.');
  };

  const login = async (e) => {
    e.preventDefault();
    setMsg('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    window.location.href = '/dashboard';
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: '#050b16',
        color: '#f5f5f5',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div
        style={{
          padding: '32px 40px',
          borderRadius: '16px',
          background: 'rgba(0,0,0,0.7)',
          boxShadow: '0 0 40px rgba(0,0,0,0.8)',
          width: '90%',
          maxWidth: '420px',
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: 8 }}>NexLive™ Login</h1>
        <p style={{ textAlign: 'center', fontSize: 14, color: '#9ad0ff', marginBottom: 16 }}>
          Where Fans Meet Stars, Live.
        </p>

        {/* main buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <button
            style={{ flex: 1 }}
            className="btn btnPrimary"
            onClick={() => setMode('login')}
          >
            Log In
          </button>
          <button
            style={{ flex: 1 }}
            className="btn btnPrimary"
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
          <button
            style={{ flex: 1 }}
            className="btn btnPrimary"
            onClick={() => setMode('demo')}
          >
            Demo
          </button>
        </div>

        {/* shortcut badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, fontSize: 12 }}>
          <div style={{ flex: 1 }}>Shortcut: L = Login</div>
          <div style={{ flex: 1 }}>G = Sign Up</div>
          <div style={{ flex: 1 }}>D = Demo</div>
        </div>

        {/* forms */}
        {mode === 'login' && (
          <form className="form" onSubmit={login}>
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
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btnPrimary" type="submit">
                Enter NexLive
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setMode(null)}
              >
                Cancel
              </button>
            </div>
            <div className="help" style={{ marginTop: 8, fontSize: 12 }}>
              Trouble logging in? Make sure you confirmed your email.
            </div>
          </form>
        )}

        {mode === 'signup' && (
          <form className="form" onSubmit={signup}>
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
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button className="btn btnPrimary" type="submit">
                Create Account
              </button>
              <button
                className="btn"
                type="button"
                onClick={() => setMode(null)}
              >
                Cancel
              </button>
            </div>
            <div className="help" style={{ marginTop: 8, fontSize: 12 }}>
              You&apos;ll receive a confirmation email to activate your account.
            </div>
          </form>
        )}

        {mode === 'demo' && (
          <div style={{ marginTop: 12, fontSize: 14 }}>
            <div className="help" style={{ marginBottom: 8 }}>
              Demo mode will preview the dashboards and games UI without saving data.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <a className="btn btnPrimary" href="/dashboard">
                Open Demo
              </a>
              <button className="btn" onClick={() => setMode(null)}>
                Close
              </button>
            </div>
          </div>
        )}

        {msg && (
          <p
            style={{
              marginTop: 12,
              fontSize: 13,
              color: '#49c6ff',
            }}
          >
            {msg}
          </p>
        )}
      </div>
    </main>
  );
}
