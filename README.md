<<<<<<< HEAD
# stayspace
airbnb
=======
# Airbnb MERN Clone

A full-stack Airbnb-style booking app built with MongoDB, Express, React, and Node.js. It includes JWT authentication, protected booking flows, and Stripe payment intent support.

## Stack

- Frontend: React + Vite + React Router
- Backend: Express + Mongoose + JWT
- Auth: Email/password with hashed passwords and JWT cookies/header support
- Payments: Stripe Payment Intents

## Project Structure

- `client/`: React frontend
- `server/`: Express API

## Environment Variables

Create `server/.env` from `server/.env.example` and `client/.env` from `client/.env.example`.

## Run

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:5001`, so local listing/auth requests work even if `client/.env` is not created yet.

## Seed Demo Listings

```bash
npm run seed
```
>>>>>>> d9a8aa6 (update stayspace)
