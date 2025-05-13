<script setup lang="ts">
import PollCreate from '../polls/PollCreate.vue';
</script>

<template>
  <div>
    <div class="flex items-center mb-6">
      <button 
        @click="$router.push('/')"
        class="mr-4 inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-300 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>
      <h2 class="text-xl font-semibold">Create New Poll</h2>
    </div>
    
    <PollCreate />
  </div>
</template>
