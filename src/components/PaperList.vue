<template>
  <div class="max-w-6xl mx-auto space-y-8">
    <!-- Paper Content Section -->
    <div class="flex space-x-8">
      <div class="flex-1">

        <!-- Topic Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-2">
              <span class="bg-purple-100 text-purple-700 px-3 py-1 rounded text-sm font-medium">Topic</span>
              <span class="font-medium">Hardware-Aligned and Natively Trainable Sparse Attention</span>
            </div>
            <button class="text-purple-600 text-sm hover:underline">
              更多主题 →
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
                        <span>被引 {{ paper.cited }}</span>
                      </div>
                      <div class="flex items-center space-x-1 text-sm text-gray-500">
                        <Eye class="h-4 w-4" />
                        <span>浏览 {{ paper.views }}</span>
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
            展开全部 5 篇新论文
          </button>
        </div>

        <!-- Hot Section -->
        <div class="mb-8">
          <div class="flex items-center space-x-2 mb-4">
            <TrendingUp class="h-5 w-5 text-orange-500" />
            <span class="font-medium">Hot</span>
          </div>
          <p class="text-sm text-gray-600 mb-6">最近7天浏览量前100的论文</p>

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
import { Download, Quote, MessageCircle, Star, Eye, TrendingUp } from 'lucide-vue-next'

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
