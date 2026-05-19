# Game Store - Frontend Developer Guide

## Angular vs React (Quick Reference)
Since you know Angular, here's a quick mental map:

| Angular | React |
|---|---|
| Component `.ts` + `.html` | Single `.jsx` file |
| `*ngFor` | `array.map()` |
| `*ngIf` | `condition && <Component />` |
| `[(ngModel)]` | `useState` |
| `@Input()` | `props` |
| `HttpClient` | `fetch` / `axios` |
| `RouterModule` | `react-router-dom` |

---

## Folder Structure (inside FrontEnd/)

```
FrontEnd/
├── src/
│   ├── components/        ← reusable pieces (Navbar, GameCard, Footer)
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── GameCard.jsx
│   ├── context/
│   │   └── AuthContext.jsx  ← auth state (token, name, role, isAdmin)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── GameDetails.jsx
│   │   └── AdminDashboard.jsx
│   ├── App.jsx            ← routing lives here
│   └── main.jsx           ← entry point (like main.ts in Angular)
```

---

## Step 1 — Install Dependencies

Navigate to your FrontEnd folder and install what you need:
```bash
cd FrontEnd
npm install react-router-dom axios bootstrap
```

Then import Bootstrap in `main.jsx`:
```jsx
import 'bootstrap/dist/css/bootstrap.min.css'
```

---

## Step 2 — Set Up Routing in App.jsx

This is like Angular's `RouterModule`. Paste this in `App.jsx`:

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import GameDetails from './pages/GameDetails'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/game/:id" element={<GameDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

---

## Step 3 — Build the Navbar Component

Consistent across all pages. Put this in `components/Navbar.jsx`:

```jsx
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">🎮 Game Store</Link>
      <div>
        <Link className="btn btn-outline-light me-2" to="/catalog">Browse Games</Link>
        <Link className="btn btn-success" to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar
```

---

## Step 4 — Build Your 3 Pages

### Page 1 — Home.jsx
Goal: Hero section + featured games

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    // Like ngOnInit in Angular
    axios.get('http://localhost:5000/api/games')
      .then(res => setFeatured(res.data.data.slice(0, 4)))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-dark text-white text-center py-5">
        <h1>Welcome to Game Store</h1>
        <p>Your one-stop shop for all games</p>
        <a href="/catalog" className="btn btn-success btn-lg">Browse Games</a>
      </div>

      {/* Featured Games */}
      <div className="container my-5">
        <h2>Featured Games</h2>
        <div className="row">
          {featured.map(game => (
            <div className="col-md-3" key={game.id}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
```

---

### Page 2 — Catalog.jsx
Goal: Show all games, filter by category

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import GameCard from '../components/GameCard'

function Catalog() {
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios.get('http://localhost:5000/api/games')
      .then(res => setGames(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container my-4">
      <h2>All Games</h2>

      {/* Search Bar */}
      <input
        className="form-control mb-4"
        placeholder="Search games..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="row">
        {filtered.map(game => (
          <div className="col-md-3 mb-4" key={game.id}>
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Catalog
```

---

### Page 3 — GameDetails.jsx
Goal: Show full info about one game

```jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function GameDetails() {
  const { id } = useParams()   // like ActivatedRoute in Angular
  const [game, setGame] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/games/${id}`)
      .then(res => setGame(res.data.data))
      .catch(err => console.error(err))
  }, [id])

  if (!game) return <p className="text-center mt-5">Loading...</p>

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-5">
          <img src={game.image} alt={game.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-7">
          <h1>{game.title}</h1>
          <p className="text-muted">{game.category}</p>
          <p>{game.description}</p>
          <h3 className="text-success">${game.price}</h3>
          <button className="btn btn-success btn-lg">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default GameDetails
```

---

## Step 5 — GameCard Reusable Component

Used in both Home and Catalog pages:

```jsx
import { Link } from 'react-router-dom'

function GameCard({ game }) {
  return (
    <div className="card h-100">
      <img src={game.image} className="card-img-top" alt={game.title} />
      <div className="card-body">
        <h5 className="card-title">{game.title}</h5>
        <p className="text-success">${game.price}</p>
        <Link to={`/game/${game.id}`} className="btn btn-dark w-100">View</Link>
      </div>
    </div>
  )
}

export default GameCard
```

---

## Step 6 — Testing Before Backend is Ready

Your teammate's backend won't be ready immediately. Use this fake data to test your pages:

```jsx
// Paste this temporarily instead of the axios call
const games = [
  { id: 1, title: "Elden Ring", price: 59.99, category: "RPG", image: "https://placehold.co/300x200", description: "Open world RPG" },
  { id: 2, title: "FIFA 25", price: 49.99, category: "Sports", image: "https://placehold.co/300x200", description: "Football game" },
  { id: 3, title: "GTA VI", price: 69.99, category: "Action", image: "https://placehold.co/300x200", description: "Open world action" },
  { id: 4, title: "Minecraft", price: 29.99, category: "Sandbox", image: "https://placehold.co/300x200", description: "Build anything" },
]
setGames(games)
```

---

## Daily Git Workflow

```bash
# Before starting work, get latest changes
git pull origin main

# After finishing something
git add .
git commit -m "add home page hero section"
git push origin frontend-dev
```

---

## Admin Dashboard

### Setup
Add this route in `App.jsx`:
```jsx
import AdminDashboard from './pages/AdminDashboard'

// inside <Routes>:
<Route path="/admin" element={<AdminDashboard />} />
```

### AuthContext — login() now takes 3 args
```jsx
const { token, name, role } = res.data.data
login(token, name, role)  // role must be "admin" or "user"
```

`AuthContext` exposes `isAdmin` (boolean) — `true` when `role === 'admin'`. The Navbar uses this to show/hide the Admin button.

### Features
- **Manage Games tab** — table of all games with Edit (inline expand) and Delete per row
- **Add Game tab** — form to add a new game, calls `POST /api/games`
- Edit calls `PUT /api/games/:id`, Delete calls `DELETE /api/games/:id`
- Both mutating calls send `Authorization: Bearer <token>` header
- Non-admins are automatically redirected to `/`

### Testing Admin Locally (before backend sets role)
Open DevTools → Application → Local Storage → `localhost:5173` and set:
```
key:   role
value: admin
```
Refresh the page — the Admin button will appear in the Navbar.
To undo, delete the key or set value back to `user`.

---

## Notes
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- Always use `axios` for API calls, not plain `fetch`
- Update teammate guide if you add/change any endpoints you need