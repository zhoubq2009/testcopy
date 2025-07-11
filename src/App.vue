<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import TopBanner from './components/TopBanner.vue'
import { useMainStore } from './stores'

const store = useMainStore()

const showNotification = computed(() => store.showNotification)
const notificationMessage = computed(() => store.notificationMessage)
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Banner -->
      <TopBanner />

      <!-- Main Content Area with Router -->
      <main class="flex-1 flex flex-col relative">
        <Transition
          name="page"
          mode="out-in"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <RouterView />
        </Transition>
      </main>
    </div>

    <!-- Global Notification -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-2 scale-95"
    >
      <div
        v-if="showNotification"
        class="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-3 z-50"
      >
        <div class="flex items-center space-x-3">
          <div class="w-2 h-2 bg-green-500 rounded-full" />
          <span class="text-gray-800 font-medium">{{ notificationMessage }}</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Custom page transition styles */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
