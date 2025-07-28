<template>
  <router-link
    :to="`/blog/${blog.id}`"
    class="block bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg hover:border-indigo-400 transition-all duration-300 h-full"
  >
    <h2 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition">
      {{ blog.title }}
    </h2>

    <p class="text-gray-600 text-sm mb-5 line-clamp-3 whitespace-pre-wrap">
      {{ blog.content }}
    </p>

    <div class="flex justify-between items-center text-xs text-gray-500">
      <span class="inline-flex items-center bg-indigo-100 text-indigo-700 px-3 py-0.5 rounded-full font-medium select-none">
        ✍️ {{ blog.author }}
      </span>
      <span class="select-none">{{ formatDate(blog.created_at) }}</span>
    </div>
  </router-link>
</template>

<script setup>
defineProps({ blog: Object });

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const isoDate = dateStr.replace(' ', 'T');
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
