<template>
  <div class="flex-1 p-6 bg-white">
    <!-- Search Section -->
    <SearchComponent />

    <!-- Statistics -->
    <StatsSection />

    <!-- Tab Navigation -->
    <div class="max-w-4xl mx-auto mb-8">
      <div class="flex items-center justify-between border-b border-gray-200">
        <div class="flex space-x-8">
          <button
            class="pb-3 border-b-2 border-purple-500 text-purple-600 font-medium"
            :class="activeTab === 'explore' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
            @click="setActiveTab('explore')"
          >
            Explore
          </button>
          <button
            class="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            :class="activeTab === 'follow' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
            @click="setActiveTab('follow')"
          >
            Follow
          </button>
          <button
            class="pb-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700"
            :class="activeTab === 'trend' ? 'border-purple-500 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
            @click="setActiveTab('trend')"
          >
            Trend
          </button>
        </div>
        <button class="text-sm text-gray-600 border border-gray-300 rounded px-3 py-1 hover:bg-gray-50 flex items-center">
          <Plus class="w-4 h-4 mr-1" />
          添加订阅
        </button>
      </div>
    </div>

    <!-- Content Description -->
    <div class="max-w-4xl mx-auto mb-6">
      <p class="text-gray-600">
        输入关键词，让AI筛选和总结最新论文
      </p>
      <p class="text-gray-500 text-sm mt-1">
        以下为热门内容推荐，添加订阅后推荐更精准
      </p>
    </div>

    <!-- Paper Listings -->
    <PaperList />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Plus } from 'lucide-vue-next'
import SearchComponent from '../components/SearchComponent.vue'
import StatsSection from '../components/StatsSection.vue'
import PaperList from '../components/PaperList.vue'
import { useMainStore } from '../stores'

const store = useMainStore()

const activeTab = computed(() => store.activeTab)

const setActiveTab = (tab: string) => {
  store.setActiveTab(tab)
}
</script>
