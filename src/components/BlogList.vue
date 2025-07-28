<template>
  <div class="space-y-6">
    <SearchInput @search="handleSearch" />

    <div
      class="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Blog posts"
    >
      <BlogCard
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
        class="w-full"
      />
    </div>

    <div class="mt-10 flex justify-center items-center flex-wrap gap-2 select-none">
      <button
        class="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
        :disabled="meta.current_page === 1"
        @click="fetchBlogs(meta.current_page - 1)"
      >
        Prev
      </button>

      <button
        v-for="page in pages"
        :key="page"
        class="px-3 py-1.5 rounded border text-sm font-medium"
        :class="{
          'bg-indigo-600 text-white': page === meta.current_page,
          'bg-white text-gray-700 border-gray-300 hover:bg-gray-100': page !== meta.current_page
        }"
        @click="fetchBlogs(page)"
      >
        {{ page }}
      </button>

      <button
        class="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 disabled:opacity-50"
        :disabled="meta.current_page === meta.last_page"
        @click="fetchBlogs(meta.current_page + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, computed } from 'vue';
import BlogCard from './BlogCard.vue';
import SearchInput from './SearchInput.vue';
const apiUrl = import.meta.env.VITE_API_URL;
const blogs = ref([]);
const meta = ref({});
const search = ref('');

const fetchBlogs = async (page = 1) => {
  const res = await axios.get(`${apiUrl}/blog-posts`, {
    params: { page, search: search.value },
  });
  blogs.value = res.data.data;
  meta.value = res.data.meta;
};

const handleSearch = (query) => {
  search.value = query;
  fetchBlogs(1);
};

// Generate an array of page numbers (e.g., [1, 2, 3, 4, 5])
const pages = computed(() => {
  const total = meta.value.last_page || 1;
  const current = meta.value.current_page || 1;

  const delta = 2; // Number of pages to show before and after current
  const range = [];

  const start = Math.max(1, current - delta);
  const end = Math.min(total, current + delta);

  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  return range;
});

fetchBlogs();
</script>

