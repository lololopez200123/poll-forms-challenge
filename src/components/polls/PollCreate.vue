<script setup lang="ts">
import { ref } from 'vue';
import { usePollStore } from '../../stores/pollStore';

const pollStore = usePollStore();

const question = ref('');
const options = ref<string[]>(['', '']);
const error = ref('');
const successMessage = ref('');

const addOption = () => {
  options.value.push('');
};

const removeOption = (index: number) => {
  if (options.value.length > 2) {
    options.value.splice(index, 1);
  }
};

const createPoll = () => {
  // Validation
  error.value = '';
  
  if (!question.value.trim()) {
    error.value = 'Please enter a question';
    return;
  }
  
  // Filter out empty options and check if we have at least 2
  const validOptions = options.value.filter(opt => opt.trim());
  if (validOptions.length < 2) {
    error.value = 'Please provide at least 2 options';
    return;
  }
  
  // Create poll
  try {
    const pollId = pollStore.createPoll(question.value, validOptions);
    successMessage.value = 'Poll created successfully!';
    
    // Reset form
    question.value = '';
    options.value = ['', ''];
    
    // Clear success message after a delay
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (e) {
    error.value = 'Failed to create poll';
  }
};
</script>

<template>
  <div class="card">
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">Create a New Poll</h3>
    
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-lg mb-6">
      {{ error }}
    </div>
    
    <div v-if="successMessage" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-6 py-4 rounded-lg mb-6">
      {{ successMessage }}
    </div>
    
    <form @submit.prevent="createPoll">
      <div class="mb-6">
        <label for="question" class="input-label mb-2">Question</label>
        <input
          id="question"
          v-model="question"
          type="text"
          class="block w-full rounded-lg border-gray-300  dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-primary-500 focus:ring-primary px-4 py-3 transition-colors duration-200"
          placeholder="Enter your poll question"
        />
      </div>
      
      <div class="mb-6">
        <label class="input-label mb-3">Options</label>
        
        <div v-for="(_, index) in options" :key="index" class="flex mb-4 items-center">
          <input
            v-model="options[index]"
            type="text"
            class="block w-full rounded-lg border-gray-300  dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-primary-500 focus:ring-primary-500 px-4 py-3 transition-colors duration-200"
            :placeholder="`Option ${index + 1}`"
          />
          <button
            type="button"
            @click="removeOption(index)"
            class="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            :disabled="options.length <= 2"
            :class="{ 'opacity-50 cursor-not-allowed': options.length <= 2 }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <button
          type="button"
          @click="addOption"
          class="mt-2 inline-flex items-center px-4 py-2.5 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-md text-primary-700 dark:text-primary-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Option
        </button>
      </div>
      
      <div class="mt-8">
        <button
          type="submit"
          class="btn btn-primary px-6 py-3 bg-primary-600 hover:bg-primary-700 transition-colors rounded-lg text-white font-medium"
        >
          Create Poll
        </button>
      </div>
    </form>
  </div>
</template>
