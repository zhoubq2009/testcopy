<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Follow/Explore Section -->
    <div class="flex space-x-8">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-6">
          <div class="flex space-x-6">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="activeTab = tab.name"
              :class="[
                'text-lg font-semibold border-b-2 pb-2',
                activeTab === tab.name
                  ? 'text-purple-600 border-purple-500'
                  : 'text-gray-600 border-transparent hover:border-purple-500'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
          <button class="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-50 flex items-center">
            <Plus class="h-4 w-4 mr-2" />
            Add Subscription
          </button>
        </div>

        <p class="text-gray-600 mb-6">
          Input keywords, let AI filter and summarize latest papers
        </p>

        <p class="text-sm text-gray-500 mb-8">
          The following are popular content recommendations, and the recommendations are more accurate after adding subscriptions
        </p>

        <!-- Topic Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium">Topic</span>
              <span class="font-medium">Hardware-Aligned and Natively Trainable Sparse Attention</span>
            </div>
            <button class="text-purple-600 text-sm hover:underline">
              More topics →
            </button>
          </div>
          <p class="text-sm text-gray-600 mb-6">
            The latest paper from DeepSeek introduces a new attention mechanism — NSA, a locally trainable sparse attention mechanism for ultra-fast long-context training and inference.
          </p>

          <!-- Paper Cards -->
          <div class="space-y-4">
            <div
              v-for="(paper, index) in papers"
              :key="index"
              class="border border-gray-200 hover:shadow-lg transition-shadow rounded-lg p-6"
            >
              <div class="flex items-start space-x-4">
                <img
                  src="https://ext.same-assets.com/3455306590/3464103035.svg"
                  alt=""
                  class="w-5 h-5 mt-1"
                >
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                    {{ paper.title }}
                  </h3>
                  <p class="text-sm text-gray-600 mb-3">
                    {{ paper.authors.join(', ') }}
                  </p>
                  <div class="flex items-center space-x-4 mb-4">
                    <img
                      src="https://ext.same-assets.com/3455306590/2208424882.svg"
                      alt=""
                      class="w-4 h-4"
                    >
                    <span class="text-sm text-gray-600">{{ paper.journal }} {{ paper.year }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-6">
                      <div class="flex items-center space-x-1 text-sm text-gray-500">
                        <Quote class="h-4 w-4" />
                        <span>Cited {{ paper.cited }}</span>
                      </div>
                      <div class="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye class="h-4 w-4" />
                        <span>Views {{ paper.views }}</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2">
                      <button class="p-1 hover:bg-gray-100 rounded">
                        <Download class="h-4 w-4" />
                      </button>
                      <button class="p-1 hover:bg-gray-100 rounded">
                        <Quote class="h-4 w-4" />
                      </button>
                      <button class="p-1 hover:bg-gray-100 rounded">
                        <MessageCircle class="h-4 w-4" />
                      </button>
                      <div v-if="paper.rating" class="flex items-center space-x-1">
                        <Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span class="text-sm">{{ paper.rating }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button class="w-full mt-4 text-purple-600 hover:underline">
            Expand all 5 New Papers
          </button>
        </div>

        <!-- Hot Section -->
        <div class="mb-8">
          <div class="flex items-center space-x-2 mb-4">
            <TrendingUp class="h-5 w-5 text-orange-500" />
            <span class="font-medium">Hot</span>
          </div>
          <p class="text-sm text-gray-600 mb-6">Top100 papers viewed in last 7 days</p>

          <div class="space-y-4">
            <div
              v-for="(paper, index) in topPapers"
              :key="index"
              class="border border-gray-200 hover:shadow-lg transition-shadow rounded-lg p-4"
            >
              <h3 class="font-semibold text-gray-900 mb-2 hover:text-purple-600 cursor-pointer">
                {{ paper.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-3">
                {{ paper.authors.join(', ') }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="flex items-center space-x-1 text-sm text-gray-500">
                    <Quote class="h-4 w-4" />
                    <span>{{ paper.cited }}</span>
                  </div>
                  <div class="flex items-center space-x-1 text-sm text-gray-500">
                    <Eye class="h-4 w-4" />
                    <span>{{ paper.views }}</span>
                  </div>
                </div>
                <div class="flex items-center space-x-1">
                  <Star class="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span class="text-sm">{{ paper.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Download, Quote, MessageCircle, Star, Eye, TrendingUp, Plus } from 'lucide-vue-next'

const activeTab = ref('explore')

const tabs = [
  { name: 'follow', label: 'Follow' },
  { name: 'explore', label: 'Explore' },
  { name: 'trend', label: 'Trend' }
]

const papers = [
  {
    title: "Multi-Dimensional Insights: Benchmarking Real-World Personalization in Large Multimodal Models",
    authors: ["YiFan Zhang", "Shanglin Lei", "Runqi Qiao", "Zhuoma GongQue"],
    journal: "CoRR",
    year: "2024",
    cited: 0,
    views: 14346,
    rating: 4.5,
    topic: "Hardware-Aligned and Natively Trainable Sparse Attention"
  },
  {
    title: "OmniEval: an Omnidirectional and Automatic RAG Evaluation Benchmark in Financial Domain",
    authors: ["Shuting Wang", "Jiejun Tan", "Zhicheng Dou", "Ji-Rong Wen"],
    journal: "CoRR",
    year: "2024",
    cited: 7,
    views: 3599,
    rating: null,
    topic: "Hardware-Aligned and Natively Trainable Sparse Attention"
  },
  {
    title: "Are Your LLMs Capable of Stable Reasoning",
    authors: ["Junnan Liu", "Hongwei Liu", "Linchen Xiao", "Ziyi Wang"],
    journal: "Computing Research Repository",
    year: "2024",
    cited: 7,
    views: 2942,
    rating: null,
    topic: "Hardware-Aligned and Natively Trainable Sparse Attention"
  }
]

const topPapers = [
  {
    title: "SparQ Attention: Bandwidth-Efficient LLM Inference",
    authors: ["Luka Ribar", "Ivan Chelombiev", "Luke Hudlass-Galley"],
    cited: 50,
    views: 11861,
    rating: 3.5
  },
  {
    title: "When Do We Not Need Larger Vision Models",
    authors: ["Baifeng Shi", "Ziyang Wu", "Maolin Mao"],
    cited: 49,
    views: 9664,
    rating: 5.0
  }
]
</script>
