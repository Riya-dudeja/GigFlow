import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getGig } from '../store/slices/gigSlice'
import { createBid, getBidsForGig, hireBid } from '../store/slices/bidSlice'
import toast from 'react-hot-toast'

const GigDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { currentGig, isLoading: gigLoading } = useSelector((state) => state.gig)
  const { bids, isLoading: bidLoading } = useSelector((state) => state.bid)
  const { user } = useSelector((state) => state.auth)
  
  const [showBidForm, setShowBidForm] = useState(false)
  const [bidData, setBidData] = useState({
    message: '',
    price: '',
  })

  useEffect(() => {
    dispatch(getGig(id))
  }, [dispatch, id])

  useEffect(() => {
    if (currentGig && user && currentGig.ownerId._id === user._id) {
      dispatch(getBidsForGig(id))
    }
  }, [dispatch, id, currentGig, user])

  const handleBidSubmit = async (e) => {
    e.preventDefault()
    
    try {
      await dispatch(createBid({ ...bidData, gigId: id })).unwrap()
      toast.success('Bid submitted successfully!')
      setShowBidForm(false)
      setBidData({ message: '', price: '' })
    } catch (err) {
      toast.error(err || 'Failed to submit bid')
    }
  }

  const handleHire = async (bidId) => {
    if (!window.confirm('Are you sure you want to hire this freelancer?')) {
      return
    }
    
    try {
      await dispatch(hireBid(bidId)).unwrap()
      toast.success('Freelancer hired successfully!')
      dispatch(getGig(id))
    } catch (err) {
      toast.error(err || 'Failed to hire freelancer')
    }
  }

  if (gigLoading || !currentGig) {
    return <div className="text-center py-8">Loading gig details...</div>
  }

  const isOwner = user && currentGig.ownerId._id === user._id
  const canBid = user && !isOwner && currentGig.status === 'open'

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 group"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm font-medium">Back</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                  {currentGig.title}
                </h1>
                <div className="flex items-center gap-3 sm:gap-4 text-sm flex-wrap">
                  <span className="text-gray-600">{currentGig.ownerId.name}</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentGig.status === 'open' 
                      ? 'bg-blue-100 text-blue-800' 
                      : currentGig.status === 'assigned'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {currentGig.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-xs sm:text-sm text-gray-500 mb-1">PROJECT BUDGET</div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">${currentGig.budget}</div>
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {currentGig.description}
            </p>
          </div>

          {currentGig.assignedTo && (
            <div className="mx-4 sm:mx-6 lg:mx-8 mb-6 px-4 sm:px-5 py-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-medium text-blue-900 uppercase tracking-wide">Assigned Freelancer</div>
                  <div className="text-sm sm:text-base font-semibold text-blue-900">{currentGig.assignedTo.name}</div>
                </div>
              </div>
            </div>
          )}

          {canBid && !showBidForm && (
            <div className="px-4 sm:px-6 lg:px-8 pb-6 border-t border-gray-200">
              <button
                onClick={() => setShowBidForm(true)}
                className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Submit a Proposal
              </button>
            </div>
          )}

          {canBid && showBidForm && (
            <div className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-6 border-t border-gray-200 bg-gray-50">
              <form onSubmit={handleBidSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proposal Details
                  </label>
                  <textarea
                    value={bidData.message}
                    onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
                    required
                    rows="5"
                    placeholder="Why are you the right person for this job? Share your experience and how you'll complete this project."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={bidData.price}
                      onChange={(e) => setBidData({ ...bidData, price: e.target.value })}
                      required
                      min="0"
                      placeholder="0.00"
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-lg font-medium"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Client budget: <span className="font-medium text-gray-700">${currentGig.budget}</span></p>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={bidLoading}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                  >
                    {bidLoading ? 'Submitting...' : 'Submit Proposal'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBidForm(false)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-white font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {isOwner && bids.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-8 py-5 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Proposals Received</h2>
                <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2.5 bg-gray-900 text-white text-sm font-medium rounded-full">
                  {bids.length}
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {bids.map((bid) => (
                <div key={bid._id} className="px-8 py-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-medium text-lg">
                        {bid.freelancerId.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{bid.freelancerId.name}</h3>
                        <p className="text-sm text-gray-500">{bid.freelancerId.email}</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-2xl font-bold text-gray-900 mb-2">${bid.price}</div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                        bid.status === 'hired'
                          ? 'bg-green-100 text-green-800'
                          : bid.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bid.status}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4">
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Proposal</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{bid.message}</p>
                  </div>

                  {bid.status === 'pending' && currentGig.status === 'open' && (
                    <button
                      onClick={() => handleHire(bid._id)}
                      disabled={bidLoading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-medium transition-colors"
                    >
                      Accept & Hire
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GigDetails
