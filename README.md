# GigFlow - Freelance Marketplace Platform

## Full Stack Development Internship Assignment

GigFlow is a mini-freelance marketplace platform where clients can post jobs (Gigs) and freelancers can apply for them (Bids). This project demonstrates complex database relationships, secure authentication, state management, and real-time notifications.

## Features Implemented

### Core Features
- User Authentication: Secure JWT-based auth with HttpOnly cookies
- Fluid Roles: Users can post gigs (Client) or bid on gigs (Freelancer)
- Gig Management: Full CRUD operations for job postings
- Search & Filter: Search gigs by title
- Bidding System: Freelancers can submit proposals with price
- Hiring Logic: Atomic updates with status management

### Bonus Features
- MongoDB Transactions: Race condition prevention during hiring
- Real-time Notifications: Socket.io integration for instant hire notifications

## Technical Stack

- **Frontend**: React.js (Vite) + Tailwind CSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **State Management**: Redux Toolkit
- **Authentication**: JWT with HttpOnly cookies
- **Real-time**: Socket.io

## Project Structure

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
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── GigCard.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── CreateGig.jsx
│   │   │   ├── GigDetails.jsx
│   │   │   ├── MyGigs.jsx
│   │   │   └── MyBids.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── gigSlice.js
│   │   │       ├── bidSlice.js
│   │   │       └── notificationSlice.js
│   │   ├── utils/
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd gigflow
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Setup backend environment**
```bash
# Copy .env.example to .env
copy .env.example .env

# Edit .env with your values:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/gigflow
# JWT_SECRET=your_super_secret_jwt_key
# NODE_ENV=development
# FRONTEND_URL=http://localhost:5173
```

4. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

5. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

6. **Run the application**

Run them in separate terminals:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Gigs
- `GET /api/gigs` - Get all gigs (with optional search)
- `GET /api/gigs/:id` - Get single gig
- `POST /api/gigs` - Create new gig (protected)
- `PUT /api/gigs/:id` - Update gig (protected, owner only)
- `DELETE /api/gigs/:id` - Delete gig (protected, owner only)
- `GET /api/gigs/my/posted` - Get user's posted gigs (protected)

### Bids
- `POST /api/bids` - Submit a bid (protected)
- `GET /api/bids/:gigId` - Get all bids for a gig (protected, owner only)
- `GET /api/bids/my/bids` - Get user's bids (protected)
- `PATCH /api/bids/:bidId/hire` - Hire a freelancer (protected, owner only)

## Key Implementation Details

### Hiring Logic
The hiring process uses MongoDB transactions to ensure atomicity:
1. Gig status changes from "open" to "assigned"
2. Selected bid status becomes "hired"
3. All other bids automatically become "rejected"
4. Real-time notification sent to hired freelancer

### Race Condition Prevention
MongoDB transactions ensure that if two admins try to hire different freelancers simultaneously, only one will succeed, preventing conflicts.

### Real-time Notifications
When a freelancer is hired, they receive an instant Socket.io notification without page refresh.

## Testing the Application

1. Register two users: One will be the client, one the freelancer
2. As Client: Post a new gig
3. As Freelancer: Browse gigs and submit a bid
4. As Client: View the gig details to see the bid
5. As Client: Click "Hire" to accept the bid
6. As Freelancer: See the real-time notification

## Database Schema

### User
- name: String
- email: String (unique)
- password: String (hashed)

### Gig
- title: String
- description: String
- budget: Number
- ownerId: ObjectId (ref: User)
- status: String (enum: ['open', 'assigned'])
- assignedTo: ObjectId (ref: User)

### Bid
- gigId: ObjectId (ref: Gig)
- freelancerId: ObjectId (ref: User)
- message: String
- price: Number
- status: String (enum: ['pending', 'hired', 'rejected'])

## Assignment Completion

- All core features implemented
- Bonus 1: MongoDB Transactions for race condition prevention
- Bonus 2: Real-time Socket.io notifications
- Clean, well-structured code
- Responsive UI with Tailwind CSS
- Comprehensive README

## Deployment

### Backend (Railway/Render/Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `cd frontend && npm run build`
4. Set output directory: `frontend/dist`
5. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Update MONGODB_URI in backend .env

## Author

Riya

## License

MIT
