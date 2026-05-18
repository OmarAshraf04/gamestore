import { Link } from 'react-router-dom'

function Home() {
  const featured = [
    { id: 1, title: "Elden Ring", price: 59.99, category: "RPG", image: "https://placehold.co/300x200" },
    { id: 2, title: "FIFA 25", price: 49.99, category: "Sports", image: "https://placehold.co/300x200" },
    { id: 3, title: "GTA VI", price: 69.99, category: "Action", image: "https://placehold.co/300x200" },
    { id: 4, title: "Minecraft", price: 29.99, category: "Sandbox", image: "https://placehold.co/300x200" },
  ]

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
          {featured.map(game => (
            <div className="col-md-3 mb-4" key={game.id}>
              <div className="card h-100">
                <img src={game.image} className="card-img-top" alt={game.title} />
                <div className="card-body">
                  <h5 className="card-title">{game.title}</h5>
                  <p className="text-muted">{game.category}</p>
                  <p className="text-success">${game.price}</p>
                  <Link to={`/game/${game.id}`} className="btn btn-dark w-100">View</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home