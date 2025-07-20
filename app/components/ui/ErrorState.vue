<!--
  ErrorState Component
  Reusable error state component with retry functionality
-->
<template>
  <div class="text-center py-12">
    <UIcon :name="iconName" :class="[
      'mx-auto mb-4',
      iconSizeClass,
      iconColorClass
    ]" />
    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
      {{ title }}
    </h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      {{ message }}
    </p>
    <UButton v-if="showRetry" variant="outline" @click="$emit('retry')">
      {{ retryText }}
    </UButton>
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
  iconName?: string
  iconColor?: 'red' | 'yellow' | 'gray'
  iconSize?: 'sm' | 'md' | 'lg'
  showRetry?: boolean
  retryText?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  message: 'An error occurred while loading data.',
  iconName: 'i-heroicons-exclamation-triangle',
  iconColor: 'red',
  iconSize: 'md',
  showRetry: true,
  retryText: 'Try Again'
})

defineEmits<{
  retry: []
}>()

const iconSizeClass = computed(() => {
  switch (props.iconSize) {
    case 'sm':
      return 'w-8 h-8'
    case 'lg':
      return 'w-16 h-16'
    default:
      return 'w-12 h-12'
  }
})

const iconColorClass = computed(() => {
  switch (props.iconColor) {
    case 'yellow':
      return 'text-yellow-500'
    case 'gray':
      return 'text-gray-500'
    default:
      return 'text-red-500'
  }
})
</script>
