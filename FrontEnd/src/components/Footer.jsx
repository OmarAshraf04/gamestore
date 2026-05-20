import { Link } from 'react-router-dom'
import { Gamepad2 } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 pt-5 pb-4">
      <div className="container">
        <div className="row">

          {/* Col 1 — Brand */}
          <div className="col-md-4 mb-4">
            <h5>
              <Gamepad2 size={20} className="me-2" />
              Game Store
            </h5>
            <p className="text-muted small">Your one-stop shop for all games and accessories. Browse, buy, and play.</p>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase text-muted mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-1"><Link to="/" className="text-white-50 text-decoration-none">Home</Link></li>
              <li className="mb-1"><Link to="/catalog" className="text-white-50 text-decoration-none">Catalog</Link></li>
              <li className="mb-1"><Link to="/cart" className="text-white-50 text-decoration-none">Cart</Link></li>
            </ul>
          </div>

          {/* Col 3 — Built By */}
          <div className="col-md-4 mb-4">
            <h6 className="text-uppercase text-muted mb-3">Built By</h6>
            <p className="text-white-50 small mb-1">Omar Ashraf</p>
            <p className="text-white-50 small mb-1">Mohommed Magdy</p>  {/* swap here */}
          </div>

        </div>

        <hr className="border-secondary" />
        <p className="text-center text-muted small mb-0">
          &copy; {new Date().getFullYear()} Game Store. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer