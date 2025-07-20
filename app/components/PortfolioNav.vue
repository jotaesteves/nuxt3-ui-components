<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo/Name -->
        <div class="flex-shrink-0">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ personalInfo.name }}
          </h1>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a v-for="item in navItems" :key="item.name" :href="item.href"
              class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
              @click="scrollToSection(item.href)">
              {{ item.name }}
            </a>
          </div>
        </div>

        <!-- Theme Toggle -->
        <div class="flex items-center space-x-4">
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <UButton variant="ghost" size="sm" square @click="mobileMenuOpen = !mobileMenuOpen">
              <UIcon :name="mobileMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="w-5 h-5" />
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <a v-for="item in navItems" :key="item.name" :href="item.href"
          class="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors"
          @click="scrollToSection(item.href); mobileMenuOpen = false">
          {{ item.name }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
const { getPersonalInfo } = usePortfolio()
const personalInfo = getPersonalInfo()

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  /* { name: 'Projects', href: '#projects' }, */
  { name: 'Contact', href: '#contact' }
]

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
