import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchJobs, type Job, type JobsParams } from '../api/jobsApi'

const DEFAULT_SKILLS = 'JavaScript,React,Redux,Python'

interface JobsState {
  jobs: Job[]
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  search: string
  city: string
  skills: string[]
}

const initialState: JobsState = {
  jobs: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  search: '',
  city: '',
  skills: DEFAULT_SKILLS.split(','),
}

export const loadJobs = createAsyncThunk(
  'jobs/loadJobs',
  async (params: JobsParams) => {
    const response = await fetchJobs(params)
    return response
  },
)

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload
    },
    addSkill(state, action: PayloadAction<string>) {
      const skill = action.payload.trim()
      if (skill && !state.skills.includes(skill)) {
        state.skills.push(skill)
      }
    },
    removeSkill(state, action: PayloadAction<string>) {
      state.skills = state.skills.filter((s) => s !== action.payload)
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload.jobs
        state.totalPages = action.payload.pagination.totalPages
        state.currentPage = action.payload.pagination.currentPage
      })
      .addCase(loadJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Ошибка загрузки'
      })
  },
})

export const { setSearch, setCity, addSkill, removeSkill, setCurrentPage } =
  jobsSlice.actions
export default jobsSlice.reducer
