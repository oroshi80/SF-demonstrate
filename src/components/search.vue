<template>
  <div class="w-full">
    <div class="w-full flex gap-2">
      <InputText
        v-model="query"
        placeholder="Search..."
        @keydown.enter="search"
        class="p-1 border border-gray-400 rounded"
      />
      <Button
        @click="search"
        :disabled="loading"
        class="p-1 bg-blue-500 rounded text-white hover:bg-blue-900 cursor-pointer"
      >
        Search
      </Button>
    </div>

    <div v-if="loading" class="w-full flex justify-center p-2">
      <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="green"></l-ring>
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-if="paginatedResults.length">
      <div class="pt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card
          v-for="item in paginatedResults"
          :key="item.id"
          class="border border-gray-400 rounded-md overflow-hidden w-full"
        >
          <template #header>
            <img :src="item.image_url" alt="Product Image" class="product-image" />
          </template>
          <template #content>
            <p class="text-center">
              <span class="font-bold">{{ item.title }}</span>
            </p>
            <p class="text-center">
              From {{ getCurrencySymbol(item.price.currency) }}{{ item.price.min.toFixed(2) }}
            </p>
          </template>
          <template #footer>
            <div class="flex gap-4 mt-1 items-bottom">
              <Button label="View" class="w-full !bg-gray-500 !border-gray-800 !text-white" />
            </div>
          </template>
        </Card>
      </div>
      {{ console.log(page, page.value) }}
      <Paginator
        :rows="limit"
        :totalRecords="results.length"
        :first="(page.value - 1) * limit"
        :rowsPerPageOptions="[10, 20, 50]"
        @page="onPageChange"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
        class="my-4"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Paginator from 'primevue/paginator'
import { ring } from 'ldrs'

ring.register()

interface SearchResult {
  id: string
  title: string
  image_url: string
  price: {
    currency: string
    max: number
    min: number
    original_max: number
    original_min: number
    savings: number
  }
}

const query = ref('')
const results = ref<SearchResult[]>([])
const page = ref(1)
const limit = ref(10) // Initially 10 items per page
const loading = ref(false)
const error = ref<string | null>(null)

const currency = [
  {
    code: 'USD',
    symbol: '$',
  },
  {
    code: 'EUR',
    symbol: '€',
  },
  {
    code: 'GBP',
    symbol: '£',
  },
]

const getCurrencySymbol = (currencyCode: string) => {
  const currencyObj = currency.find((c) => c.code === currencyCode)
  return currencyObj ? currencyObj.symbol : ''
}

const client_id = import.meta.env.VITE_SF_CLIENT_ID
const uuid = import.meta.env.VITE_SF_UUID
const apiHost = import.meta.env.VITE_SF_API_URL

const search = async () => {
  loading.value = true
  error.value = null
  results.value = []

  try {
    const res = await axios.get(apiHost, {
      params: {
        client_id,
        Uuid: uuid,
        query: query.value,
        limit: 1000, // Retrieve all results from the server
        page: page.value,
      },
    })

    results.value = res.data.products || []
    console.log(results.value)
  } catch (err: any) {
    error.value = err.message || 'Something went wrong.'
  } finally {
    loading.value = false
  }
}

const onPageChange = (event: any) => {
  page.value = event.page + 1
  limit.value = event.rows
  search() // Trigger a new search on page change
}

const paginatedResults = computed(() => {
  console.log(results.value, page.value, limit.value)
  const start = (page.value - 1) * limit.value
  return results.value.slice(start, start + limit.value)
})
</script>

<style scoped>
.error {
  color: red;
}
.pagination {
  margin-top: 10px;
}
</style>
