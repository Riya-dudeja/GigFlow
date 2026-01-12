import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createGig } from '../store/slices/gigSlice'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

const CreateGig = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.gig)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await dispatch(createGig(formData)).unwrap()
      toast.success('Gig created successfully!')
      navigate('/my-gigs')
    } catch (err) {
      toast.error(err || 'Failed to create gig')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">Post a New Gig</h1>
        <p className="text-sm sm:text-base text-gray-600">Describe your project and find the right freelancer</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Project Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Need a React developer for dashboard"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Describe your project requirements, timeline, and any specific skills needed..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Budget (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-gray-500">$</span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="0"
                placeholder="500"
                className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/60"
            >
              {isLoading ? 'Creating...' : 'Post Gig'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

export default CreateGig
