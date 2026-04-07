# StaySpace

StaySpace is a full-stack stay-booking application inspired by Airbnb. It includes a React frontend, an Express/MongoDB backend, seeded listing data, authentication, booking management, and Razorpay-based checkout support.

## Tech Stack

- Frontend: React, Vite, React Router
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT-based auth
- Payments: Razorpay order creation and payment verification
- Styling: Custom CSS

## Features

- Browse curated stay listings by category or search term
- View detailed listing pages with host, amenities, and booking info
- Register and log in to access protected booking flows
- Reserve stays with:
  - check-in/check-out dates
  - guest count
  - reservation name
  - reservation age
- View saved trips on the bookings page
- Seed local listing and host image assets
- Responsive UI with custom homepage, footer, and login page sections

## Project Structure

- `client/` - React frontend
- `server/` - Express API and MongoDB models/controllers/routes
- `server/seeders/` - seed script and copied image assets

## Scripts

From the project root:

```bash
npm install
npm install --prefix client
npm install --prefix server
```

Run both client and server:

```bash
npm run dev
```

Other useful commands:

```bash
npm run build
npm run seed
```

## Environment Variables

Create a `.env` file inside `server/` for backend configuration.

Typical values:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Optional frontend env in `client/.env`:

```env
VITE_API_URL=http://localhost:5001/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Running Locally

1. Install dependencies
2. Add environment variables
3. Start MongoDB
4. Run:

```bash
npm run dev
```

Frontend:

- [http://localhost:5173](http://localhost:5173)

Backend:

- `http://localhost:5001`

Health check:

- `GET /api/health`

## Seed Demo Data

To seed listings into the database:

```bash
npm run seed
```

This uses the listing data in [seedListings.js](/Users/ayushanand/Desktop/stayspace/server/seeders/seedListings.js) and local assets from [server/seeders/images](/Users/ayushanand/Desktop/stayspace/server/seeders/images).

## Main API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/listings`
- `GET /api/listings/meta`
- `GET /api/listings/:id`
- `GET /api/bookings/mine`
- `POST /api/bookings/order`
- `POST /api/bookings`

## Notes

- Razorpay must be configured for checkout to work.
- Booking creation is protected and requires login.
- The repository currently uses locally stored listing and host images rather than remote image URLs.
