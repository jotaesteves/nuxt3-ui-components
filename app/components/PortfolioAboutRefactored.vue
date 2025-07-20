<template>
  <BaseSection id="about" title="About Me"
    subtitle="Get to know more about my background, skills, and what drives my passion for technology."
    background="light">
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
  </BaseSection>
</template>

<script setup lang="ts">
const { data: resumeData, calculateExperienceYears, groupSkillsByCategory } = useResumeData()

const experienceYears = calculateExperienceYears()
const skillsByCategory = groupSkillsByCategory()

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
