<template>
  <div id="app" class="font-inter bg-gray-900 min-h-screen text-white">
    <!-- Navbar -->
    <Navbar />

    <!-- Main Content -->
    <div class="text-center p-8">
      <h1 class="text-green-500 text-5xl font-bold">Uptick</h1>
      <p class="text-2xl mt-2">Discover <span class="text-green-500">Trending</span> Stocks</p>
    </div>

    <!-- Search Section -->
    <div class="text-center mb-8">
      <input
        v-model="searchSymbol"
        type="text"
        placeholder="Enter Stock Symbol (e.g., AAPL)"
        class="p-2 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        @click="handleSearch"
        class="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        Search
      </button>
    </div>

    <!-- Sentiment Analysis Component -->
    <Sentiment :key="currentSymbol" :symbol="currentSymbol" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from '../components/navbar.vue';
import Sentiment from '../components/getSentiment.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Sentiment,
  },
  setup() {
    const searchSymbol = ref<string>('');
    const currentSymbol = ref<string>('TSLA');

    // Update currentSymbol when the search button is clicked
    const handleSearch = () => {
      if (searchSymbol.value.trim()) {
        currentSymbol.value = searchSymbol.value.trim().toUpperCase();
      }
    };

    return {
      searchSymbol,
      currentSymbol,
      handleSearch,
    };
  },
});
</script>

<style scoped>
#app {
  font-family: 'Inter', sans-serif;
}
</style>
