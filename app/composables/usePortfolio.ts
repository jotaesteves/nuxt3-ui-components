import resume from "~/assets/resume/resume.json";

// Composable for managing portfolio data
export const usePortfolio = () => {
  // Personal information that can be easily updated
  const personalInfo = {
    name: "Jorge Esteves",
    title: "Front-End Engineer & UI/UX Designer",
    email: "jorge@litlynx.com",
    location: "Porto, Portugal",
    phone: "+43 6641265806",
    bio: "I create beautiful, functional, and user-centered digital experiences. Passionate about clean code, innovative solutions, and bringing ideas to life through technology.",
    profileImage: "https://avatars.githubusercontent.com/u/14905547?v=4",

    // Social links
    social: {
      github: "https://github.com/jotaesteves",
      linkedin: "https://linkedin.com/in/jorge-miranda-dev",
      email: "mailto:jorge@litlynx.com",
    },
  };

  // Skills and technologies
  const skills = {
    frontend: [
      "Vue.js",
      "React",
      "TypeScript",
      "Nuxt.js",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
      "Next.JS",
      "JavaScript",
      "SASS",
    ],
    backend: ["Node.js", "Express.js", "FastAPI", "REST APIs", "GraphQL"],
    database: ["MongoDB", "Git", "Docker", "AWS", "Vercel"],
    design: ["UI/UX Design", "Responsive Design", "Testing", "Agile"],
  };

  // Experience data loaded from resume.json
  const experience = resume.experience || [];
  if (experience.length === 0) {
    console.warn("No experience data found in resume.json");
  }
  // Featured projects (could be enhanced with GitHub API data)
  const featuredProjects = [
    {
      id: 1,
      name: "E-commerce Platform",
      description: "A full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.",
      image: "/api/placeholder/400/300",
      category: "Web App",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "https://github.com/jotaesteves/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.vercel.app",
      featured: true,
    },
    {
      id: 2,
      name: "Portfolio Template",
      description: "An open-source portfolio template for developers. Fully customizable and responsive.",
      image: "/api/placeholder/400/300",
      category: "Open Source",
      technologies: ["Nuxt.js", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/jotaesteves/portfolio-template",
      liveUrl: "https://portfolio-template-demo.vercel.app",
      featured: true,
    },
  ];

  // Contact form validation schema
  const contactFormSchema = {
    name: {
      required: true,
      minLength: 2,
      message: "Name must be at least 2 characters",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
    subject: {
      required: true,
      minLength: 5,
      message: "Subject must be at least 5 characters",
    },
    message: {
      required: true,
      minLength: 10,
      message: "Message must be at least 10 characters",
    },
  };

  // GitHub integration settings
  const githubConfig = {
    username: "jotaesteves",
    featuredRepoCount: 6,
    excludeForked: true,
    excludePrivate: true,
  };

  // LinkedIn integration settings
  const linkedinConfig = {
    profileUrl: "https://linkedin.com/in/jorge-miranda-dev",
    // Note: LinkedIn API requires OAuth and has limited public access
    // For now, we'll use static data but this can be enhanced with proper API integration
  };

  // Get all personal information
  const getPersonalInfo = () => personalInfo;

  // Get skills by category
  const getSkillsByCategory = () => ({
    Frontend: skills.frontend,
    Backend: skills.backend,
    "Database & Tools": skills.database,
    "Design & Other": skills.design,
  });

  // Get experience data
  const getExperience = () => experience;

  // Get featured projects
  const getFeaturedProjects = () => featuredProjects.filter((project) => project.featured);

  // Get all projects
  const getAllProjects = () => featuredProjects;

  // Get projects by category
  const getProjectsByCategory = (category: string) => {
    if (category === "All") return featuredProjects;
    return featuredProjects.filter((project) => project.category === category);
  };

  // Validate contact form
  const validateContactForm = (formData: any) => {
    const errors: { [key: string]: string } = {};

    Object.entries(contactFormSchema).forEach(([field, rules]) => {
      const value = formData[field];

      if (rules.required && (!value || value.trim() === "")) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
        return;
      }

      if (rules.minLength && value && value.length < rules.minLength) {
        errors[field] = rules.message;
        return;
      }

      if (rules.pattern && value && !rules.pattern.test(value)) {
        errors[field] = rules.message;
        return;
      }
    });

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  return {
    personalInfo,
    skills,
    experience,
    featuredProjects,
    githubConfig,
    linkedinConfig,
    getPersonalInfo,
    getSkillsByCategory,
    getExperience,
    getFeaturedProjects,
    getAllProjects,
    getProjectsByCategory,
    validateContactForm,
  };
};
