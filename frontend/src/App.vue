<template>
  <div id="app">
    <h1>Real-Time Stock Data</h1>

    <!-- Input for stock symbol -->
    <input
      v-model="symbol"
      placeholder="Enter stock symbol (e.g., AAPL)"
      @keyup.enter="fetchStockData"
    />
    <button @click="fetchStockData">Get Stock Data</button>

    <!-- Display loading state -->
    <p v-if="loading">Loading...</p>

    <!-- Display stock data -->
    <div v-if="stockData && !loading">
      <h2>Stock Data for {{ stockData.symbol }}</h2>
      <p><strong>Current Price:</strong> ${{ stockData.current_price.toFixed(2) }}</p>
    </div>

    <!-- Display error message -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getStockData } from './services/api';

export default defineComponent({
  name: 'App',
  setup() {
    // Reactive state
    const symbol = ref<string>('');
    const stockData = ref<any>(null);
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);

    // Function to fetch stock data from backend
    const fetchStockData = async () => {
      try {
        error.value = null;
        stockData.value = null;
        loading.value = true;

        // Call the API function from api.ts
        stockData.value = await getStockData(symbol.value);
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
.error {
  color: red;
  margin-top: 20px;
}
</style>
