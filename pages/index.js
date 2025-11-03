import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')

  const handleSignUp = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) setMessage(error.message)
    else setMessage('Signup successful! Check your email.')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
    else setUser(data.user)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setMessage('You have logged out.')
  }

  return (
    <div style={{
      backgroundColor: '#0a0a0a',
      color: 'white',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1>NexLive™ Login</h1>
      {!user ? (
        <form style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ margin: '5px', padding: '10px', borderRadius: '5px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: '5px', padding: '10px', borderRadius: '5px' }}
          />
          <button onClick={handleSignUp} style={{ margin: '5px', padding: '10px' }}>
            Sign Up
          </button>
          <button onClick={handleLogin} style={{ margin: '5px', padding: '10px' }}>
            Login
          </button>
        </form>
      ) : (
        <>
          <h3>Welcome, {user.email}</h3>
          <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px' }}>
            Logout
          </button>
        </>
      )}
      <p style={{ marginTop: '20px', color: '#09f' }}>{message}</p>
    </div>
  )
}
