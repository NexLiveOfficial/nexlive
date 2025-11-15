import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from './lib/supabaseClient'

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          typeof window !== 'undefined'
            ? `${window.location.origin}/dashboard`
            : undefined,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    // If email confirmation is ON in Supabase, user must click the email link.
    // If it’s OFF, they’re immediately signed in and we can redirect.
    if (data?.session) {
      router.push('/dashboard')
    } else {
      setMessage('Check your email to confirm your account, then log in.')
    }
  }

  return (
    <main style={styles.wrap}>
      <div style={styles.card}>
        <h1 style={styles.title}>NexLive™ Sign Up</h1>

        <form onSubmit={handleSignup} style={styles.form}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button style={styles.button} disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.info}>{message}</p>}

        <p style={styles.muted}>
          Already have an account?{' '}
          <a href="/login" style={styles.link}>Log in</a>
        </p>
      </div>
    </main>
  )
}

const styles = {
  wrap: { minHeight: '100vh', background: '#0b0b0e', display: 'grid', placeItems: 'center', padding: 24 },
  card: { width: '100%', maxWidth: 420, background: '#14141a', borderRadius: 16, padding: 24, boxShadow: '0 8px 40px rgba(0,0,0,.45)', color: '#fff' },
  title: { margin: 0, marginBottom: 16, fontSize: 24, color: '#9ad0ff' },
  form: { display: 'grid', gap: 12 },
  input: { padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a35', background: '#0f0f14', color: '#fff' },
  button: { padding: '12px 14px', borderRadius: 10, border: '1px solid #2a2a35', background: '#1681ff', color: '#fff', cursor: 'pointer' },
  error: { marginTop: 10, color: '#ff6b6b' },
  info: { marginTop: 10, color: '#9ad0ff' },
  muted: { marginTop: 16, color: '#9aa0a6' },
  link: { color: '#9ad0ff', textDecoration: 'none' },
}
