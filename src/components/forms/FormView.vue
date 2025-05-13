<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFormStore } from '../../stores/formStore';
import type { Question, QuestionResponse } from '../../types';

const props = defineProps<{
  id: string;
}>();

const formStore = useFormStore();
const form = computed(() => formStore.getFormById(props.id));
const responses = ref<Record<string, string | number | null>>({});
const error = ref('');
const success = ref(false);

// Initialize responses as empty for all questions
if (form.value) {
  form.value.questions.forEach(question => {
    responses.value[question.id] = null;
  });
}

const isRequiredMissing = (questionId: string, question: Question): boolean => {
  return (
    question.required &&
    (responses.value[questionId] === null || 
     responses.value[questionId] === undefined || 
     responses.value[questionId] === '')
  );
};

const submitForm = () => {
  error.value = '';
  
  // Check if form exists
  if (!form.value) {
    error.value = 'Form not found';
    return;
  }
  
  // Validate required fields
  const missingRequired = form.value.questions.some(question => 
    isRequiredMissing(question.id, question)
  );
  
  if (missingRequired) {
    error.value = 'Please fill out all required fields';
    return;
  }
  
  // Format responses
  const formattedResponses: QuestionResponse[] = [];
  
  for (const question of form.value.questions) {
    const value = responses.value[question.id];
    if (value !== null && value !== undefined) {
      if (question.type === 'radio') {
        formattedResponses.push({
          questionId: question.id,
          type: 'radio',
          optionId: value as string
        });
      } else if (question.type === 'number') {
        formattedResponses.push({
          questionId: question.id,
          type: 'number',
          value: Number(value)
        });
      } else if (question.type === 'short-answer') {
        formattedResponses.push({
          questionId: question.id,
          type: 'short-answer',
          value: value as string
        });
      } else if (question.type === 'long-answer') {
        formattedResponses.push({
          questionId: question.id,
          type: 'long-answer',
          value: value as string
        });
      }
    }
  }
  
  try {
    formStore.submitFormResponse(props.id, formattedResponses);
    success.value = true;
    
    // Reset form
    Object.keys(responses.value).forEach(key => {
      responses.value[key] = null;
    });
  } catch (e) {
    error.value = 'Failed to submit form';
  }
};
</script>

<template>
  <div v-if="form" class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-1">{{ form.title }}</h3>
    <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">Please fill out the form below</p>
    
    <div v-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-6">
      {{ error }}
    </div>
    
    <div v-if="success" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded mb-6">
      Form submitted successfully! Thank you for your response.
    </div>
    
    <div v-if="!success">
      <form @submit.prevent="submitForm">
        <div class="space-y-6">
          <div 
            v-for="question in form.questions" 
            :key="question.id" 
            class="bg-gray-50 dark:bg-gray-800 dark:border dark:border-gray-700 p-4 rounded-md"
          >
            <label :for="question.id" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {{ question.text }}
              <span v-if="question.required" class="text-red-500 dark:text-red-400">*</span>
            </label>
            
            <!-- Short answer input -->
            <input
              v-if="question.type === 'short-answer'"
              :id="question.id"
              v-model="responses[question.id]"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
              :placeholder="question.placeholder"
            />
            
            <!-- Long answer textarea -->
            <textarea
              v-else-if="question.type === 'long-answer'"
              :id="question.id"
              v-model="responses[question.id]"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
              :placeholder="question.placeholder"
            ></textarea>
            
            <!-- Number input -->
            <input
              v-else-if="question.type === 'number'"
              :id="question.id"
              v-model="responses[question.id]"
              type="number"
              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-colors duration-200"
              :placeholder="question.placeholder"
            />
            
            <!-- Radio options -->
            <div v-else-if="question.type === 'radio'" class="mt-2">
              <div 
                v-for="option in question.options" 
                :key="option.id" 
                class="flex items-center mb-2"
              >
                <input
                  :id="`${question.id}-${option.id}`"
                  v-model="responses[question.id]"
                  :value="option.id"
                  type="radio"
                  class="h-4 w-4 border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                />
                <label :for="`${question.id}-${option.id}`" class="ml-3 block text-sm text-gray-700 dark:text-gray-300">
                  {{ option.text }}
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8">
          <button
            type="submit"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  </div>
  
  <div v-else class="bg-white shadow rounded-lg p-6 text-center">
    <p class="text-gray-500">Form not found</p>
  </div>
</template>
