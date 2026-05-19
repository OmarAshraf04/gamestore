import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2 } from 'lucide-react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function Home() {
  const [topRated, setTopRated] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => {
        console.log(res.data.data)
        const topRated = res.data.data
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 8)
        setTopRated(topRated)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1>
          <Gamepad2 size={30} className="me-2" />
          Welcome to Game Store
        </h1>
        <p className="lead">Your one-stop shop for all games and accessories</p>
        <Link to="/catalog" className="btn btn-success btn-lg">Browse Games</Link>
      </div>

      {/* Featured Games */}
      <div className="container my-5">
        <h2>Top Rated Games</h2>
        <div className='row'>
          {topRated.map(game => (
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