<template>
  <navbar></navbar>
  <div id="app">
    <h1>UpTick: Stock Market App</h1>

    <!-- Input field for the stock symbol -->
    <input
      v-model="symbol"
      placeholder="Enter stock symbol (e.g., AAPL)"
      @keyup.enter="fetchStockData"
    />
    <button @click="fetchStockData">Get Stock Data</button>

    <!-- Display current stock data -->
    <div v-if="stockData">
      <h2>Current Stock Data for {{ stockData.symbol }}</h2>
      <p>Name: {{ stockData.name }}</p>
      <p>Current Price: ${{ stockData.currentPrice }}</p>
      <p>Day High: ${{ stockData.dayHigh }}</p>
      <p>Day Low: ${{ stockData.dayLow }}</p>
      <p>Open Price: ${{ stockData.openPrice }}</p>
      <p>Previous Close: ${{ stockData.previousClose }}</p>
    </div>

    <!-- Display historical data -->
    <div v-if="historicalData.length > 0">
      <h2>Historical Data</h2>
      <ul>
        <li v-for="data in historicalData" :key="data.date">
          {{ data.date }} - ${{ data.value }}
        </li>
      </ul>
    </div>

    <!-- Display recommendations -->
    <div v-if="recommendations.length > 0">
      <h2>Recommendations</h2>
      <ul>
        <li v-for="rec in recommendations" :key="rec.symbol">
          {{ rec.symbol }} - {{ rec.recommendation }}
        </li>
      </ul>
    </div>

    <!-- Display error message if any -->
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getStockData, getHistoricalData, getStockRecommendations } from './services/api';
import navbar from './components/navbar.vue';

export default defineComponent({
  components: {
    navbar,
  },
  name: 'App',
  setup() {
    const symbol = ref<string>('');
    const stockData = ref<any>(null);
    const historicalData = ref<any[]>([]);
    const recommendations = ref<any[]>([]);
    const error = ref<string | null>(null);

    // Function to fetch stock data
    const fetchStockData = async () => {
      try {
        error.value = null;
        stockData.value = await getStockData(symbol.value);

        // Fetch historical data (last 1 year)
        historicalData.value = await getHistoricalData(symbol.value, '2022-01-01', '2023-01-01');

        // Fetch recommendations
        recommendations.value = await getStockRecommendations(symbol.value);
      } catch (err) {
        error.value = 'Failed to fetch stock data. Please try again.';
        console.error(err);
      }
    };

    return {
      symbol,
      stockData,
      historicalData,
      recommendations,
      error,
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
