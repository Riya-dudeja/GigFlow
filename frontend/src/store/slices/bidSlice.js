import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'
import API_URL from '../../config/api'

const BID_URL = `${API_URL}/api/bids`

export const createBid = createAsyncThunk('bid/createBid', async (bidData, thunkAPI) => {
  try {
    const response = await axios.post(BID_URL, bidData)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create bid')
  }
})

export const getBidsForGig = createAsyncThunk('bid/getBidsForGig', async (gigId, thunkAPI) => {
  try {
    const response = await axios.get(`${BID_URL}/${gigId}`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch bids')
  }
})

export const getMyBids = createAsyncThunk('bid/getMyBids', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${BID_URL}/my/bids`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch my bids')
  }
})

export const hireBid = createAsyncThunk('bid/hireBid', async (bidId, thunkAPI) => {
  try {
    const response = await axios.patch(`${BID_URL}/${bidId}/hire`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to hire')
  }
})

const bidSlice = createSlice({
  name: 'bid',
  initialState: {
    bids: [],
    myBids: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Create bid
      .addCase(createBid.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.myBids.unshift(action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(createBid.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get bids for gig
      .addCase(getBidsForGig.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBidsForGig.fulfilled, (state, action) => {
        state.bids = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getBidsForGig.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get my bids
      .addCase(getMyBids.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyBids.fulfilled, (state, action) => {
        state.myBids = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getMyBids.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      .addCase(hireBid.fulfilled, (state, action) => {
        const index = state.bids.findIndex(bid => bid._id === action.payload._id)
        if (index !== -1) {
          state.bids[index] = action.payload
        }
        state.bids = state.bids.map(bid => {
          if (bid._id !== action.payload._id && bid.gigId._id === action.payload.gigId._id) {
            return { ...bid, status: 'rejected' }
          }
          return bid
        })
        state.isLoading = false
        state.error = null
      })
      .addCase(hireBid.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearError } = bidSlice.actions
export default bidSlice.reducer
