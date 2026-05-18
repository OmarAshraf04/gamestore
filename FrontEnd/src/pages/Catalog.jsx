import { useState } from 'react'
import { Link } from 'react-router-dom'
import games from '../data/game'

function Catalog() {

  const [search, setSearch] = useState('')

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container my-4">
      <h2 className="d-flex justify-content-center mb-4">All Games</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <input
            className="form-control"
            placeholder="Search games..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="input-group-text">
            🔍
          </span>
        </div>
      </div>

      <div className="row">
        {filtered.map(game => (
          <div className="col-md-3 mb-4" key={game.id}>
            <div className="card h-100">
              <img src={game.image} className="card-img-top" alt={game.title} />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="text-muted">{game.genre}</p>
                <p className="text-success">${game.price}</p>
                <Link to={`/game/${game.id}`} className="btn btn-dark w-100">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog