<template>
  <div id="app">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Real-Time Stock Data Section -->
    <h1>Real-Time Stock Data</h1>
    <input
      v-model="symbol"
      placeholder="Enter stock symbol (e.g., AAPL)"
      @keyup.enter="fetchStockData"
    />
    <button @click="fetchStockData">Get Stock Data</button>

    <!-- Display loading state -->
    <p v-if="loading">Loading...</p>

    <!-- Display real-time stock data -->
    <div v-if="stockData && !loading">
      <h2>Stock Data for {{ stockData.symbol }}</h2>
      <p><strong>Current Price:</strong> ${{ stockData.current_price.toFixed(2) }}</p>
    </div>

    <!-- Display error message -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <!-- Historical Stock Data Section -->
    <h2 v-if="stockData">Select Time Range for Historical Data</h2>
    <select v-if="stockData" v-model="selectedPeriod" @change="fetchHistoricalData">
      <option value="6mo">6 Months</option>
      <option value="1y">1 Year</option>
      <option value="2y">2 Years</option>
    </select>

    <!-- Display historical stock data -->
    <div v-if="historicalData.length > 0 && !loading">
      <h2>Historical Data for {{ stockData.symbol }}</h2>
      <ul>
        <li v-for="data in historicalData" :key="data.date">
          {{ data.date }}: ${{ data.value.toFixed(2) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getStockData, getHistoricalStockData } from './services/api';
import Navbar from './components/navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    // Reactive state
    const symbol = ref<string>('AAPL');
    const stockData = ref<any>(null);
    const historicalData = ref<any[]>([]);
    const selectedPeriod = ref<string>('6mo');
    const error = ref<string | null>(null);
    const loading = ref<boolean>(false);

    // Function to fetch real-time stock data
    const fetchStockData = async () => {
      try {
        error.value = null;
        stockData.value = null;
        loading.value = true;

        stockData.value = await getStockData(symbol.value);
      } catch (err) {
        error.value = 'Failed to fetch stock data. Please try again.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    // Function to fetch historical stock data
    const fetchHistoricalData = async () => {
      try {
        error.value = null;
        historicalData.value = [];
        loading.value = true;

        historicalData.value = await getHistoricalStockData(symbol.value, selectedPeriod.value);
      } catch (err) {
        error.value = 'Failed to fetch historical stock data. Please try again.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    return {
      symbol,
      stockData,
      historicalData,
      selectedPeriod,
      error,
      loading,
      fetchStockData,
      fetchHistoricalData,
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
select {
  padding: 10px;
  font-size: 16px;
  margin-top: 20px;
}
.error {
  color: red;
  margin-top: 20px;
}
</style>
