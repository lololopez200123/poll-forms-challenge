<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useThemeStore } from './stores/themeStore';

const router = useRouter();
const themeStore = useThemeStore();

const goHome = () => {
  router.push('/');
};

const toggleDarkMode = () => {
  themeStore.toggleDarkMode();
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200">
    <header class="bg-white dark:bg-gray-800 shadow-sm mb-6 transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <button @click="goHome" class="text-2xl font-bold text-primary hover:opacity-90 transition">
           <img src="/logo.png" alt="Logo" class="h-12 mr-2 inline-block" />
          </button>
          <button @click="toggleDarkMode" class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition">
            <svg v-if="themeStore.isDarkMode" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      <router-view></router-view>
    </main>

    <footer class="bg-white dark:bg-gray-800 fixed bottom-0 w-full border-t border-gray-200 dark:border-gray-700  transition-colors duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2025 Bindin Polls & Forms 
        </div>
      </div>
    </footer>
  </div>
</template>


