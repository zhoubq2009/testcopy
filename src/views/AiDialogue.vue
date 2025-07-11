<template>
  <div class="flex flex-1 flex-col">
    <!-- Back Button -->
    <div
      class="absolute top-4 left-4 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-200"
      @click="goBack"
    >
      <img src="https://ext.same-assets.com/3455306590/3844042378.svg" alt="" class="h-5 w-5" />
    </div>

    <!-- Chat Content -->
    <div class="flex flex-1 flex-col" style="padding-top: 16px">
      <div class="mx-auto flex max-w-4xl flex-1 flex-col items-center justify-center px-6">
        <!-- Header Section -->
        <div class="pt-16 text-center">
          <!-- Main Icon -->
          <div
            class="mx-auto mb-4 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full"
            style="
              background: linear-gradient(
                152deg,
                rgb(59, 172, 255) 0%,
                rgb(59, 172, 255) 3%,
                rgb(155, 94, 255) 100%
              );
            "
          >
            <img
              src="https://ext.same-assets.com/3455306590/206624191.svg"
              alt=""
              class="h-8 w-8"
            />
          </div>

          <!-- Title -->
          <h1 class="mb-4 text-4xl leading-relaxed font-black" style="color: rgb(71, 89, 197)">
            AI Dialogue
          </h1>

          <!-- Subtitle -->
          <p class="mb-12 max-w-2xl text-base leading-6 font-normal text-gray-500">
            作为您的科研问答助手，您可以与我交流学术问题，我会给出答案和依据，希望对您有所帮助！
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="mb-16 flex w-full max-w-3xl flex-wrap gap-3">
          <!-- Library Q&A Card -->
          <div
            class="relative flex h-24 w-5/12 flex-grow cursor-pointer flex-col justify-center rounded-2xl bg-white pl-16 transition-all duration-300 hover:shadow-lg"
            @click="selectMode('qa')"
            :class="{ 'ring-2 ring-blue-500': chatMode === 'qa' }"
          >
            <div class="mb-1 text-base font-semibold" style="color: rgb(89, 98, 150)">文库问答</div>
            <div style="color: rgb(110, 119, 170); font-size: 12px">
              知识图谱与大模型结合的方式有哪些？
            </div>
            <div
              class="absolute top-8 left-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
              style="
                background: linear-gradient(
                  152deg,
                  rgb(59, 172, 255) 0%,
                  rgb(59, 172, 255) 3%,
                  rgb(155, 94, 255) 100%
                );
              "
            >
              <img
                src="https://ext.same-assets.com/3455306590/2632280424.svg"
                alt=""
                class="h-5 w-5"
              />
            </div>
          </div>

          <!-- Summary Card -->
          <div
            class="relative flex h-24 w-5/12 flex-grow cursor-pointer flex-col justify-center rounded-2xl bg-white pl-16 transition-all duration-300 hover:shadow-lg"
            @click="selectMode('summary')"
            :class="{ 'ring-2 ring-blue-500': chatMode === 'summary' }"
          >
            <div class="mb-1 text-base font-semibold" style="color: rgb(89, 98, 150)">文献综述</div>
            <div style="color: rgb(110, 119, 170); font-size: 12px">
              根据提供的主题和需求，检索并生成文献综述
            </div>
            <div
              class="absolute top-8 left-4 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
              style="
                background: linear-gradient(
                  152deg,
                  rgb(59, 172, 255) 0%,
                  rgb(59, 172, 255) 3%,
                  rgb(155, 94, 255) 100%
                );
              "
            >
              <img
                src="https://ext.same-assets.com/3455306590/1663873243.svg"
                alt=""
                class="h-5 w-5"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Chat Messages Area -->
      <div v-if="hasMessages" class="mx-auto mb-6 w-full max-w-4xl flex-1 px-6">
        <div class="space-y-4">
          <div
            v-for="message in chatMessages"
            :key="message.id"
            :class="['flex', message.type === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div
              :class="[
                'max-w-3xl rounded-2xl px-4 py-3',
                message.type === 'user'
                  ? 'ml-12 bg-blue-600 text-white'
                  : 'mr-12 border border-gray-200 bg-white',
              ]"
            >
              <div class="whitespace-pre-wrap">{{ message.content }}</div>
              <div class="mt-2 text-xs opacity-70">
                {{ formatTime(message.timestamp) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Box -->
      <div class="sticky bottom-0 bg-gray-50 pt-4">
        <!-- Mode Selector -->
        <div class="mx-auto mb-4 max-w-4xl px-6">
          <div class="flex gap-4">
            <div
              class="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors"
              :class="
                chatMode === 'qa'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              "
              @click="setChatMode('qa')"
            >
              <img
                src="https://ext.same-assets.com/3455306590/3861771583.svg"
                alt=""
                class="h-3.5 w-3.5"
              />
              <span class="text-sm">学术问答</span>
            </div>
            <div
              class="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-colors"
              :class="
                chatMode === 'summary'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              "
              @click="setChatMode('summary')"
            >
              <img
                src="https://ext.same-assets.com/3455306590/3894509797.svg"
                alt=""
                class="h-3.5 w-3.5"
              />
              <span class="text-sm">文献综述</span>
            </div>
          </div>
        </div>

        <!-- Quality Topics Banner (when no messages) -->
        <div v-if="!hasMessages" class="mx-auto mb-4 max-w-4xl px-6">
          <div class="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4">
            <img
              src="https://ext.same-assets.com/3455306590/1169139175.png"
              alt=""
              class="h-12 w-12 rounded"
            />
            <span class="font-medium text-gray-700">质量主题</span>
          </div>
        </div>

        <!-- Text Input -->
        <div class="mx-auto max-w-4xl px-6 pb-6">
          <div class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div class="flex items-end gap-3">
              <textarea
                v-model="currentMessage"
                placeholder="请输入您想了解的问题"
                maxlength="2024"
                class="max-h-[134px] min-h-[29px] flex-1 resize-none border-none text-base leading-relaxed outline-none"
                style="min-height: 29px"
                @keydown.enter.exact="handleSend"
                @keydown.enter.shift.prevent="currentMessage += '\n'"
                rows="1"
              />
              <button
                @click="handleSend"
                :disabled="!currentMessage.trim() || isGenerating"
                class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full transition-opacity"
                :class="
                  currentMessage.trim() && !isGenerating
                    ? 'opacity-100 hover:bg-gray-100'
                    : 'opacity-50'
                "
              >
                <img
                  src="https://ext.same-assets.com/3455306590/4204976255.svg"
                  alt=""
                  class="h-6 w-6"
                />
              </button>
            </div>
          </div>
          <div class="mt-2 text-center text-xs" style="color: rgb(153, 153, 153)">
            注：本内容可能由AI生成
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useMainStore } from "../stores";

const router = useRouter();
const store = useMainStore();

const currentMessage = ref("");

// Computed
const chatMessages = computed(() => store.chatMessages);
const chatMode = computed(() => store.chatMode);
const isGenerating = computed(() => store.isGenerating);
const hasMessages = computed(() => store.hasMessages);

// Methods
const goBack = () => {
  router.go(-1);
};

const selectMode = (mode: "qa" | "summary") => {
  store.setChatMode(mode);
};

const setChatMode = (mode: "qa" | "summary") => {
  store.setChatMode(mode);
};

const handleSend = () => {
  if (!currentMessage.value.trim() || isGenerating.value) return;

  // Add user message
  store.addChatMessage({
    type: "user",
    content: currentMessage.value.trim(),
  });

  const userMessage = currentMessage.value.trim();
  currentMessage.value = "";

  // Simulate AI response
  store.isGenerating = true;
  setTimeout(() => {
    let response = "";
    if (chatMode.value === "qa") {
      response = `Thank you for your question about "${userMessage}". As an AI research assistant, I can help you understand this topic better. This is a complex area that involves multiple aspects of computational research and methodology.

Would you like me to provide more specific details about any particular aspect of this topic?`;
    } else {
      response = `I'll generate a literature review summary based on your request: "${userMessage}".

Based on current research trends and available publications, here are the key findings and insights related to your topic. This summary includes recent developments, methodological approaches, and future research directions.

Would you like me to expand on any specific section or provide additional references?`;
    }

    store.addChatMessage({
      type: "assistant",
      content: response,
    });
    store.isGenerating = false;
  }, 1500);
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>

<style scoped>
/* Custom scrollbar for chat area */
.space-y-4::-webkit-scrollbar {
  width: 4px;
}

.space-y-4::-webkit-scrollbar-track {
  background: transparent;
}

.space-y-4::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.space-y-4::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}

/* Auto-resize textarea */
textarea {
  field-sizing: content;
}
</style>
