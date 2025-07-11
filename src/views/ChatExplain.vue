<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Main Content Area -->
    <div class="relative flex-1">
      <!-- Back Button -->
      <div class="absolute top-4 left-4 z-10">
        <el-button type="text" class="rounded-full !p-2 hover:bg-gray-100">
          <el-icon size="20" color="#666">
            <ArrowLeft />
          </el-icon>
        </el-button>
      </div>

      <!-- Main Content -->
      <div class="mx-auto w-full max-w-4xl px-6 pt-28">
        <!-- Header Section -->
        <div class="mb-8 flex items-start">
          <!-- Gradient Icon -->
          <div
            class="mt-2 mr-9 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
            style="
              background: linear-gradient(
                152deg,
                rgb(59, 172, 255) 0%,
                rgb(59, 172, 255) 3%,
                rgb(155, 94, 255) 100%
              );
            "
          >
            <el-icon size="24" color="white">
              <Document />
            </el-icon>
          </div>

          <!-- Title and Description -->
          <div class="flex-1">
            <h1 class="mb-4 text-4xl leading-relaxed font-black" style="color: rgb(71, 89, 197)">
              AI 论文助手
            </h1>
            <p class="text-base leading-6 font-normal text-gray-500">
              作为您的论文阅读助手，我可以帮助您快速解读论文：支持多语言论文的高精度翻译，对论文中的文本、图片、公式进行高精度解读，还能进行问答互动。
            </p>
          </div>
        </div>

        <!-- Upload Area -->
        <div class="mb-8">
          <el-upload
            drag
            :show-file-list="false"
            accept=".pdf"
            :before-upload="handleBeforeUpload"
            class="upload-area"
          >
            <div class="upload-content">
              <!-- Upload Icon and Text -->
              <div class="mb-6 flex items-center justify-center">
                <img
                  src="https://ext.same-assets.com/3455306590/2483044549.png"
                  alt="PDF 图标"
                  class="mr-4 h-14 w-12"
                />
                <div class="text-left">
                  <div class="mb-2 text-lg font-semibold">
                    <span style="color: rgb(71, 89, 197)">点击添加</span>
                  </div>
                  <div class="text-sm text-gray-400">
                    支持 PDF 文件，文件大小不超过 50M，暂不支持扫描件
                  </div>
                </div>
              </div>

              <!-- Description -->
              <div class="mb-5 text-sm font-medium text-gray-400">
                您可以通过多种方式开启 AI 阅读之旅
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-center gap-2">
                <el-button type="text" class="action-btn" @click.stop="uploadLocal">
                  <el-icon class="mr-2">
                    <Upload />
                  </el-icon>
                  上传本地 PDF
                </el-button>

                <el-button type="text" class="action-btn" @click.stop="selectFromAMiner">
                  <el-icon class="mr-2">
                    <Search />
                  </el-icon>
                  从 AMiner 选择论文
                </el-button>

                <el-button type="text" class="action-btn" @click.stop="goToLibrary">
                  <el-icon class="mr-2">
                    <Collection />
                  </el-icon>
                  前往我的文献库
                </el-button>
              </div>
            </div>
          </el-upload>
        </div>

        <!-- Recommended Reads Section -->
        <div class="mb-8">
          <div class="mb-6 flex items-center">
            <el-icon class="mr-2" color="#5962a6">
              <Star />
            </el-icon>
            <div class="text-base font-semibold" style="color: rgb(89, 98, 150)">推荐阅读</div>
          </div>

          <!-- Paper Cards Grid -->
          <div class="flex gap-7">
            <el-card
              v-for="paper in recommendedPapers"
              :key="paper.id"
              class="paper-card h-48 w-60 cursor-pointer transition-all duration-300 hover:shadow-lg"
              :body-style="{ padding: '0' }"
              shadow="never"
              @click="openPaper(paper)"
            >
              <div
                class="relative h-full w-full overflow-hidden rounded-3xl"
                :style="{
                  background: `url('${paper.thumbnail}') center/cover, rgba(246, 247, 249, 0.32)`,
                  borderColor: 'rgba(232, 236, 244, 0.8)',
                }"
              >
                <!-- Paper Info at Bottom -->
                <div
                  class="absolute bottom-0 flex h-14 w-full rounded-b-3xl border-t border-gray-100 bg-white"
                >
                  <div class="flex w-12 items-center justify-center">
                    <el-icon size="24" color="#5962a6">
                      <Document />
                    </el-icon>
                  </div>
                  <div class="flex-1 p-2 pr-3">
                    <div
                      class="overflow-hidden text-sm leading-5 font-semibold text-ellipsis whitespace-nowrap text-gray-600 transition-colors duration-300 group-hover:text-blue-500"
                      :title="paper.title"
                    >
                      {{ paper.title }}
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </div>

        <!-- Background Decoration -->
        <div class="mt-20 flex justify-center">
          <img
            src="https://ext.same-assets.com/3455306590/1216520056.png"
            alt="背景装饰"
            class="h-auto max-w-full opacity-50"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search, Document, Star, Collection, ArrowLeft, Upload } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

