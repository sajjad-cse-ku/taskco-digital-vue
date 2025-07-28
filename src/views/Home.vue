<template>
  <div class="p-6 max-w-6xl mx-auto text-center">
    <h1 class="text-5xl font-bold mb-2 text-green-700">Vue.Js Project</h1>
    <h2 class="text-xl text-gray-600 mb-6">All Blog Posts</h2>
    <BlogList />
  </div>
</template>


<script setup>
import BlogList from '../components/BlogList.vue';
</script>
