import { Link, useNavigate } from 'react-router-dom'
import { Gamepad2, LogOut, LogIn, ShieldCheck, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { token, name, isAdmin, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        <Gamepad2 size={18} className="me-2" />
        Game Store
      </Link>
      <div className="d-flex align-items-center">
        {token && (
          <span className="text-white me-3 d-flex align-items-center gap-1">
            <User size={16} /> {name}
          </span>
        )}
        <Link className="btn btn-outline-light me-2" to="/catalog">Browse Games</Link>
        <Link className="btn btn-outline-light me-2" to="/orders">My Orders</Link>

        {isAdmin && (
          <Link className="btn btn-warning me-2" to="/admin">
            <ShieldCheck size={16} className="me-1" /> Admin
          </Link>
        )}

        {token ? (
          <button
            className="btn btn-outline-light me-2"
            onClick={handleLogout}
            style={{ transition: 'all 0.2s' }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = 'red'
              e.target.style.borderColor = 'red'
              e.target.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.borderColor = 'white'
              e.target.style.color = 'white'
            }}
          >
            <LogOut size={16} className="me-1" /> Log Out
          </button>
        ) : (
          <Link
            className="btn btn-outline-light me-2"
            to="/login"
            style={{ transition: 'all 0.2s' }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = 'green'
              e.target.style.borderColor = 'green'
              e.target.style.color = 'white'
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.borderColor = 'white'
              e.target.style.color = 'white'
            }}
          >
            <LogIn size={16} className="me-1" /> Log In
          </Link>
        )}
        <Link className="btn btn-success" to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar