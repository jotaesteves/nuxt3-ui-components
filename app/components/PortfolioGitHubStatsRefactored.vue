<template>
  <BaseSection id="github-stats" title="GitHub Statistics"
    subtitle="My coding activity and contribution statistics from GitHub." background="gray">
    <!-- Loading State -->
    <LoadingSpinner v-if="loading" text="Loading GitHub data..." />

    <!-- Error State -->
    <ErrorState v-else-if="error" title="Unable to load GitHub data" :message="error" icon-color="yellow"
      @retry="loadGitHubData" />

    <!-- GitHub Stats Content -->
    <div v-else class="space-y-12">
      <!-- Stats Overview -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BaseCard v-for="stat in statsCards" :key="stat.label" class="text-center" padding="lg">
          <div class="flex items-center justify-center mb-4">
            <UIcon :name="stat.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {{ stat.value }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-300">
            {{ stat.label }}
          </div>
        </BaseCard>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Most Used Languages -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Most Used Languages
              </h3>
              <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 text-gray-500" />
            </div>
          </template>

          <div class="space-y-4">
            <div v-for="language in languageStats" :key="language.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: language.color }" />
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ language.name }}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div class="h-2 rounded-full" :style="{
                    backgroundColor: language.color,
                    width: `${language.percentage}%`
                  }" />
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 w-8 text-right">
                  {{ Math.round(language.percentage) }}%
                </span>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Featured Repositories -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                Featured Repositories
              </h3>
              <UIcon name="i-heroicons-folder" class="w-5 h-5 text-gray-500" />
            </div>
          </template>

          <div class="space-y-4">
            <div v-for="repo in featuredRepos" :key="repo.id"
              class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <UIcon name="i-heroicons-folder" class="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <div class="flex-1 min-w-0">
                <a :href="repo.html_url" target="_blank" rel="noopener noreferrer"
                  class="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {{ repo.name }}
                </a>
                <p class="text-xs text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                  {{ repo.description }}
                </p>
                <div class="flex items-center space-x-3 mt-2">
                  <div v-if="repo.language" class="flex items-center space-x-1">
                    <div class="w-2 h-2 rounded-full" :style="{ backgroundColor: getLanguageColor(repo.language) }" />
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ repo.language }}
                    </span>
                  </div>
                  <div class="flex items-center space-x-1">
                    <UIcon name="i-heroicons-star" class="w-3 h-3 text-gray-400" />
                    <span class="text-xs text-gray-500 dark:text-gray-400">
                      {{ repo.stargazers_count }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
import type { GitHubRepo, GitHubStats, GitHubUser } from '~/types'

// Use the GitHub composable and async state management
const { fetchUser, fetchRepos, calculateStats, getFeaturedRepos, getLanguageStats, getLanguageColor } = useGitHub()
const { loading, error, execute } = useAsyncState()
const config = useRuntimeConfig()

// State management
const githubUser = ref<GitHubUser | null>(null)
const repositories = ref<GitHubRepo[]>([])
const stats = ref<GitHubStats | null>(null)

// Computed properties
const statsCards = computed(() => {
  if (!stats.value) return []

  return [
    {
      label: 'Public Repositories',
      value: stats.value.totalRepos,
      icon: 'i-heroicons-folder'
    },
    {
      label: 'Total Stars',
      value: stats.value.totalStars,
      icon: 'i-heroicons-star'
    },
    {
      label: 'Total Forks',
      value: stats.value.totalForks,
      icon: 'i-heroicons-code-bracket'
    },
    {
      label: 'Languages',
      value: Object.keys(stats.value.languages || {}).length,
      icon: 'i-heroicons-code-bracket-square'
    }
  ]
})

const featuredRepos = computed(() => {
  if (!repositories.value.length) return []
  return getFeaturedRepos(repositories.value, 5)
})

const languageStats = computed(() => {
  if (!repositories.value.length) return []
  return getLanguageStats(repositories.value)
})

// Load GitHub data with proper error handling
const loadGitHubData = async () => {
  await execute(async () => {
    const username = config.public.githubUsername || 'jotaesteves'

    // Fetch user and repos in parallel
    const [userData, reposData] = await Promise.all([
      fetchUser(username),
      fetchRepos(username, { per_page: 100, sort: 'updated' })
    ])

    if (!userData) {
      throw new Error('Failed to fetch user data')
    }

    githubUser.value = userData
    repositories.value = reposData
    stats.value = calculateStats(reposData)

    return { user: userData, repos: reposData, stats: stats.value }
  }, 'Failed to load GitHub data')
}

// Load data on mount with proper SSR handling
onMounted(() => {
  if (import.meta.client) {
    loadGitHubData()
  }
})
</script>
