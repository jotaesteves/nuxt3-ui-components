<template>
  <section id="home"
    class="pt-16 min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
        <!-- Text Content -->
        <div class="mb-12 lg:mb-0">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm
            <span class="text-blue-600 dark:text-blue-400">{{ heroData.name }}</span>
          </h1>
          <h2 class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-6">
            {{ heroData.title }}
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {{ heroData.description }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 dark:text-white">
            <UButton size="lg" @click="scrollToSection('#projects')">
              View My Work
            </UButton>
            <UButton variant="outline" size="lg" @click="scrollToSection('#contact')">
              Get In Touch
            </UButton>
          </div>

          <!-- Social Links -->
          <div class="flex space-x-6 mt-8">
            <a v-for="social in heroData.socialLinks" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
              <UIcon :name="social.icon" class="w-6 h-6" />
              <span class="sr-only">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <!-- Profile Image -->
        <div class="flex justify-center lg:justify-end">
          <div class="relative">
            <div class="w-80 h-80 rounded-full overflow-hidden border-8 border-white dark:border-gray-700 shadow-2xl">
              <img :src="heroData.profileImage" :alt="heroData.name" class="w-full h-full object-cover">
            </div>
            <!-- Decorative elements -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20" />
            <div
              class="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-20" />
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="text-center mt-16 dark:text-white">
        <UButton variant="ghost" size="sm" class="animate-bounce" @click="scrollToSection('#about')">
          <UIcon name="i-heroicons-chevron-down" class="w-6 h-6" />
        </UButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { getPersonalInfo } = usePortfolio()
const personalInfo = getPersonalInfo()

const heroData = {
  name: personalInfo.name,
  title: personalInfo.title,
  description: personalInfo.bio,
  profileImage: personalInfo.profileImage,
  socialLinks: [
    { name: "GitHub", icon: "i-simple-icons-github", url: personalInfo.social.github },
    { name: "LinkedIn", icon: "i-simple-icons-linkedin", url: personalInfo.social.linkedin },
    { name: "Email", icon: "i-heroicons-envelope", url: personalInfo.social.email }
  ]
}

const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
