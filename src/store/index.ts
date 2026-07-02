import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import jobsReducer from './jobsSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    jobs: jobsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
