<template>
  <div class="aapl-graph-container">
    <h2 class="text-2xl font-bold mb-4">AAPL Stock Price</h2>
    <LineChart :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getHistoricalStockData } from '../services/api';
import LineChart from '../components/LineChart.vue';
import type { ChartData, ChartOptions } from 'chart.js';

export default defineComponent({
  name: 'AAPLGraph',
  components: {
    LineChart,
  },
  setup() {
    const symbol = ref<string>('AAPL');
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

    const chartOptions = ref<ChartOptions<'line'>>({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            color: '#374151', // Gray-700
            font: {
              size: 14,
            },
          },
        },
        title: {
          display: true,
          text: 'AAPL Stock Price (Historical)',
          color: '#1f2937', // Gray-800
          font: {
            size: 20,
            weight: 'bold',
          },
        },
      },
      scales: {
        x: {
          display: false,
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
              label: `Closing Prices for ${symbol.value.toUpperCase()}`,
              data: response.historical_data.map((item: { Close: any; }) => item.Close),
              borderColor: 'rgba(34, 197, 94, 1)', // ✅ Green-500 color
              backgroundColor: 'rgba(34, 197, 94, 0.2)', // ✅ Green-500 with transparency
              pointBackgroundColor: 'rgba(34, 197, 94, 1)',
              pointBorderColor: 'rgba(34, 197, 94, 1)',
              tension: 0.4, 
              borderWidth: 2, 
              pointRadius: 0.2
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
      fetchHistoricalData();
    });

    return {
      chartData,
      chartOptions,
    };
  },
});
</script>

<style scoped>
.aapl-graph-container {
  position: relative;
  width: 100%;
  height: 400px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
