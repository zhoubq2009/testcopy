<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 主要内容区域 -->
    <div>
      <!-- 顶部用户区域 -->
      <div class="flex items-center justify-end border-b border-gray-200 bg-white px-6 py-4">
        <div class="flex items-center space-x-4">
          <el-button text>Console</el-button>
          <el-button type="primary">Login/Register</el-button>
        </div>
      </div>

      <!-- Hero 区域 -->
      <div class="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 px-8 py-16">
        <!-- 背景装饰图片 -->
        <div
          class="absolute top-0 right-0 flex h-full w-1/2 items-center justify-center opacity-20"
        >
          <img
            src="https://ext.same-assets.com/3455306590/1215089542.png"
            alt="Background"
            class="max-h-full"
          />
        </div>

        <div class="relative z-10 max-w-4xl">
          <h1 class="mb-6 text-5xl font-bold text-gray-900">Open Datasets</h1>
          <p class="max-w-2xl text-xl text-gray-700">
            Quoting open source big data materials such as network analysis, expert discovery, and
            naming disambiguation
          </p>
        </div>
      </div>

      <!-- Open•Share 区域 -->
      <div class="bg-white px-8 py-12">
        <div class="mx-auto max-w-6xl">
          <h2 class="mb-6 text-3xl font-bold text-gray-900">Open•Share</h2>
          <p class="mb-8 max-w-4xl text-lg text-gray-600">
            Exploring open datasets not only allows you to access high-quality open data, but also
            provides a brand new data sharing platform that allows for more free flow of information
            and unleashes infinite possibilities for every piece of data!
          </p>

          <!-- 分类卡片 -->
          <div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <el-card
              v-for="category in categories"
              :key="category.name"
              shadow="hover"
              class="cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              @click="filterByCategory(category.name)"
            >
              <div class="flex flex-col items-center py-4 text-center">
                <div
                  class="mb-4 flex h-16 w-16 items-center justify-center rounded-lg"
                  :style="{ backgroundColor: category.bgColor }"
                >
                  <img :src="category.icon" :alt="category.name" class="h-8 w-8" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3>
              </div>
            </el-card>
          </div>
        </div>
      </div>

      <!-- 数据集列表区域 -->
      <div class="bg-gray-50 px-8 py-8">
        <div class="mx-auto max-w-6xl">
          <h3 class="mb-6 text-2xl font-bold text-gray-900">Dataset List</h3>

          <!-- 搜索和筛选 -->
          <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
            <div class="flex flex-col gap-6 lg:flex-row">
              <!-- 搜索框 -->
              <div class="flex-1">
                <el-input
                  v-model="datasetSearch"
                  placeholder="Search Dataset"
                  :prefix-icon="Search"
                  size="large"
                  class="w-full"
                />
              </div>

              <!-- 筛选器 -->
              <div class="flex flex-wrap gap-4">
                <el-select
                  v-model="filterByTask"
                  placeholder="Filter By Task"
                  clearable
                  class="w-48"
                >
                  <el-option v-for="task in taskFilters" :key="task" :label="task" :value="task" />
                </el-select>

                <el-select
                  v-model="filterByEntity"
                  placeholder="Filter By Entity"
                  clearable
                  class="w-48"
                >
                  <el-option
                    v-for="entity in entityFilters"
                    :key="entity"
                    :label="entity"
                    :value="entity"
                  />
                </el-select>
              </div>
            </div>
          </div>

          <!-- 数据集卡片列表 -->
          <div class="space-y-6">
            <el-card
              v-for="dataset in filteredDatasets"
              :key="dataset.id"
              shadow="hover"
              class="transition-shadow duration-300 hover:shadow-md"
            >
              <div class="flex flex-col justify-between lg:flex-row">
                <div class="flex-1 pr-6">
                  <div class="mb-4 flex items-start justify-between">
                    <h4 class="cursor-pointer text-xl font-bold text-blue-600 hover:text-blue-700">
                      {{ dataset.title }}
                    </h4>
                    <div class="ml-4 flex items-center text-sm text-gray-500">
                      <el-icon class="mr-1"><Calendar /></el-icon>
                      {{ dataset.releaseDate }}
                    </div>
                  </div>

                  <p class="mb-4 leading-relaxed text-gray-700">
                    {{ dataset.description }}
                  </p>

                  <div class="mb-4 flex flex-wrap gap-4">
                    <div v-if="dataset.nodes" class="flex items-center text-sm text-gray-600">
                      <el-icon class="mr-1"><Connection /></el-icon>
                      <strong>Node:</strong> {{ dataset.nodes }}
                    </div>
                    <div v-if="dataset.edges" class="flex items-center text-sm text-gray-600">
                      <el-icon class="mr-1"><Share /></el-icon>
                      <strong>Edge:</strong> {{ dataset.edges }}
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center text-sm text-gray-500">
                      <span class="font-medium">Main Contributions:</span>
                      <span class="ml-2">{{ dataset.contributor }}</span>
                    </div>

                    <div class="flex gap-2">
                      <el-tag v-for="tag in dataset.tags" :key="tag" type="info" size="small">
                        {{ tag }}
                      </el-tag>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- 分页 -->
          <div class="mt-8 flex justify-center">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :total="totalDatasets"
              :page-sizes="[5, 10, 20, 50]"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Search,
  ChatLineRound,
  Document,
  Star,
  TrophyBase,
  Notebook,
  User,
  Connection,
  Grid,
  FolderOpened,
  Collection,
  Phone,
  Setting,
  Calendar,
  Share,
} from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

