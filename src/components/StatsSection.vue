<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
    <div v-for="stat in stats" :key="stat.label" class="text-center">
      <div class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        {{ stat.value }}
      </div>
      <div class="text-sm text-gray-600 font-medium">
        {{ stat.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const stats = [
  { label: 'Researchers', value: '57,301,155' },
  { label: 'Publications', value: '310,894,820' },
  { label: 'Concepts', value: '8,938,648' },
  { label: 'Citations', value: '2,525,334,662' }
]
</script>
