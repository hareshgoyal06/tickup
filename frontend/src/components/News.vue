<template>
    <div class="p-8">
      <h2 class="text-green-500 text-4xl font-bold mb-6">Here's What's Going On</h2>
      <div v-if="loading" class="text-center text-lg">Loading news...</div>
      <div v-else-if="error" class="text-red-500 text-center">{{ error }}</div>
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in newsArticles"
          :key="article.url"
          class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <!-- News Image -->
          <img v-if="article.image" :src="article.image" alt="News Image" class="w-full h-48 object-cover rounded-t-md mb-4">
  
          <!-- News Title -->
          <h3 class="text-xl font-bold mb-2">{{ article.title }}</h3>
  
          <!-- News Description -->
          <p class="text-gray-400 mb-4">{{ article.description }}</p>
  
          <!-- Read More Link -->
          <a :href="article.url" target="_blank" class="text-green-500 hover:underline">
            Read more
          </a>
  
          <!-- News Source -->
          <p class="text-sm text-gray-500 mt-2">Source: {{ article.source }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { getNews } from '../services/api';
  
  export default defineComponent({
    name: 'News',
    setup() {
      const newsArticles = ref<any[]>([]);
      const loading = ref<boolean>(true);
      const error = ref<string | null>(null);
  
      // Fetch news for ^GSPC ticker
      const fetchNews = async () => {
        try {
          const response = await getNews('market');
          newsArticles.value = response.articles;
        } catch (err) {
          error.value = 'Failed to fetch news articles. Please try again.';
          console.error(err);
        } finally {
          loading.value = false;
        }
      };
  
      // Fetch news when the component is mounted
      onMounted(() => {
        fetchNews();
      });
  
      return {
        newsArticles,
        loading,
        error,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Tailwind utility classes are used for styling */
  </style>
  