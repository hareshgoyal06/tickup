<template>
  <div class="text-2xl">
    <div class="flex flex-col items-start justify-between aapl-graph-container mx-auto bg-gray-800 text-white p-2 rounded-lg shadow-md">
      <h2 class="font-bold md-2-mt-2">S&P 500 (^GSPC)</h2>
      <h2 v-if="stockData" class="mt-4 text-xl">
       ${{ stockData.current_price.toFixed(2) }}
      </h2>
      <LineChart :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getHistoricalStockData } from '../services/api';
import { getStockData } from '../services/api';
import LineChart from '../components/LineChart.vue';
import type { ChartData, ChartOptions } from 'chart.js';

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
    const loading = ref<boolean>(false);
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
      chartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
.aapl-graph-container {
  width: 55%;
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
