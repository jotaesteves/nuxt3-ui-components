<template>
  <section id="experience" class="py-20 bg-gray-50 dark:bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Experience
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          My professional journey and the experiences that have shaped my career.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-blue-200 dark:bg-blue-800" />

        <div class="space-y-12">
          <div v-for="(experience, index) in experienceData" :key="experience.id" class="relative flex items-center"
            :class="index % 2 === 0 ? 'justify-start' : 'justify-end'">
            <!-- Timeline dot -->
            <div
              class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 z-10" />

            <!-- Experience Card -->
            <div
              class="w-5/12 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700"
              :class="index % 2 === 0 ? 'mr-auto' : 'ml-auto'">
              <!-- Company Logo and Header -->
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <img v-if="experience.companyLogo" :src="experience.companyLogo" :alt="experience.company"
                      class="w-8 h-8 object-contain">
                    <UIcon v-else name="i-heroicons-building-office" class="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                      {{ experience.position }}
                    </h3>
                    <p class="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {{ experience.company }}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ experience.duration }}
                  </p>
                  <p class="text-xs text-gray-400 dark:text-gray-500">
                    {{ experience.location }}
                  </p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                {{ experience.description }}
              </p>

              <!-- Key Achievements -->
              <div v-if="experience.achievements" class="mb-4">
                <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Key Achievements:
                </h4>
                <ul class="space-y-1">
                  <li v-for="achievement in experience.achievements" :key="achievement"
                    class="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                    <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {{ achievement }}
                  </li>
                </ul>
              </div>

              <!-- Technologies Used -->
              <div v-if="experience.technologies" class="flex flex-wrap gap-2">
                <span v-for="tech in experience.technologies" :key="tech"
                  class="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Import resume data directly
import resumeJsonData from '~/assets/resume/resume.json'

// Types for resume data structure
interface ResumeWork {
  company: string
  position: string
  website?: string
  startDate: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

interface ResumeData {
  work: ResumeWork[]
}

// Transform resume work data to experience format
const transformResumeToExperience = (resumeData: ResumeData) => {
  return resumeData.work?.map((work, index) => {
    const startYear = new Date(work.startDate).getFullYear()
    const endYear = work.endDate ? new Date(work.endDate).getFullYear() : 'Present'

    // Determine location based on company or default to Remote
    const getLocation = (company: string) => {
      const locationMap: Record<string, string> = {
        'epitome': 'Austria',
        'epitome GmbH': 'Austria',
        'Helloprint': 'Netherlands',
        'Celfocus': 'Portugal',
        'Leroy Merlin': 'Portugal',
        'Human Navigator Groep': 'Netherlands',
        'Proxify': 'Remote',
        'Zentered': 'Remote',
        'SIROC': 'Remote'
      }
      return locationMap[company] || 'Remote'
    }

    return {
      id: index + 1,
      position: work.position,
      company: work.company,
      duration: `${startYear} - ${endYear}`,
      location: getLocation(work.company),
      description: work.summary || `Working as ${work.position} at ${work.company}`,
      achievements: work.highlights || [],
      technologies: extractTechnologies(work.summary, work.highlights),
      companyLogo: null, // Could be added later
      website: work.website
    }
  }) || []
}

// Extract technologies from summary and highlights text
const extractTechnologies = (summary?: string, highlights?: string[]) => {
  const techKeywords = [
    'Vue.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Nuxt.js', 'Next.js',
    'HTML', 'CSS', 'SASS', 'Tailwind CSS', 'PHP', 'Python', 'Express.js',
    'GraphQL', 'REST API', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS',
    'Git', 'GitHub', 'GitLab', 'Webpack', 'Vite', 'Jest', 'Cypress',
    'Playwright', 'PlaywrightJs', 'Figma', 'Adobe', 'Prestashop', 'Contentful', 'AEM',
    'ExtJs', 'jQuery', 'Amazon Style Dictionary', 'StencilJS', 'BigCommerce',
    'Scrum', 'Agile', 'Jira', 'Percy', 'Optimonk', 'XML', 'Adobe Experience Manager'
  ]

  const text = [summary, ...(highlights || [])].join(' ')
  const foundTechs = new Set<string>()

  // Look for exact matches and common variations
  techKeywords.forEach(tech => {
    const variations = [
      tech,
      tech.toLowerCase(),
      tech.replace('.js', ''),
      tech.replace('.', ''),
      tech.replace('Js', ''),
    ]

    variations.forEach(variation => {
      if (text.toLowerCase().includes(variation.toLowerCase())) {
        foundTechs.add(tech)
      }
    })
  })

  return Array.from(foundTechs).slice(0, 8) // Limit to 8 technologies for better display
}

// Use transformed resume data
const experienceData = transformResumeToExperience(resumeJsonData as ResumeData)
</script>
