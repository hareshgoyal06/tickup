<template>
    <nav class="fixed top-0 left-0 h-screen w-24 m-0
      flex flex-col
      bg-gray-900 text-white shadow-lg z-50">
        <div class="text-green-500 text-4xl mt-2 mb-2 font-bold">
            UT
        </div>
        <div>
          <div class="sidebar">
              <sidebar>
                <router-link to="/" class="fa-solid fa-house" title="Home"></router-link>
              </sidebar>
            </div>
          <div class="sidebar">
            <sidebar>
              <router-link to="/search" class="fa-solid fa-magnifying-glass" title="Search"></router-link>
            </sidebar>
          </div>
          <div class="sidebar">
            <sidebar>
              <router-link to="/lightning" class="fa-solid fa-bolt" title="Lightning"></router-link>              
            </sidebar>
          </div>
          <div class="sidebar">
            <sidebar>
              <router-link to="/trending" class="fa-solid fa-caret-up" title="Trending"></router-link>
            </sidebar>
          </div>
          <div class="sidebar">
           <sidebar>
            <router-link to="/profile" class="fa-solid fa-user" title="Profile"></router-link>
           </sidebar>
          </div>
      </div>
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
  .navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  background-color: #1a202c;
  z-index: 50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
  </style>
  