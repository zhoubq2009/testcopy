<script setup lang="ts">
import Sidebar from './components/Sidebar.vue'
import TopBanner from './components/TopBanner.vue'
import SearchComponent from './components/SearchComponent.vue'
import StatsSection from './components/StatsSection.vue'
import PaperList from './components/PaperList.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Left Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Top Banner -->
      <TopBanner />

      <!-- Main Content Area -->
      <main class="flex-1 p-6">
        <!-- Search Section -->
        <SearchComponent />

        <!-- Statistics -->
        <StatsSection />

        <!-- Paper Listings -->
        <PaperList />
      </main>
    </div>
  </div>
</template>
