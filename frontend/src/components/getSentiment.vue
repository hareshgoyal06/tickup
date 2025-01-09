<template>
    <div v-if="sentimentData" class="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 class="text-green-500 text-3xl font-bold mb-4">Sentiment Analysis for {{ symbol.toUpperCase() }}</h2>
      <p class="mb-2">Overall Sentiment: 
        <span :class="sentimentData.sentiment === 'Positive' ? 'text-green-500' : 'text-red-500'">
          {{ sentimentData.sentiment }}
        </span>
      </p>
      <p>Positive Articles: {{ sentimentData.positive_articles }}</p>
      <p>Negative Articles: {{ sentimentData.negative_articles }}</p>
  
      <h3 class="text-xl font-bold mt-4">Articles Analyzed:</h3>
      <ul>
        <li v-for="article in sentimentData.articles" :key="article.url" class="mb-4">
          <a :href="article.url" target="_blank" class="text-green-500 hover:underline">{{ article.title }}</a>
          <p class="text-gray-400">{{ article.description }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import type {PropType} from 'vue';
  import axios from 'axios';
  
  export default defineComponent({
    name: 'Sentiment',
    props: {
      symbol: {
        type: String as PropType<string>,
        required: true,
      },
    },
    setup(props) {
      const sentimentData = ref<any>(null);
      const error = ref<string | null>(null);
  
      // Fetch sentiment data
      const fetchSentimentData = async () => {
        try {
          const response = await axios.get(`/api/stocks/${props.symbol}/sentiment`);
          sentimentData.value = response.data;
        } catch (err) {
          error.value = 'Failed to fetch sentiment data. Please try again.';
          console.error(err);
        }
      };
  
      // Fetch sentiment data when the component is mounted
      onMounted(() => {
        fetchSentimentData();
      });
  
      return {
        sentimentData,
        error,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Styling to make the sentiment component look clean */
  </style>
  