<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFormStore } from '../../stores/formStore';
import { v4 as uuidv4 } from 'uuid';
import type { Question, QuestionType } from '../../types';

const formStore = useFormStore();

const title = ref('');
const questions = ref<Question[]>([]);
const error = ref('');
const successMessage = ref('');

// Add a default first question
const addDefaultQuestion = () => {
  questions.value.push({
    id: uuidv4(),
    text: '',
    type: 'short-answer',
    required: false,
    placeholder: undefined
  });
};

// Initialize with one question when component is mounted
onMounted(() => {
  addDefaultQuestion();
});
const addQuestion = () => {
  questions.value.push({
    id: uuidv4(),
    text: '',
    type: 'short-answer',
    required: false,
    placeholder: undefined
  });
};

const removeQuestion = (index: number) => {
  if (questions.value.length > 1) {
    questions.value.splice(index, 1);
  }
};

const addOption = (questionIndex: number) => {
  const question = questions.value[questionIndex];
  if (question.type === 'radio') {
    if (!question.options) {
      question.options = [];
    }
    question.options.push({ id: uuidv4(), text: '' });
  }
};

const removeOption = (questionIndex: number, optionIndex: number) => {
  const question = questions.value[questionIndex];
  if (question.type === 'radio' && question.options && question.options.length > 1) {
    question.options.splice(optionIndex, 1);
  }
};

const setQuestionType = (questionIndex: number, type: QuestionType) => {
  const question = questions.value[questionIndex];
  
  // Create a new question object with the correct type
  if (type === 'radio') {
    questions.value[questionIndex] = {
      ...question,
      type,
      options: [
        { id: uuidv4(), text: '' },
        { id: uuidv4(), text: '' }
      ]
    };
  } else {
    // For non-radio types, remove any options
    const { options, ...rest } = question as any;
    questions.value[questionIndex] = {
      ...rest,
      type,
      placeholder: question.type === 'radio' ? undefined : question.placeholder
    };
  }
};

const createForm = () => {
  // Validation
  error.value = '';
  
  if (!title.value.trim()) {
    error.value = 'Please enter a form title';
    return;
  }
  
  // Check that all questions have text
  for (const question of questions.value) {
    if (!question.text.trim()) {
      error.value = 'All questions must have text';
      return;
    }
    
    // Check that radio questions have at least 2 options with text
    if (question.type === 'radio' && question.options) {
      const validOptions = question.options.filter(opt => opt.text.trim());
      if (validOptions.length < 2) {
        error.value = 'Radio questions must have at least 2 options';
        return;
      }
    }
  }
  
  // Create form
  try {
    formStore.createForm(title.value, questions.value);
    successMessage.value = 'Form created successfully!';
    
    // Reset form
    title.value = '';
    questions.value = [];
    addDefaultQuestion();
    
    // Clear success message after a delay
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
  } catch (e) {
    error.value = 'Failed to create form';
  }
};
</script>

<template>
  <div class="bg-white dark:bg-dark shadow rounded-lg p-6">
    <h3 class="text-lg font-medium dark:text-white text-gray-900 mb-4">Create a New Form</h3>
    
    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>
    
    <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
      {{ successMessage }}
    </div>
    
    <form @submit.prevent="createForm">
      <div class="mb-6">
        <label for="title" class="input-label">Form Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="block w-full rounded-lg dark:bg-gray-900 border-gray-300 shadow-sm focus:border-secondary focus:ring-secondary"
          placeholder="Enter form title"
        />
      </div>
      
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Questions</h4>
        
        <div v-for="(question, questionIndex) in questions" :key="question.id" class="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md mb-4">
          <div class="flex justify-between items-start mb-2">
            <h5 class="text-sm font-medium text-gray-700 dark:text-gray-300">Question {{ questionIndex + 1 }}</h5>
            <button
              v-if="questions.length > 1"
              type="button"
              @click="removeQuestion(questionIndex)"
              class="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              title="Remove question"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <div class="mb-4">
            <label :for="`question-${questionIndex}`" class="input-label">Question Text</label>
            <input
              :id="`question-${questionIndex}`"
              v-model="question.text"
              type="text"
              class="block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-secondary-500 focus:ring-secondary-500 transition-colors duration-200"
              placeholder="Enter question text"
            />
          </div>
          
          <div class="mb-4">
            <label :for="`question-type-${questionIndex}`" class="input-label">Question Type</label>
            <select
              :id="`question-type-${questionIndex}`"
              :value="question.type"
              @change="(e: Event) => setQuestionType(questionIndex, (e.target as HTMLSelectElement).value as QuestionType)"
              class="block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-secondary-500 focus:ring-secondary-500 transition-colors duration-200"
            >
              <option value="short-answer">Short Answer</option>
              <option value="long-answer">Long Answer</option>
              <option value="number">Number</option>
              <option value="radio">Radio (Single Choice)</option>
            </select>
          </div>
          
          <div class="mb-4">
            <div class="flex items-center">
              <input 
                :id="`required-${questionIndex}`" 
                v-model="question.required" 
                type="checkbox" 
                class="h-4 w-4 border-gray-300 dark:border-gray-600 rounded text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 dark:bg-gray-700"
              />
              <label :for="`required-${questionIndex}`" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                This question is required
              </label>
            </div>
          </div>
          
          <!-- Placeholder field for text and number inputs -->
          <div v-if="question.type !== 'radio'" class="mb-4">
            <label :for="`placeholder-${questionIndex}`" class="input-label">Placeholder (Optional)</label>
            <input
              :id="`placeholder-${questionIndex}`"
              v-model="question.placeholder"
              type="text"
              class="block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-secondary-500 focus:ring-secondary-500 transition-colors duration-200"
              placeholder="Enter placeholder text"
            />
          </div>
          
          <!-- Radio options -->
          <div v-if="question.type === 'radio' && question.options" class="mb-4">
            <label class="input-label">Options</label>
            
            <div v-for="(option, optionIndex) in question.options" :key="option.id" class="flex mb-3 items-center">
              <input
                v-model="option.text"
                type="text"
                class="block w-full rounded-lg border-gray-300 dark:border-gray-700 shadow-sm dark:bg-gray-800 dark:text-white focus:border-secondary-500 focus:ring-secondary-500 transition-colors duration-200"
                :placeholder="`Option ${optionIndex + 1}`"
              />
              <button
                type="button"
                @click="removeOption(questionIndex, optionIndex)"
                class="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                :disabled="question.options && question.options.length <= 2"
                :class="{ 'opacity-50 cursor-not-allowed': question.options && question.options.length <= 2 }"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <button
              type="button"
              @click="addOption(questionIndex)"
              class="mt-1 inline-flex items-center px-3 py-1.5 border border-gray-200 dark:border-gray-700 text-xs font-medium rounded-md text-secondary-700 dark:text-secondary-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Option
            </button>
          </div>
        </div>
        
        <button
          type="button"
          @click="addQuestion"
          class="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-700 text-sm font-medium rounded-md text-secondary-700 dark:text-secondary-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Question
        </button>
      </div>
      
      <div class="mt-6">
        <button
          type="submit"
          class="btn btn-primary px-5 py-2.5 bg-secondary-600 hover:bg-secondary-700 transition-colors"
        >
          Create Form
        </button>
      </div>
    </form>
  </div>
</template>
