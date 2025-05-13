<script setup lang="ts">
import { useRouter } from 'vue-router';
import PollList from '../polls/PollList.vue';
import FormList from '../forms/FormList.vue';

const router = useRouter();

const goToCreatePoll = () => {
  router.push('/polls/create');
};

const goToCreateForm = () => {
  router.push('/forms/create');
};
</script>

<template>
  <div>
    <header class="mb-10">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400">View and manage your polls and forms</p>
    </header>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Polls Section -->
      <div class="card">
        <div class="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Your Polls</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Create and manage interactive polls</p>
          </div>
          <button 
            @click="goToCreatePoll"
            class="btn btn-primary px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Create Poll
          </button>
        </div>
        
        <PollList compact />
      </div>

      <!-- Forms Section -->
      <div class="card">
        <div class="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Your Forms</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Create and manage custom forms</p>
          </div>
          <button 
            @click="goToCreateForm"
            class="btn btn-primary px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            Create Form
          </button>
        </div>
        
        <FormList compact />
      </div>
    </div>
  </div>
</template>