interface RecommendedPaper {
  id: number;
  title: string;
  thumbnail: string;
}

const recommendedPapers = ref<RecommendedPaper[]>([
  {
    id: 1,
    title: "Attention is all you need",
    thumbnail: "https://originalfileserver.aminer.cn/sys/aminer/chatpaper/placeholder.png",
  },
  {
    id: 2,
    title: "Language Models are Few-Shot Learners",
    thumbnail: "https://originalfileserver.aminer.cn/sys/aminer/chatpaper/placeholder.png",
  },
  {
    id: 3,
    title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    thumbnail: "https://originalfileserver.aminer.cn/sys/aminer/chatpaper/placeholder.png",
  },
]);

const handleBeforeUpload = (file: File) => {
  const isPDF = file.type === "application/pdf";
  const isLt50M = file.size / 1024 / 1024 < 50;

  if (!isPDF) {
    ElMessage.error("仅支持 PDF 文件！");
    return false;
  }
  if (!isLt50M) {
    ElMessage.error("文件大小必须小于 50MB！");
    return false;
  }

  // Handle file upload logic here
  ElMessage.success(`正在上传 ${file.name}...`);
  return false; // Prevent automatic upload, handle manually
};

const uploadLocal = () => {
  // Trigger file upload
  ElMessage.info("请选择要上传的 PDF 文件");
};

const selectFromAMiner = () => {
  // Navigate to paper selection
  ElMessage.info("正在跳转至 AMiner 论文搜索页面...");
};

const goToLibrary = () => {
  // Navigate to literature library
  ElMessage.info("正在跳转至我的文献库...");
};

const openPaper = (paper: RecommendedPaper) => {
  ElMessage.success(`正在打开论文：${paper.title}`);
  // Navigate to paper reading interface
};
</script>

<style scoped>
/* Custom styles for upload area */
:deep(.upload-area .el-upload-dragger) {
  border: 2px dashed #e8ecf4;
  border-radius: 12px;
  background: #fafbfc;
  padding: 40px 20px;
  transition: all 0.3s ease;
}

:deep(.upload-area .el-upload-dragger:hover) {
  border-color: #4759c5;
  background: #f8f9ff;
}

.upload-content {
  text-align: center;
}

.action-btn {
  padding: 8px 12px;
  border: 1px solid transparent;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  color: #5962a6;
  font-size: 13px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  color: #3b5bff;
  border-color: #3b5bff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(59, 91, 255, 0.2);
}

/* Paper card hover effects */
.paper-card {
  border: 1px solid rgba(232, 236, 244, 0.8);
  border-radius: 24px;
  overflow: hidden;
}

.paper-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  color: #3b5bff;
}

:deep(.el-menu-item.is-active) {
  background-color: #e8f0ff;
  color: #3b5bff;
  font-weight: 500;
}
</style>
