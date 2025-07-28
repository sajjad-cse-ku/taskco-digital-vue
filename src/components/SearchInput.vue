<template>
  <input
    type="text"
    v-model="searchQuery"
    placeholder="Search blog posts..."
    class="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
  />
</template>

<script setup>
import { ref, watch } from 'vue';
import { debounce } from 'lodash';

const emit = defineEmits(['search']);
const searchQuery = ref('');

watch(searchQuery, debounce((val) => emit('search', val), 500));
</script>
