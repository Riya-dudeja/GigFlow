import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute
