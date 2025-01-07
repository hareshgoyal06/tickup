<template>
    <nav class="fixed top-0 left-0 h-screen w-16
      flex flex-col
      bg-gray-900 text-white shadow-lg">
      <div class>
        <!-- Logo -->
        <div class="text-white text-2xl font-bold">
          <router-link to="/">UT</router-link>
        </div>
  
        <!-- Links for Desktop -->
        <ul class="hidden md:flex space-x-6 text-white">
          <li><router-link to="/" class="hover:text-gray-300">Home</router-link></li>
          <li><router-link to="/about" class="hover:text-gray-300">About</router-link></li>
          <li><router-link to="/services" class="hover:text-gray-300">Services</router-link></li>
          <li><router-link to="/contact" class="hover:text-gray-300">Contact</router-link></li>
        </ul>
  
        <!-- Hamburger Menu for Mobile -->
        <div class="md:hidden text-white" @click="toggleMenu">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </div>
  
        <!-- Mobile Menu -->
        <ul v-if="isMenuOpen" class="absolute top-16 left-0 w-full bg-gray-800 text-white p-4 space-y-4 md:hidden">
          <li><router-link to="/" @click="toggleMenu">Home</router-link></li>
          <li><router-link to="/about" @click="toggleMenu">About</router-link></li>
          <li><router-link to="/services" @click="toggleMenu">Services</router-link></li>
          <li><router-link to="/contact" @click="toggleMenu">Contact</router-link></li>
        </ul>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { ref, defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'Navbar',
    setup() {
      const isMenuOpen = ref(false);
  
      const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value;
      };
  
      return {
        isMenuOpen,
        toggleMenu,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Scoped styles are optional as we're using Tailwind classes */
  </style>
  