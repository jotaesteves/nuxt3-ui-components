<template>
  <BaseSection id="linkedin-profile" title="Professional Profile"
    subtitle="Connect with me on LinkedIn for professional networking and collaboration opportunities."
    background="light">
    <div class="max-w-4xl mx-auto">
      <BaseCard class="linkedin-profile" padding="lg">
        <div class="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
          <!-- Profile Image -->
          <div class="flex-shrink-0">
            <img :src="profileData.image" :alt="profileData.name"
              class="w-32 h-32 rounded-full border-4 border-blue-100 dark:border-blue-900 shadow-lg">
          </div>

          <!-- Profile Information -->
          <div class="flex-1 space-y-4">
            <!-- Name and Title -->
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {{ profileData.name }}
              </h2>
              <p class="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                {{ profileData.title }}
              </p>
              <p class="text-gray-600 dark:text-gray-300 flex items-center">
                <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-2" />
                {{ profileData.location }}
              </p>
            </div>

            <!-- Professional Summary -->
            <div class="space-y-3">
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ profileData.summary }}
              </p>
            </div>

            <!-- Key Skills -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Skills
              </h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in profileData.skills" :key="skill"
                  class="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Professional Stats -->
            <div class="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div v-for="stat in profileData.stats" :key="stat.label" class="text-center">
                <div class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-300">
                  {{ stat.label }}
                </div>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div class="flex flex-col sm:flex-row gap-3 pt-4">
              <UButton :to="profileUrl" target="_blank" rel="noopener noreferrer" size="lg" class="flex-1 sm:flex-none">
                <UIcon name="i-simple-icons-linkedin" class="w-4 h-4 mr-2" />
                View LinkedIn Profile
              </UButton>

              <UButton variant="outline" size="lg" class="flex-1 sm:flex-none" @click="scrollToSection('#contact')">
                <UIcon name="i-heroicons-envelope" class="w-4 h-4 mr-2" />
                Get In Touch
              </UButton>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>
  </BaseSection>
</template>

<script setup lang="ts">
interface Props {
  profileUrl?: string
}

const _props = withDefaults(defineProps<Props>(), {
  profileUrl: 'https://www.linkedin.com/in/jorge-miranda-dev/'
})

const { data: resumeData, calculateExperienceYears, getTopSkills } = useResumeData()

// Scroll to section utility
const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Profile data computed from resume
const profileData = computed(() => ({
  name: resumeData.basics.name,
  title: resumeData.basics.label,
  location: `${resumeData.basics.location?.city || ''}, ${resumeData.basics.location?.region || ''}`.trim().replace(/^,|,$/, ''),
  summary: resumeData.basics.summary || "Passionate front-end engineer dedicated to creating exceptional digital experiences through innovative technology solutions.",
  image: "https://avatars.githubusercontent.com/u/14905547?v=4", // Could be made dynamic
  skills: getTopSkills(8),
  stats: [
    {
      value: `${calculateExperienceYears()}+`,
      label: "Years Experience"
    },
    {
      value: `${resumeData.work?.length || 0}+`,
      label: "Companies"
    },
    {
      value: `${resumeData.skills?.length || 0}+`,
      label: "Skills"
    }
  ]
}))
</script>

<style scoped>
/* Custom styles for LinkedIn integration */
.linkedin-profile {
  max-width: 100%;
}

/* Ensure proper spacing in the card */
.linkedin-profile .space-y-4>*+* {
  margin-top: 1rem;
}

.linkedin-profile .space-y-3>*+* {
  margin-top: 0.75rem;
}
</style>
