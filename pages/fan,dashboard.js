import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [msg, setMsg] = useState('');

  // redirect if logged out
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) window.location.href = '/';
      setUser(data.session?.user ?? null);
    });
  }, []);

  // ensure row exists + fetch balances
  useEffect(() => {
    const run = async () => {
      if (!user) return;
      // make sure a users-row exists for this account
      await supabase.from('users').upsert(
        { id: user.id, email: user.email, role: 'fan' },
        { onConflict: 'id' }
      );

      const { data, error } = await supabase
        .from('users')
        .select('email, username, coins, wish_points, role, created_at')
        .eq('id', user.id)
        .single();

      if (error) setMsg(error.message);
      else setProfile(data);
      setLoading(false);
    };
    run();
  }, [user]);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <main style={s.wrap}>
      <h1 style={s.h1}>Fan Dashboard</h1>
      {loading && <p>Loading…</p>}
      {profile && (
        <>
          <p style={s.muted}>{profile.email}</p>
          <div style={s.row}>
            <div style={s.card}><div style={s.label}>Coins</div><div style={s.val}>{profile.coins ?? 0}</div></div>
            <div style={s.card}><div style={s.label}>Wish Points</div><div style={s.val}>{profile.wish_points ?? 0}</div></div>
            <div style={s.card}><div style={s.label}>Status</div><div style={s.val}>{profile.role || 'fan'}</div></div>
          </div>

          <div style={s.actions}>
            <a href="/games/whack" style={s.btn}>▶ Play Whack-a-Wish</a>
            <a href="/games/highlow" style={s.btn}>♠ Play High-Low</a>
            <a href="/store" style={s.btn}>🛍️ Rewards Store</a>
          </div>
        </>
      )}
      {msg && <p style={{color:'#89c6ff'}}>{msg}</p>}
      <button onClick={logout} style={s.outline}>Logout</button>
    </main>
  );
}

const s = {
  wrap:{minHeight:'100vh',background:'#0a0a0a',color:'#fff',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:16,fontFamily:'Inter,system-ui,sans-serif',padding:24,textAlign:'center'},
  h1:{fontSize:34,margin:0},
  muted:{opacity:.7,marginTop:4},
  row:{display:'flex',gap:14,flexWrap:'wrap',justifyContent:'center',marginTop:8},
  card:{background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:14,padding:'14px 18px',minWidth:140},
  label:{opacity:.7,fontSize:12,letterSpacing:1,textTransform:'uppercase'},
  val:{fontSize:28,fontWeight:800,marginTop:4},
  actions:{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginTop:16},
  btn:{padding:'10px 14px',borderRadius:12,background:'#fff',color:'#000',textDecoration:'none',fontWeight:700},
  outline:{marginTop:18,padding:'10px 14px',borderRadius:12,background:'transparent',color:'#fff',border:'1px solid rgba(255,255,255,.25)'}
};

