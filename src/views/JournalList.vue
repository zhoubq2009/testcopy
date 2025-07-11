<template>
  <div class="flex-1 bg-gray-50">
    <!-- Header Section -->
    <div class="border-b border-gray-200 bg-white px-6 py-4">
      <div class="mx-auto max-w-7xl">
        <!-- Search and Filter Row -->
        <div class="mb-6 flex items-center gap-4">
          <el-select
            v-model="selectedCategory"
            placeholder="全部"
            style="width: 120px"
            @change="handleCategoryChange"
          >
            <el-option
              v-for="category in categories"
              :key="category.value"
              :label="category.label"
              :value="category.value"
            />
          </el-select>

          <el-input
            v-model="searchKeyword"
            placeholder="请输入期刊会议名称"
            class="flex-1"
            clearable
            @input="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </div>

        <!-- Alphabet Navigation -->
        <div class="flex items-center gap-1 text-sm">
          <span class="mr-4 text-gray-600">首字母：</span>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="letter in alphabet"
              :key="letter"
              :class="[
                'min-w-[32px] rounded px-2 py-1 text-center transition-colors',
                selectedLetter === letter
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100',
              ]"
              @click="selectLetter(letter)"
            >
              {{ letter }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-6 py-6">
      <div class="flex gap-6">
        <!-- Left Sidebar - Filters -->
        <div class="w-64 flex-shrink-0">
          <el-card class="rounded-card" :body-style="{ padding: '20px' }">
            <template #header>
              <div class="flex items-center">
                <el-icon class="mr-2"><Folder /></el-icon>
                <span class="font-medium">条件</span>
              </div>
            </template>

            <!-- 学科分类 -->
            <div class="mb-6">
              <h4 class="mb-3 flex items-center font-medium text-gray-900">
                <el-icon class="mr-2"><Menu /></el-icon>
                学科分类
              </h4>
              <el-tree
                :data="subjectCategories"
                :props="{ children: 'children', label: 'label' }"
                node-key="id"
                show-checkbox
                :default-checked-keys="selectedSubjects"
                @check="handleSubjectCheck"
              />
            </div>

            <!-- 期刊分类 -->
            <div>
              <h4 class="mb-3 flex items-center font-medium text-gray-900">
                <el-icon class="mr-2"><Document /></el-icon>
                期刊分类
              </h4>
              <div class="space-y-2">
                <el-checkbox
                  v-for="type in journalTypes"
                  :key="type.value"
                  v-model="type.checked"
                  :label="type.label"
                  @change="handleJournalTypeChange"
                />
              </div>
            </div>
          </el-card>
        </div>

        <!-- Main Content - Journal List -->
        <div class="flex-1">
          <el-card class="rounded-card" :body-style="{ padding: '0' }">
            <template #header>
              <div class="flex items-center justify-between">
                <span class="font-medium">期刊列表</span>
                <el-tag type="info">共 {{ totalJournals }} 个期刊</el-tag>
              </div>
            </template>

            <!-- Journal Grid -->
            <div class="grid grid-cols-3 gap-px bg-gray-200">
              <div
                v-for="journal in paginatedJournals"
                :key="journal.id"
                class="cursor-pointer bg-white p-4 transition-colors hover:bg-gray-50"
                @click="viewJournalDetail(journal)"
              >
                <div class="flex items-center justify-between">
                  <div class="mr-4 flex-1">
                    <h3 class="line-clamp-2 text-sm font-medium text-blue-600 hover:underline">
                      {{ journal.name }}
                    </h3>
                    <div class="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <el-tag v-if="journal.isOA" size="small" type="success" effect="plain">
                        OA
                      </el-tag>
                      <el-tag v-if="journal.isSCI" size="small" type="warning" effect="plain">
                        SCI
                      </el-tag>
                      <span v-if="journal.impactFactor"> IF: {{ journal.impactFactor }} </span>
                    </div>
                  </div>
                  <div class="flex-shrink-0">
                    <el-button
                      type="primary"
                      size="small"
                      text
                      @click.stop="followJournal(journal)"
                    >
                      {{ journal.isFollowed ? "已关注" : "关注" }}
                    </el-button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredJournals.length === 0" class="py-12 text-center">
              <el-empty description="未找到相关期刊" />
            </div>

            <!-- Pagination -->
            <div v-if="filteredJournals.length > 0" class="border-t border-gray-200 p-6">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[30, 60, 90, 120]"
                :total="filteredJournals.length"
                layout="total, sizes, prev, pager, next, jumper"
                background
                @current-change="handlePageChange"
                @size-change="handleSizeChange"
              />
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Search, Folder, Menu, Document } from "@element-plus/icons-vue";

