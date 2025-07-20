<!--
  BaseCard Component
  Reusable card component with consistent styling
-->
<template>
  <div :class="[
    'bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700',
    paddingClass,
    hoverClass
  ]">
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
interface Props {
  padding?: 'sm' | 'md' | 'lg'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  padding: 'md',
  hover: false
})

const paddingClass = computed(() => {
  switch (props.padding) {
    case 'sm':
      return 'p-4'
    case 'lg':
      return 'p-8'
    default:
      return 'p-6'
  }
})

const hoverClass = computed(() =>
  props.hover ? 'transition-transform hover:scale-105' : ''
)
</script>
