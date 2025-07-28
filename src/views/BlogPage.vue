<template>
  <div class="max-w-4xl mx-auto px-4 py-10">
    <button
      @click="$router.back()"
      class="flex items-center text-indigo-600 hover:text-indigo-800 transition font-medium mb-8"
    >
      <span class="text-xl mr-1">←</span> Back to All Posts
    </button>

    <div v-if="blog" class="bg-white shadow-lg rounded-2xl p-8 space-y-6">
      <h1 class="text-3xl font-bold text-gray-900 leading-tight">{{ blog.title }}</h1>

      <div class="flex flex-wrap items-center text-sm text-gray-500 gap-3">
        <span class="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
          ✍️ {{ blog.author }}
        </span>
        <span class="inline-flex items-center bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
          🗓 {{ formatDate(blog.created_at) }}
        </span>
      </div>

      <div class="prose prose-indigo max-w-none text-lg text-gray-800">
        <p class="whitespace-pre-wrap">{{ blog.content }}</p>
      </div>
    </div>

    <div v-else class="text-center text-gray-400 text-lg animate-pulse mt-12">
      Loading blog post...
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const apiUrl = import.meta.env.VITE_API_URL;
const blog = ref(null);
const route = useRoute();

const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const fetchBlog = async () => {
  try {
    const res = await axios.get(`${apiUrl}/blog-posts/${route.params.id}`);
    blog.value = res.data.data;
  } catch (err) {
    blog.value = null;
  }
};

onMounted(fetchBlog);
</script>

<style scoped>
.prose p {
  line-height: 1.75;
}
</style>
