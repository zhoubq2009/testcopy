<template>
  <div class="text-center max-w-4xl mx-auto mb-12">
    <!-- Main Title -->
    <h1 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
      AI Reads Science
    </h1>

    <!-- Search Input -->
    <div class="relative mb-6">
      <input
        v-model="searchQuery"
        placeholder="输入关键词或问题"
        class="h-14 text-lg pl-12 pr-20 rounded-2xl border-2 border-gray-200 focus:border-purple-400 shadow-lg w-full focus:outline-none focus:ring-0"
      >
      <Search class="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <div class="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
        <button class="h-8 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium flex items-center">
          <Search class="h-4 w-4 mr-1" />
          Search
        </button>
        <button class="h-8 px-3 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 flex items-center">
          <MessageCircle class="h-4 w-4 mr-1" />
          Chat
        </button>
        <button class="h-8 px-3 py-1 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50 flex items-center">
          <FileText class="h-4 w-4" />
        </button>
      </div>
    </div>

    <!-- Tags -->
    <div class="flex flex-wrap justify-center gap-2 mb-8">
      <span
        v-for="tag in tags"
        :key="tag"
        class="px-3 py-1 rounded-full bg-gray-100 text-gray-800 text-sm"
      >
        {{ tag }}
      </span>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-center space-x-4 mb-8">
      <button class="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-50 flex items-center">
        <img src="https://ext.same-assets.com/3455306590/2954165423.svg" alt="" class="w-4 h-4 mr-2">
        AMiner DeepResearch
      </button>
      <button class="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-50 flex items-center">
        <img src="https://ext.same-assets.com/3455306590/323810556.svg" alt="" class="w-4 h-4 mr-2">
        AMiner 完点
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Search, MessageCircle, FileText } from 'lucide-vue-next'

const searchQuery = ref('')

const tags = ['GPT', 'Language Model', 'Human Feedback', 'CLIP', 'LLaMA']
</script>
