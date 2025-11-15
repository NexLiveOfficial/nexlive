import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Landing() {
  const [mode, setMode] = useState(null); // 'login' | 'signup' | 'demo'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    // If already logged in, go straight to dashboard
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) window.location.href = '/dashboard';
    });
  }, []);
  useEffect(() => {
  const onKey = (e) => {
    if (e.key.toLowerCase() === 'l') setMode('login');
    if (e.key.toLowerCase() === 'g') setMode('signup');
    if (e.key.toLowerCase() === 'd') setMode('demo');
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, []);

  const signUp = async (e) => {
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
    <div className="center">
      <div className="card">
        <h1 className="h1">NexLive™</h1>
        <p className="sub">
          <strong style={{color:'#a7c9ff'}}>Where Fans Meet Stars, Live</strong><br/>
          Live meetups, Golden Tickets, fan marketplace, and the Passport that levels you up.
        </p>

        {/* main buttons row */}
        <div className="row">
          <button className="btn btnPrimary" onClick={() => setMode('login')}>Log In</button>
          <button className="btn btnPrimary" onClick={() => setMode('signup')}>Sign Up</button>
          <button className="btn" onClick={() => setMode('demo')}>Demo Mode</button>
        </div>

        {/* secondary buttons */}
        <div className="row">
          <button className="btn">🎫 Golden Tickets</button>
          <button className="btn">🛍️ Fan Marketplace</button>
          <button className="btn">🧭 Fan Passport XP</button>
        </div>

        {/* small badges like your prototype */}
        <div className="badgeRow">
          <div className="badge">Shortcuts: L = Login</div>
          <div className="badge">G = Sign Up</div>
          <div className="badge">D = Demo</div>
        </div>

        {/* forms zone */}
        {mode && <div className="divider" />}

        {mode === 'login' && (
          <form className="form" onSubmit={login}>
            <input className="input" type="email" placeholder="Email" value={email}
                   onChange={(e)=>setEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} />
            <div className="row">
              <button className="btn btnPrimary" type="submit">Enter NexLive</button>
              <button className="btn" type="button" onClick={()=>setMode(null)}>Cancel</button>
            </div>
            <div className="help">Trouble logging in? Make sure you confirmed your email.</div>
          </form>
        )}

        {mode === 'signup' && (
          <form className="form" onSubmit={signUp}>
            <input className="input" type="email" placeholder="Email" value={email}
                   onChange={(e)=>setEmail(e.target.value)} />
            <input className="input" type="password" placeholder="Create a password" value={password}
                   onChange={(e)=>setPassword(e.target.value)} />
            <div className="row">
              <button className="btn btnPrimary" type="submit">Create Account</button>
              <button className="btn" type="button" onClick={()=>setMode(null)}>Cancel</button>
            </div>
            <div className="help">You’ll receive a confirmation email to activate your account.</div>
          </form>
        )}

        {mode === 'demo' && (
          <div className="help">
            Demo mode will preview the dashboards and games UI without saving data.
            <div className="row" style={{marginTop:10}}>
              <a className="btn btnPrimary" href="/dashboard">Open Demo</a>
              <button className="btn" onClick={()=>setMode(null)}>Close</button>
            </div>
          </div>
        )}

        {msg && <p className="help" style={{color:'#89c6ff'}}>{msg}</p>}

        <div className="footer">© {new Date().getFullYear()} NexLive™ • All rights reserved</div>
      </div>
    </div>
  );
}
export default function Home() {
  return (
    <main style={{minHeight:'100vh',display:'grid',placeItems:'center',background:'#0b0b0e',color:'#fff'}}>
      <div>
        <h1 style={{textAlign:'center',color:'#9ad0ff'}}>NexLive™</h1>
        <p style={{textAlign:'center'}}>Welcome! Choose an option:</p>
        <p style={{textAlign:'center'}}>
          <a href="/signup" style={{marginRight:16}}>Sign Up</a>
          <a href="/login">Log In</a>
        </p>
      </div>
    </main>
  );
}

