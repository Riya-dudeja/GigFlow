import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/slices/authSlice'
import { initSocket, disconnectSocket } from './utils/socket'

import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import CreateGig from './pages/CreateGig'
import GigDetails from './pages/GigDetails'
import MyGigs from './pages/MyGigs'
import MyBids from './pages/MyBids'

function App() {
  const dispatch = useDispatch()
  const { user, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      initSocket(user._id)
    }
    return () => {
      disconnectSocket()
    }
  }, [user])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100/30 to-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          
          <Route path="/create-gig" element={
            <PrivateRoute>
              <CreateGig />
            </PrivateRoute>
          } />
          
          <Route path="/gig/:id" element={
            <PrivateRoute>
              <GigDetails />
            </PrivateRoute>
          } />
          
          <Route path="/my-gigs" element={
            <PrivateRoute>
              <MyGigs />
            </PrivateRoute>
          } />
          
          <Route path="/my-bids" element={
            <PrivateRoute>
              <MyBids />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </div>
  )
}

export default App
