import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import gigReducer from './slices/gigSlice'
import bidReducer from './slices/bidSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gig: gigReducer,
    bid: bidReducer,
    notification: notificationReducer,
  },
})
