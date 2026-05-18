import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🎮 Game Store</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/catalog">Browse Games</Link>
        <Link className="btn btn-outline-light me-2" to="/orders">My Orders</Link>
        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        <Link className="btn btn-success" to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar