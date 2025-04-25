<template>
  <div class="flex gap-2">
    <InputText v-model="query" @keydown.enter="onInput" placeholder="Search..." />
    <Button :disabled="loading" @click="triggerSearch">Search</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSearchStore } from '@/stores/SearchStore'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'

const store = useSearchStore()
const query = ref('')

const loading = computed(() => store.loading)

const triggerSearch = () => {
  store.search(query.value)
}

const onInput = () => {
  store.search(query.value)
}
</script>
