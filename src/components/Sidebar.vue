<template>
  <div class="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
    <!-- Logo -->
    <div class="p-6 border-b border-gray-100">
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <img src="https://ext.same-assets.com/3455306590/258993240.svg" alt="AMiner" class="w-6 h-6">
        </div>
        <span class="text-xl font-bold text-gray-900">AMiner</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <div v-for="section in menuItems" :key="section.category" class="mb-6">
        <h3 class="px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {{ section.category }}
        </h3>
        <div class="space-y-1">
          <button
            v-for="item in section.items"
            :key="item.label"
            class="w-full justify-start px-6 h-10 text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center rounded-none border-none bg-transparent text-left"
          >
            <component :is="item.icon" class="mr-3 h-4 w-4" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </nav>

    <!-- Footer -->
    <div class="p-6 border-t border-gray-100">
      <div class="flex items-center space-x-2 text-sm text-gray-500">
        <span>微信小程序</span>
        <span>•</span>
        <span>旧版功能</span>
      </div>
      <button class="w-full mt-3 h-9 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
        登录
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Search,
  MessageCircle,
  FileText,
  Brain,
  Highlighter,
  Award,
  BookOpen,
  GraduationCap,
  Database,
  Users,
  Folder,
  Library
} from 'lucide-vue-next'

const menuItems = [
  {
    category: '搜索',
    items: [
      { icon: Search, label: 'Search', href: '/' }
    ]
  },
  {
    category: 'Research Agent',
    items: [
      { icon: MessageCircle, label: 'AI Dialogue', href: '/ai-dialogue' },
      { icon: FileText, label: 'AI Paper Companion', href: '/ai-paper' },
      { icon: Brain, label: 'AMiner DeepResearch', href: '/deep-research' },
      { icon: Highlighter, label: 'AMiner Highlight', href: '/highlight' }
    ]
  },
  {
    category: 'Academic Resources',
    items: [
      { icon: Award, label: 'AI2000', href: '/ai2000' },
      { icon: BookOpen, label: 'Journal&Conference', href: '/journal' },
      { icon: GraduationCap, label: 'Scholar Library', href: '/scholar' },
      { icon: Database, label: 'Data API', href: '/api' },
      { icon: Users, label: 'Master Reading Tree', href: '/reading-tree' },
      { icon: Folder, label: 'Open Data', href: '/open-data' }
    ]
  },
  {
    category: 'Knowledge Accumulation',
    items: [
      { icon: Library, label: 'My Library', href: '/library' }
    ]
  }
]
</script>
