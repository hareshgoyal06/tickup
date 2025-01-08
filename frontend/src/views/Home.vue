<template>
    <div id="app font-inter">
      <!-- Navbar Component -->
      <Navbar />
      <div class="absolute top-0 left-0 w-full text-white p-4">
        <div class="text-green-500 text-5xl mt-2 mb-2 font-bold">
          Uptick
        </div>
        <div class="text-white p-4 text-2xl">
          Revolutionize your stock trading experience with Uptick
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getStockData, getHistoricalStockData } from '../services/api';
  import Navbar from '../components/navbar.vue';
  import LineChart from '../components/LineChart.vue';
  import type { ChartOptions } from 'chart.js';
  
  
  export default defineComponent({
    name: 'App',
    components: {
      Navbar,
      LineChart,
    },
    setup() {
      // Reactive state
      const symbol = ref<string>('AAPL');
      const stockData = ref<any>(null);
      const historicalData = ref<any[]>([]);
      const selectedPeriod = ref<string>('6mo');
      const error = ref<string | null>(null);
      const loading = ref<boolean>(false);
      const chartData = ref<any>(null);
  
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
      const chartOptions = ref<ChartOptions<'line'>>({
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: {
            display: false, 
          },
          title: {
            display: true,
            text: 'Historical Stock Prices',
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
              display: false, // ✅ Remove vertical grid lines
            },
            ticks: {
              color: '#374151', // Gray-700
              font: {
                size: 12,
              },
            },
          },
          y: {
            grid: {
              color: '#d1d5db', // Light gray
            },
            ticks: {
              color: '#374151', // Gray-700
              font: {
                size: 12,
              },
            },
          },
        },
      });
  
  
  
      // Function to fetch historical stock data
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
  
  
      return {
        symbol,
        stockData,
        historicalData,
        chartData,
        chartOptions,
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
    font-family: Inter;
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
  