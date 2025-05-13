<script setup lang="ts">
import { ref } from 'vue';
import { usePollStore } from '../../stores/pollStore';
import { useValidation } from '../../composables/useValidation';
import { useAlert } from '../../composables/useAlert';
import AppInput from '../common/AppInput.vue';
import AppButton from '../common/AppButton.vue';
import AppAlert from '../common/AppAlert.vue';
import AppCard from '../common/AppCard.vue';

const pollStore = usePollStore();
const validation = useValidation();
const {
  showAlert,
  message: alertMessage,
  type: alertType,
  isVisible: isAlertVisible,
  dismissAlert,
} = useAlert();

const question = ref('');
const options = ref<string[]>(['', '']);

const addOption = () => {
  options.value.push('');
};

const removeOption = (index: number) => {
  if (options.value.length > 2) {
    options.value.splice(index, 1);
  }
};

const createPoll = () => {
  const isValid = validation.validateFields(
    { question: question.value, options: options.value },
    {
      question: [validation.rules.required('Please enter a question')],
      options: [
        validation.rules.custom((opts: unknown) => {
          if (Array.isArray(opts)) {
            const stringArray = opts as string[];
            return stringArray.filter((opt) => opt.trim()).length >= 2;
          }
          return false;
        }, 'Please provide at least 2 options'),
      ],
    }
  );

  if (!isValid) {
    showAlert(Object.values(validation.errors.value)[0], 'error');
    return;
  }

  const validOptions = options.value.filter((opt) => opt.trim());

  try {
    pollStore.createPoll(question.value, validOptions);
    showAlert('Poll created successfully!', 'success', { autoDismiss: true });

    // Reset form
    question.value = '';
    options.value = ['', ''];
  } catch (e) {
    showAlert('Failed to create poll', 'error');
  }
};
</script>

<template>
  <AppCard title="Create a New Poll">
    <AppAlert
      v-if="isAlertVisible"
      :type="alertType"
      :message="alertMessage"
      :dismissible="true"
      @dismiss="dismissAlert"
    />

    <form @submit.prevent="createPoll">
      <div class="mb-6">
        <AppInput
          id="question"
          v-model="question"
          label="Question"
          placeholder="Enter your poll question"
          required
        />
      </div>

      <div class="mb-6">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
          >Options</label
        >
        <TransitionGroup name="fade" tag="div">
          <div
            v-for="(_, index) in options"
            :key="index"
            class="flex mb-4 items-center"
          >
            <AppInput
              v-model="options[index]"
              :placeholder="`Option ${index + 1}`"
              :id="`option-${index}`"
            />
            <button
              type="button"
              @click="removeOption(index)"
              class="ml-3 inline-flex items-center justify-center w-9 h-9 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              :disabled="options.length <= 2"
              :class="{ 'opacity-50 cursor-not-allowed': options.length <= 2 }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </TransitionGroup>

        <app-button
          type="button"
          @click="addOption"
          variant="outline"
          size="md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          Add Option
        </app-button>
      </div>

      <div class="mt-8">
        <app-button type="submit" variant="primary" size="lg">
          Create Poll
        </app-button>
      </div>
    </form>
  </AppCard>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:  transform .5s ease, opacity .5s ease;
}

.fade-enter-from {
  transform: translateX(-10px);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transition:  transform .25s ease, opacity .25s ease;
}
</style>
