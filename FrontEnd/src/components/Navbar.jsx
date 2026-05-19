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
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-4">
      <Link className="navbar-brand" to="/">
        <Gamepad2 size={18} className="me-2" />
        Game Store
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center ms-auto gap-2 py-2 py-lg-0">
          {token && (
            <span className="text-white d-flex align-items-center gap-1">
              <User size={16} /> {name}
            </span>
          )}
          <Link className="btn btn-outline-light" to="/catalog">Browse Games</Link>
          <Link className="btn btn-outline-light" to="/orders">My Orders</Link>

          {isAdmin && (
            <Link className="btn btn-warning" to="/admin">
              <ShieldCheck size={16} className="me-1" /> Admin
            </Link>
          )}

          {token ? (
            <button
              className="btn btn-outline-light"
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
              className="btn btn-outline-light"
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
      </div>
    </nav>
  )
}

export default Navbar