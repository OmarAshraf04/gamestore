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
│   ├── pages/             ← your 6 pages
│   │   ├── Home.jsx
│   │   ├── Catalog.jsx
│   │   ├── GameDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Login.jsx
│   │   └── OrderHistory.jsx
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
import Cart from './pages/Cart'
import Login from './pages/Login'
import OrderHistory from './pages/OrderHistory'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<OrderHistory />} />
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
        <Link className="btn btn-outline-light me-2" to="/orders">My Orders</Link>
        <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        <Link className="btn btn-success" to="/cart">Cart</Link>
      </div>
    </nav>
  )
}

export default Navbar
```

---

## Step 4 — Build Your 6 Pages

### Page 1 — Home.jsx
Goal: Hero section + featured games

```jsx
import { Link } from 'react-router-dom'
import cupheadImg from "../assets/Cuphead.jpg";
import eldenImg from "../assets/eldenring.jpg";
import GoWImg from "../assets/GoW.jpg";
import cyberImg from "../assets/cyberpunk.jpg";

function Home() {
  const featured = [
    { id: 1, title: "Cuphead", price: 19.99, genre: "Run and Gun Action", image: cupheadImg },
    { id: 2, title: "Elden Ring", price: 59.99, genre: "Action RPG", image: eldenImg },
    { id: 3, title: "God of War", price: 49.99, genre: "Action-Adventure", image: GoWImg },
    { id: 4, title: "CyberPunk 2077", price: 59.99, genre: "RPG", image: cyberImg },
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
                  <p className="text-muted">{game.genre}</p>
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
```

---

### Page 2 — Catalog.jsx
Goal: Show all games, search filter + Request a Game form ✅ (Form 1)

```jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import games from '../data/games'

function Catalog() {
  const [search, setSearch] = useState('')

  const filtered = games.filter(g =>
    g.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container my-4">
      <h2 className="mb-4">All Games</h2>

      {/* Search Bar */}
      <div className="d-flex justify-content-center mb-4">
        <div className="input-group" style={{ maxWidth: '400px' }}>
          <input
            className="form-control"
            placeholder="Search games..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="input-group-text">🔍</span>
        </div>
      </div>

      <div className="row">
        {filtered.map(game => (
          <div className="col-md-3 mb-4" key={game.id}>
            <div className="card h-100">
              <img src={game.image} className="card-img-top" alt={game.title} />
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="text-muted">{game.genre}</p>
                <p className="text-success">${game.price}</p>
                <Link to={`/game/${game.id}`} className="btn btn-dark w-100">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Request a Game Form — to be added */}
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

### Page 4 — Cart.jsx
Goal: Show cart items + total

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function Cart() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/cart')
      .then(res => setCart(res.data.data))
      .catch(err => console.error(err))
  }, [])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const removeItem = (gameId) => {
    axios.delete(`http://localhost:5000/api/cart/${gameId}`)
      .then(() => setCart(cart.filter(item => item.gameId !== gameId)))
      .catch(err => console.error(err))
  }

  return (
    <div className="container my-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="d-flex justify-content-between align-items-center border-bottom py-3" key={item.gameId}>
              <div>
                <h5>{item.title}</h5>
                <p className="text-muted">Qty: {item.quantity}</p>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="text-success">${(item.price * item.quantity).toFixed(2)}</span>
                <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.gameId)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="text-end mt-4">
            <h4>Total: <span className="text-success">${total.toFixed(2)}</span></h4>
            <button className="btn btn-success btn-lg">Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
```

---

### Page 5 — Login.jsx
Goal: Login + Register forms ✅ (Form 2)

```jsx
import { useState } from 'react'
import axios from 'axios'

function Login() {
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')

  const validate = () => {
    const newErrors = {}
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid'
    if (!form.password.trim()) newErrors.password = 'Password is required'
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters'
    if (!isLogin && !form.name.trim()) newErrors.name = 'Name is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    const url = isLogin ? '/api/auth/login' : '/api/auth/register'
    axios.post(`http://localhost:5000${url}`, form)
      .then(() => setMessage(isLogin ? 'Logged in!' : 'Registered successfully!'))
      .catch(err => console.error(err))
  }

  return (
    <div className="container my-5" style={{ maxWidth: '450px' }}>
      <div className="d-flex mb-4 gap-2">
        <button className={`btn ${isLogin ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setIsLogin(true)}>Login</button>
        <button className={`btn ${!isLogin ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setIsLogin(false)}>Register</button>
      </div>

      <h3>{isLogin ? 'Login' : 'Create Account'}</h3>

      {message && <div className="alert alert-success">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-3">
        {!isLogin && (
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-success w-100">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  )
}

export default Login
```

---

### Page 6 — OrderHistory.jsx
Goal: Show past orders

```jsx
import { useEffect, useState } from 'react'
import axios from 'axios'

function OrderHistory() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(res => setOrders(res.data.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="container my-5">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map(order => (
          <div className="card mb-3" key={order.id}>
            <div className="card-body">
              <h5>Order #{order.id}</h5>
              <p className="text-muted">Date: {new Date(order.date).toLocaleDateString()}</p>
              <ul>
                {order.items.map(item => (
                  <li key={item.gameId}>{item.title} x{item.quantity} — ${item.price}</li>
                ))}
              </ul>
              <h6 className="text-success">Total: ${order.totalPrice}</h6>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory
```

---

## Data File — src/data/games.js

Instead of hardcoding the games array in every page, keep it in one place:

```js
import cupheadImg from "../assets/Cuphead.jpg"
import eldenImg from "../assets/eldenring.jpg"
import GoWImg from "../assets/GoW.jpg"
import cyberImg from "../assets/cyberpunk.jpg"

const games = [
  { id: 1, title: "Cuphead", price: 19.99, genre: "Run and Gun Action", image: cupheadImg },
  { id: 2, title: "Elden Ring", price: 59.99, genre: "Action RPG", image: eldenImg },
  { id: 3, title: "God of War", price: 49.99, genre: "Action-Adventure", image: GoWImg },
  { id: 4, title: "CyberPunk 2077", price: 59.99, genre: "RPG", image: cyberImg },
]

export default games
```

Import it in any page with:
```js
import games from '../data/games'
```

---

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

## Bootstrap Layout Classes Reference

### Containers
| Class | What it does |
|---|---|
| `container` | Centers content with a max width, adds padding on sides |
| `row` | Starts a grid row, children sit side by side |
| `col-md-3` | Each item takes 3/12 columns on desktop (4 per row), full width on mobile |
| `col-md-4` | Each item takes 4/12 columns (3 per row) |
| `col-md-6` | Each item takes 6/12 columns (2 per row) |

### Flexbox
| Class | What it does |
|---|---|
| `d-flex` | Turns div into a flex container, enables alignment control |
| `justify-content-center` | Centers children horizontally |
| `justify-content-between` | Pushes children to opposite ends |
| `align-items-center` | Centers children vertically |
| `gap-3` | Adds spacing between flex children |

### Spacing
| Class | What it does |
|---|---|
| `my-5` | Margin top and bottom (size 5) |
| `mb-4` | Margin bottom only (size 4) |
| `mt-5` | Margin top only |
| `py-5` | Padding top and bottom |
| `px-4` | Padding left and right |
| `me-2` | Margin right (end) |

### Input Group
| Class | What it does |
|---|---|
| `input-group` | Wrapper that glues input and attached elements together |
| `input-group-text` | The attached element (icon or text) on left or right of input |
| `form-control` | Styles an input field |
| `form-label` | Styles a label above an input |

### Cards
| Class | What it does |
|---|---|
| `card` | Bootstrap card box with border and shadow |
| `card-body` | Padding inside the card |
| `card-title` | Styled heading inside card |
| `card-img-top` | Image at top of card, stretches to fit width |
| `h-100` | Makes card full height so all cards in a row are equal height |

### Text & Color
| Class | What it does |
|---|---|
| `text-white` | White text |
| `text-muted` | Grey text |
| `text-success` | Green text |
| `text-center` | Centers text |
| `text-end` | Aligns text to the right |
| `bg-dark` | Dark background |
| `lead` | Slightly larger paragraph text |

### Buttons
| Class | What it does |
|---|---|
| `btn` | Base button style, always required |
| `btn-success` | Green button |
| `btn-dark` | Dark button |
| `btn-danger` | Red button |
| `btn-outline-light` | Transparent button with light border |
| `btn-lg` | Large button |
| `btn-sm` | Small button |
| `w-100` | Full width button |

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

## Notes
- Backend runs on `http://localhost:5000`
- Frontend runs on `http://localhost:5173`
- Always use `axios` for API calls, not plain `fetch`
- Update teammate guide if you add/change any endpoints you need