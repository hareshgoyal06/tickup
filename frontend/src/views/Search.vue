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

    <!-- Display loading state -->
    <p v-if="loading" class="text-lg text-center">Loading...</p>

    <!-- Display real-time stock data using randomGraph -->
    <div
      v-if="stockData && !loading"
      class="flex justify-center items-center w-full px-8"
    >
      <randomGraph
        :symbol="stockData.symbol"
        :title="`Stock Data for ${stockData.symbol}`"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from '../components/navbar.vue';
import randomGraph from '../components/SP500.vue';
import { getStockData } from '../services/api';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    randomGraph,
  },
  setup() {
    // Reactive state
    const symbol = ref<string>('AAPL');
    const stockData = ref<any>(null);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);

    // Function to fetch real-time stock data
    const fetchStockData = async () => {
      try {
        error.value = null;
        stockData.value = null;
        loading.value = true;

        const data = await getStockData(symbol.value);
        stockData.value = data;
      } catch (err) {
        error.value = 'Failed to fetch stock data. Please try again.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      symbol,
      stockData,
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