interface Journal {
  id: number;
  name: string;
  nameEn?: string;
  isOA: boolean;
  isSCI: boolean;
  impactFactor?: number;
  subject: string[];
  category: string;
  firstLetter: string;
  isFollowed: boolean;
}

interface Category {
  value: string;
  label: string;
}

interface JournalType {
  value: string;
  label: string;
  checked: boolean;
}

interface SubjectCategory {
  id: string;
  label: string;
  children?: SubjectCategory[];
}

// Reactive data
const searchKeyword = ref("");
const selectedCategory = ref("all");
const selectedLetter = ref("");
const currentPage = ref(1);
const pageSize = ref(30);
const selectedSubjects = ref<string[]>([]);

// Categories dropdown
const categories: Category[] = [
  { value: "all", label: "全部" },
  { value: "computer", label: "计算机科学" },
  { value: "engineering", label: "工程技术" },
  { value: "medicine", label: "医学" },
  { value: "physics", label: "物理学" },
  { value: "chemistry", label: "化学" },
  { value: "biology", label: "生物学" },
  { value: "mathematics", label: "数学" },
];

// Alphabet navigation
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Subject categories tree
const subjectCategories: SubjectCategory[] = [
  {
    id: "computer-science",
    label: "计算机科学",
    children: [
      { id: "ai", label: "人工智能" },
      { id: "software", label: "软件工程" },
      { id: "database", label: "数据库" },
      { id: "network", label: "计算机网络" },
      { id: "security", label: "信息安全" },
    ],
  },
  {
    id: "engineering",
    label: "工程技术",
    children: [
      { id: "electronic", label: "电子工程" },
      { id: "mechanical", label: "机械工程" },
      { id: "civil", label: "土木工程" },
    ],
  },
  {
    id: "medicine",
    label: "医学",
    children: [
      { id: "clinical", label: "临床医学" },
      { id: "public-health", label: "公共卫生" },
      { id: "pharmacy", label: "药学" },
    ],
  },
];

// Journal types
const journalTypes = ref<JournalType[]>([
  { value: "oa", label: "OA期刊", checked: false },
  { value: "sci", label: "中国SCI期刊", checked: false },
]);

