<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Brand Column -->
        <div class="md:col-span-2">
          <h3 class="text-2xl font-bold mb-4">{{ footerData.name }}</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">
            {{ footerData.tagline }}
          </p>
          <div class="flex space-x-4">
            <a v-for="social in footerData.socialLinks" :key="social.name" :href="social.url" target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
              <UIcon :name="social.icon" class="w-5 h-5" />
              <span class="sr-only">{{ social.name }}</span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Quick Links</h4>
          <ul class="space-y-2">
            <li v-for="link in footerData.quickLinks" :key="link.name">
              <a :href="link.href" class="text-gray-300 hover:text-white transition-colors"
                @click="scrollToSection(link.href)">
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h4 class="text-lg font-semibold mb-4">Contact</h4>
          <ul class="space-y-2">
            <li v-for="contact in footerData.contactInfo" :key="contact.type">
              <a :href="contact.href" :target="contact.external ? '_blank' : undefined"
                :rel="contact.external ? 'noopener noreferrer' : undefined"
                class="text-gray-300 hover:text-white transition-colors flex items-center space-x-2">
                <UIcon :name="contact.icon" class="w-4 h-4" />
                <span>{{ contact.value }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p class="text-gray-400 text-sm mb-4 md:mb-0">
          © {{ currentYear }} {{ footerData.name }}. All rights reserved.
        </p>
        <div class="flex space-x-6">
          <a v-for="legal in footerData.legalLinks" :key="legal.name" :href="legal.href"
            class="text-gray-400 hover:text-white text-sm transition-colors">
            {{ legal.name }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
const { getPersonalInfo } = usePortfolio()
const personalInfo = getPersonalInfo()

const footerData = {
  name: personalInfo.name,
  tagline: personalInfo.bio,
  socialLinks: [
    { name: "GitHub", icon: "i-simple-icons-github", url: personalInfo.social.github },
    { name: "LinkedIn", icon: "i-simple-icons-linkedin", url: personalInfo.social.linkedin },
    { name: "Email", icon: "i-heroicons-envelope", url: personalInfo.social.email }
  ],
  quickLinks: [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ],
  contactInfo: [
    {
      type: 'email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: 'i-heroicons-envelope',
      external: false
    },
    {
      type: 'location',
      value: personalInfo.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
      icon: 'i-heroicons-map-pin',
      external: true
    }
  ],
  legalLinks: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" }
  ]
}

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
