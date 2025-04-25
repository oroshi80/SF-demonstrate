import { defineStore } from 'pinia'

interface Product {
  id: string
  title: string
  image_url: string
  price: {
    currency: string
    min: number
    max: number
    original_min: number
    original_max: number
    savings: number
  }
}

export const useSearchStore = defineStore('search', {
  state: () => ({
    results: [] as Product[],
    loading: false,
    error: '',
    query: '',
    page: 1,
    limit: 10,
  }),
  getters: {
    paginatedResults: (state) => {
      const start = (state.page - 1) * state.limit
      return state.results.slice(start, start + state.limit)
    },
    totalResults: (state) => state.results.length,
  },
  actions: {
    async search(query: string) {
      this.loading = true
      this.error = ''
      this.query = query
      this.page = 1

      const client_id = import.meta.env.VITE_SF_CLIENT_ID
      const uuid = import.meta.env.VITE_SF_UUID
      const apiHost = import.meta.env.VITE_SF_API_URL
      const url = `${apiHost}?client_id=${client_id}&Uuid=${uuid}&query=${query}&limit=1000&page=1`

      try {
        const res = await fetch(url)
        const data = await res.json()
        this.results = data.products || []
      } catch (err: unknown) {
        this.error = (err as Error).message || 'Something went wrong';
      } finally {
        this.loading = false
      }
    },
    setPage(newPage: number) {
      this.page = newPage
    },
    setLimit(newLimit: number) {
      this.limit = newLimit
    },
  },
})
