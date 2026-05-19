import { Link } from 'react-router-dom'

function GameCard({ game }) {
  return (
    <div className="card h-100">
      <img src={game.image} className="card-img-top" alt={game.title} />
      <div className="card-body">
        <h5 className="card-title">{game.title}</h5>
        <p className="text-muted">{game.genre}</p>
        <p className="text-success">${game.price}</p>
        <Link to={`/game/${game.id}`} className="btn btn-dark w-100">View</Link>
      </div>
    </div>
  )
}

export default GameCard