import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMyGigs, deleteGig } from '../store/slices/gigSlice'
import toast from 'react-hot-toast'

const MyGigs = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { myGigs, isLoading } = useSelector((state) => state.gig)
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null, title: '' })

  useEffect(() => {
    dispatch(getMyGigs())
  }, [dispatch])

  const handleDelete = async (id, title) => {
    setDeleteModal({ show: true, id, title })
  }

  const confirmDelete = async () => {
    try {
      await dispatch(deleteGig(deleteModal.id)).unwrap()
      toast.success('Gig deleted successfully!')
      setDeleteModal({ show: false, id: null, title: '' })
    } catch (err) {
      toast.error(err || 'Failed to delete gig')
    }
  }

  const cancelDelete = () => {
    setDeleteModal({ show: false, id: null, title: '' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-medium text-gray-800 tracking-tight">My Posted Gigs</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Manage and track your posted projects</p>
        </div>
        <button
          onClick={() => navigate('/create-gig')}
          className="bg-gray-900 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-gray-800 font-medium transition-colors text-sm sm:text-base w-full sm:w-auto"
        >
          Post New Gig
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading your gigs...</div>
      ) : myGigs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          You haven't posted any gigs yet
        </div>
      ) : (
        <div className="space-y-4">
          {myGigs.map((gig) => (
            <div
              key={gig._id}
              className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{gig.title}</h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                        gig.status === 'open'
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {gig.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 leading-relaxed line-clamp-2 text-sm">
                    {gig.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      ${gig.budget}
                    </span>
                    <span className="text-xs text-gray-500">project budget</span>
                  </div>
                  {gig.assignedTo && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-900 text-sm">
                        <span className="font-semibold">Assigned to:</span> {gig.assignedTo.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
                <button
                  onClick={() => navigate(`/gig/${gig._id}`)}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  View Details
                </button>
                {gig.status === 'open' && (
                  <button
                    onClick={() => handleDelete(gig._id, gig.title)}
                    className="border border-red-300 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete "{deleteModal.title}"</h3>
                <p className="text-sm text-gray-600">
                  This action cannot be undone. All bids associated with this gig will be permanently removed.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyGigs
