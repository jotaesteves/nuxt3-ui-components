<!--
  LoadingSpinner Component
  Reusable loading spinner with customizable size and text
-->
<template>
  <div class="flex flex-col items-center justify-center py-8">
    <div :class="[
      'animate-spin rounded-full border-b-2 border-blue-600 mx-auto mb-4',
      sizeClass
    ]" />
    <p v-if="text" class="text-gray-600 dark:text-gray-300 text-center">
      {{ text }}
    </p>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  text: 'Loading...'
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'h-8 w-8'
    case 'lg':
      return 'h-16 w-16'
    default:
      return 'h-12 w-12'
  }
})
</script>
