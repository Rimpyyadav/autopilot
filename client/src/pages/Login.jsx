import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from '../utils/axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
  }

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '2rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
          />
        </div>
        <div>
            
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px' }}>
          Login
        </button>

        <div style={{ marginTop: '16px', textAlign: 'center' }}>
  <a href="http://localhost:5000/api/auth/google">
    <button type="button" style={{ width: '100%', padding: '10px' }}>
      Login with Google
    </button>
  </a>
</div>
      </form>
      <p>No account? <Link to="/register">Register</Link></p>
    </div>
  )
}

export default Login