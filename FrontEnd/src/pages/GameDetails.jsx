import { useParams, Link } from 'react-router-dom'
import games from '../data/game'

function GameDetails() {
  const { id } = useParams()
  const game = games.find(g => g.id === parseInt(id))

  if (!game) return <p className="text-center mt-5">Game not found.</p>

  return (
    <div className="container my-5">
      <Link to="/catalog" className="btn btn-outline-dark mb-4">← Back to Catalog</Link>
      <div className="row">
        <div className="col-md-5">
          <img src={game.image} alt={game.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h1>{game.title}</h1>
          <p className="text-muted">{game.genre}</p>
          <h3 className="text-success">${game.price}</h3>
          <button className="btn btn-success btn-lg">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default GameDetails