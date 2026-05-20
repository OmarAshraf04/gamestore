import { Link } from 'react-router-dom'

function GameCard({ game }) {
  return (
    <div className="card h-100">
      <img
        src={game.image}
        className="card-img-top"
        alt={game.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-truncate" title={game.title}>{game.title}</h5>        <p className="text-muted">{game.category}</p>
        <p className="text-success">${game.price}</p>
        <div className="mt-auto">
          <Link to={`/game/${game._id}`} className="btn btn-dark w-100">View</Link>
        </div>
      </div>
    </div>
  )
}

export default GameCard