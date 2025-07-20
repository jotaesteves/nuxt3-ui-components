<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        GitHub Data Integration Demo
      </h1>
      <p class="text-gray-600 dark:text-gray-300">
        This component demonstrates how to use the useGitHub composable to fetch and display real GitHub data.
      </p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
      <p class="text-gray-600 dark:text-gray-300">Loading GitHub data...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
        Error Loading Data
      </h3>
      <p class="text-gray-600 dark:text-gray-300 mb-4">{{ error }}</p>
      <UButton variant="outline" @click="loadData">Try Again</UButton>
    </div>

    <!-- GitHub Data -->
    <div v-else class="space-y-8">
      <!-- User Profile -->
      <UCard v-if="user">
        <template #header>
          <h2 class="text-xl font-semibold">GitHub Profile</h2>
        </template>

        <div class="flex items-start space-x-4">
          <img :src="user.avatar_url" :alt="user.name" class="w-16 h-16 rounded-full">
          <div class="flex-1">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">
              {{ user.name }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">@{{ user.login }}</p>
            <p v-if="user.bio" class="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {{ user.bio }}
            </p>
            <div class="flex space-x-4 mt-2 text-sm text-gray-500">
              <span>{{ user.public_repos }} repos</span>
              <span>{{ user.followers }} followers</span>
              <span>{{ user.following }} following</span>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Statistics -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UCard v-if="stats">
          <template #header>
            <h3 class="text-lg font-semibold">Statistics</h3>
          </template>

          <div class="space-y-4">
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Total Repositories:</span>
              <span class="font-semibold">{{ stats.totalRepos }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Total Stars:</span>
              <span class="font-semibold">{{ stats.totalStars }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600 dark:text-gray-300">Total Forks:</span>
              <span class="font-semibold">{{ stats.totalForks }}</span>
            </div>
          </div>
        </UCard>

        <!-- Language Stats -->
        <UCard v-if="languageStats.length > 0">
          <template #header>
            <h3 class="text-lg font-semibold">Top Languages</h3>
          </template>

          <div class="space-y-3">
            <div v-for="lang in languageStats.slice(0, 5)" :key="lang.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: lang.color }" />
                <span class="text-sm">{{ lang.name }}</span>
              </div>
              <span class="text-sm text-gray-500">{{ lang.percentage }}%</span>
            </div>
          </div>
        </UCard>

        <!-- Featured Repos -->
        <UCard v-if="featuredRepos.length > 0">
          <template #header>
            <h3 class="text-lg font-semibold">Featured Repos</h3>
          </template>

          <div class="space-y-3">
            <div v-for="repo in featuredRepos.slice(0, 3)" :key="repo.id" class="space-y-1">
              <a :href="repo.html_url" target="_blank" rel="noopener noreferrer"
                class="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                {{ repo.name }}
              </a>
              <p class="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
                {{ repo.description }}
              </p>
              <div class="flex items-center space-x-3 text-xs text-gray-500">
                <span v-if="repo.language">{{ repo.language }}</span>
                <span class="flex items-center">
                  <UIcon name="i-heroicons-star" class="w-3 h-3 mr-1" />
                  {{ repo.stargazers_count }}
                </span>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Code Example -->
      <UCard>
        <template #header>
          <h3 class="text-lg font-semibold">Usage Example</h3>
        </template>

        <pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm"><code>// How to use the useGitHub
      composable
      const {
      fetchUser,
      fetchRepos,
      calculateStats,
      getFeaturedRepos,
      getLanguageStats
      } = useGitHub()

      // Fetch user data
      const user = await fetchUser('jotaesteves')

      // Fetch repositories
      const repos = await fetchRepos('jotaesteves', {
      per_page: 50,
      sort: 'updated'
      })

      // Calculate statistics
      const stats = calculateStats(repos)

      // Get featured repositories
      const featured = getFeaturedRepos(repos, 6)

      // Get language statistics
      const languages = getLanguageStats(repos)</code></pre>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
// Use the GitHub composable
const {
  fetchUser,
  fetchRepos,
  calculateStats,
  getFeaturedRepos,
  getLanguageStats
} = useGitHub()

const config = useRuntimeConfig()

// Define types
interface GitHubUser {
  login: string
  name: string
  bio: string
  public_repos: number
  followers: number
  following: number
  avatar_url: string
  html_url: string
  location: string
  company: string
  blog: string
}

interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
  topics: string[]
  updated_at: string
  homepage?: string
}

interface GitHubStats {
  totalStars: number
  totalForks: number
  totalRepos: number
  languages: { [key: string]: number }
}

// State
const loading = ref(true)
const error = ref<string | null>(null)
const user = ref<GitHubUser | null>(null)
const repositories = ref<GitHubRepo[]>([])
const stats = ref<GitHubStats | null>(null)

// Computed properties
const featuredRepos = computed(() => {
  if (!repositories.value.length) return []
  return getFeaturedRepos(repositories.value, 6)
})

const languageStats = computed(() => {
  if (!repositories.value.length) return []
  return getLanguageStats(repositories.value)
})

// Load GitHub data
const loadData = async () => {
  loading.value = true
  error.value = null

  try {
    const username = config.public.githubUsername || 'jotaesteves'

    // Fetch user and repos in parallel
    const [userData, reposData] = await Promise.all([
      fetchUser(username),
      fetchRepos(username, { per_page: 100, sort: 'updated' })
    ])

    if (!userData) {
      throw new Error('Failed to fetch user data')
    }

    user.value = userData
    repositories.value = reposData
    stats.value = calculateStats(reposData)

  } catch (err) {
    console.error('Error loading GitHub data:', err)
    error.value = err instanceof Error ? err.message : 'Failed to load data'
  } finally {
    loading.value = false
  }
}

// Load data on mount
onMounted(() => {
  loadData()
})
</script>
