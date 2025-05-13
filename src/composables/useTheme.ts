import { ref, onMounted } from 'vue';

export function useTheme() {
  const isDarkMode = ref(false);

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
    applyTheme(isDarkMode.value);
  }

  function applyTheme(isDark: boolean) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

  // Watch for changes in system preferences
  function watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Define callback for changes
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const userSetting = localStorage.getItem('darkMode');
      // Only apply system preference if user hasn't manually chosen
      if (userSetting === null) {
        isDarkMode.value = e.matches;
        applyTheme(e.matches);
      }
    };

    // Initial check
    handleChange(mediaQuery);

    // Add listener for changes
    mediaQuery.addEventListener('change', handleChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }

  onMounted(() => {
    // Check user preference first
    const userSetting = localStorage.getItem('darkMode');
    if (userSetting !== null) {
      isDarkMode.value = userSetting === 'true';
      applyTheme(isDarkMode.value);
    } else {
      // Fall back to system preference if no user setting
      isDarkMode.value = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      applyTheme(isDarkMode.value);
    }

    // Watch for system changes
    watchSystemTheme();
  });

  return {
    isDarkMode,
    toggleDarkMode,
  };
}
