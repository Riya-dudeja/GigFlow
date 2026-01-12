import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyBids } from '../store/slices/bidSlice'

const MyBids = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { myBids, isLoading } = useSelector((state) => state.bid)

  useEffect(() => {
    dispatch(getMyBids())
  }, [dispatch])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 sm:mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-xl sm:text-2xl font-medium text-gray-800 tracking-tight mb-1">My Bid Applications</h1>
        <p className="text-xs sm:text-sm text-gray-500">Track your submitted proposals and their status</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading your bids...</div>
      ) : myBids.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't submitted any bids yet
        </div>
      ) : (
        <div className="space-y-4">
          {myBids.map((bid) => (
            <div
              key={bid._id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">
                    {bid.gigId.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                    <span>Budget: <span className="font-medium text-gray-900">${bid.gigId.budget}</span></span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bid.gigId.status === 'open'
                        ? 'bg-blue-100 text-blue-800'
                        : bid.gigId.status === 'assigned'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {bid.gigId.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    ${bid.price}
                  </p>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      bid.status === 'hired'
                        ? 'bg-emerald-100 text-emerald-800'
                        : bid.status === 'rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {bid.status}
                  </span>
                </div>
              </div>

              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Your Proposal
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{bid.message}</p>
              </div>

              {bid.status === 'hired' && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-gray-900 font-medium text-sm">
                      Congratulations! You've been hired for this project.
                    </p>
                  </div>
                </div>
              )}

              {bid.status === 'rejected' && (
                <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="text-red-800 text-sm">
                    This bid was not accepted.
                  </p>
                </div>
              )}

              <button
                onClick={() => navigate(`/gig/${bid.gigId._id}`)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                View Gig Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBids
