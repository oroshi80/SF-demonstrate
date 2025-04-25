<template>
  <div class="w-full container p-2">
    <h1 class="text-2xl font-bold mb-4">Salesfire Product Search</h1>
    <SearchBar />
    <ResultsSet />
    <!-- <span class="text-2xl">Product Search</span>
    <Search /> -->
  </div>
</template>

<script setup lang="ts">
// import Search from './components/search.vue'
import SearchBar from './components/SearchBar.vue'
import ResultsSet from './components/ResultsSet.vue'
</script>

<style scoped></style>
