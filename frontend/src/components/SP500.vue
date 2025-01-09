<template>
  <div class="text-2xl">
    <div class="flex flex-col items-start justify-between stock-graph-container mx-auto bg-gray-800 text-white p-2 rounded-lg shadow-md">
      <!-- Title -->
      <h2 class="font-bold mb-4 -mt-2">{{ title }}</h2>

      <!-- Real-Time Stock Price -->
      <p v-if="currentPrice !== null && dayChange !== null" class="mt-4 text-lg">
        <strong>{{ symbol }}</strong>: ${{ currentPrice?.toFixed(2) || 'N/A' }} |
        <span :class="dayChange > 0 ? 'text-green-500' : 'text-red-500'">
          ${{ dayChange?.toFixed(2) || '0.00' }} - {{ percentageChange?.toFixed(2) || '0.00' }}%
        </span>
      </p>

      <!-- Time Range Buttons -->
      <div class="flex space-x-2 my-4">
        <button v-for="range in timeRanges" :key="range.value" @click="updatePeriod(range.value)"
          :class="{'bg-green-500 text-white': selectedPeriod === range.value, 'bg-gray-600 text-white': selectedPeriod !== range.value}"
          class="px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
        >
          {{ range.label }}
        </button>
      </div>

      <!-- Line Chart -->
      <LineChart :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getHistoricalStockData, getStockData, getOpenPrice } from '../services/api';
import LineChart from '../components/LineChart.vue';
import type { ChartData, ChartOptions } from 'chart.js';

export default defineComponent({
  name: 'StockGraph',
  components: {
    LineChart,
  },
  props: {
    symbol: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Stock Price Graph',
    },
  },
  setup(props) {
    // Reactive state
    const currentPrice = ref<number | null>(null);
    const openingPrice = ref<number | null>(null);
    const dayChange = ref<number | null>(null);
    const percentageChange = ref<number | null>(null);
    const selectedPeriod = ref<string>('6mo');

    const timeRanges = ref([
      { label: '5d', value: '5d' },
      { label: '1M', value: '1mo' },
      { label: '6M', value: '6mo' },
      { label: '1Y', value: '1y' },
      { label: '5Y', value: '5y' },
    ]);
    // Chart data and options
    const chartData = ref<ChartData<'line'>>({
      labels: [],
      datasets: [
        {
          label: `${props.symbol} Closing Prices`,
          data: [],
          borderColor: 'rgba(34, 197, 94, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 0.2,
        },
      ],
    });

    const chartOptions = ref<ChartOptions<'line'>>({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: false,
        },
        y: {
          grid: {
            color: '#d1d5db',
          },
          ticks: {
            color: '#374151',
          },
        },
      },
    });

    // Function to update the selected period and fetch new data
    const updatePeriod = async (period: string) => {
      selectedPeriod.value = period;
      await fetchHistoricalData();
    };

    // Fetch historical stock data
    const fetchHistoricalData = async () => {
      try {
        const response = await getHistoricalStockData(props.symbol, selectedPeriod.value);
        chartData.value = {
          labels: response.historical_data.map((item: any) => new Date(item.Date).toISOString().split('T')[0]),
          datasets: [
            {
              label: `${props.symbol} Closing Prices`,
              data: response.historical_data.map((item: any) => item.Close),
              borderColor: 'rgba(34, 197, 94, 1)',
              backgroundColor: 'rgba(34, 197, 94, 0.2)',
            },
          ],
        };
      } catch (error) {
        console.error('Error fetching historical stock data:', error);
      }
    };

    // Fetch real-time stock data
    const fetchStockData = async () => {
      try {
        const stockData = await getStockData(props.symbol);
        currentPrice.value = stockData.current_price;

        const openPriceData = await getOpenPrice(props.symbol);
        openingPrice.value = openPriceData.opening_price;

        if (currentPrice.value !== null && openingPrice.value !== null) {
          dayChange.value = currentPrice.value - openingPrice.value;
          percentageChange.value = (dayChange.value / openingPrice.value) * 100;
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch data on component mount
    onMounted(() => {
      fetchStockData();
      fetchHistoricalData();
    });

    return {
      currentPrice,
      openingPrice,
      dayChange,
      percentageChange,
      chartData,
      chartOptions,
      selectedPeriod,
      updatePeriod,
      timeRanges
    };
  },
});
</script>

<style scoped>
.stock-graph-container {
  width: 100%;
  height:110%;
  background-color: #1F2937;
  height: 500px;
  margin: 20px auto;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}
</style>
