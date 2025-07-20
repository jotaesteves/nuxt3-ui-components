import type { GitHubRepo, GitHubStats, GitHubUser, LanguageStats } from "~/types";

// Composable for GitHub API integration
export const useGitHub = () => {
  // Fetch user profile
  const fetchUser = async (username: string): Promise<GitHubUser | null> => {
    try {
      const data = await $fetch<GitHubUser>(`https://api.github.com/users/${username}`);
      return data;
    } catch (error) {
      console.error("Error fetching GitHub user:", error);
      return null;
    }
  };

  // Fetch user repositories
  const fetchRepos = async (
    username: string,
    options: {
      per_page?: number;
      sort?: "updated" | "created" | "pushed" | "full_name";
      type?: "all" | "public" | "private";
    } = {}
  ): Promise<GitHubRepo[]> => {
    try {
      const params = new URLSearchParams({
        per_page: (options.per_page || 50).toString(),
        sort: options.sort || "updated",
        type: options.type || "public",
      });

      const data = await $fetch<GitHubRepo[]>(`https://api.github.com/users/${username}/repos?${params}`);
      return data;
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
      return [];
    }
  };

  // Calculate GitHub statistics
  const calculateStats = (repos: GitHubRepo[]): GitHubStats => {
    const stats: GitHubStats = {
      totalStars: 0,
      totalForks: 0,
      totalRepos: repos.length,
      languages: {},
    };

    repos.forEach((repo) => {
      stats.totalStars += repo.stargazers_count;
      stats.totalForks += repo.forks_count;

      if (repo.language) {
        stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
      }
    });

    return stats;
  };

  // Get featured repositories (repositories with most stars or specific criteria)
  const getFeaturedRepos = (repos: GitHubRepo[], count: number = 6): GitHubRepo[] => {
    return repos
      .filter((repo) => !repo.name.includes(".github.io") && repo.description) // Filter out GitHub pages and repos without description
      .sort((a, b) => b.stargazers_count - a.stargazers_count) // Sort by stars
      .slice(0, count);
  };

  // Get language statistics with percentages
  const getLanguageStats = (repos: GitHubRepo[]): LanguageStats[] => {
    const languages: { [key: string]: number } = {};

    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const total = Object.values(languages).reduce((sum, count) => sum + count, 0);

    return Object.entries(languages)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / total) * 100),
        color: getLanguageColor(name),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5); // Top 5 languages
  };

  // Get language colors (simplified version)
  const getLanguageColor = (language: string): string => {
    const colors: { [key: string]: string } = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Vue: "#4fc08d",
      React: "#61dafb",
      Python: "#3776ab",
      CSS: "#1572b6",
      HTML: "#e34c26",
      Java: "#b07219",
      "C++": "#f34b7d",
      Go: "#00add8",
      Rust: "#dea584",
      PHP: "#777bb4",
    };
    return colors[language] || "#8b949e";
  };

  return {
    fetchUser,
    fetchRepos,
    calculateStats,
    getFeaturedRepos,
    getLanguageStats,
    getLanguageColor,
  };
};
