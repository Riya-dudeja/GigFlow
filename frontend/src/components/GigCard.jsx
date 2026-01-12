import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const GigCard = ({ gig }) => {
  return (
    <Link to={`/gig/${gig._id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-5 hover:border-emerald-400 hover:shadow-md transition-all cursor-pointer h-full flex flex-col"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="text-lg font-medium text-gray-900 flex-1 line-clamp-2">{gig.title}</h3>
          <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-medium whitespace-nowrap">
            {gig.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">{gig.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-semibold text-gray-900">${gig.budget}</span>
          </div>
          <div className="text-xs text-gray-500">
            by {gig.ownerId?.name || 'Unknown'}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default GigCard
