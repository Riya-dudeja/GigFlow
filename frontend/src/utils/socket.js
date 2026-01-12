import { io } from 'socket.io-client'
import { store } from '../store/store'
import { addNotification } from '../store/slices/notificationSlice'
import toast from 'react-hot-toast'

let socket = null

export const initSocket = (userId) => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      withCredentials: true,
    })

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id)
      socket.emit('join', userId)
    })

    socket.on('hired', (data) => {
      console.log('Hired notification received:', data)
      
      store.dispatch(addNotification({
        type: 'hired',
        message: data.message,
        gigId: data.gigId,
        gigTitle: data.gigTitle,
        bidId: data.bidId,
      }));

      toast.success(data.message, {
        duration: 5000,
      })
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })
  }

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const getSocket = () => socket
