import { ref, onMounted } from 'vue';

// Singleton pattern to ensure only one instance exists
const mouseX = ref(0);
const mouseY = ref(0);
let isSetup = false;

export function useMousePosition() {
  if (!isSetup && typeof window !== 'undefined') {
    // Use throttling to limit the rate of updates
    let lastTime = 0;
    const throttleDelay = 10; // ms

    const updateMousePosition = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastTime < throttleDelay) return;
      lastTime = now;

      mouseX.value = event.clientX;
      mouseY.value = event.clientY;
    };

    onMounted(() => {
      window.addEventListener('mousemove', updateMousePosition);
    });

    isSetup = true;
  }

  return {
    x: mouseX,
    y: mouseY,
  };
}
