<template>
  <div id="app" class="font-inter bg-gray-900 min-h-screen text-white">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Header Section -->
    <div class="text-center p-8">
      <h1 class="text-green-500 text-5xl font-bold">Uptick</h1>
      <p class="text-2xl mt-2">Discover <span class="text-green-500">Trending</span> Stocks</p>
    </div>

    <!-- Search Section -->
    <div class="flex flex-col items-center mb-8">
      <h2 class="text-2xl font-bold mb-4">Search for a Stock</h2>
      <div class="flex">
        <input
          v-model="symbol"
          type="text"
          placeholder="Search for a stock symbol (e.g., AAPL)"
          @keyup.enter="fetchStockData"
          class="p-3 rounded-l-md bg-gray-800 text-white border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          @click="fetchStockData"
          class="p-3 rounded-r-md bg-green-500 text-white hover:bg-green-600 focus:outline-none"
        >
          Search
        </button>
      </div>
      <p v-if="error" class="text-red-500 mt-2">{{ error }}</p>
    </div>

    <!-- News Section -->
    <div v-if="newsArticles.length > 0" class="p-8">
      <h2 class="text-3xl font-bold text-green-500 mb-4">Latest News for {{ symbol.toUpperCase() }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="article in newsArticles"
          :key="article.url"
          class="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
        >
          <img v-if="article.image" :src="article.image" alt="News Image" class="w-full h-48 object-cover rounded-t-lg mb-4">
          <h3 class="text-xl font-bold mb-2">{{ article.title }}</h3>
          <p class="text-gray-400 mb-4">{{ article.description }}</p>
          <a :href="article.url" target="_blank" class="text-green-500 hover:underline">Read more</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from '../components/navbar.vue';
import randomGraph from '../components/SP500.vue';
import axios from 'axios';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    randomGraph,
  },
  setup() {
    // Reactive state
    const symbol = ref<string>('AAPL');
    const newsArticles = ref<any[]>([]);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);

    // Function to fetch stock news
    const fetchStockData = async () => {
      try {
        error.value = null;
        newsArticles.value = [];
        loading.value = true;

        // Fetch news data from the backend
        const response = await axios.get(`/api/stocks/${symbol.value}/news`);
        newsArticles.value = response.data.articles;
      } catch (err) {
        error.value = 'Failed to fetch stock news. Please try again.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      symbol,
      newsArticles,
      error,
      loading,
      fetchStockData,
    };
  },
});
</script>

<style scoped>
#app {
  font-family: 'Inter', sans-serif;
}
input {
  width: 300px;
}
button {
  cursor: pointer;
}
.error {
  color: red;
}
</style>
