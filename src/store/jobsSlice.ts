import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { fetchJobs, fetchJob, type Job, type JobDetail, type JobsParams } from '../api/jobsApi'

interface JobsState {
  jobs: Job[]
  totalPages: number
  currentPage: number
  loading: boolean
  error: string | null
  search: string
  city: string
  skills: string[]
  jobDetail: JobDetail | null
  jobDetailLoading: boolean
  jobDetailError: string | null
}

const initialState: JobsState = {
  jobs: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  error: null,
  search: '',
  city: '',
  skills: [],
  jobDetail: null,
  jobDetailLoading: false,
  jobDetailError: null,
}

export const loadJobs = createAsyncThunk(
  'jobs/loadJobs',
  async (params: JobsParams) => {
    const response = await fetchJobs(params)
    return response
  },
)

export const loadJob = createAsyncThunk(
  'jobs/loadJob',
  async (id: number) => {
    const response = await fetchJob(id)
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
    setSkills(state, action: PayloadAction<string[]>) {
      state.skills = action.payload
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
      .addCase(loadJob.pending, (state) => {
        state.jobDetailLoading = true
        state.jobDetailError = null
      })
      .addCase(loadJob.fulfilled, (state, action) => {
        state.jobDetailLoading = false
        state.jobDetail = action.payload.job
      })
      .addCase(loadJob.rejected, (state, action) => {
        state.jobDetailLoading = false
        state.jobDetailError = action.error.message || 'Ошибка загрузки вакансии'
      })
  },
})

export const { setSearch, setCity, addSkill, removeSkill, setSkills, setCurrentPage } =
  jobsSlice.actions
export default jobsSlice.reducer
