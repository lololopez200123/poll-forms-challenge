<script setup lang="ts">
import { computed } from 'vue';
import { useFormStore } from '../../stores/formStore';

defineProps({
  compact: {
    type: Boolean,
    default: false
  }
});

const formStore = useFormStore();
const forms = computed(() => formStore.getAllForms);

const deleteForm = (formId: string) => {
  if (confirm('Are you sure you want to delete this form?')) {
    formStore.deleteForm(formId);
  }
};

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString();
};
</script>

<template>
  <div class="space-y-4">
    <div v-if="forms.length === 0" class="text-center py-6">
      <p class="text-gray-500 dark:text-gray-400">{{ compact ? 'No forms created yet' : 'No forms created yet. Create your first form above!' }}</p>
    </div>
    
    <div v-else v-for="form in forms" :key="form.id" 
      :class="[
        'bg-white dark:bg-gray-800 rounded-lg overflow-hidden',
        compact ? 'border border-gray-200 dark:border-gray-700' : 'shadow-sm'
      ]"
    >
      <div class="p-5">
        <div class="flex justify-between items-start">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ form.title }}</h3>
          <button
            @click="deleteForm(form.id)"
            class="text-gray-400 hover:text-red-500 transition-colors p-1.5 rounded-full hover:bg-gray-100"
            title="Delete form"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div class="mt-2 mb-3">
          <span class="text-xs text-gray-400">Created on {{ formatDate(form.createdAt) }}</span>
          <span class="ml-3 text-xs font-medium text-secondary-600">{{ form.questions.length }} questions</span>
        </div>
        
        <template v-if="!compact || (compact && form.questions.length <= 2)">
          <ul class="mt-3 space-y-1">
            <li v-for="(question, index) in form.questions.slice(0, compact ? 1 : 3)" :key="question.id" 
                class="text-sm text-gray-500 truncate">
              <span class="font-medium">Q{{ index + 1 }}:</span> {{ question.text }}
            </li>
            <li v-if="form.questions.length > (compact ? 1 : 3)" class="text-xs text-gray-500">
              ...and {{ form.questions.length - (compact ? 1 : 3) }} more questions
            </li>
          </ul>
        </template>
        <template v-else>
          <p class="text-sm text-gray-400">{{ form.questions.length }} questions available</p>
        </template>
        
        <div class="mt-4 flex flex-wrap gap-2">
          <router-link
            :to="`/forms/${form.id}`"
            class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md 
                  text-secondary-700 bg-secondary-50 hover:bg-secondary-100 
                  transition-colors duration-200"
          >
            Fill Out
          </router-link>
          
          <router-link
            :to="`/forms/${form.id}/results`"
             class="btn btn-secondary inline-flex items-center text-sm font-medium"

          >
            View Responses
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
