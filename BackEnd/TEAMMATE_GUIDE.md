# Game Store - Backend Developer Guide

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/OmarAshraf04/gamestore.git
cd gamestore
```

### 2. Create Your Branch
```bash
git checkout -b backend-dev
```

### 3. Your Daily Workflow
```bash
# After making changes:
git add .
git commit -m "describe what you did"
git push origin backend-dev
```

### 4. Getting Latest Frontend Updates
```bash
git checkout main
git pull origin main
```

---

## API Endpoints the Frontend Needs

> These are the endpoints Omar's frontend is expecting. Make sure your backend matches these exactly.

### Auth
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/auth/register` | Register new user | `{ name, email, password }` |
| POST | `/api/auth/login` | Login user | `{ email, password }` |
| POST | `/api/auth/logout` | Logout user | - |

### Games
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/games` | Get all games | - |
| GET | `/api/games/:id` | Get single game by ID | - |
| GET | `/api/games?category=action` | Filter games by category | - |
| POST | `/api/games` | Add new game (admin) | `{ title, price, category, description, image }` |
| PUT | `/api/games/:id` | Update game (admin) | `{ title, price, ... }` |
| DELETE | `/api/games/:id` | Delete game (admin) | - |
| POST | `/api/games/request` | Submit a game request | `{ title, platform, reason }` |

### Cart
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/cart` | Get user's cart | - |
| POST | `/api/cart` | Add item to cart | `{ gameId, quantity }` |
| DELETE | `/api/cart/:gameId` | Remove item from cart | - |

### Orders
| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/orders` | Place an order | `{ cartItems, totalPrice }` |
| GET | `/api/orders` | Get user's orders | - |

---

## Expected Response Format

All endpoints should return JSON in this format:

**Success:**
```json
{
  "success": true,
  "data": { }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description here"
}
```

---

## Game Object Structure

The frontend expects game objects to look like this:
```json
{
  "id": 1,
  "title": "Game Title",
  "price": 59.99,
  "category": "Action",
  "description": "Game description here",
  "image": "image_url_here",
  "rating": 4.5
}
```

---

## Setup Instructions for Backend

1. Navigate to the backend folder:
```bash
cd BackEnd
```

2. Initialize Node.js project:
```bash
npm init -y
```

3. Install required packages:
```bash
npm install express mongoose dotenv cors
```

4. Create a `.env` file inside `BackEnd/`:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Start the server:
```bash
node server.js
```

> The frontend runs on `http://localhost:5173` and expects the backend on `http://localhost:5000`

---

## Notes
- Make sure CORS is enabled so the frontend can talk to the backend
- All routes should be prefixed with `/api`
- Update this file if any endpoints change
