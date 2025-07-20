<!--
  BaseSection Component
  Reusable section wrapper with consistent styling and layout
-->
<template>
  <section :id="sectionId" :class="[
    'py-20',
    backgroundClass
  ]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div v-if="title || subtitle || $slots.header" class="text-center mb-16">
        <slot name="header">
          <h2 v-if="title" class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {{ title }}
          </h2>
          <p v-if="subtitle" class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {{ subtitle }}
          </p>
        </slot>
      </div>

      <!-- Section Content -->
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  sectionId?: string
  title?: string
  subtitle?: string
  background?: 'light' | 'dark' | 'gray'
}

const props = withDefaults(defineProps<Props>(), {
  sectionId: '',
  title: '',
  subtitle: '',
  background: 'light'
})

const backgroundClass = computed(() => {
  switch (props.background) {
    case 'dark':
      return 'bg-gray-900 dark:bg-gray-950'
    case 'gray':
      return 'bg-gray-50 dark:bg-gray-800'
    default:
      return 'bg-white dark:bg-gray-900'
  }
})
</script>
