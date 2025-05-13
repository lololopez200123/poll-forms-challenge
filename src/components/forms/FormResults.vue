<script setup lang="ts">
import { computed } from 'vue';
import { useFormStore } from '../../stores/formStore';
import type { Question, QuestionResponse } from '../../types';

const props = defineProps<{
  id: string;
}>();

const formStore = useFormStore();
const form = computed(() => formStore.getFormById(props.id));
const formResponses = computed(() => formStore.getFormResponses(props.id));

// Helper function to find a question by its ID
const findQuestion = (questionId: string): Question | undefined => {
  return form.value?.questions.find(q => q.id === questionId);
};

// Helper function to get the display value for a response
const getResponseDisplayValue = (response: QuestionResponse): string => {
  if (response.type === 'radio') {
    const question = findQuestion(response.questionId);
    if (question?.type === 'radio') {
      const option = question.options.find(opt => opt.id === response.optionId);
      return option?.text || 'Unknown option';
    }
    return 'Unknown option';
  } else if (response.type === 'number') {
    return response.value.toString();
  } else {
    return response.value;
  }
};

// Format date helper
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleString();
};
</script>

<template>
  <div v-if="form" class="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-medium text-gray-900 dark:text-white">{{ form.title }} - Responses</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {{ formResponses.length }} {{ formResponses.length === 1 ? 'response' : 'responses' }} received
        </p>
      </div>
      <router-link
        :to="`/forms/${props.id}`"
        class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
      >
        Back to Form
      </router-link>
    </div>

    <div v-if="formResponses.length === 0" class="text-center py-8">
      <p class="text-gray-500">No responses yet.</p>
    </div>
    
    <div v-else>
      <div class="overflow-x-auto">
        <!-- Responses table -->
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900 ">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submission Time
              </th>
              <th 
                v-for="question in form.questions" 
                :key="question.id" 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ question.text }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200  ">
            <tr v-for="response in formResponses" :key="response.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(response.submittedAt) }}
              </td>
              <td 
                v-for="question in form.questions" 
                :key="question.id" 
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {{ 
                  response.responses.find(r => r.questionId === question.id) 
                    ? getResponseDisplayValue(response.responses.find(r => r.questionId === question.id)!) 
                    : '-'
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Individual responses view -->
      <div class="mt-10 space-y-6">
        <h4 class="text-lg dark:text-white font-medium text-gray-900 mb-4">Individual Responses</h4>
        
        <div 
          v-for="response in formResponses" 
          :key="response.id" 
          class="bg-gray-50 dark:bg-gray-900 p-4 rounded-md"
        >
          <div class="flex justify-between items-center mb-4">
            <h5 class="text-md font-medium text-gray-700 dark:text-gray-50">Response #{{ response.id.substring(0, 8) }}</h5>
            <span class="text-sm text-gray-500">{{ formatDate(response.submittedAt) }}</span>
          </div>
          
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div v-for="questionResponse in response.responses" :key="questionResponse.questionId" class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">
                {{ findQuestion(questionResponse.questionId)?.text || 'Unknown question' }}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-50">
                {{ getResponseDisplayValue(questionResponse) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else class="bg-white shadow rounded-lg p-6 text-center">
    <p class="text-gray-500">Form not found</p>
  </div>
</template>
