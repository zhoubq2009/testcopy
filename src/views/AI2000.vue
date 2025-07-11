```vue
<template>
  <div class="flex-1 bg-gray-50">
    <!-- Header Section -->
    <div class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-6 py-8">
        <div class="mb-8 text-center">
          <div class="mb-4 flex items-center justify-center">
            <img
              src="https://ext.same-assets.com/3455306590/535419077.svg"
              alt="AI开放指数"
              class="mr-3 h-8 w-8"
            />
            <h1 class="text-3xl font-bold text-blue-600">AI开放指数</h1>
          </div>
          <p class="mx-auto max-w-3xl text-gray-600">
            AI开放指数AI开放指数是一个基于指标的排名系统，你可以通过输入感兴趣的实体名称来查看排名。
          </p>
        </div>

        <!-- Main Navigation Tabs -->
        <div class="flex justify-center">
          <el-tabs v-model="activeTab" type="card" class="demo-tabs">
            <el-tab-pane label="Home" name="home" />
            <el-tab-pane label="AI 2000 Scholar" name="ai2000" />
            <el-tab-pane label="Conference/Journal Rank" name="conference" />
            <el-tab-pane label="Top 500 AI Innovative Cities in the World" name="cities" />
            <el-tab-pane label="Organization Rank" name="organization" />
            <el-tab-pane label="Women in AI" name="women" />
            <el-tab-pane label="U.S. Colleges Military Rank" name="military" />
          </el-tabs>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="mx-auto max-w-7xl px-6 py-8">
      <div class="flex gap-8">
        <!-- Left Sidebar - Filters -->
        <div class="w-80 flex-shrink-0">
          <!-- Year Range Selector -->
          <el-card class="rounded-card mb-6">
            <template #header>
              <div class="flex items-center">
                <el-icon class="mr-2"><Calendar /></el-icon>
                <span class="font-medium">AI 2000 Scholar</span>
              </div>
            </template>

            <div class="mb-4 flex items-center gap-4">
              <img
                src="https://ext.same-assets.com/3455306590/3300718191.svg"
                alt=""
                class="h-5 w-5"
              />
              <img
                src="https://ext.same-assets.com/3455306590/162020883.svg"
                alt=""
                class="h-5 w-5"
              />
            </div>

            <!-- Year Slider -->
            <div class="mb-6">
              <div class="mb-2 flex justify-between text-sm text-gray-600">
                <span>2014</span>
                <span>2023</span>
              </div>
              <el-slider
                v-model="filters.yearRange"
                range
                :min="2014"
                :max="2023"
                :step="1"
                show-stops
                @change="applyFilters"
              />
              <div class="mt-2 flex justify-between text-sm text-gray-900">
                <span class="font-medium">{{ filters.yearRange[0] }}</span>
                <span class="font-medium">{{ filters.yearRange[1] }}</span>
              </div>
            </div>

            <!-- Domain Selector -->
            <div class="mb-6">
              <label class="mb-2 block text-sm font-medium text-gray-700">领域</label>
              <el-select
                v-model="filters.selectedDomain"
                placeholder="所有领域"
                style="width: 100%"
                @change="applyFilters"
              >
                <el-option label="所有领域" value="all" />
                <el-option label="AAAI/IJCAI" value="aaai" />
                <el-option label="机器学习" value="ml" />
                <el-option label="计算机视觉" value="cv" />
                <el-option label="自然语言处理" value="nlp" />
                <el-option label="机器人学" value="robotics" />
              </el-select>
            </div>

            <!-- AI Fields Tree -->
            <div class="space-y-3">
              <el-tree
                :data="aiFieldsTree"
                :props="{ children: 'children', label: 'label' }"
                node-key="id"
                show-checkbox
                :default-checked-keys="getCheckedFields()"
                @check="handleFieldCheck"
              />
            </div>
          </el-card>

          <!-- Ranking Description -->
          <el-card class="rounded-card">
            <template #header>
              <div class="flex items-center">
                <el-icon class="mr-2"><InfoFilled /></el-icon>
                <span class="font-medium">关于排名</span>
              </div>
            </template>
            <p class="text-sm leading-relaxed text-gray-600">
              AAAI/IJCAI领域的AI
              2000年度榜单每年评选出前10名学者为“最具影响力学者”，接下来的90名学者为“荣誉提及”。该排名旨在表彰为AAAI/IJCAI的发展和创新做出贡献的杰出学者。
            </p>
            <p class="mt-4 text-sm text-gray-600">
              我们将持续改进排名的设计和实现。如果您有任何疑问、修正或建议，请联系
              <el-link href="mailto:aiopen@aminer.cn" type="primary">aiopen@aminer.cn</el-link>.
            </p>
          </el-card>
        </div>

        <!-- Main Content -->
        <div class="flex-1">
          <!-- Filters and Search Bar -->
          <el-card class="rounded-card mb-6">
            <template #header>
              <div class="flex items-center justify-between">
                <span class="font-medium">查看你的排名位置:</span>
                <div class="flex items-center gap-2">
                  <img
                    src="https://ext.same-assets.com/3455306590/3528498240.svg"
                    alt=""
                    class="h-5 w-5"
                  />
                  <el-button type="primary" text @click="showAbout">
                    <el-icon class="mr-1"><InfoFilled /></el-icon>
                    关于
                  </el-button>
                </div>
              </div>
            </template>

            <div class="mb-4 flex items-center gap-4">
              <el-input
                v-model="searchQuery"
                placeholder="输入姓名"
                clearable
                @input="applyFilters"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>

            <!-- Metric Filters -->
            <div class="mb-4 flex flex-wrap gap-4">
              <span class="text-sm text-gray-600">指标:</span>
              <el-radio-group v-model="filters.selectedMetric" @change="applyFilters">
                <el-radio-button
                  v-for="metric in metricOptions"
                  :key="metric.value"
                  :value="metric.value"
                >
                  {{ metric.label }}
                </el-radio-button>
              </el-radio-group>
            </div>

            <!-- Stats -->
            <div class="mb-4 text-sm text-gray-600">
              {{ totalScholars }} 名学者中排名前 {{ filteredScholars.length }}
              <el-tag type="warning" class="ml-2">
                前 {{ ((filteredScholars.length / totalScholars) * 100).toFixed(1) }}%
              </el-tag>
            </div>

            <!-- Additional Filters -->
            <div class="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
              <div>
                <span class="mb-1 block text-gray-600">h指数:</span>
                <el-select
                  v-model="filters.hIndex"
                  placeholder="全部"
                  style="width: 100%"
                  @change="applyFilters"
                >
                  <el-option label="全部" value="all" />
                  <el-option label="高 (>50)" value="high" />
                  <el-option label="中 (20-50)" value="medium" />
                  <el-option label="低 (<20)" value="low" />
                </el-select>
              </div>
              <div>
                <span class="mb-1 block text-gray-600">性别:</span>
                <el-select
                  v-model="filters.gender"
                  placeholder="全部"
                  style="width: 100%"
                  @change="applyFilters"
                >
                  <el-option label="全部" value="all" />
                  <el-option label="男" value="male" />
                  <el-option label="女" value="female" />
                </el-select>
              </div>
              <div>
                <span class="mb-1 block text-gray-600">地区:</span>
                <el-select
                  v-model="filters.region"
                  placeholder="全部"
                  style="width: 100%"
                  @change="applyFilters"
                >
                  <el-option label="全部" value="all" />
                  <el-option label="亚洲" value="asia" />
                  <el-option label="北美洲" value="north-america" />
                  <el-option label="欧洲" value="europe" />
                </el-select>
              </div>
              <div>
                <span class="mb-1 block text-gray-600">雇主类型:</span>
                <el-select
                  v-model="filters.employerType"
                  placeholder="全部"
                  style="width: 100%"
                  @change="applyFilters"
                >
                  <el-option label="全部" value="all" />
                  <el-option label="企业" value="industry" />
                  <el-option label="学术机构" value="academia" />
                  <el-option label="研究机构" value="research" />
                </el-select>
              </div>
            </div>
          </el-card>

          <!-- Scholar Rankings -->
          <div class="space-y-4">
            <el-card
              v-for="scholar in paginatedScholars"
              :key="scholar.id"
              class="scholar-card rounded-card cursor-pointer"
              :body-style="{ padding: '24px' }"
              shadow="hover"
              @click="viewScholarDetail(scholar)"
            >
              <div class="flex items-start gap-4">
                <!-- Ranking -->
                <div class="flex flex-col items-center">
                  <span class="text-2xl font-bold text-gray-900">{{ scholar.rank }}</span>
                  <div class="mt-1 flex items-center">
                    <el-icon v-if="scholar.rankChange > 0" color="#67c23a" class="mr-1">
                      <ArrowUp />
                    </el-icon>
                    <el-icon v-else-if="scholar.rankChange < 0" color="#f56c6c" class="mr-1">
                      <ArrowDown />
                    </el-icon>
                    <span
                      v-if="scholar.rankChange !== 0"
                      :class="scholar.rankChange > 0 ? 'text-green-600' : 'text-red-600'"
                      class="text-sm"
                    >
                      {{ Math.abs(scholar.rankChange) }}
                    </span>
                  </div>
                </div>

                <!-- Scholar Photo -->
                <div class="h-16 w-16 flex-shrink-0">
                  <el-avatar :src="scholar.avatar" :alt="scholar.name" :size="64" shape="circle" />
                </div>

                <!-- Scholar Info -->
                <div class="flex-1">
                  <div class="mb-2 flex items-center gap-2">
                    <el-link type="primary" class="text-lg font-semibold">
                      {{ scholar.name }}
                    </el-link>
                    <span v-if="scholar.chineseName" class="text-sm text-gray-500"
                      >({{ scholar.chineseName }})</span
                    >
                  </div>

                  <!-- Achievement Icons -->
                  <div class="mb-2 flex items-center gap-1">
                    <img
                      v-for="icon in scholar.achievements"
                      :key="icon"
                      :src="icon"
                      alt=""
                      class="h-4 w-4"
                    />
                  </div>

                  <!-- Institution -->
                  <div class="mb-2 flex items-center gap-2">
                    <el-icon><OfficeBuilding /></el-icon>
                    <span
                      v-for="(institution, idx) in scholar.institutions"
                      :key="idx"
                      class="text-sm"
                    >
                      <el-link type="primary">{{ institution }}</el-link>
                      <span v-if="idx < scholar.institutions.length - 1" class="mx-1 text-gray-400"
                        >·</span
                      >
                    </span>
                  </div>

                  <!-- Research Areas -->
                  <div class="mb-2 flex flex-wrap gap-2">
                    <el-tag
                      v-for="area in scholar.researchAreas"
                      :key="area"
                      size="small"
                      type="info"
                      effect="plain"
                    >
                      {{ area }}
                    </el-tag>
                  </div>
                </div>

                <!-- Score -->
                <div class="text-right">
                  <div class="text-lg font-bold text-gray-900">score: {{ scholar.score }}</div>
                </div>
              </div>
            </el-card>
          </div>

          <!-- Empty State -->
          <div v-if="filteredScholars.length === 0" class="py-12 text-center">
            <el-empty description="未找到相关学者" />
          </div>

          <!-- Pagination -->
          <div v-if="filteredScholars.length > 0" class="mt-8">
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="itemsPerPage"
              :page-sizes="[10, 20, 50, 100]"
              :total="filteredScholars.length"
              layout="total, sizes, prev, pager, next, jumper"
              background
              @current-change="handlePageChange"
              @size-change="handleSizeChange"
            />
          </div>

          <!-- Load More Button -->
          <div class="mt-8 text-center">
            <el-button type="primary" size="large"> 查看2024年AI 2000学者排名中的位置 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  Search,
  Calendar,
  InfoFilled,
  ArrowUp,
  ArrowDown,
  OfficeBuilding,
} from "@element-plus/icons-vue";

interface Scholar {
  id: number;
  rank: number;
  rankChange: number;
  name: string;
  chineseName: string;
  avatar: string;
  achievements: string[];
  institutions: string[];
  researchAreas: string[];
  score: string;
  domain: string;
  fields: string[];
  hIndex: number;
  gender: string;
  region: string;
  employerType: string;
  year: number;
}

interface AIField {
  id: string;
  label: string;
  children?: AIField[];
}

// Reactive data
const activeTab = ref("ai2000");
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const filters = ref({
  yearRange: [2014, 2023],
  selectedDomain: "all",
  selectedMetric: "citation",
  fields: {
    aaai: true,
    machineLearning: false,
    computerVision: false,
    nlp: false,
    robotics: false,
    knowledgeEngineering: false,
    speechRecognition: false,
    dataMining: false,
    irRecommendation: false,
    hci: false,
  },
  hIndex: "all",
  gender: "all",
  region: "all",
  employerType: "all",
});

const metricOptions = [
  { value: "citation", label: "Citation Only" },
  { value: "credit", label: "Credit" },
  { value: "newstar", label: "New Star" },
  { value: "csrankings", label: "CSRankings" },
];

// AI Fields Tree for Element Plus Tree component
const aiFieldsTree: AIField[] = [
  {
    id: "aaai",
    label: "AAAI",
    children: [
      { id: "machineLearning", label: "Machine Learning" },
      { id: "computerVision", label: "Computer Vision" },
      { id: "nlp", label: "NLP" },
      { id: "robotics", label: "Robotics" },
      { id: "knowledgeEngineering", label: "Knowledge Engineering" },
      { id: "speechRecognition", label: "Speech Recognition" },
      { id: "dataMining", label: "Data Mining" },
      { id: "irRecommendation", label: "IR and Recommendation" },
      { id: "hci", label: "HCI" },
    ],
  },
];

// Scholar data
const allScholars = ref<Scholar[]>([
  {
    id: 1,
    rank: 1,
    rankChange: 0,
    name: "Christian Szegedy",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/2538819335.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/350257426.svg",
      "https://ext.same-assets.com/3455306590/796152264.svg",
      "https://ext.same-assets.com/3455306590/4274522228.svg",
      "https://ext.same-assets.com/3455306590/3665859081.svg",
    ],
    institutions: ["Google"],
    researchAreas: ["Machine Learning", "Neural Networks", "Image Recognition"],
    score: "16k",
    domain: "ml",
    fields: ["machineLearning", "computerVision"],
    hIndex: 85,
    gender: "male",
    region: "north-america",
    employerType: "industry",
    year: 2023,
  },
  {
    id: 2,
    rank: 2,
    rankChange: 1,
    name: "Vincent Vanhoucke",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/1422005259.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/2980276913.svg",
      "https://ext.same-assets.com/3455306590/1687361890.svg",
      "https://ext.same-assets.com/3455306590/411808233.svg",
      "https://ext.same-assets.com/3455306590/3494616832.svg",
    ],
    institutions: ["Google"],
    researchAreas: ["Speech Recognition", "Acoustic Modeling", "Deep Neural Networks"],
    score: "15k",
    domain: "sr",
    fields: ["speechRecognition", "machineLearning"],
    hIndex: 72,
    gender: "male",
    region: "north-america",
    employerType: "industry",
    year: 2023,
  },
  {
    id: 3,
    rank: 3,
    rankChange: 1,
    name: "Sergey Ioffe",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/2774333691.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/2525672815.svg",
      "https://ext.same-assets.com/3455306590/2853988059.svg",
      "https://ext.same-assets.com/3455306590/1445228427.svg",
      "https://ext.same-assets.com/3455306590/2641580149.svg",
    ],
    institutions: ["Google"],
    researchAreas: ["Computer Vision", "Object Recognition", "Deep Learning"],
    score: "15k",
    domain: "cv",
    fields: ["computerVision", "machineLearning"],
    hIndex: 68,
    gender: "male",
    region: "north-america",
    employerType: "industry",
    year: 2023,
  },
  {
    id: 4,
    rank: 4,
    rankChange: 1,
    name: "Hado van Hasselt",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/133796387.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/1542089040.svg",
      "https://ext.same-assets.com/3455306590/3607147094.svg",
      "https://ext.same-assets.com/3455306590/2627771539.svg",
      "https://ext.same-assets.com/3455306590/3226056097.svg",
    ],
    institutions: ["University College London", "Google"],
    researchAreas: ["Reinforcement Learning", "Value Function", "Artificial Intelligence"],
    score: "10k",
    domain: "ml",
    fields: ["machineLearning"],
    hIndex: 55,
    gender: "male",
    region: "europe",
    employerType: "academia",
    year: 2023,
  },
  {
    id: 5,
    rank: 5,
    rankChange: 1,
    name: "David Silver",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/3735041196.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/3463136403.svg",
      "https://ext.same-assets.com/3455306590/2655420578.svg",
      "https://ext.same-assets.com/3455306590/3486339572.svg",
      "https://ext.same-assets.com/3455306590/2818346923.svg",
    ],
    institutions: ["University College London", "Google"],
    researchAreas: ["Reinforcement Learning", "Machine Learning", "Mobile Robots"],
    score: "10k",
    domain: "robotics",
    fields: ["robotics", "machineLearning"],
    hIndex: 62,
    gender: "male",
    region: "europe",
    employerType: "academia",
    year: 2023,
  },
  {
    id: 6,
    rank: 6,
    rankChange: 2,
    name: "Maosong Sun",
    chineseName: "孙茂松",
    avatar: "https://ext.same-assets.com/3455306590/2106626338.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/1594041523.svg",
      "https://ext.same-assets.com/3455306590/1449018599.svg",
      "https://ext.same-assets.com/3455306590/3751061888.svg",
      "https://ext.same-assets.com/3455306590/864743837.svg",
      "https://ext.same-assets.com/3455306590/738017161.svg",
    ],
    institutions: ["清华大学"],
    researchAreas: [
      "Natural Language Processing",
      "Machine Translation",
      "Chinese Word Segmentation",
    ],
    score: "10k",
    domain: "nlp",
    fields: ["nlp"],
    hIndex: 78,
    gender: "male",
    region: "asia",
    employerType: "academia",
    year: 2023,
  },
  {
    id: 7,
    rank: 7,
    rankChange: 0,
    name: "Zhiyuan Liu",
    chineseName: "刘知远",
    avatar: "https://ext.same-assets.com/3455306590/3951652191.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/3834505561.svg",
      "https://ext.same-assets.com/3455306590/957603178.svg",
      "https://ext.same-assets.com/3455306590/1274062948.svg",
      "https://ext.same-assets.com/3455306590/1813748356.svg",
      "https://ext.same-assets.com/3455306590/3062114887.svg",
    ],
    institutions: ["清华大学"],
    researchAreas: ["Natural Language Processing", "Task Analysis", "Semantics"],
    score: "9k",
    domain: "nlp",
    fields: ["nlp", "knowledgeEngineering"],
    hIndex: 65,
    gender: "male",
    region: "asia",
    employerType: "academia",
    year: 2023,
  },
  {
    id: 8,
    rank: 8,
    rankChange: -1,
    name: "Yann LeCun",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/3951652191.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/350257426.svg",
      "https://ext.same-assets.com/3455306590/2980276913.svg",
    ],
    institutions: ["Meta", "New York University"],
    researchAreas: ["Deep Learning", "Convolutional Neural Networks", "Computer Vision"],
    score: "8.5k",
    domain: "cv",
    fields: ["computerVision", "machineLearning"],
    hIndex: 95,
    gender: "male",
    region: "north-america",
    employerType: "industry",
    year: 2023,
  },
  {
    id: 9,
    rank: 9,
    rankChange: 3,
    name: "Fei-Fei Li",
    chineseName: "李飞飞",
    avatar: "https://ext.same-assets.com/3455306590/2106626338.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/1594041523.svg",
      "https://ext.same-assets.com/3455306590/2980276913.svg",
    ],
    institutions: ["Stanford University"],
    researchAreas: ["Computer Vision", "Machine Learning", "Cognitive Neuroscience"],
    score: "8k",
    domain: "cv",
    fields: ["computerVision", "machineLearning"],
    hIndex: 88,
    gender: "female",
    region: "north-america",
    employerType: "academia",
    year: 2023,
  },
  {
    id: 10,
    rank: 10,
    rankChange: -2,
    name: "Geoffrey Hinton",
    chineseName: "",
    avatar: "https://ext.same-assets.com/3455306590/3735041196.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/350257426.svg",
      "https://ext.same-assets.com/3455306590/2980276913.svg",
      "https://ext.same-assets.com/3455306590/1594041523.svg",
    ],
    institutions: ["University of Toronto", "Google"],
    researchAreas: ["Deep Learning", "Neural Networks", "Machine Learning"],
    score: "7.8k",
    domain: "ml",
    fields: ["machineLearning"],
    hIndex: 102,
    gender: "male",
    region: "north-america",
    employerType: "academia",
    year: 2023,
  },
  {
    id: 11,
    rank: 11,
    rankChange: 1,
    name: "Jian Sun",
    chineseName: "孙剑",
    avatar: "https://ext.same-assets.com/3455306590/2774333691.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/2525672815.svg",
      "https://ext.same-assets.com/3455306590/1594041523.svg",
    ],
    institutions: ["旷视科技"],
    researchAreas: ["Computer Vision", "Deep Learning", "Object Detection"],
    score: "7.5k",
    domain: "cv",
    fields: ["computerVision", "machineLearning"],
    hIndex: 71,
    gender: "male",
    region: "asia",
    employerType: "industry",
    year: 2023,
  },
  {
    id: 12,
    rank: 12,
    rankChange: -3,
    name: "Andrew Ng",
    chineseName: "吴恩达",
    avatar: "https://ext.same-assets.com/3455306590/133796387.jpeg",
    achievements: [
      "https://ext.same-assets.com/3455306590/350257426.svg",
      "https://ext.same-assets.com/3455306590/1594041523.svg",
    ],
    institutions: ["Stanford University", "Landing AI"],
    researchAreas: ["Machine Learning", "Deep Learning", "Artificial Intelligence"],
    score: "7.2k",
    domain: "ml",
    fields: ["machineLearning"],
    hIndex: 89,
    gender: "male",
    region: "north-america",
    employerType: "academia",
    year: 2023,
  },
]);

const totalScholars = computed(() => allScholars.value.length);

// Computed properties
const filteredScholars = computed(() => {
  let result = allScholars.value;
  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (scholar) =>
        scholar.name.toLowerCase().includes(query) ||
        (scholar.chineseName && scholar.chineseName.includes(query)) ||
        scholar.institutions.some((inst) => inst.toLowerCase().includes(query)),
    );
  }
  console.log("searchQuery.value", searchQuery.value, result);

  // Domain filter
  if (filters.value.selectedDomain !== "all") {
    result = result.filter((scholar) => scholar.domain === filters.value.selectedDomain);
  }

  // Fields filter
  // const selectedFields = Object.entries(filters.value.fields)
  //   .filter(([, selected]) => selected)
  //   .map(([field]) => field);
  // console.log("selectedFields", selectedFields);
  // if (selectedFields.length > 0) {
  //   result = result.filter((scholar) =>
  //     scholar.fields.some((field) => selectedFields.includes(field)),
  //   );
  // }

  // h-Index filter
  if (filters.value.hIndex !== "all") {
    result = result.filter((scholar) => {
      switch (filters.value.hIndex) {
        case "high":
          return scholar.hIndex > 50;
        case "medium":
          return scholar.hIndex >= 20 && scholar.hIndex <= 50;
        case "low":
          return scholar.hIndex < 20;
        default:
          return true;
      }
    });
  }

  // Gender filter
  if (filters.value.gender !== "all") {
    result = result.filter((scholar) => scholar.gender === filters.value.gender);
  }

  // Region filter
  if (filters.value.region !== "all") {
    result = result.filter((scholar) => scholar.region === filters.value.region);
  }

  // Employer type filter
  if (filters.value.employerType !== "all") {
    result = result.filter((scholar) => scholar.employerType === filters.value.employerType);
  }

  // Year filter
  result = result.filter(
    (scholar) =>
      scholar.year >= filters.value.yearRange[0] && scholar.year <= filters.value.yearRange[1],
  );

  return result;
});

const paginatedScholars = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredScholars.value.slice(start, end);
});

// Methods for Element Plus Tree
function getCheckedFields() {
  // Return checked field keys for el-tree
  const checked: string[] = [];
  for (const [key, val] of Object.entries(filters.value.fields)) {
    if (val) checked.push(key);
  }
  return checked;
}

function handleFieldCheck(_data: any, checked: any) {
  // Update filters.fields based on checked nodes
  const checkedKeys = checked.checkedKeys || [];
  for (const key in filters.value.fields) {
    (filters.value.fields as any)[key] = checkedKeys.includes(key);
  }
  applyFilters();
}

// Pagination handlers
function handlePageChange(page: number) {
  currentPage.value = page;
}
function handleSizeChange(size: number) {
  itemsPerPage.value = size;
  currentPage.value = 1;
}

// Other methods
const applyFilters = () => {
  currentPage.value = 1; // Reset to first page when filters change
};

const viewScholarDetail = (scholar: Scholar) => {
  // Navigate to scholar detail page (placeholder)
  console.log("Viewing scholar:", scholar.name);
  // router.push(`/scholar/${scholar.id}`)
};

function showAbout() {
  // Placeholder for about dialog
  // You can use Element Plus Dialog here if needed
  alert("关于AI 2000 Scholar排名...");
}

onMounted(() => {
  // Initialize any required data
});
</script>

<style scoped>
.rounded-card {
  border-radius: 12px; /* 可根据需求调整圆角大小 */
}
</style>
