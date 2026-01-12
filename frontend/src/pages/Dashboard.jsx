import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const { notifications } = useSelector((state) => state.notification)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-1">Hey {user?.name}</h1>
        <p className="text-sm sm:text-base text-gray-600">What would you like to do today?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link
          to="/create-gig"
          className="group"
        >
          <motion.div 
            whileHover={{ y: -2 }} 
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 hover:border-emerald-400 p-6 rounded-xl transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900">Post a Gig</h2>
            </div>
            <p className="text-sm text-gray-600 ml-13">Create a new project and find talent</p>
          </motion.div>
        </Link>

        <Link
          to="/my-gigs"
          className="group"
        >
          <motion.div 
            whileHover={{ y: -2 }} 
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 hover:border-emerald-400 p-6 rounded-xl transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900">My Gigs</h2>
            </div>
            <p className="text-sm text-gray-600 ml-13">View and manage your projects</p>
          </motion.div>
        </Link>

        <Link
          to="/my-bids"
          className="group relative"
        >
          <motion.div 
            whileHover={{ y: -2 }} 
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 hover:border-emerald-400 p-6 rounded-xl transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-lg font-medium text-gray-900">My Bids</h2>
              {notifications.length > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {notifications.length}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 ml-13">Track your applications</p>
          </motion.div>
        </Link>
      </div>

      {notifications.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-medium mb-4 text-gray-900">Recent Activity</h2>
          <div className="space-y-2">
            {notifications.slice(0, 5).map((notification) => (
              <div
                key={notification.id}
                className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg"
              >
                <p className="font-medium text-emerald-800 text-sm">
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Dashboard
