import { Link } from 'react-router-dom'
import games from '../data/game'
import GameCard from '../components/GameCard'

function Home() {

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1>Welcome to Game Store 🎮</h1>
        <p className="lead">Your one-stop shop for all games</p>
        <Link to="/catalog" className="btn btn-success btn-lg">Browse Games</Link>
      </div>

      {/* Featured Games */}
      <div className="container my-5">
        <h2 className="mb-4">Featured Games</h2>
        <div className="row">
          {games.map(game => (
            <div className="col-md-3 mb-4" key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home