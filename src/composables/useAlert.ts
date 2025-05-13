import { ref, onUnmounted } from 'vue';

interface UseAlertOptions {
  autoDismiss?: boolean;
  duration?: number;
}

export function useAlert() {
  const message = ref('');
  const type = ref<'success' | 'error' | 'info' | 'warning'>('info');
  const isVisible = ref(false);
  let timeoutId: number | null = null;

  const showAlert = (
    alertMessage: string,
    alertType: 'success' | 'error' | 'info' | 'warning' = 'info',
    options: UseAlertOptions = {}
  ) => {
    message.value = alertMessage;
    type.value = alertType;
    isVisible.value = true;

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }

    if (options.autoDismiss) {
      const duration = options.duration || 3000;
      timeoutId = window.setTimeout(() => {
        dismissAlert();
      }, duration);
    }
  };

  const dismissAlert = () => {
    isVisible.value = false;

    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  onUnmounted(() => {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  });

  return {
    message,
    type,
    isVisible,
    showAlert,
    dismissAlert,
  };
}
