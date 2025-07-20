import resumeData from "~/assets/resume/resume.json";
import type { ResumeData, ResumeSkill, ResumeWork } from "~/types";

/**
 * Composable for managing resume data
 * Centralizes resume data access and processing
 */
export const useResumeData = () => {
  const data = resumeData as ResumeData;

  // Calculate experience years from work history
  const calculateExperienceYears = (work: ResumeWork[] = data.work): number => {
    if (!work || work.length === 0) return 0;

    const startYear = Math.min(...work.map((job) => new Date(job.startDate).getFullYear()));
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  // Group skills by category based on skill names and patterns
  const groupSkillsByCategory = (skills: ResumeSkill[] = data.skills): Record<string, string[]> => {
    const categoryPatterns = {
      "Frontend Development": [
        "vue",
        "react",
        "javascript",
        "typescript",
        "html",
        "css",
        "sass",
        "less",
        "tailwind",
        "nuxt",
        "next",
        "jquery",
        "stencil",
        "front-end",
        "frontend",
      ],
      "Backend & API": [
        "node",
        "express",
        "php",
        "python",
        "rest",
        "api",
        "graphql",
        "mongodb",
        "postgresql",
        "json",
        "backend",
      ],
      "Tools & DevOps": [
        "git",
        "github",
        "gitlab",
        "docker",
        "aws",
        "amazon",
        "webpack",
        "vite",
        "yarn",
        "npm",
        "pnpm",
        "agile",
        "scrum",
        "jira",
      ],
      "Testing & Quality": ["jest", "cypress", "playwright", "vitest", "testing", "sonar", "quality"],
      "Design & UX": [
        "figma",
        "adobe",
        "photoshop",
        "illustrator",
        "indesign",
        "aftereffects",
        "ux",
        "ui",
        "design",
        "graphic",
        "web design",
        "typography",
        "branding",
        "affinity",
        "sketch",
      ],
      "Platforms & CMS": [
        "salesforce",
        "prestashop",
        "contentful",
        "bigcommerce",
        "shopify",
        "wordpress",
        "drupal",
        "aem",
        "adobe experience manager",
      ],
      "Analytics & Marketing": [
        "google analytics",
        "google tag manager",
        "google search console",
        "mixpanel",
        "analytics",
        "seo",
        "marketing",
      ],
    };

    const groupedSkills: Record<string, string[]> = {};

    // Categorize skills based on patterns
    skills.forEach((skill) => {
      const skillName = skill.name.toLowerCase();
      let categorized = false;

      Object.entries(categoryPatterns).forEach(([categoryName, patterns]) => {
        if (!categorized && patterns.some((pattern) => skillName.includes(pattern))) {
          if (!groupedSkills[categoryName]) {
            groupedSkills[categoryName] = [];
          }

          // Clean up skill name for display
          const cleanName = skill.name
            .replace("Cascading Style Sheets (CSS)", "CSS")
            .replace("node.js", "Node.js")
            .replace("affinity publisher", "Affinity Publisher")
            .replace("affinity photo", "Affinity Photo")
            .replace("affinity designer", "Affinity Designer")
            .replace("HTML5 + CSS3", "HTML5 & CSS3")
            .replace("Software as a Service (SaaS)", "SaaS")
            .replace("Amazon Web Services (AWS)", "AWS")
            .replace("Adobe Experience Manager (AEM)", "AEM");

          groupedSkills[categoryName].push(cleanName);
          categorized = true;
        }
      });

      // If skill doesn't fit any category, add to "Other Technologies"
      if (!categorized) {
        if (!groupedSkills["Other Technologies"]) {
          groupedSkills["Other Technologies"] = [];
        }
        groupedSkills["Other Technologies"].push(skill.name);
      }
    });

    // Sort skills within each category and limit to reasonable number
    Object.keys(groupedSkills).forEach((category) => {
      const categorySkills = groupedSkills[category];
      if (categorySkills) {
        groupedSkills[category] = categorySkills.sort().slice(0, 12); // Limit to 12 skills per category for better display
      }
    });

    // Remove categories with too few skills (less than 2)
    const filteredSkills: Record<string, string[]> = {};
    Object.entries(groupedSkills).forEach(([category, categorySkills]) => {
      if (categorySkills && categorySkills.length >= 2) {
        filteredSkills[category] = categorySkills;
      }
    });

    return filteredSkills;
  };

  // Transform resume work data to experience format
  const transformWorkToExperience = (work: ResumeWork[] = data.work) => {
    return work.map((workItem, index) => {
      const startYear = new Date(workItem.startDate).getFullYear();
      const endYear = workItem.endDate ? new Date(workItem.endDate).getFullYear() : "Present";

      // Determine location based on company
      const getLocation = (company: string) => {
        const locationMap: Record<string, string> = {
          epitome: "Austria",
          "epitome GmbH": "Austria",
          Helloprint: "Netherlands",
          Celfocus: "Portugal",
          "Leroy Merlin": "Portugal",
          "Human Navigator Groep": "Netherlands",
          Proxify: "Remote",
          Zentered: "Remote",
          SIROC: "Remote",
        };
        return locationMap[company] || "Remote";
      };

      return {
        id: index + 1,
        position: workItem.position,
        company: workItem.company,
        duration: `${startYear} - ${endYear}`,
        location: getLocation(workItem.company),
        description: workItem.summary || `Working as ${workItem.position} at ${workItem.company}`,
        achievements: workItem.highlights || [],
        technologies: extractTechnologies(workItem.summary, workItem.highlights),
        companyLogo: null,
        website: workItem.website,
      };
    });
  };

  // Extract technologies from summary and highlights text
  const extractTechnologies = (summary?: string, highlights?: string[]) => {
    const techKeywords = [
      "Vue.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Nuxt.js",
      "Next.js",
      "HTML",
      "CSS",
      "SASS",
      "Tailwind CSS",
      "PHP",
      "Python",
      "Express.js",
      "GraphQL",
      "REST API",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Git",
      "GitHub",
      "GitLab",
      "Webpack",
      "Vite",
      "Jest",
      "Cypress",
      "Playwright",
      "PlaywrightJs",
      "Figma",
      "Adobe",
      "Prestashop",
      "Contentful",
      "AEM",
      "ExtJs",
      "jQuery",
      "Amazon Style Dictionary",
      "StencilJS",
      "BigCommerce",
      "Scrum",
      "Agile",
      "Jira",
      "Percy",
      "Optimonk",
      "XML",
      "Adobe Experience Manager",
    ];

    const text = [summary, ...(highlights || [])].join(" ");
    const foundTechs = new Set<string>();

    // Look for exact matches and common variations
    techKeywords.forEach((tech) => {
      const variations = [
        tech,
        tech.toLowerCase(),
        tech.replace(".js", ""),
        tech.replace(".", ""),
        tech.replace("Js", ""),
      ];

      variations.forEach((variation) => {
        if (text.toLowerCase().includes(variation.toLowerCase())) {
          foundTechs.add(tech);
        }
      });
    });

    return Array.from(foundTechs).slice(0, 8); // Limit to 8 technologies for better display
  };

  // Get top skills for display
  const getTopSkills = (limit = 8): string[] => {
    return (
      data.skills
        ?.filter((skill) =>
          [
            "Vue.js",
            "React.js",
            "TypeScript",
            "JavaScript",
            "Nuxt.js",
            "Node.js",
            "HTML5",
            "Cascading Style Sheets (CSS)",
            "Tailwind CSS",
            "Front-end Development",
            "UX / UI Design",
          ].includes(skill.name)
        )
        .slice(0, limit)
        .map((skill) => skill.name.replace("Cascading Style Sheets (CSS)", "CSS")) || [
        "Vue.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Nuxt.js",
        "CSS",
      ]
    );
  };

  return {
    data,
    calculateExperienceYears,
    groupSkillsByCategory,
    transformWorkToExperience,
    extractTechnologies,
    getTopSkills,
  };
};