// 响应式数据
const searchQuery = ref("");
const datasetSearch = ref("");
const filterByTask = ref("");
const filterByEntity = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const currentRoute = ref(route.path);

// 分类数据
const categories = ref([
  {
    name: "Knowledge Graph",
    icon: "https://ext.same-assets.com/3455306590/2535121929.png",
    bgColor: "#fff7e6",
  },
  {
    name: "Artificial Intelligence",
    icon: "https://ext.same-assets.com/3455306590/3427342469.png",
    bgColor: "#e6f7ff",
  },
  {
    name: "Scholar",
    icon: "https://ext.same-assets.com/3455306590/3750619403.png",
    bgColor: "#f6ffed",
  },
  {
    name: "Social Networks",
    icon: "https://ext.same-assets.com/3455306590/2448295932.png",
    bgColor: "#fff0f6",
  },
]);

// 筛选选项
const taskFilters = ref([
  "Social Tie Classification",
  "Social Influence Prediction",
  "Scholar Profiling",
  "Cross-domain Collaboration Recommendation",
  "Kernel Community Detection",
  "Influence Maximization",
  "Citation Link Annotation",
  "Expert Finding",
  "Association Search",
  "Topic Model",
  "Similarity Search",
  "Name Disambiguation",
  "Career Trajectory",
  "Entity Alignment",
  "Concept Taxonomy",
  "Paper Recommendation",
  "Link Prediction",
  "Question Answering",
  "Source Tracing",
]);

const entityFilters = ref(["Concept", "Paper", "Author", "Institution", "Venue", "User"]);

