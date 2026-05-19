import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid'
    if (!form.password.trim()) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!isLogin && !form.name.trim()) newErrors.name = 'Name is required'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      const url = isLogin
        ? 'http://localhost:5000/api/auth/login'
        : 'http://localhost:5000/api/auth/register'

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password }

      const res = await axios.post(url, payload)
      const { token, name, role } = res.data.data
      login(token, name, role)
      navigate('/')
    } catch (err) {
      setMessage(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: '450px' }}>
      <div className="d-flex mb-4 gap-2">
        <button className={`btn ${isLogin ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`btn ${!isLogin ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setIsLogin(false)}>Register</button>
      </div>

      <h3>{isLogin ? 'Login' : 'Create Account'}</h3>

      {message && <div className="alert alert-danger">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-success w-100">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Login