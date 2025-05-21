<script setup lang="ts">
// No additional setup logic needed for the footer
</script>

<template>
  <footer
    class="bg-white dark:bg-gray-800 fixed bottom-0 w-full border-t border-gray-200 dark:border-gray-700 transition-colors duration-200 z-10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {{ new Date().getFullYear() }} Bindin Polls & Forms
      </div>
    </div>
  </footer>
</template>
