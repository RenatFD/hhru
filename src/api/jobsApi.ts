const BASE_URL = 'https://kata-jobs.onrender.com/api'

export interface Job {
  id: number
  company_name: string
  name: string
  city: string
  salary: string
  published_at: string
  short_description: string
  space: 'office' | 'remote' | 'hybrid'
  skills: string
  experience: string
}

export interface JobsResponse {
  success: boolean
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  jobs: Job[]
}

export interface JobsParams {
  search?: string
  city?: string
  skills?: string
  page?: number
}

export async function fetchJobs(params: JobsParams = {}): Promise<JobsResponse> {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.city) query.set('city', params.city)
  if (params.skills) query.set('skills', params.skills)
  if (params.page) query.set('page', String(params.page))

  const url = `${BASE_URL}/jobs${query.toString() ? '?' + query.toString() : ''}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to fetch jobs')
  return res.json()
}
