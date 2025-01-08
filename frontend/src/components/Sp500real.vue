<template>
  <div class="text-2xl">
    <div class="flex flex-col items-start justify-between aapl-graph-container mx-auto bg-gray-800 text-white p-2 rounded-lg shadow-md">
      <!-- Title -->
      <h2 class="font-bold mb-4 -mt-2">S&P 500 (^GSPC)</h2>

      <!-- Real-Time Stock Price -->
      <p v-if="currentPrice !== null && dayChange !== null" class="mt-4 text-lg">
        <strong>{{ symbol }}</strong>: ${{ currentPrice?.toFixed(2) || 'N/A' }} | 
        <span :class="dayChange > 0 ? 'text-green-500' : 'text-red-500'">
          ${{ dayChange?.toFixed(2) || '0.00' }} - {{ percentageChange?.toFixed(2) || '0.00' }}%
        </span>
      </p>

      <!-- Line Chart -->
      <LineChart :data="chartData" :options="chartOptions" />
    </div>
  </div>
  <div class="justify-center flex space-x-2 my-4">
        <button v-for="range in timeRanges" :key="range.value" @click="updatePeriod(range.value)"
          :class="{'bg-green-500 text-white': selectedPeriod === range.value, 'bg-gray-600 text-white': selectedPeriod !== range.value}"
          class="px-4 py-2 rounded hover:bg-green-600 focus:outline-none"
        >
          {{ range.label }}
        </button>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getHistoricalStockData } from '../services/api';
import { getStockData } from '../services/api';
import LineChart from '../components/LineChart.vue';
import type { ChartData, ChartOptions } from 'chart.js';
import { getOpenPrice } from '../services/api';

export default defineComponent({
  name: 'AAPLGraph',
  components: {
    LineChart,
  },
  setup() {
    const symbol = ref<string>('^GSPC');
    const stockData = ref<any>(null);
    const historicalData = ref<any[]>([]);
    const selectedPeriod = ref<string>('6mo');
    const error = ref<string | null>(null);
    const currentPrice = ref<number | null>(null);
    const openingPrice = ref<number | null>(null);
    const dayChange = ref<number | null>(null);
    const percentageChange = ref<number | null>(null);
    const loading = ref<boolean>(false);

// Time range buttons
    const timeRanges = ref([
      { label: '5d', value: '5d' },
      { label: '1M', value: '1mo' },
      { label: '6M', value: '6mo' },
      { label: '1Y', value: '1y' },
      { label: '5Y', value: '5y' },
    ]);


    interface stockData {
      symbol: string;
      current_price: number;
    }

    // Reactive state for chart data and options
    const chartData = ref<ChartData<'line'>>({
      labels: [],
      datasets: [
        {
          label: 'AAPL Closing Prices',
          data: [],
          borderColor: 'rgba(34, 197, 94, 1)',
          backgroundColor: 'rgba(34, 197, 94, 0.2)',
          fill: true,
          tension: 0.4,
          pointRadius: 0.2,
        },
      ],
    });

    const updatePeriod = async (period: string) => {
      selectedPeriod.value = period;
      await fetchHistoricalData();
    };

    const fetchStockData = async () => {
      try {
        error.value = null;
        loading.value = true;

        const stockData = await getStockData(symbol.value);
      currentPrice.value = stockData.current_price;

      // Fetch the opening price
      const openPriceData = await getOpenPrice(symbol.value);
      openingPrice.value = openPriceData.opening_price;

      // Calculate the day change and percentage change
      if (currentPrice.value !== null && openingPrice.value !== null) {
        dayChange.value = currentPrice.value - openingPrice.value;
        percentageChange.value = (dayChange.value / openingPrice.value) * 100;
      }
        } catch (err) {
          error.value = 'Failed to fetch stock data. Please try again.';
          console.error(err);
        } finally {
          loading.value = false;
        }
      };

    const chartOptions = ref<ChartOptions<'line'>>({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
          position: 'top',
          labels: {
            color: '#374151', // Gray-700
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: false,
          color: '#1f2937', // Gray-800
          font: {
            size: 20,
            weight: 'bold',
          },
        },
      },
      scales: {
        x: {
          display:false,
          grid: {
            display: false,
          },
          ticks: {
            color: '#374151',
          },
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

    // Function to fetch AAPL historical data
    const fetchHistoricalData = async () => {
      try {
        error.value = null;
        historicalData.value = [];
        loading.value = true;

        // Fetch historical data from the backend
        const response = await getHistoricalStockData(symbol.value, selectedPeriod.value);

        // Transform the data for Chart.js
        chartData.value = {
          labels: response.historical_data.map((item: { Date: string | number | Date; }) => new Date(item.Date).toISOString().split('T')[0]),
          datasets: [
            {
              data: response.historical_data.map((item: { Close: any; }) => item.Close),
              borderColor: 'rgba(34, 197, 94, 1)', // ✅ Green-500 color
              backgroundColor: 'rgba(34, 197, 94, 0.2)', // ✅ Green-500 with transparency
              pointBackgroundColor: 'rgba(34, 197, 94, 1)',
              pointBorderColor: 'rgba(34, 197, 94, 1)',
              tension: 0.5, 
              borderWidth: 3, 
              pointRadius: 0.4
            },
          ],
        };
      } catch (err) {
        error.value = 'Failed to fetch historical stock data. Please try again.';
        console.error(err);
      } finally {
        loading.value = false;
      }
    };


    // Fetch the data when the component is mounted
    onMounted(() => {
      fetchStockData();
      fetchHistoricalData();
    });

    return {
      stockData,
      symbol,
      currentPrice,
      openingPrice,
      dayChange,
      percentageChange,
      chartData,
      chartOptions,
      timeRanges,
      selectedPeriod,
      updatePeriod,
    };
  },
});
</script>

<style scoped>
.aapl-graph-container {
  width: 45%;
  background-color: #1F2937;
  height: 500px;
  margin: 20px auto;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.chart_container {
  width: 100%;
  height: 100%;
  position:relative;
}
</style>
