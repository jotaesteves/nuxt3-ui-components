<template>
  <section id="about" class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          About Me
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Get to know more about my background, skills, and what drives my passion for technology.
        </p>
      </div>

      <div class="lg:grid lg:grid-cols-2 lg:gap-12 items-start">
        <!-- About Text -->
        <div class="mb-12 lg:mb-0">
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {{ aboutData.description }}
            </p>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              {{ aboutData.mission }}
            </p>
          </div>

          <!-- Quick Stats -->
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div v-for="stat in aboutData.stats" :key="stat.label"
              class="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-300">
                {{ stat.label }}
              </div>
            </div>
          </div>

          <LinkedInProfile profile-url="https://www.linkedin.com/in/jorge-miranda-dev/" class="mt-8" />
        </div>

        <!-- Skills Section -->
        <div>
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Technical Skills
          </h3>

          <div class="space-y-6">
            <div v-for="category in aboutData.skills" :key="category.name"
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {{ category.name }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="skill in category.items" :key="skill"
                  class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {{ skill }}
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
import type { ResumeData, ResumeSkill, ResumeWork } from '~/types'

// Import resume data directly
import resumeJsonData from '~/assets/resume/resume.json'

// Calculate experience years from work history
const calculateExperienceYears = (work: ResumeWork[]) => {
  if (!work || work.length === 0) return 0

  const startYear = Math.min(...work.map(job => new Date(job.startDate).getFullYear()))
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}

// Group skills by category based on skill names and levels
const groupSkillsByCategory = (skills: ResumeSkill[]) => {
  // Define skill categorization based on keywords and patterns
  const categoryPatterns = {
    'Frontend Development': [
      'vue', 'react', 'javascript', 'typescript', 'html', 'css', 'sass', 'less',
      'tailwind', 'nuxt', 'next', 'jquery', 'stencil', 'front-end', 'frontend'
    ],
    'Backend & API': [
      'node', 'express', 'php', 'python', 'rest', 'api', 'graphql',
      'mongodb', 'postgresql', 'json', 'backend'
    ],
    'Tools & DevOps': [
      'git', 'github', 'gitlab', 'docker', 'aws', 'amazon', 'webpack',
      'vite', 'yarn', 'npm', 'pnpm', 'agile', 'scrum', 'jira'
    ],
    'Testing & Quality': [
      'jest', 'cypress', 'playwright', 'vitest', 'testing', 'sonar', 'quality'
    ],
    'Design & UX': [
      'figma', 'adobe', 'photoshop', 'illustrator', 'indesign', 'aftereffects',
      'ux', 'ui', 'design', 'graphic', 'web design', 'typography', 'branding',
      'affinity', 'sketch'
    ],
    'Platforms & CMS': [
      'salesforce', 'prestashop', 'contentful', 'bigcommerce', 'shopify',
      'wordpress', 'drupal', 'aem', 'adobe experience manager'
    ],
    'Analytics & Marketing': [
      'google analytics', 'google tag manager', 'google search console',
      'mixpanel', 'analytics', 'seo', 'marketing'
    ]
  }

  const groupedSkills: Record<string, string[]> = {}

  // Categorize skills based on patterns
  skills.forEach(skill => {
    const skillName = skill.name.toLowerCase()
    let categorized = false

    Object.entries(categoryPatterns).forEach(([categoryName, patterns]) => {
      if (!categorized && patterns.some(pattern => skillName.includes(pattern))) {
        if (!groupedSkills[categoryName]) {
          groupedSkills[categoryName] = []
        }

        // Clean up skill name for display
        const cleanName = skill.name
          .replace('Cascading Style Sheets (CSS)', 'CSS')
          .replace('node.js', 'Node.js')
          .replace('affinity publisher', 'Affinity Publisher')
          .replace('affinity photo', 'Affinity Photo')
          .replace('affinity designer', 'Affinity Designer')
          .replace('HTML5 + CSS3', 'HTML5 & CSS3')
          .replace('Software as a Service (SaaS)', 'SaaS')
          .replace('Amazon Web Services (AWS)', 'AWS')
          .replace('Adobe Experience Manager (AEM)', 'AEM')

        groupedSkills[categoryName].push(cleanName)
        categorized = true
      }
    })

    // If skill doesn't fit any category, add to "Other Technologies"
    if (!categorized) {
      if (!groupedSkills['Other Technologies']) {
        groupedSkills['Other Technologies'] = []
      }
      groupedSkills['Other Technologies'].push(skill.name)
    }
  })

  // Sort skills within each category and limit to reasonable number
  Object.keys(groupedSkills).forEach(category => {
    const skills = groupedSkills[category]
    if (skills) {
      groupedSkills[category] = skills
        .sort()
        .slice(0, 12) // Limit to 12 skills per category for better display
    }
  })

  // Remove categories with too few skills (less than 2)
  const filteredSkills: Record<string, string[]> = {}
  Object.entries(groupedSkills).forEach(([category, skills]) => {
    if (skills && skills.length >= 2) {
      filteredSkills[category] = skills
    }
  })

  return filteredSkills
}

// Use resume data
const resumeData = resumeJsonData as ResumeData
const experienceYears = calculateExperienceYears(resumeData.work)
const skillsByCategory = groupSkillsByCategory(resumeData.skills)

const aboutData = {
  description: resumeData.basics.summary || "Passionate front-end engineer with expertise in creating beautiful, functional, and user-centered digital experiences.",
  mission: "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in writing clean, maintainable code and creating experiences that users love.",
  stats: [
    { value: `${experienceYears}+`, label: "Years Experience" },
    { value: `${resumeData.work?.length || 0}+`, label: "Companies Worked" },
    { value: `${resumeData.skills?.length || 0}+`, label: "Technologies" },
    { value: "100%", label: "Dedication" }
  ],
  skills: Object.entries(skillsByCategory).map(([name, items]) => ({
    name,
    items
  }))
}
</script>
