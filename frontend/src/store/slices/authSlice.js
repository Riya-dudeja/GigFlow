import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import API_URL from '../../config/api'

const AUTH_URL = `${API_URL}/api/auth`

axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true

export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${AUTH_URL}/me`)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Not authenticated')
  }
})

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${AUTH_URL}/register`, userData)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed')
  }
})

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, userData)
    return response.data.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Login failed')
  }
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post(`${AUTH_URL}/logout`)
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Logout failed')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null
        state.isLoading = false
      })
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload
        state.isLoading = false
        state.error = null
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.error = null
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
