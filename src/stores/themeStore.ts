import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useThemeStore = defineStore(
  'theme',
  () => {
    const isDarkMode = ref(
      localStorage.getItem('darkMode') === 'true' ||
        (localStorage.getItem('darkMode') === null &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );

    function toggleDarkMode() {
      isDarkMode.value = !isDarkMode.value;
      applyDarkMode(isDarkMode.value);
    }

    function setDarkMode(value: boolean) {
      isDarkMode.value = value;
      applyDarkMode(value);
    }

    function applyDarkMode(value: boolean) {
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }

    return {
      isDarkMode,
      toggleDarkMode,
      setDarkMode,
    };
  },
  {
    persist: true,
  }
);
