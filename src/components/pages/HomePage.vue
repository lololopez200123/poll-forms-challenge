<script setup lang="ts">
import { useRouter } from 'vue-router';
import PollList from '../polls/PollList.vue';
import FormList from '../forms/FormList.vue';
import AppButton from '../common/AppButton.vue';
import AppCard from '../common/AppCard.vue';

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
    <header class="mb-10 bg-app">
      <h1 class="text-2xl font-bold text-gray-300 dark:text-white mb-2">
        Admin Dashboard
      </h1>
      <p class="text-gray-300 dark:text-white">
        View and manage your polls and forms
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Polls Section -->
      <app-card glow>
        <div
          class="flex flex-col justify-between items-start gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 sm:flex-row sm:items-center sm:gap-0"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Your Polls
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create and manage interactive polls
            </p>
          </div>
          <app-button
            size="lg"
            @click="goToCreatePoll"
            class="btn btn-primary px-5 py-2.5 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2 transition-transform duration-200 transform group-hover:scale-110"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Create Poll
          </app-button>
        </div>

        <PollList compact />
      </app-card>

      <!-- Forms Section -->
      <AppCard class="card" glow>
        <div
          class="flex flex-col justify-between items-start gap-2 mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 sm:flex-row sm:items-center sm:gap-0"
        >
          <div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Your Forms
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Create and manage custom forms
            </p>
          </div>
          <app-button
            size="lg"
            @click="goToCreateForm"
            variant="primary"
            class="group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 mr-2 transition-transform duration-300 transform group-hover:scale-110"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Create Form
          </app-button>
        </div>

        <FormList compact />
      </AppCard>
    </div>
  </div>
</template>

<style scoped>
.bg-app {
  background-image: url('/formsandpolls-bg.jpg');
  padding: 2rem;
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  filter: brightness(1.5) contrast(1.1);
}

.dark .bg-app {
  filter: brightness(1);
}
</style>
