<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          GitHub Statistics
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          My coding activity and contribution statistics from GitHub.
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="i in 4" :key="i"
            class="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="animate-pulse">
              <div class="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-3" />
              <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
              <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-12">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Unable to load GitHub data
        </h3>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ error }}
        </p>
        <UButton variant="outline" @click="loadGitHubData">
          Try Again
        </UButton>
      </div>

      <!-- GitHub Stats Content -->
      <div v-else>
        <!-- GitHub Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div v-for="stat in overviewStats" :key="stat.label"
            class="bg-white dark:bg-gray-900 rounded-lg p-6 text-center shadow-lg border border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-center mb-3">
              <UIcon :name="stat.icon" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-300">
              {{ stat.label }}
            </div>
          </div>
        </div>

        <!-- GitHub Activity and Language Stats -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- Language Statistics -->
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
                  <span class="text-sm text-gray-600 dark:text-gray-300 w-10 text-right">
                    {{ language.percentage }}%
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
                <UIcon name="i-heroicons-star" class="w-5 h-5 text-gray-500" />
              </div>
            </template>

            <div class="space-y-3">
              <div v-for="repo in featuredRepos" :key="repo.id"
                class="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <UIcon name="i-heroicons-folder"
                  class="w-4 h-4 mt-0.5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
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
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ repo.language }}</span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <UIcon name="i-heroicons-star" class="w-3 h-3 text-gray-400" />
                      <span class="text-xs text-gray-500 dark:text-gray-400">{{ repo.stargazers_count }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { GitHubRepo, GitHubStats, GitHubUser } from '~/types'

// Use the GitHub composable
const { fetchUser, fetchRepos, calculateStats, getFeaturedRepos, getLanguageStats, getLanguageColor } = useGitHub()
const config = useRuntimeConfig()

// State management
const loading = ref(true)
const error = ref<string | null>(null)
const githubUser = ref<GitHubUser | null>(null)
const repositories = ref<GitHubRepo[]>([])
const stats = ref<GitHubStats | null>(null)

// Load GitHub data with proper SSR handling
const { data: githubData, pending, error: fetchError, refresh } = await useLazyAsyncData('github-stats', async () => {
  const username = config.public.githubUsername

  if (!username) {
    throw new Error('GitHub username not configured')
  }

  try {
    // Fetch user profile and repositories in parallel
    const [user, repos] = await Promise.all([
      fetchUser(username),
      fetchRepos(username, { per_page: 100, sort: 'updated' })
    ])

    if (!user) {
      throw new Error('Failed to fetch GitHub user data')
    }

    return {
      user,
      repos,
      stats: calculateStats(repos)
    }
  } catch (err) {
    console.error('Error loading GitHub data:', err)
    throw err
  }
})

// Watch for data changes and update reactive refs
watchEffect(() => {
  if (githubData.value) {
    githubUser.value = githubData.value.user
    repositories.value = githubData.value.repos
    stats.value = githubData.value.stats
    loading.value = false
    error.value = null
  } else if (fetchError.value) {
    error.value = fetchError.value instanceof Error ? fetchError.value.message : 'Failed to load GitHub data'
    loading.value = false
  } else if (pending.value) {
    loading.value = true
    error.value = null
  }
})

// Computed properties for template
const overviewStats = computed(() => {
  if (!stats.value || !githubUser.value) return []

  return [
    {
      label: "Public Repos",
      value: githubUser.value.public_repos,
      icon: "i-heroicons-folder"
    },
    /*     {
          label: "Total Stars",
          value: stats.value.totalStars,
          icon: "i-heroicons-star"
        },
        {
          label: "Total Forks",
          value: stats.value.totalForks,
          icon: "i-heroicons-arrow-path"
        }, */
    {
      label: "Followers",
      value: githubUser.value.followers,
      icon: "i-heroicons-users"
    },
    {
      label: "Following",
      value: githubUser.value.following,
      icon: "i-heroicons-user-group"
    },

  ]
})

const languageStats = computed(() => {
  if (!repositories.value || repositories.value.length === 0) return []
  return getLanguageStats(repositories.value)
})

const featuredRepos = computed(() => {
  if (!repositories.value || repositories.value.length === 0) return []
  return getFeaturedRepos(repositories.value)
})

// Retry functionality
const loadGitHubData = async () => {
  // Force a refresh of the lazy data
  await refresh()
}
</script>
