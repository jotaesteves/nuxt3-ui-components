<template>
  <div class="space-y-6">
    <!-- Using cardVariant directly for custom cards -->
    <div :class="cardVariant('hover', 'lg')">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        Direct cardVariant Usage
      </h3>
      <p class="text-gray-600 dark:text-gray-300">
        This card uses the cardVariant utility directly on a div element.
        This approach gives you more control when you don't need the
        header/footer structure of BaseCard.
      </p>
    </div>

    <!-- Another example with bordered variant -->
    <div :class="cardVariant('bordered', 'sm')">
      <div class="flex items-center space-x-3">
        <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-500" />
        <span class="font-medium text-gray-900 dark:text-white">Info Card</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Compact bordered card with small padding, perfect for notifications or alerts.
      </p>
    </div>

    <!-- Example combining with other classes -->
    <div :class="cn(cardVariant('hover', 'md'), 'max-w-md mx-auto')">
      <div class="text-center">
        <UIcon name="i-heroicons-star" class="w-12 h-12 text-yellow-500 mx-auto mb-3" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Featured Item
        </h3>
        <p class="text-gray-600 dark:text-gray-300">
          Using cn() utility to combine cardVariant with additional classes.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cardVariant, cn } from '~/utils/styles';

// This component demonstrates how to use cardVariant and cn utilities
// directly in templates for more granular control over styling
</script>
