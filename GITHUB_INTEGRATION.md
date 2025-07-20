# GitHub Data Integration

This document explains how to use the `useGitHub` composable to fetch and display real GitHub data in your Nuxt 3 application.

## Setup

1. **Configure your GitHub username** in `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  // ... other config
  runtimeConfig: {
    public: {
      githubUsername: "your-github-username", // Replace with your GitHub username
    },
  },
});
```

2. **Import the composable** in your component:

```typescript
const { fetchUser, fetchRepos, calculateStats, getFeaturedRepos, getLanguageStats, getLanguageColor } = useGitHub();
```

## Available Functions

### `fetchUser(username: string)`

Fetches GitHub user profile information.

**Returns:** `GitHubUser | null`

```typescript
const user = await fetchUser("jotaesteves");
// Returns: { login, name, bio, public_repos, followers, following, avatar_url, ... }
```

### `fetchRepos(username: string, options?)`

Fetches user repositories with optional filtering.

**Parameters:**

- `username`: GitHub username
- `options`: Optional configuration object
  - `per_page`: Number of repos per page (default: 50)
  - `sort`: Sort order ('updated', 'created', 'pushed', 'full_name') (default: 'updated')
  - `type`: Repository type ('all', 'public', 'private') (default: 'public')

**Returns:** `GitHubRepo[]`

```typescript
const repos = await fetchRepos("jotaesteves", {
  per_page: 100,
  sort: "updated",
  type: "public",
});
```

### `calculateStats(repos: GitHubRepo[])`

Calculates aggregate statistics from repositories.

**Returns:** `GitHubStats`

```typescript
const stats = calculateStats(repos);
// Returns: { totalStars, totalForks, totalRepos, languages }
```

### `getFeaturedRepos(repos: GitHubRepo[], count?)`

Gets featured repositories (sorted by stars, filtered for quality).

**Parameters:**

- `repos`: Array of repositories
- `count`: Number of repos to return (default: 6)

**Returns:** `GitHubRepo[]`

```typescript
const featured = getFeaturedRepos(repos, 6);
```

### `getLanguageStats(repos: GitHubRepo[])`

Calculates language usage statistics with percentages and colors.

**Returns:** `LanguageStat[]`

```typescript
const languages = getLanguageStats(repos);
// Returns: [{ name, count, percentage, color }, ...]
```

### `getLanguageColor(language: string)`

Gets the standard color for a programming language.

**Returns:** `string` (hex color code)

```typescript
const color = getLanguageColor("TypeScript"); // Returns: '#3178c6'
```

## Complete Example

Here's a complete example of how to use the GitHub composable in a component:

```vue
<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading">Loading GitHub data...</div>

    <!-- Error State -->
    <div v-else-if="error">{{ error }}</div>

    <!-- Data Display -->
    <div v-else>
      <!-- User Info -->
      <div v-if="user">
        <h2>{{ user.name }}</h2>
        <p>@{{ user.login }}</p>
        <p>{{ user.bio }}</p>
        <p>{{ user.public_repos }} repositories</p>
      </div>

      <!-- Statistics -->
      <div v-if="stats">
        <h3>Statistics</h3>
        <p>Total Stars: {{ stats.totalStars }}</p>
        <p>Total Forks: {{ stats.totalForks }}</p>
        <p>Total Repos: {{ stats.totalRepos }}</p>
      </div>

      <!-- Language Stats -->
      <div v-if="languageStats.length">
        <h3>Top Languages</h3>
        <div v-for="lang in languageStats" :key="lang.name">
          <span class="w-3 h-3 inline-block rounded" :style="{ backgroundColor: lang.color }"></span>
          {{ lang.name }}: {{ lang.percentage }}%
        </div>
      </div>

      <!-- Featured Repos -->
      <div v-if="featuredRepos.length">
        <h3>Featured Repositories</h3>
        <div v-for="repo in featuredRepos" :key="repo.id">
          <a :href="repo.html_url" target="_blank">{{ repo.name }}</a>
          <p>{{ repo.description }}</p>
          <p>⭐ {{ repo.stargazers_count }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { fetchUser, fetchRepos, calculateStats, getFeaturedRepos, getLanguageStats } = useGitHub();
const config = useRuntimeConfig();

// State
const loading = ref(true);
const error = ref<string | null>(null);
const user = ref(null);
const repositories = ref([]);
const stats = ref(null);

// Computed
const featuredRepos = computed(() => getFeaturedRepos(repositories.value, 6));
const languageStats = computed(() => getLanguageStats(repositories.value));

// Load data
const loadData = async () => {
  try {
    const username = config.public.githubUsername;
    const [userData, reposData] = await Promise.all([fetchUser(username), fetchRepos(username, { per_page: 100 })]);

    user.value = userData;
    repositories.value = reposData;
    stats.value = calculateStats(reposData);
  } catch (err) {
    error.value = "Failed to load GitHub data";
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>
```

## Type Definitions

The composable includes TypeScript definitions for all data structures:

```typescript
interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  location: string;
  company: string;
  blog: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  homepage?: string;
}

interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: { [key: string]: number };
}
```

## Rate Limiting

The GitHub API has rate limits:

- **Unauthenticated requests**: 60 requests per hour per IP
- **Authenticated requests**: 5,000 requests per hour

For production applications, consider:

1. Adding authentication tokens
2. Implementing caching
3. Using server-side API routes to proxy requests

## Error Handling

The composable includes built-in error handling:

- Network errors are caught and logged
- Failed requests return `null` or empty arrays
- Always check for successful responses before using data

## Demo Component

A complete demo component (`GitHubDataDemo.vue`) is included that showcases all features of the GitHub composable. You can use it as a reference or testing tool.

## Integration in Portfolio

The `PortfolioGitHubStats.vue` component has been updated to use real GitHub data instead of static data. It includes:

- Loading states
- Error handling
- Real-time GitHub statistics
- Language usage charts
- Featured repositories
- Responsive design

The component automatically fetches data on mount and provides a retry mechanism if the initial load fails.
