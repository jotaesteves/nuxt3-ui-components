<template>
  <div id="experience" class="linkedin-profile">
    <!-- LinkedIn Profile Card -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ">
      <div class="flex items-center space-x-4 mb-6">
        <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
          <UIcon name="i-simple-icons-linkedin" class="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            LinkedIn Profile
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            Connect with me professionally
          </p>
        </div>
      </div>

      <!-- Profile Info -->
      <div v-if="profileData" class="space-y-4">
        <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
          <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {{ profileData.name }}
          </h4>
          <p class="text-blue-600 dark:text-blue-400 font-medium">
            {{ profileData.headline }}
          </p>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            {{ profileData.location }}
          </p>
        </div>

        <!-- Summary -->
        <div v-if="profileData.summary">
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">About</h5>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {{ profileData.summary }}
          </p>
        </div>

        <!-- Experience Preview -->
        <div v-if="profileData.experience && profileData.experience.length > 0">
          <h5 class="font-medium text-gray-900 dark:text-white mb-3">Recent Experience</h5>
          <div class="space-y-3">
            <div v-for="exp in profileData.experience.slice(0, 6)" :key="exp.id"
              class="border-l-2 border-blue-200 dark:border-blue-800 pl-4">
              <h6 class="font-medium text-gray-900 dark:text-white text-sm">
                {{ exp.title }}
              </h6>
              <p class="text-blue-600 dark:text-blue-400 text-xs font-medium">
                {{ exp.company }}
              </p>
              <p class="text-gray-500 dark:text-gray-400 text-xs">
                {{ exp.duration }}
              </p>
            </div>
          </div>
        </div>

        <!-- Skills Preview -->
        <div v-if="profileData.skills && profileData.skills.length > 0">
          <h5 class="font-medium text-gray-900 dark:text-white mb-2">Top Skills</h5>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in profileData.skills.slice(0, 6)" :key="skill"
              class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>

      <!-- Error State (if data fails to load) -->
      <div v-else class="text-center py-4">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-8 h-8 text-yellow-500 mx-auto mb-2" />
        <p class="text-gray-600 dark:text-gray-300 text-sm">
          Unable to load profile data
        </p>
      </div>

      <!-- Call to Action -->
      <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 dark:text-white">
        <div class="flex flex-col sm:flex-row gap-3">
          <UButton as="a" :href="linkedinUrl" target="_blank" rel="noopener noreferrer" class="flex-1" size="sm">
            <UIcon name="i-simple-icons-linkedin" class="w-4 h-4 mr-2" />
            View Full Profile
          </UButton>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResumeData } from '~/types'

// Import resume data directly
import resumeJsonData from '~/assets/resume/resume.json'

// Use imported resume data
const resumeData = ref<ResumeData>(resumeJsonData as ResumeData)

// LinkedIn profile URL (computed from resume data)
const linkedinUrl = computed(() => {
  if (!resumeData.value) return 'https://www.linkedin.com/in/jorge-miranda-dev'
  const linkedinProfile = resumeData.value.basics.profiles?.find(profile => profile.network === 'LinkedIn')
  return linkedinProfile?.url || 'https://www.linkedin.com/in/jorge-miranda-dev'
})

// Profile data computed from resume
const profileData = computed(() => {
  if (!resumeData.value) return null

  const { basics, work, skills } = resumeData.value

  return {
    name: basics.name || 'Jorge Miranda',
    headline: basics.label || 'Front-End Engineer',
    location: [
      basics.location?.city,
      basics.location?.region,
      basics.location?.countryCode
    ].filter(Boolean).join(', ') || 'Portugal',
    summary: basics.summary || 'Passionate front-end engineer with expertise in creating beautiful, functional, and user-centered digital experiences.',
    experience: work?.slice(0, 6).map((workItem, index) => ({
      id: index + 1,
      title: workItem.position,
      company: workItem.company,
      duration: `${new Date(workItem.startDate).getFullYear()} - ${workItem.endDate ? new Date(workItem.endDate).getFullYear() : 'Present'}`
    })) || [],
    skills: skills?.filter(skill =>
      ['Vue.js', 'React.js', 'TypeScript', 'JavaScript', 'Nuxt.js', 'Node.js', 'HTML5', 'Cascading Style Sheets (CSS)', 'Tailwind CSS', 'Front-end Development', 'UX / UI Design'].includes(skill.name)
    ).slice(0, 8).map(skill => skill.name.replace('Cascading Style Sheets (CSS)', 'CSS')) || [
        'Vue.js', 'React', 'TypeScript', 'JavaScript', 'Nuxt.js', 'CSS'
      ]
  }
})
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