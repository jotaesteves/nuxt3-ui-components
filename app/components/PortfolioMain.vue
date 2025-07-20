<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <PortfolioNav />
    <PortfolioHero />
    <PortfolioAbout />

    <!--  <PortfolioExperience /> -->

    <!-- <PortfolioProjects /> -->
    <PortfolioGitHubStats />
    <PortfolioContact />
    <PortfolioFooter />
  </div>
</template>

<script setup lang="ts">
import PortfolioAbout from './PortfolioAbout.vue'
import PortfolioContact from './PortfolioContact.vue'
import PortfolioFooter from './PortfolioFooter.vue'
import PortfolioGitHubStats from './PortfolioGitHubStats.vue'
import PortfolioHero from './PortfolioHero.vue'
import PortfolioNav from './PortfolioNav.vue'
</script>
