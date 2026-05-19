import { useEffect, useState } from 'react'
import { Search, Gamepad2 } from 'lucide-react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function Catalog() {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')
  const [request, setRequest] = useState({ title: '', genre: '', reason: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  const validate = () => {
    const newErrors = {}
    if (!request.title.trim()) newErrors.title = 'Game title is required'
    if (!request.genre.trim()) newErrors.genre = 'Genre is required'
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
    setTimeout(() => {
  setSubmitted(false)
  setRequest({ title: '', genre: '', reason: '' })
  const modal = window.bootstrap.Modal.getInstance(document.getElementById('requestModal'))
  if (modal) modal.hide()
}, 3000)
  }

  return (
    <div className="container my-4">
      <h2 className="d-flex justify-content-center mb-4">All Games</h2>

      <div className="d-flex justify-content-center mb-4">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <input
            className="form-control"
            placeholder="Search games..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="input-group-text">
            <Search size={16} />
          </span>
        </div>
      </div>

      <div className="row">
        {filtered.map(game => (
          <div className="col-md-3 mb-4" key={game._id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>

      {/* Request a Game Button */}
      <div className="d-flex justify-content-end mt-4 me-2">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#requestModal">
          <Gamepad2 size={18} className="me-2" />
          Request a Game
        </button>
      </div>

      {/* Request a Game Modal */}
      <div className="modal fade" id="requestModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Request a Game</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              {submitted ? (
                <div className="alert alert-success">
                  ✅ Request submitted! We'll look into adding <strong>{request.title}</strong> soon.
                </div>
              ) : (
                <form onSubmit={handleRequest}>
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
                    <label className="form-label">Genre</label>
                    <input
                      className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                      placeholder="Action, RPG, Multiplayer..."
                      value={request.genre}
                      onChange={e => setRequest({ ...request, genre: e.target.value })}
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
      </div>
    </div>
  )
}

export default Catalog