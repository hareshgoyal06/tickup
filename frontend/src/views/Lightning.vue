<template>
  <div id="app" class="font-inter bg-gray-900 min-h-screen text-white">
    <!-- Navbar Component -->
    <Navbar />

    <!-- Main Header Section -->
    <div class="text-center p-8">
      <h1 class="text-green-500 text-5xl font-bold">Uptick</h1>
      <p class="text-2xl mt-2">
        Discover <span class="text-green-500">Trending</span> Stocks
      </p>
    </div>

    <!-- Tech Stocks Section -->
    <section class="p-8">
      <h2 class="text-3xl font-bold text-green-500 mb-6">Tech Stocks</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <randomGraph symbol="AAPL" title="Apple Inc. (AAPL)" />
        <randomGraph symbol="MSFT" title="Microsoft Corporation (MSFT)" />
        <randomGraph symbol="GOOGL" title="Alphabet Inc. (GOOGL)" />
        <randomGraph symbol="AMZN" title="Amazon.com Inc. (AMZN)" />
        <randomGraph symbol="NVDA" title="NVIDIA Corporation (NVDA)" />
      </div>
    </section>

    <!-- Financial Stocks Section -->
    <section class="p-8 bg-gray-800">
      <h2 class="text-3xl font-bold text-green-500 mb-6">Financial Stocks</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <randomGraph symbol="JPM" title="JPMorgan Chase & Co. (JPM)" />
        <randomGraph symbol="BAC" title="Bank of America Corporation (BAC)" />
        <randomGraph symbol="C" title="Citigroup Inc. (C)" />
        <randomGraph symbol="WFC" title="Wells Fargo & Company (WFC)" />
        <randomGraph symbol="GS" title="Goldman Sachs Group Inc. (GS)" />
      </div>
    </section>

    <!-- Energy Stocks Section -->
    <section class="p-8">
      <h2 class="text-3xl font-bold text-green-500 mb-6">Energy Stocks</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
        <randomGraph symbol="XOM" title="Exxon Mobil Corporation (XOM)" />
        <randomGraph symbol="CVX" title="Chevron Corporation (CVX)" />
        <randomGraph symbol="BP" title="BP p.l.c. (BP)" />
        <randomGraph symbol="COP" title="ConocoPhillips (COP)" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Navbar from '../components/navbar.vue';
import randomGraph from '../components/SP500.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    randomGraph,
  },
};
</script>

<style scoped>
#app {
  font-family: 'Inter', sans-serif;
}

.stock-graph-container {
  background-color: #1F2937;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}

.stock-graph-container:hover {
  transform: translateY(-5px);
}
</style>
