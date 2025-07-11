import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { title: "AMiner - AI赋能科技情报挖掘" },
  },
  {
    path: "/ai-dialogue",
    name: "AiDialogue",
    component: () => import("../views/AiDialogue.vue"),
    meta: { title: "AI Dialogue - AMiner" },
  },
  {
    path: "/ai-paper",
    name: "AiPaper",
    component: () => import("../views/ChatExplain.vue"),
    meta: { title: "AI Paper Companion - AMiner" },
  },
  {
    path: "/deep-research",
    name: "DeepResearch",
    component: () => import("../views/DeepResearch.vue"),
    meta: { title: "AMiner DeepResearch" },
  },
  {
    path: "/highlight",
    name: "Highlight",
    component: () => import("../views/Highlight.vue"),
    meta: { title: "AMiner Highlight" },
  },
  {
    path: "/ai2000",
    name: "AI2000",
    component: () => import("../views/AI2000.vue"),
    meta: { title: "AI2000 - AMiner" },
  },
  {
    path: "/journal",
    name: "Journal",
    component: () => import("../views/JournalList.vue"),
    meta: { title: "期刊搜索 - AMiner" },
  },
  {
    path: "/scholar",
    name: "Scholar",
    component: () => import("../views/Scholar.vue"),
    meta: { title: "Scholar Library - AMiner" },
  },
  {
    path: "/api",
    name: "DataAPI",
    component: () => import("../views/DataAPI.vue"),
    meta: { title: "Data API - AMiner" },
  },
  {
    path: "/reading-tree",
    name: "ReadingTree",
    component: () => import("../views/ReadingTree.vue"),
    meta: { title: "Master Reading Tree - AMiner" },
  },
  {
    path: "/open-data",
    name: "OpenData",
    component: () => import("../views/OpenData.vue"),
    meta: { title: "Open Data - AMiner" },
  },
  {
    path: "/library",
    name: "Library",
    component: () => import("../views/Library.vue"),
    meta: { title: "My Library - AMiner" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, _from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string;
  }
  next();
});

export default router;
