<!--
  BaseCard Component
  Reusable card component with consistent styling
-->
<template>
  <div :class="cardClasses">
    <!-- Card Header -->
    <div v-if="$slots.header" class="mb-6">
      <slot name="header" />
    </div>

    <!-- Card Content -->
    <slot />

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { cardVariant } from '~/utils/styles';

interface Props {
  padding?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'hover' | 'bordered'
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  variant: 'default'
})

const cardClasses = computed(() => cardVariant(props.variant, props.padding))
</script>