// 数据集数据
const datasets = ref([
  {
    id: 1,
    title: "Citation",
    description:
      "The data set is designed for research purpose only. The citation data is extracted from DBLP, ACM, and other sources. The first version contains 629,814 papers and 632,752 citations. Each paper is associated with abstract, authors, year, venue, and title. The data set can be used for clustering with network and side information, studying influence in the citation network, finding the most influential papers, topic modeling analysis, etc. A larger version will be released soon.",
    nodes: "9,566,751 papers",
    edges: "7,015,023 citation relationships",
    contributor: "AMiner",
    releaseDate: "2025/02/27",
    tags: ["Citation Link Annotation", "Paper", "Author"],
    category: "Knowledge Graph",
  },
  {
    id: 2,
    title: "Open Academic Graph",
    description:
      "Created for studying the integration of multiple academic graphs. This data set is generated by linking two large academic graphs Microsoft Academic Graph (strong MAG) and AMiner. The data set is used for research purpose only. This version includes 166,192,182 paper from MAG and 154,771,162 papers from AMiner. We generated 64,639,608 linking (matching) relations between the two graphs.",
    nodes: "152,525,231 Papers from AMiner",
    edges: "1,935,422,474 Relationships",
    contributor: "AMiner",
    releaseDate: "2025/02/12",
    tags: ["Entity Alignment", "Paper", "Author"],
    category: "Knowledge Graph",
  },
  {
    id: 3,
    title: "Social Influence Prediction",
    description:
      "This dataset is designed for social influence prediction tasks. It contains social network data with influence relationships and can be used for studying how influence spreads through networks.",
    nodes: "50,021",
    edges: "",
    contributor: "AMiner",
    releaseDate: "2023/12/01",
    tags: ["Social Influence Prediction", "Social Networks"],
    category: "Social Networks",
  },
  {
    id: 4,
    title: "Academic Influence Prediction",
    description:
      "OAG-Paper-TOT: This dataset collates Test-of-Time paper award data for selected conferences and journals in computer science. The meaning given to a paper by the Test-of-Time Award is: the paper has produced a huge theoretical or applied influence several years after its publication.",
    nodes: "",
    edges: "",
    contributor: "AMiner",
    releaseDate: "2023/11/06",
    tags: ["Social Influence Prediction", "Paper"],
    category: "Artificial Intelligence",
  },
  {
    id: 5,
    title: "Paper Source Tracing",
    description:
      "Given a paper (including the full text of the paper) and its references, the goal is to find the most important references (called ref-source) from the references. Ref-source largely inspired the paper in terms of ideas or methods.",
    nodes: "",
    edges: "",
    contributor: "AMiner",
    releaseDate: "2023/03/28",
    tags: ["Source Tracing", "Paper"],
    category: "Artificial Intelligence",
  },
  {
    id: 6,
    title: "Academic Question Answering",
    description:
      "We construct an academic QA dataset from real questions from Question-and-Answers (Q&A) forums. We retrieve question posts from StackExchange and Zhihu and extract the paper URLs cited by users in their answers.",
    nodes: "",
    edges: "",
    contributor: "AMiner",
    releaseDate: "2023/03/28",
    tags: ["Question Answering", "Paper"],
    category: "Artificial Intelligence",
  },
  {
    id: 7,
    title: "Reviewer Recommendation",
    description:
      "This dataset collects real paper-submission matching relations from Frontiers. In this dataset, we collect 210,069 reviewers and 225,478 papers.",
    nodes: "",
    edges: "",
    contributor: "AMiner",
    releaseDate: "2023/03/28",
    tags: ["Expert Finding", "Author"],
    category: "Scholar",
  },
  {
    id: 8,
    title: "AMiner Paper Click",
    description:
      "User-Paper interactions on AMiner. This dataset collects users' behaviour on AMiner from Aug. 2021 to Nov. 2021. We filtered most sparse records and kept users who at least clicked more than 10 papers.",
    nodes: "",
    edges: "",
    contributor: "AMiner",
    releaseDate: "2023/03/28",
    tags: ["Paper Recommendation", "User"],
    category: "Scholar",
  },
]);

// 计算属性
const filteredDatasets = computed(() => {
  let filtered = datasets.value;

  // 搜索过滤
  if (datasetSearch.value) {
    filtered = filtered.filter(
      (dataset) =>
        dataset.title.toLowerCase().includes(datasetSearch.value.toLowerCase()) ||
        dataset.description.toLowerCase().includes(datasetSearch.value.toLowerCase()),
    );
  }

  // 任务过滤
  if (filterByTask.value) {
    filtered = filtered.filter((dataset) => dataset.tags.includes(filterByTask.value));
  }

  // 实体过滤
  if (filterByEntity.value) {
    filtered = filtered.filter((dataset) => dataset.tags.includes(filterByEntity.value));
  }

  // 分页
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filtered.slice(start, end);
});

const totalDatasets = computed(() => {
  let filtered = datasets.value;

  if (datasetSearch.value) {
    filtered = filtered.filter(
      (dataset) =>
        dataset.title.toLowerCase().includes(datasetSearch.value.toLowerCase()) ||
        dataset.description.toLowerCase().includes(datasetSearch.value.toLowerCase()),
    );
  }

  if (filterByTask.value) {
    filtered = filtered.filter((dataset) => dataset.tags.includes(filterByTask.value));
  }

  if (filterByEntity.value) {
    filtered = filtered.filter((dataset) => dataset.tags.includes(filterByEntity.value));
  }

  return filtered.length;
});

// 方法
const handleMenuSelect = (index: string) => {
  currentRoute.value = index;
  router.push(index);
};

const filterByCategory = (category: string) => {
  // 可以根据分类过滤数据集
  console.log("Filter by category:", category);
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const handleCurrentChange = (page: number) => {
  currentPage.value = page;
};

onMounted(() => {
  currentRoute.value = route.path;
});
</script>

<style scoped>
.el-menu {
  border-right: none;
}

.el-menu-item {
  height: 48px;
  line-height: 48px;
  margin: 2px 8px;
  border-radius: 8px;
}

.el-menu-item:hover {
  background-color: #f5f7fa;
}

.el-menu-item.is-active {
  background-color: #ecf5ff;
  color: #409eff;
}

.el-card {
  border-radius: 12px;
}

.el-card:hover {
  transform: translateY(-2px);
}
</style>
