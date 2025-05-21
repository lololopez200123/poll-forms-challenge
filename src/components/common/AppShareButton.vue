<script setup lang="ts">
import { ref, computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import QRCode from 'qrcode';
import AppButton from './AppButton.vue';

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Share',
  },
  variant: {
    type: String,
    default: 'outline',
  },
  size: {
    type: String,
    default: 'md',
  },
});

const isModalOpen = ref(false);
const qrCodeDataUrl = ref('');
const { copy, copied } = useClipboard({ source: props.url });

const copyButtonText = computed(() => (copied.value ? 'Copied!' : 'Copy Link'));

const openShareModal = async () => {
  isModalOpen.value = true;
  try {
    qrCodeDataUrl.value = await QRCode.toDataURL(props.url, {
      margin: 2,
      width: 300,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

const closeShareModal = () => {
  isModalOpen.value = false;
};

const downloadQRCode = () => {
  const link = document.createElement('a');
  link.href = qrCodeDataUrl.value;
  link.download = 'qr-code.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadQRCodeAsPDF = () => {
  // Import only when needed to reduce initial load time
  import('jspdf')
    .then(({ default: jsPDF }) => {
      try {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });

        const title = 'Shared Link';
        const pageWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = 80;
        const imgHeight = 80;
        const xPos = (pageWidth - imgWidth) / 2;

        // Add title
        pdf.setFontSize(18);
        pdf.text(title, pageWidth / 2, 20, { align: 'center' });

        // Add URL
        pdf.setFontSize(10);
        const splitUrl = pdf.splitTextToSize(props.url, pageWidth - 40);
        pdf.text(splitUrl, pageWidth / 2, 30, { align: 'center' });

        // Add QR code
        pdf.addImage(qrCodeDataUrl.value, 'PNG', xPos, 40, imgWidth, imgHeight);

        // Add footer text
        pdf.setFontSize(8);
        pdf.text('Scan this QR code with your device', pageWidth / 2, 130, {
          align: 'center',
        });

        const logoWidth = 40;
        const logoHeight = 15;
        const logoX = (pageWidth - logoWidth) / 2;
        const logoY = 140;

        pdf.addImage('/logo.png', 'PNG', logoX, logoY, logoWidth, logoHeight);

        pdf.save('qr-code-share.pdf');
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    })
    .catch((error) => {
      console.error('Error loading jsPDF:', error);
      // Fallback to PNG if PDF generation fails
      downloadQRCode();
    });
};
</script>

<template>
  <div>
    <AppButton :variant="variant" :size="size" @click="openShareModal">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
      <template v-else>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"
          />
        </svg>
        {{ title }}
      </template>
    </AppButton>

    <!-- Share Modal -->
    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              Share
            </h3>
            <button
              @click="closeShareModal"
              class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
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

          <!-- URL Copy Section -->
          <div class="mb-6">
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >Link</label
            >
            <div class="flex">
              <input
                type="text"
                readonly
                :value="url"
                class="flex-grow px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md shadow-sm text-sm dark:bg-gray-700 dark:text-white"
              />
              <button
                @click="copy()"
                class="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 dark:border-gray-600 text-sm font-medium rounded-r-md text-white bg-primary hover:bg-primary/85"
              >
                {{ copyButtonText }}
              </button>
            </div>
          </div>

          <!-- QR Code Section -->
          <div>
            <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >QR Code</label
            >
            <div
              class="flex justify-center bg-white dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="relative group">
                <img
                  v-if="qrCodeDataUrl"
                  :src="qrCodeDataUrl"
                  alt="QR Code"
                  class="w-48 h-48"
                />
                <div v-else class="w-48 h-48 flex items-center justify-center">
                  <p class="text-gray-500">Loading QR code...</p>
                </div>

                <!-- Download Overlay -->
                <div
                  v-if="qrCodeDataUrl"
                  class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <button
                    @click="downloadQRCode"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center transition-all"
                    title="Download as PNG"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    PNG
                  </button>

                  <button
                    @click="downloadQRCodeAsPDF"
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center transition-all"
                    title="Download as PDF"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    PDF
                  </button>
                </div>
              </div>
            </div>
            <p
              class="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center"
            >
              Hover over QR code to download
            </p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
