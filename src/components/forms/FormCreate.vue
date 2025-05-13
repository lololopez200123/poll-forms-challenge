<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useFormStore } from '../../stores/formStore';
import { useFormQuestions } from '../../composables/useFormQuestions';
import { useValidation } from '../../composables/useValidation';
import { useAlert } from '../../composables/useAlert';
import type { QuestionType } from '../../types';

// Import common components
import AppCard from '../common/AppCard.vue';
import AppInput from '../common/AppInput.vue';
import AppSelect from '../common/AppSelect.vue';
import AppButton from '../common/AppButton.vue';
import AppCheckbox from '../common/AppCheckbox.vue';
import AppAlert from '../common/AppAlert.vue';

const formStore = useFormStore();
const { questions, initializeQuestions, addQuestion, removeQuestion, 
        setQuestionType, addOption, removeOption, validateQuestions } = useFormQuestions();
const validation = useValidation();
const { showAlert, message: alertMessage, type: alertType, isVisible: isAlertVisible, dismissAlert } = useAlert();

const title = ref('');

onMounted(() => {
  initializeQuestions();
});

const createForm = () => {
  if (!validation.validateField('title', title.value, [
    validation.rules.required('Please enter a form title')
  ])) {
    showAlert(validation.getFieldError('title'), 'error');
    return;
  }
  
  const questionError = validateQuestions();
  if (questionError) {
    showAlert(questionError, 'error');
    return;
  }
  
  try {
    formStore.createForm(title.value, questions.value);
    showAlert('Form created successfully!', 'success', { autoDismiss: true });
    
    title.value = '';
    initializeQuestions();
  } catch (e) {
    showAlert('Failed to create form', 'error');
  }
};
</script>

<template>
  <app-card title="Create a New Form">
    <app-alert
      v-if="isAlertVisible"
      :type="alertType"
      :message="alertMessage"
      :dismissible="true"
      @dismiss="dismissAlert"
    />
    
    <form @submit.prevent="createForm">
      <div class="mb-6">
        <app-input
          id="title"
          v-model="title"
          label="Form Title"
          placeholder="Enter form title"
          required
        />
      </div>
      
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-700 dark:text-gray-300 mb-4">Questions</h4>
        <TransitionGroup name="fade" mode="out-in">
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
            <app-input
              :id="`question-${questionIndex}`"
              v-model="question.text"
              label="Question Text"
              placeholder="Enter question text"
              required
            />
          </div>
          
          <div class="mb-4">
            <app-select
              :id="`question-type-${questionIndex}`"
              :value="question.type"
              @update:modelValue="(value) => setQuestionType(questionIndex, value as QuestionType)"
              :options="[
                { id: 'short-answer', text: 'Short Answer' },
                { id: 'long-answer', text: 'Long Answer' },
                { id: 'number', text: 'Number' },
                { id: 'radio', text: 'Radio (Single Choice)' }
              ]"
              label="Question Type"
            />
          </div>
          
          <div class="mb-4">
            <app-checkbox
              :id="`required-${questionIndex}`"
              v-model="question.required"
              label="This question is required"
            />
          </div>
          
          <!-- Placeholder field for text and number inputs -->
          <div v-if="question.type !== 'radio'" class="mb-4">
            <app-input
              :id="`placeholder-${questionIndex}`"
              v-model="question.placeholder"
              label="Placeholder (Optional)"
              placeholder="Enter placeholder text"
            />
          </div>
          
          <!-- Radio options -->
          <div v-if="question.type === 'radio' && question.options" class="mb-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Options</label>
            
            <div v-for="(option, optionIndex) in question.options" :key="option.id" class="flex mb-3 items-center">
              <app-input
                v-model="option.text"
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
            
            <app-button
              type="button"
              @click="addOption(questionIndex)"
              variant="outline"
              size="sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
              </svg>
              Add Option
            </app-button>
          </div>
        </div>
        </TransitionGroup>
        
        <app-button
          type="button"
          @click="addQuestion"
          variant="outline"
          size="md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add Question
        </app-button>
      </div>
      
      <div class="mt-6">
        <app-button
          type="submit"
          variant="secondary"
          size="lg"
        >
          Create Form
        </app-button>
      </div>
    </form>
  </app-card>
</template>
