
<template>
  <div>
    <navbar></navbar>
    <!-- <h1>Stock Data for {{ stock.symbol }}</h1>
    <p>Current Price: ${{ stock.currentPrice }}</p>

    <h2>Historical Data</h2>
    <ul>
      <li v-for="data in stock.historicalData" :key="data.date">
        {{ data.date }}: ${{ data.value }}
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import navbar from './components/navbar.vue';
import { getStockData } from './services/api';

export default defineComponent({
  components: {
        navbar,
      },
  data() {
    return {
      stock: {
        symbol: '',
        currentPrice: 0,
        historicalData: [],
      },
    };
  },
  async mounted() {
    try {
      const stockData = await getStockData('AAPL', '2y');
      this.stock = stockData;
    } catch (error) {
      console.error('Failed to load stock data:', error);
    }
  },
});
</script>
