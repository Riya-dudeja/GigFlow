import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGigs } from '../store/slices/gigSlice'
import GigCard from '../components/GigCard'
import { motion } from 'framer-motion'

const Home = () => {
  const dispatch = useDispatch()
  const { gigs, isLoading } = useSelector((state) => state.gig)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getGigs())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    const query = search ? `?search=${search}` : ''
    dispatch(getGigs(query))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Discover <span className="text-emerald-600">Opportunities</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-4">Browse available gigs and find your next project</p>
        
        <form onSubmit={handleSearch} className="max-w-2xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-11 pr-20 sm:pr-24 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm text-sm sm:text-base"
            />
            <svg className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch('')
                  dispatch(getGigs())
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : gigs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-2">No gigs found</div>
          <p className="text-sm text-gray-500">Be the first to post a project</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {gigs.map((gig, index) => (
            <motion.div
              key={gig._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <GigCard gig={gig} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default Home
