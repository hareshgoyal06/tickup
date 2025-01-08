<template>
    <div>
      <line-chart :data="data" :options="options"></line-chart>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ChartData,
    ChartOptions,
  } from 'chart.js';
  
  // Register required components from Chart.js
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);
  
  export default defineComponent({
    name: 'LineChart',
    components: {
      LineChart: Line,
    },
    props: {
      data: {
        type: Object as PropType<ChartData<'line'>>,
        required: true,
      },
      options: {
        type: Object as PropType<ChartOptions<'line'>>,
        required: false,
      },
    },
  });
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    width: 80%;
    margin: 0 auto;
  }
  </style>
  