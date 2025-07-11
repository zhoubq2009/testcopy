import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Paper {
  title: string
  authors: string[]
  journal: string
  year: string
  cited: number
  views: number
  rating?: number | null
  topic: string
}

export interface User {
  id?: string
  name?: string
  avatar?: string
  isLoggedIn: boolean
}

export interface ChatMessage {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export const useMainStore = defineStore('main', () => {
  // User state
  const user = ref<User>({
    isLoggedIn: false
  })

  // Search state
  const searchQuery = ref('')
  const searchHistory = ref<string[]>([])
  const searchSuggestions = ref<string[]>([
    'GPT', 'Language Model', 'Human Feedback', 'CLIP', 'LLaMA',
    'Transformer', 'Neural Networks', 'Machine Learning', 'Deep Learning'
  ])

  // Papers state
  const papers = ref<Paper[]>([
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
  ])

  const topPapers = ref<Paper[]>([
    {
      title: "SparQ Attention: Bandwidth-Efficient LLM Inference",
      authors: ["Luka Ribar", "Ivan Chelombiev", "Luke Hudlass-Galley"],
      journal: "arXiv",
      year: "2024",
      cited: 50,
      views: 11861,
      rating: 3.5,
      topic: "Efficient LLM Inference"
    },
    {
      title: "When Do We Not Need Larger Vision Models",
      authors: ["Baifeng Shi", "Ziyang Wu", "Maolin Mao"],
      journal: "ICLR",
      year: "2024",
      cited: 49,
      views: 9664,
      rating: 5.0,
      topic: "Vision Models"
    }
  ])

  // Chat state
  const chatMessages = ref<ChatMessage[]>([])
  const chatMode = ref<'qa' | 'summary'>('qa')
  const isGenerating = ref(false)

  // UI state
  const sidebarCollapsed = ref(false)
  const activeTab = ref('explore')
  const showNotification = ref(false)
  const notificationMessage = ref('')

  // Statistics
  const stats = ref([
    { label: 'Researchers', value: '57,301,155' },
    { label: 'Publications', value: '310,894,820' },
    { label: 'Concepts', value: '8,938,648' },
    { label: 'Citations', value: '2,525,334,662' }
  ])

  // Computed
  const totalPapers = computed(() => papers.value.length)
  const totalViews = computed(() => papers.value.reduce((sum, paper) => sum + paper.views, 0))
  const hasMessages = computed(() => chatMessages.value.length > 0)

  // Actions
  const login = (userData: Partial<User>) => {
    user.value = { ...user.value, ...userData, isLoggedIn: true }
    showNotificationMessage('登录成功')
  }

  const logout = () => {
    user.value = { isLoggedIn: false }
    showNotificationMessage('已退出登录')
  }

  const updateSearchQuery = (query: string) => {
    searchQuery.value = query
    if (query && !searchHistory.value.includes(query)) {
      searchHistory.value.unshift(query)
      if (searchHistory.value.length > 10) {
        searchHistory.value = searchHistory.value.slice(0, 10)
      }
    }
  }

  const addChatMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    chatMessages.value.push(newMessage)
  }

  const clearChat = () => {
    chatMessages.value = []
  }

  const setChatMode = (mode: 'qa' | 'summary') => {
    chatMode.value = mode
  }

  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const setActiveTab = (tab: string) => {
    activeTab.value = tab
  }

  const showNotificationMessage = (message: string) => {
    notificationMessage.value = message
    showNotification.value = true
    setTimeout(() => {
      showNotification.value = false
    }, 3000)
  }

  const updatePaperViews = (paperTitle: string) => {
    const paper = papers.value.find(p => p.title === paperTitle)
    if (paper) {
      paper.views += 1
    }
  }

  return {
    // State
    user,
    searchQuery,
    searchHistory,
    searchSuggestions,
    papers,
    topPapers,
    chatMessages,
    chatMode,
    isGenerating,
    sidebarCollapsed,
    activeTab,
    showNotification,
    notificationMessage,
    stats,

    // Computed
    totalPapers,
    totalViews,
    hasMessages,

    // Actions
    login,
    logout,
    updateSearchQuery,
    addChatMessage,
    clearChat,
    setChatMode,
    toggleSidebar,
    setActiveTab,
    showNotificationMessage,
    updatePaperViews
  }
})
