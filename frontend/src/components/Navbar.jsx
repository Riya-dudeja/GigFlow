import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/authSlice'
import toast from 'react-hot-toast'
import { useState } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { notifications } = useSelector((state) => state.notification)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await dispatch(logout())
    toast.success('Logged out')
    navigate('/')
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-emerald-500/20 shadow-lg shadow-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl sm:text-2xl font-bold text-emerald-400 hover:text-emerald-300 transition-all" style={{ fontFamily: "'Space Grotesk', 'Poppins', system-ui, sans-serif" }}>
              Gig<span className="text-teal-400">Flow</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-1">
              <Link to="/" className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                Browse
              </Link>
              {user && (
                <>
                  <Link to="/dashboard" className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    Dashboard
                  </Link>
                  <Link to="/my-gigs" className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                    My Posts
                  </Link>
                  <Link to="/my-bids" className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all relative">
                    Bids
                    {notifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-lg shadow-red-500/50">
                        {notifications.length}
                      </span>
                    )}
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                <Link
                  to="/create-gig"
                  className="hidden sm:block bg-emerald-600 hover:bg-emerald-500 text-white px-3 sm:px-4 py-2 rounded-md text-sm font-medium transition-all"
                >
                  Post Gig
                </Link>
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-gray-300 text-sm">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden text-gray-300 hover:text-white p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white hover:bg-slate-700/50 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-3 sm:px-5 py-2 rounded-lg text-sm font-semibold transition-all shadow-md shadow-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/40"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && user && (
          <div className="md:hidden py-4 border-t border-slate-700">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Browse
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                Dashboard
              </Link>
              <Link
                to="/my-gigs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              >
                My Posts
              </Link>
              <Link
                to="/my-bids"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-emerald-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between"
              >
                <span>Bids</span>
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                    {notifications.length}
                  </span>
                )}
              </Link>
              <Link
                to="/create-gig"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all text-center sm:hidden"
              >
                Post Gig
              </Link>
              <div className="pt-2 border-t border-slate-700 mt-2">
                <div className="text-gray-400 text-sm px-4 py-2">
                  {user.name}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-gray-400 hover:text-red-400 hover:bg-slate-700/50 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
