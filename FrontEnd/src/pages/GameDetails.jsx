import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function GameDetails() {
  const { id } = useParams()
  const [game, setGame] = useState(null)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games/${id}`)
      .then(res => setGame(res.data.data))
      .catch(err => console.error(err))
  }, [id])

  const addToCart = async () => {
    if (!token) {
      navigate('/login')
      return
    }
    try {
      await axios.post('http://localhost:5000/api/cart',
        { gameId: game._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Added to cart!')
    } catch (err) {
      setMessage('Something went wrong')
    }
  }

  if (!game) return <p className="text-center mt-5">Loading...</p>

  return (
    <div className="container my-5">
      <Link to="/catalog" className="btn btn-outline-dark mb-4">← Back to Catalog</Link>
      <div className="row">
        <div className="col-md-5">
          <img src={game.image} alt={game.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h1>{game.title}</h1>
          <p className="text-muted">{game.category}</p>
          <p>{game.description}</p>
          <h3 className="text-success">${game.price}</h3>
          {message && <div className="alert alert-success">{message}</div>}
          <button className="btn btn-success btn-lg" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default GameDetails