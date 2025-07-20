<template>
  <section id="contact" class="py-20 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get In Touch
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          I'm always interested in new opportunities and collaborations. Let's connect!
        </p>
      </div>

      <div class="lg:grid lg:grid-cols-1 lg:gap-12">
        <!-- Contact Information -->
        <div class="mb-12 lg:mb-0">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Let's Connect
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Whether you have a project in mind, want to collaborate, or just want to say hello,
            I'd love to hear from you. Feel free to reach out through any of the channels below.
          </p>

          <!-- Contact Methods (Horizontal Alignment) -->
          <div class="flex space-x-8">
            <div v-for="contact in contactInfo" :key="contact.type" class="flex items-center space-x-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <UIcon :name="contact.icon" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ contact.label }}
                </h4>
                <a :href="contact.href" :target="contact.external ? '_blank' : undefined"
                  :rel="contact.external ? 'noopener noreferrer' : undefined"
                  class="text-blue-600 dark:text-blue-400 hover:underline">
                  {{ contact.value }}
                </a>
              </div>

            </div>
          </div>


        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const isSubmitting = ref(false)
const { getPersonalInfo } = usePortfolio()
const personalInfo = getPersonalInfo()

const contactInfo = [
  {
    type: 'email',
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: 'i-heroicons-envelope',
    external: false
  },
  {
    type: 'phone',
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    icon: 'i-heroicons-phone',
    external: false
  },
  {
    type: 'location',
    label: 'Location',
    value: personalInfo.location,
    href: `https://maps.google.com/?q=${encodeURIComponent(personalInfo.location)}`,
    icon: 'i-heroicons-map-pin',
    external: true
  },
  {
    type: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/jorge-miranda-dev',
    href: personalInfo.social.linkedin,
    icon: 'i-simple-icons-linkedin',
    external: true
  }
]

const socialLinks = [
  { name: 'GitHub', icon: 'i-simple-icons-github', url: personalInfo.social.github },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: personalInfo.social.linkedin },
  { name: 'Email', icon: 'i-heroicons-envelope', url: personalInfo.social.email }
]

const formState = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const onSubmit = async (data: typeof formState) => {
  isSubmitting.value = true

  try {
    // Here you would typically send the data to your backend or email service
    console.log('Form submitted:', data)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Show success message (you might want to use a toast notification)
    alert('Message sent successfully! I\'ll get back to you soon.')

    // Reset form
    Object.keys(formState).forEach(key => {
      formState[key as keyof typeof formState] = ''
    })
  } catch (error) {
    console.error('Error sending message:', error)
    alert('There was an error sending your message. Please try again.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
