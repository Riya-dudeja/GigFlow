import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../config/axios'
import API_URL from '../../config/api'

const GIG_URL = `${API_URL}/api/gigs`

export const getGigs = createAsyncThunk('gig/getGigs', async (query = '', thunkAPI) => {
  try {
    const response = await axios.get(`${GIG_URL}${query}`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch gigs')
  }
})

export const getGig = createAsyncThunk('gig/getGig', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${GIG_URL}/${id}`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch gig')
  }
})

export const createGig = createAsyncThunk('gig/createGig', async (gigData, thunkAPI) => {
  try {
    const response = await axios.post(GIG_URL, gigData)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create gig')
  }
})

export const getMyGigs = createAsyncThunk('gig/getMyGigs', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${GIG_URL}/my/posted`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch my gigs')
  }
})

export const updateGig = createAsyncThunk('gig/updateGig', async ({ id, data }, thunkAPI) => {
  try {
    const response = await axios.put(`${GIG_URL}/${id}`, data)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update gig')
  }
})

export const deleteGig = createAsyncThunk('gig/deleteGig', async (id, thunkAPI) => {
  try {
    await axios.delete(`${GIG_URL}/${id}`)
    return id
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete gig')
  }
})

const gigSlice = createSlice({
  name: 'gig',
  initialState: {
    gigs: [],
    currentGig: null,
    myGigs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentGig: (state) => {
      state.currentGig = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all gigs
      .addCase(getGigs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGigs.fulfilled, (state, action) => {
        state.gigs = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getGigs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get single gig
      .addCase(getGig.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getGig.fulfilled, (state, action) => {
        state.currentGig = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getGig.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create gig
      .addCase(createGig.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createGig.fulfilled, (state, action) => {
        state.gigs.unshift(action.payload)
        state.isLoading = false
        state.error = null
      })
      .addCase(createGig.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get my gigs
      .addCase(getMyGigs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMyGigs.fulfilled, (state, action) => {
        state.myGigs = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(getMyGigs.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete gig
      .addCase(deleteGig.fulfilled, (state, action) => {
        state.myGigs = state.myGigs.filter(gig => gig._id !== action.payload)
      })
  },
})

export const { clearError, clearCurrentGig } = gigSlice.actions
export default gigSlice.reducer
