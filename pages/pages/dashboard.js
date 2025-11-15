import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './lib/supabaseClient'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.user) {
        router.replace('/login')
        return
      }
      setUser(session.user)
      setLoading(false)
    }
    load()

    // Keep session synced (optional)
    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session?.user) router.replace('/login')
    })
    return () => sub?.subscription?.unsubscribe()
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (loading) {
    return <div style={{color:'#fff',background:'#0b0b0e',minHeight:'100vh',display:'grid',placeItems:'center'}}>Loading…</div>
  }

  return (
    <main style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome, {user.email}</h1>
        <p style={styles.muted}>This is your NexLive™ dashboard.</p>

        <div style={styles.row}>
          <a href="/games/whack" style={styles.tile}>🎮 Play Whack</a>
          <a href="/games/highlow" style={styles.tile}>🎲 Play High-Low</a>
          <a href="/store" style={styles.tile}>💰 Buy Coins</a>
          <a href="/wish" style={styles.tile}>🌟 Make a Wish</a>
        </div>

        <button onClick={signOut} style={styles.signout}>Sign out</button>
      </div>
    </main>
  )
}

const styles = {
  wrap: { minHeight: '100vh', background: '#0b0b0e', display: 'grid', placeItems: 'center', padding: 24, color:'#fff' },
  card: { width: '100%', maxWidth: 960, background: '#14141a', borderRadius: 16, padding: 24, boxShadow: '0 8px 40px rgba(0,0,0,.45)' },
  title: { margin: 0, marginBottom: 8, fontSize: 24, color: '#9ad0ff' },
  muted: { color: '#9aa0a6', marginBottom: 16 },
  row: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 8 },
  tile: { display: 'block', padding: 16, borderRadius: 12, background: '#0f0f14', border: '1px solid #2a2a35', color: '#fff', textDecoration: 'none', textAlign: 'center' },
  signout: { marginTop: 20, padding: '10px 14px', borderRadius: 10, background: '#2a2a35', color:'#fff', border:'1px solid #3a3a45', cursor:'pointer' },
}
