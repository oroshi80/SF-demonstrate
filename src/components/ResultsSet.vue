<template>
  <div v-if="store.loading">
    <ring size="40" stroke="5" bg-opacity="0" speed="2" color="green"></ring>
  </div>
  <div v-else-if="store.error">{{ store.error }}</div>
  <div v-else>
    <div class="grid grid-cols-5 gap-4 pt-4">
      <Card
        v-for="item in store.paginatedResults"
        :key="item.id"
        class="border border-gray-400 rounded-md overflow-hidden"
      >
        <template #header>
          <img :src="item.image_url" class="w-full" alt="`{{item.title}}`" />
        </template>
        <template #content>
          <p class="text-center font-semibold">{{ item.title }}</p>
          <p class="text-center pt-2">
            {{ getSymbol(item.price.currency) }}{{ item.price.min.toFixed(2) }}
          </p>
        </template>
        <template #footer>
          <div class="p-2 mt-auto">
            <Button label="View" class="w-full !bg-gray-500 !border-gray-800 !text-white" />
          </div>
        </template>
      </Card>
    </div>
    <Paginator
      v-if="store.totalResults > 0"
      :rows="store.limit"
      :totalRecords="store.totalResults"
      :first="(store.page - 1) * store.limit"
      :rowsPerPageOptions="[10, 20, 50]"
      @page="onPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/SearchStore'
import Paginator from 'primevue/paginator'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { ring } from 'ldrs'

interface PaginatorEvent {
  page: number
  rows: number
}

ring.register()

const store = useSearchStore()

const onPage = (e: PaginatorEvent) => {
  store.setPage(e.page + 1)
  store.setLimit(e.rows)
}

const getSymbol = (code: string) => {
  const map: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' }
  return map[code] || ''
}
</script>
