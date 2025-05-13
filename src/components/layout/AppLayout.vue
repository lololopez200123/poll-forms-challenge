<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-200">
    <AppHeader />
    
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
      <slot></slot>
    </main>

    <AppFooter />
  </div>
</template>