// Mock journal data
const allJournals = ref<Journal[]>([
  {
    id: 1,
    name: "ACM Computing Surveys",
    nameEn: "ACM Computing Surveys",
    isOA: false,
    isSCI: true,
    impactFactor: 14.324,
    subject: ["ai", "software"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 2,
    name: "ACM Journal on Emerging Technologies in Computing Systems",
    nameEn: "ACM Journal on Emerging Technologies in Computing Systems",
    isOA: false,
    isSCI: true,
    impactFactor: 2.845,
    subject: ["electronic"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 3,
    name: "ACM Transactions on Algorithms",
    nameEn: "ACM Transactions on Algorithms",
    isOA: false,
    isSCI: true,
    impactFactor: 0.892,
    subject: ["ai"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 4,
    name: "ACM Transactions on Applied Perception",
    nameEn: "ACM Transactions on Applied Perception",
    isOA: false,
    isSCI: true,
    impactFactor: 1.456,
    subject: ["ai"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 5,
    name: "ACM Transactions on Architecture and Code Optimization",
    nameEn: "ACM Transactions on Architecture and Code Optimization",
    isOA: false,
    isSCI: true,
    impactFactor: 1.23,
    subject: ["software"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 6,
    name: "ACM Transactions on Asian and Low-Resource Language Information Processing",
    nameEn: "ACM Transactions on Asian and Low-Resource Language Information Processing",
    isOA: false,
    isSCI: true,
    impactFactor: 1.892,
    subject: ["ai"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 7,
    name: "ACM Transactions on Autonomous and Adaptive Systems",
    nameEn: "ACM Transactions on Autonomous and Adaptive Systems",
    isOA: false,
    isSCI: true,
    impactFactor: 2.334,
    subject: ["ai"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 8,
    name: "ACM Transactions on Computational Logic",
    nameEn: "ACM Transactions on Computational Logic",
    isOA: false,
    isSCI: true,
    impactFactor: 0.745,
    subject: ["ai"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 9,
    name: "ACM Transactions on Computer Systems",
    nameEn: "ACM Transactions on Computer Systems",
    isOA: false,
    isSCI: true,
    impactFactor: 2.456,
    subject: ["software", "network"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 10,
    name: "ACM Transactions on Computer-Human Interaction",
    nameEn: "ACM Transactions on Computer-Human Interaction",
    isOA: false,
    isSCI: true,
    impactFactor: 4.231,
    subject: ["ai"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 11,
    name: "ACM Transactions on Database Systems",
    nameEn: "ACM Transactions on Database Systems",
    isOA: false,
    isSCI: true,
    impactFactor: 3.245,
    subject: ["database"],
    category: "computer",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 12,
    name: "ACM Transactions on Design Automation of Electronic Systems",
    nameEn: "ACM Transactions on Design Automation of Electronic Systems",
    isOA: false,
    isSCI: true,
    impactFactor: 1.534,
    subject: ["electronic"],
    category: "engineering",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 13,
    name: "ACS Catalysis",
    nameEn: "ACS Catalysis",
    isOA: true,
    isSCI: true,
    impactFactor: 13.084,
    subject: ["chemistry"],
    category: "chemistry",
    firstLetter: "A",
    isFollowed: false,
  },
  {
    id: 14,
    name: "Nature",
    nameEn: "Nature",
    isOA: false,
    isSCI: true,
    impactFactor: 49.962,
    subject: ["biology", "physics"],
    category: "biology",
    firstLetter: "N",
    isFollowed: false,
  },
  {
    id: 15,
    name: "Science",
    nameEn: "Science",
    isOA: false,
    isSCI: true,
    impactFactor: 47.728,
    subject: ["biology", "physics"],
    category: "biology",
    firstLetter: "S",
    isFollowed: false,
  },
]);

// Computed properties
const filteredJournals = computed(() => {
  let result = allJournals.value;

  // Search filter
  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(
      (journal) =>
        journal.name.toLowerCase().includes(keyword) ||
        (journal.nameEn && journal.nameEn.toLowerCase().includes(keyword)),
    );
  }

  // Category filter
  if (selectedCategory.value !== "all") {
    result = result.filter((journal) => journal.category === selectedCategory.value);
  }

  // Letter filter
  if (selectedLetter.value) {
    result = result.filter((journal) => journal.firstLetter === selectedLetter.value);
  }

  // Subject filter
  if (selectedSubjects.value.length > 0) {
    result = result.filter((journal) =>
      journal.subject.some((subject) => selectedSubjects.value.includes(subject)),
    );
  }

  // Journal type filter
  const checkedTypes = journalTypes.value.filter((type) => type.checked).map((type) => type.value);
  if (checkedTypes.length > 0) {
    result = result.filter((journal) => {
      return checkedTypes.every((type) => {
        if (type === "oa") return journal.isOA;
        if (type === "sci") return journal.isSCI;
        return true;
      });
    });
  }

  return result;
});

const paginatedJournals = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return filteredJournals.value.slice(start, end);
});

const totalJournals = computed(() => filteredJournals.value.length);

// Methods
const handleCategoryChange = () => {
  currentPage.value = 1;
};

const handleSearch = () => {
  currentPage.value = 1;
};

const selectLetter = (letter: string) => {
  selectedLetter.value = selectedLetter.value === letter ? "" : letter;
  currentPage.value = 1;
};

const handleSubjectCheck = (data: SubjectCategory, checked: boolean) => {
  if (checked) {
    if (!selectedSubjects.value.includes(data.id)) {
      selectedSubjects.value.push(data.id);
    }
  } else {
    const index = selectedSubjects.value.indexOf(data.id);
    if (index > -1) {
      selectedSubjects.value.splice(index, 1);
    }
  }
  currentPage.value = 1;
};

const handleJournalTypeChange = () => {
  currentPage.value = 1;
};

const handlePageChange = (page: number) => {
  currentPage.value = page;
};

const handleSizeChange = (size: number) => {
  pageSize.value = size;
  currentPage.value = 1;
};

const viewJournalDetail = (journal: Journal) => {
  console.log("Viewing journal:", journal.name);
  // Navigate to journal detail page
};

const followJournal = (journal: Journal) => {
  journal.isFollowed = !journal.isFollowed;
};

onMounted(() => {
  // Initialize any required data
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.rounded-card {
  border-radius: 12px; /* 可根据需求调整圆角大小 */
}
</style>
