<template>
  <section id="projects" class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A showcase of my latest work and contributions to the open-source community.
        </p>
      </div>

      <!-- Project Filter -->
      <div class="flex justify-center mb-12">
        <div class="flex space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button v-for="filter in projectFilters" :key="filter"
            class="px-4 py-2 rounded-md text-sm font-medium transition-colors" :class="activeFilter === filter
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'"
            @click="activeFilter = filter">
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="project in filteredProjects" :key="project.id"
          class="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
          <!-- Project Image -->
          <div class="relative overflow-hidden">
            <img :src="project.image" :alt="project.name"
              class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300">
            <div class="absolute top-4 right-4">
              <span class="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                {{ project.category }}
              </span>
            </div>
          </div>

          <!-- Project Content -->
          <div class="p-6">
            <div class="flex items-start justify-between mb-3">
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                {{ project.name }}
              </h3>
              <div class="flex space-x-2">
                <a v-if="project.githubUrl" :href="project.githubUrl" target="_blank" rel="noopener noreferrer"
                  class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <UIcon name="i-simple-icons-github" class="w-5 h-5" />
                </a>
                <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer"
                  class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-5 h-5" />
                </a>
              </div>
            </div>

            <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
              {{ project.description }}
            </p>

            <!-- GitHub Stats (if available) -->
            <div v-if="project.githubStats" class="flex space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center space-x-1">
                <UIcon name="i-heroicons-star" class="w-4 h-4" />
                <span>{{ project.githubStats.stars }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <UIcon name="i-heroicons-code-bracket" class="w-4 h-4" />
                <span>{{ project.githubStats.language }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
                <span>{{ project.githubStats.forks }}</span>
              </div>
            </div>

            <!-- Technologies -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tech in project.technologies" :key="tech"
                class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs font-medium">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- GitHub Profile Link -->
      <div class="text-center mt-16">
        <UCard class="max-w-md mx-auto">
          <div class="text-center">
            <UIcon name="i-simple-icons-github" class="w-8 h-8 text-gray-900 dark:text-white mx-auto mb-3" />
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              More Projects on GitHub
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Check out my GitHub profile for more projects and contributions
            </p>
            <UButton as="a" href="https://github.com/jotaesteves" target="_blank" rel="noopener noreferrer"
              variant="outline" size="sm">
              View GitHub Profile
            </UButton>
          </div>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const activeFilter = ref('All')
const { getAllProjects, getProjectsByCategory } = usePortfolio()

const projectFilters = ['All', 'Web App', 'Mobile', 'Open Source', 'UI/UX']

const projectsData = getAllProjects()

const filteredProjects = computed(() => {
  return getProjectsByCategory(activeFilter.value)
})
</script>
