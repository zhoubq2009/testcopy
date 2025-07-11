<template>
  <div class="slide-bar-placeholder w-64"></div>
  <div
    :class="[
      'fixed top-0 left-0 z-1 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300',
      sidebarCollapsed ? 'w-16' : 'w-64',
    ]"
  >
    <!-- Logo -->
    <div class="border-b border-gray-100 p-6">
      <div class="flex items-center space-x-2">
        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600"
        >
          <img
            src="https://ext.same-assets.com/3455306590/258993240.svg"
            alt="AMiner"
            class="h-6 w-6"
          />
        </div>
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 w-0"
          enter-to-class="opacity-100 w-auto"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 w-auto"
          leave-to-class="opacity-0 w-0"
        >
          <span v-if="!sidebarCollapsed" class="text-xl font-bold text-gray-900">AMiner</span>
        </Transition>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <el-menu
        :default-active="activeIndex"
        class="border-none"
        @select="handleMenuSelect"
        :collapse="sidebarCollapsed"
        :collapse-transition="true"
      >
        <div v-for="section in menuItems" :key="section.category">
          <el-menu-item-group v-if="!sidebarCollapsed" :title="section.category">
            <el-menu-item v-for="item in section.items" :key="item.label" :index="item.href">
              <el-icon class="!mr-3"><component :is="item.icon" /></el-icon>
              <span>{{ item.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item
            v-else
            v-for="item in section.items"
            :key="item.label"
            :index="item.href"
            class="!pl-6"
          >
            <el-icon class="!mr-3"><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </div>
      </el-menu>
    </nav>

    <!-- Footer -->
    <div class="border-t border-gray-100">
      <!-- Collapse Toggle -->
      <!-- <button
        @click="toggleSidebar"
        class="mb-4 flex w-full items-center justify-center rounded-lg p-2 transition-colors hover:bg-gray-100"
        :title="sidebarCollapsed ? '展开侧边栏' : '折叠侧边栏'"
      >
        <component
          :is="sidebarCollapsed ? ChevronRight : ChevronLeft"
          class="h-4 w-4 text-gray-500"
        />
      </button> -->

      <div v-if="!sidebarCollapsed">
        <!-- <div class="mb-3 flex items-center space-x-2 text-sm text-gray-500">
          <span>微信小程序</span>
          <span>•</span>
          <span>旧版功能</span>
        </div>
        <button
          @click="handleLogin"
          class="h-9 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          {{ user.isLoggedIn ? user.name || "用户" : "登录" }}
        </button> -->

        <!-- Bottom Footer -->
        <div class="flex items-center justify-between border-t border-gray-100 p-4">
          <el-tooltip content="反馈" placement="top">
            <el-button type="text" size="small" class="!p-2">
              <el-icon size="20">
                <ChatLineRound />
              </el-icon>
            </el-button>
          </el-tooltip>

          <el-tooltip content="语言" placement="top">
            <el-button type="text" size="small" class="!p-2">
              <el-icon size="20">
                <Setting />
              </el-icon>
            </el-button>
          </el-tooltip>

          <el-dropdown trigger="click">
            <el-button type="text" size="small" class="!p-2">
              <el-avatar size="small" src="https://ext.same-assets.com/3455306590/1535447567.svg" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>登录</el-dropdown-item>
                <el-dropdown-item divided>学术档案</el-dropdown-item>
                <el-dropdown-item>用户档案</el-dropdown-item>
                <el-dropdown-item divided>我的关注</el-dropdown-item>
                <el-dropdown-item>论文收藏</el-dropdown-item>
                <el-dropdown-item>浏览历史</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Search,
  Message,
  Document,
  DataAnalysis,
  Brush,
  Trophy,
  DocumentCopy,
  User,
  Setting,
  UserFilled,
  Folder,
  Collection,
  ChatLineRound,
} from "@element-plus/icons-vue";
import { useMainStore } from "../stores";

const store = useMainStore();
const route = useRoute();
const router = useRouter();

const sidebarCollapsed = computed(() => store.sidebarCollapsed);
// const user = computed(() => store.user);
const activeIndex = ref("");

const menuItems = [
  {
    category: "搜索",
    items: [{ icon: Search, label: "搜索", href: "/" }],
  },
  {
    category: "研究助手",
    items: [
      { icon: Message, label: "AI 对话", href: "/ai-dialogue" },
      { icon: Document, label: "AI 论文助手", href: "/ai-paper" },
      { icon: DataAnalysis, label: "AMiner 深度研究", href: "/deep-research" },
      { icon: Brush, label: "AMiner 亮点", href: "/highlight" },
    ],
  },
  {
    category: "学术资源",
    items: [
      { icon: Trophy, label: "AI2000", href: "/ai2000" },
      { icon: DocumentCopy, label: "期刊与会议", href: "/journal" },
      { icon: User, label: "学者库", href: "/scholar" },
      { icon: Setting, label: "数据 API", href: "/api" },
      { icon: UserFilled, label: "精读树", href: "/reading-tree" },
      { icon: Folder, label: "开放数据", href: "/open-data" },
    ],
  },
  {
    category: "知识积累",
    items: [{ icon: Collection, label: "我的文库", href: "/library" }],
  },
];

// 根据当前路由更新 activeIndex
const updateActiveIndex = () => {
  menuItems.forEach((section) => {
    section.items.forEach((item) => {
      if (item.href === route.path) {
        activeIndex.value = item.href;
      }
    });
  });
};

// const toggleSidebar = () => {
//   store.toggleSidebar();
// };

// const handleLogin = () => {
//   if (user.value.isLoggedIn) {
//     store.logout();
//   } else {
//     // Simulate login
//     store.login({
//       id: "1",
//       name: "研究员",
//       avatar: "https://ext.same-assets.com/3455306590/3474846014.svg",
//     });
//   }
// };

const handleMenuSelect = (index: string) => {
  activeIndex.value = index;
  router.push(index);
};

// 组件挂载时更新 activeIndex
onMounted(() => {
  updateActiveIndex();
});

// 监听路由变化，实时更新 activeIndex
watch(
  () => route.path,
  () => {
    updateActiveIndex();
  },
);
</script>

<style scoped>
/* Smooth tooltip transitions */
.group:hover .opacity-0 {
  opacity: 1;
}

/* Menu styling */
:deep(.el-menu-item-group__title) {
  color: #999;
  font-size: 12px;
  font-weight: 500;
  padding: 12px 24px 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
  color: #666;
  font-size: 14px;
  border-radius: 8px;
  margin: 2px 8px;
  transition: all 0.2s ease;
}

:deep(.el-menu-item:hover) {
  background-color: #f5f6fa;
  color: #4759c5;
}

:deep(.el-menu-item.is-active) {
  background-color: #e4e6f7;
  color: #4759c5;
  font-weight: 500;
}

/* 自定义滚动条样式 */
.flex-1.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}

/* Chrome, Edge, and Safari */
.flex-1.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.flex-1.overflow-y-auto::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.flex-1.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
}

.flex-1.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #9ca3af;
}
</style>
