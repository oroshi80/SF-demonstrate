import { defineStore } from 'pinia'

const client_id = import.meta.env.VITE_SF_CLIENT_ID
const uuid = import.meta.env.VITE_SF_UUID
const apiHost = import.meta.env.VITE_SF_API_URL

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    results: [],
    page: 1,
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchResults() {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(
          `${apiHost}?client_id=${client_id}&Uuid=${uuid}&query=${this.query}&limit=10&page=${this.page}`
        )
        const data = await res.json()
        this.results = data.results || data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})
