# GigFlow
## Freelance Marketplace Platform

GigFlow is a full-stack freelance marketplace where clients can post gigs and freelancers can bid on them.
The platform demonstrates secure authentication, role-based workflows, transaction-safe hiring, and real-time notifications.

This project is built as part of a Full Stack Development Internship assignment, focusing on backend correctness, scalability, and clean frontend state management.

## 🔴 Live (In Production)

- Frontend: https://gigflow-freelance.vercel.app/
- API: https://gigflow-phyu.onrender.com

## 🔗 Links (Development Environment)

- Fevekrontend (dev): http://localhost:5173
- API Base URL: http://localhost:5000

---

## 🚀 Features

### Core Features
- Authentication & Authorization
	- JWT-based authentication using HttpOnly cookies
	- Protected routes with middleware-based access control
- Flexible User Roles
	- Users can act as Clients (post gigs) or Freelancers (place bids)
- Gig Management
	- Full CRUD operations for gig postings
- Search Functionality
	- Search gigs by title
- Bidding System
	- Freelancers submit bids with price and proposal message
- Hiring Workflow
	- Clients can hire exactly one freelancer per gig
	- Automatic status updates for all bids

### Advanced / Bonus Features
- MongoDB Transactions
	- Atomic hiring logic to prevent race conditions
- Real-time Notifications
	- Instant Socket.io notifications on successful hire

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- Redux Toolkit

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication (HttpOnly cookies)
- Socket.io

---

## 📁 Project Structure

```
gigflow/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── gig.controller.js
│   │   └── bid.controller.js
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Gig.model.js
│   │   └── Bid.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── gig.routes.js
│   │   └── bid.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── vite.config.js
│   └── tailwind.config.js
└── .gitignore
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Git

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd gigflow
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using `.env.example`:

```env
PORT=5000
MONGODB_URI=your_mongodb_url
JWT_SECRET=your_jwt_secret
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Run the Application

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

---

## 🔗 API Endpoints

### Authentication

- POST /api/auth/register – Register a new user
- POST /api/auth/login – Login user
- POST /api/auth/logout – Logout user
- GET /api/auth/me – Get current authenticated user

### Gigs

- GET /api/gigs – Fetch all gigs (supports search)
- GET /api/gigs/:id – Fetch a single gig
- POST /api/gigs – Create a gig (protected)
- PUT /api/gigs/:id – Update gig (owner only)
- DELETE /api/gigs/:id – Delete gig (owner only)
- GET /api/gigs/my/posted – Get user’s posted gigs

### Bids

- POST /api/bids – Submit a bid (protected)
- GET /api/bids/:gigId – Get bids for a gig (owner only)
- GET /api/bids/my/bids – Get user’s bids
- PATCH /api/bids/:bidId/hire – Hire a freelancer

---

## 🔍 Key Implementation Details

### Transaction-Safe Hiring Logic

MongoDB transactions ensure:

1. Gig status changes from `open` to `assigned`
2. Selected bid is marked as `hired`
3. All other bids are marked as `rejected`
4. Only one hire can succeed, even under concurrent requests

### Real-time Notifications

Socket.io sends instant notifications to freelancers upon successful hiring.

---

## 🧪 Testing the Application

1. Register two users (Client and Freelancer)
2. Client posts a gig
3. Freelancer submits a bid
4. Client hires the freelancer
5. Freelancer receives a real-time notification

---

## 🗃️ Database Schema

### User

- name
- email (unique)
- password (hashed)

### Gig

- title
- description
- budget
- ownerId
- status (`open`, `assigned`)
- assignedTo

### Bid

- gigId
- freelancerId
- message
- price
- status (`pending`, `hired`, `rejected`)

---

## 🌱 Future Enhancements

- Payment gateway integration
- In-app messaging
- Gig categories and advanced filters
- Admin moderation dashboard

---

## 👩‍💻 Author

Riya Dudeja

---

## 📄 License

MIT License
