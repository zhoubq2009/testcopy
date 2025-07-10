<template>
  <div class="bg-gradient-to-r from-purple-100 to-blue-100 border-b border-gray-200">
    <div class="flex items-center justify-between px-6 py-3">
      <div class="flex items-center space-x-3">
        <img
          src="https://ext.same-assets.com/3455306590/3946150616.svg"
          alt="GLM"
          class="w-6 h-6"
        >
        <span class="text-gray-800 font-medium">
          GLM-4.1V-Thinking 上线：不止看得懂，更能想得深，10B级通用视觉模型新标杆！
        </span>
      </div>
      <button class="h-8 w-8 p-0 flex items-center justify-center hover:bg-gray-100 rounded">
        <X class="h-4 w-4 text-gray-500" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next'
</script>
