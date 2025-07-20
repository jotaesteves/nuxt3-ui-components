<template>
  <BaseSection id="experience" title="Professional Experience"
    subtitle="My professional journey and the experiences that have shaped my career." background="gray">
    <!-- Timeline -->
    <div class="relative">
      <!-- Timeline line -->
      <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800" />

      <div class="space-y-12">
        <div v-for="(experience, index) in experienceData" :key="experience.id" class="relative flex items-center"
          :class="index % 2 === 0 ? 'justify-start' : 'justify-end'">
          <!-- Timeline dot -->
          <div
            class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 z-10" />

          <!-- Experience card -->
          <BaseCard :class="[
            'w-full max-w-lg',
            index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'
          ]" hover>
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {{ experience.position }}
                </h3>
                <p class="text-lg font-medium text-blue-600 dark:text-blue-400 mb-1">
                  {{ experience.company }}
                </p>
                <div class="flex items-center text-sm text-gray-600 dark:text-gray-300 space-x-4">
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1" />
                    {{ experience.duration }}
                  </span>
                  <span class="flex items-center">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
                    {{ experience.location }}
                  </span>
                </div>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              {{ experience.description }}
            </p>

            <!-- Achievements -->
            <div v-if="experience.achievements?.length" class="mb-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Key Achievements:
              </h4>
              <ul class="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li v-for="achievement in experience.achievements.slice(0, 3)" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>

            <!-- Technologies -->
            <div v-if="experience.technologies?.length" class="mt-4">
              <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Technologies:
              </h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="tech in experience.technologies" :key="tech"
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </BaseCard>
        </div>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
const { transformWorkToExperience } = useResumeData()

// Use transformed resume data
const experienceData = transformWorkToExperience()
</script>
