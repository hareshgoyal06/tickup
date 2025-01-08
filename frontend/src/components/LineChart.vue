<template>
  <div class="chart-container">
    <Line :data="data" :options="options" />
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Line } from 'vue-chartjs';
import type { ChartData, ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default defineComponent({
  name: 'LineChart',
  components: {
    Line,
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
  width: 100%; /* ✅ Expand to fill the container */
  height: 400px; /* ✅ Increase the height of the chart */
  margin: 20px auto;
}
</style>
