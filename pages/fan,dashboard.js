import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Get current session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
  }, []);

  // Load / upsert user row, then fetch balances
  useEffect(() => {
    const run = async () => {
      if (!session) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Ensure a row exists in "users" for this auth user
      await supabase.from("users").upsert(
        { id: user.id, email: user.email, role: "fan" },
        { onConflict: "id" }
      );

      const { data, error } = await supabase
        .from("users")
        .select("email, username, coins, wish_points, role, created_at")
        .eq("id", user.id)
        .single();

      if (error) setMsg(error.message);
      else setProfile(data);
      setLoading(false);
    };
    run();
  }, [session]);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (!session) {
    return (
      <main style={s.wrap}>
        <h1 style={s.h1}>NexLive™</h1>
        <p>Please <a href="/">log in</a> to view your dashboard.</p>
      </main>
    );
  }

  return (
    <main style={s.wrap}>
      <h1 style={s.h1}>Fan Dashboard</h1>

      {loading && <p>Loading...</p>}

      {profile && (
        <>
          <div style={s.cards}>
            <div style={s.card}>
              <div style={s.label}>Coins</div>
              <div style={s.value}>{profile.coins ?? 0}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>Wish Points</div>
              <div style={s.value}>{profile.wish_points ?? 0}</div>
            </div>
            <div style={s.card}>
              <div style={s.label}>Status</div>
              <div style={s.value}>{profile.role || "fan"}</div>
            </div>
          </div>

          <div style={s.actions}>
            <a href="/games/whack" style={s.btn}>▶ Play Whack-a-Wish</a>
            <a href="/games/highlow" style={s.btn}>♠ Play High-Low</a>
            <a href="/store" style={s.btn}>🛍️ Rewards Store</a>
          </div>
        </>
      )}

      {msg && <p style={{color:"#7db7ff"}}>{msg}</p>}

      <button onClick={logout} style={s.outline}>Logout</button>
    </main>
  );
}

const s = {
  wrap:{minHeight:"100vh",background:"#0a0a0a",color:"#fff",display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",gap:18,fontFamily:"Inter,system-ui,sans-serif",
        padding:24,textAlign:"center"},
  h1:{margin:0,textShadow:"0 2px 16px rgba(103,182,255,.25)"},
  cards:{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"},
  card:{background:"rgba(255,255,255,.04)",border:"1px solid rgba(255,255,255,.09)",
        borderRadius:14,padding:"16px 22px",minWidth:140},
  label:{opacity:.7,fontSize:12,letterSpacing:1,textTransform:"uppercase"},
  value:{fontSize:28,fontWeight:800,marginTop:6},
  actions:{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginTop:16},
  btn:{padding:"10px 14px",borderRadius:12,background:"#fff",color:"#000",textDecoration:"none",fontWeight:700},
  outline:{marginTop:16,padding:"10px 14px",borderRadius:12,background:"transparent",
           color:"#fff",border:"1px solid rgba(255,255,255,.25)"}
};

        
