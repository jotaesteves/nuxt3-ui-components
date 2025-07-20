# Nuxt 3 UI Components Portfolio

[![Nuxt](https://img.shields.io/badge/Nuxt-4.0.0-00DC82?style=flat&logo=nuxt.js&logoColor=white)](https://nuxt.com/) [![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.11-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/) [![Vue.js](https://img.shields.io/badge/Vue.js-3.5.17-4FC08D?style=flat&logo=vue.js&logoColor=white)](https://vuejs.org/) [![GitHub API](https://img.shields.io/badge/GitHub_API-REST-181717?style=flat&logo=github&logoColor=white)](https://docs.github.com/en/rest) [![pnpm](https://img.shields.io/badge/pnpm-9.10.0-F69220?style=flat&logo=pnpm&logoColor=white)](https://pnpm.io/) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

![Portfolio Screenshot](screenshot.png)

A modern, responsive portfolio website built with Nuxt 3, featuring reusable UI components and integration with GitHub API for dynamic content.

## ✨ Features

- **Modern Stack**: Built with Nuxt 3, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with dark mode support
- **GitHub Integration**: Dynamic GitHub stats and repository showcase
- **LinkedIn Profile**: Professional profile integration
- **UI Components Library**: Reusable portfolio components including:
  - Hero section with animated elements
  - Interactive navigation
  - Experience timeline
  - Project showcase with GitHub API
  - Contact form
  - Social media integration

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **UI Library**: [@nuxt/ui](https://ui.nuxt.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Heroicons](https://heroicons.com/) & [Simple Icons](https://simpleicons.org/)
- **API Integration**: GitHub REST API via Octokit
- **Fonts**: Google Fonts integration
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📦 Installation

Make sure to install dependencies using pnpm:

```bash
pnpm install
```

## 🚀 Development

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## 📁 Project Structure

```txt
app/
├── components/          # Reusable UI components
│   ├── Portfolio*.vue   # Portfolio-specific components
│   ├── GitHubDataDemo.vue
│   └── LinkedInProfile.vue
├── composables/         # Vue composables
│   ├── useGitHub.ts    # GitHub API integration
│   └── usePortfolio.ts # Portfolio data management
├── types/              # TypeScript type definitions
├── assets/             # Static assets and data
└── app.vue            # Main application component
```

## 🔧 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm devtools         # Enable Nuxt DevTools

# Building
pnpm build           # Build for production
pnpm generate        # Generate static site
pnpm preview         # Preview production build

# Quality Assurance
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint errors
pnpm type-check      # Run TypeScript checks
pnpm test            # Run tests
pnpm test:watch      # Run tests in watch mode

# Maintenance
pnpm clean           # Clean build directories
pnpm upgrade         # Update dependencies
pnpm analyze         # Analyze bundle size
```

## 🎨 Customization

The portfolio can be easily customized by modifying the data in:

- `app/composables/usePortfolio.ts` - Personal information, skills, and experience
- `app/assets/resume/resume.json` - Resume data
- `app/composables/useGitHub.ts` - GitHub configuration

## 🌐 Production

Build the application for production:

```bash
pnpm build
```

Check out the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
