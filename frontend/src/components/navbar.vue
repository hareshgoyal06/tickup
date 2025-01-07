<template>
    <nav class="fixed top-0 left-0 h-screen w-24 m-0
      flex flex-col
      bg-gray-900 text-white shadow-lg">
        <div class="text-green-500 text-4xl mt-2 mb-2 font-bold">
            UT
        </div>
        <div>
            <div class="sidebar">
                <sidebar class="fab fa-facebook"></sidebar>
            </div>
            <div class="sidebar">
                <sidebar class="fab fa-facebook"></sidebar>
            </div>
            <div class="sidebar" >
                <sidebar class="fab fa-facebook"></sidebar>
            </div>
            <div class="sidebar" >
                <sidebar class="fab fa-facebook"></sidebar>
            </div>
            <div class="sidebar">
                <sidebar class="fab fa-facebook"></sidebar>
            </div>
        </div>
  
        <!-- Links for Desktop -->
        <!-- <ul class="hidden md:flex space-x-6 text-white">
          <li><router-link to="/" class="hover:text-gray-300"></router-link></li>
          <li><router-link to="/about" class="hover:text-gray-300"></router-link></li>
          <li><router-link to="/services" class="hover:text-gray-300"></router-link></li>
          <li><router-link to="/contact" class="hover:text-gray-300"></router-link></li>
        </ul> -->
    </nav>
  </template>
  
  <style>
  sidebar {
    font-size: 32px;
  }
  </style>

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
  