# Gamestore - Setup Guide

## Prerequisites
Download and install these first:
- Node.js: https://nodejs.org (pick LTS version)
- VS Code: https://code.visualstudio.com

---

## Step 1 — Clone the repo
```bash
git clone https://github.com/OmarAshraf04/gamestore.git
cd gamestore
```

---

## Step 2 — Create the .env file
Inside the `BackEnd/` folder, create a file called `.env` and paste this in it (Mohamed will send you the actual values):
```
PORT=5000
MONGO_URI=mongodb+srv://magdy:gaming@c-0.d0l0ilg.mongodb.net/?appName=C-0
JWT_SECRET=somereallylongrandomsecretkey123
```

---

## Step 3 — Install backend dependencies
```bash
cd BackEnd
npm install
```

---

## Step 4 — Install frontend dependencies
```bash
cd ../FrontEnd
npm install
```

---

## Step 5 — Run the app
Open two terminals:

**Terminal 1 - Backend:**
```bash
cd BackEnd
node server.js
```
You should see:
```
MongoDB connected
Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd FrontEnd
npm run dev
```
Then open http://localhost:5173 in your browser.

---

## Notes
- Backend runs on http://localhost:5000
- Frontend runs on http://localhost:5173
- Never push the .env file to GitHub
- If MongoDB connection fails, let Mohamed know — it may be an IP whitelist issue
