import { useState } from 'react'
import { Link } from 'react-router-dom'
import games from '../data/game'
import GameCard from '../components/GameCard'

function Catalog() {

  const [search, setSearch] = useState('')
  const [request, setRequest] = useState({ title: '', platform: '', reason: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  const validate = () => {
    const newErrors = {}
    if (!request.title.trim()) newErrors.title = 'Game title is required'
    if (!request.platform.trim()) newErrors.platform = 'Platform is required'
    return newErrors
  }

  const handleRequest = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setSubmitted(true)
  }

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
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {/* Request a Game Form */}
      <div className="mt-5">
        <h3 className="d-flex justify-content-center mb-4">Can't find a game? Request it!</h3>
        <div className="d-flex justify-content-center">
          {submitted ? (
            <div className="alert alert-success" style={{ maxWidth: '500px', width: '100%' }}>
              ✅ Request submitted! We'll look into adding <strong>{request.title}</strong> soon.
            </div>
          ) : (
            <form onSubmit={handleRequest} className="mt-3" style={{ maxWidth: '500px', width: '100%' }}>
              <div className="mb-3">
                <label className="form-label">Game Title</label>
                <input
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  value={request.title}
                  onChange={e => setRequest({ ...request, title: e.target.value })}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Platform</label>
                <input
                  className={`form-control ${errors.platform ? 'is-invalid' : ''}`}
                  placeholder="PC, PS5, Xbox..."
                  value={request.platform}
                  onChange={e => setRequest({ ...request, platform: e.target.value })}
                />
                {errors.platform && <div className="invalid-feedback">{errors.platform}</div>}
              </div>
              <div className="mb-3">
                <label className="form-label">Reason (optional)</label>
                <textarea
                  className="form-control"
                  value={request.reason}
                  onChange={e => setRequest({ ...request, reason: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Submit Request</button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Catalog