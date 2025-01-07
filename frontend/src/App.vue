<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script lang="ts">
import { getMessage } from './services/api';
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      message: '',
    };
  },
  async mounted() {
    const data = await getMessage();
    this.message = data.message;
  },
});
</script>
