// Global type definitions for the portfolio application

// ===================
// GitHub API Types
// ===================

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  location: string;
  company: string;
  blog: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
  homepage?: string;
}

export interface GitHubStats {
  totalStars: number;
  totalForks: number;
  totalRepos: number;
  languages: { [key: string]: number };
}

// ===================
// Resume/LinkedIn Types
// ===================

export interface ResumeProfile {
  network: string;
  username: string;
  url: string;
}

export interface ResumeBasics {
  name: string;
  label: string;
  summary: string;
  location: {
    city?: string;
    region?: string;
    countryCode?: string;
  };
  profiles?: ResumeProfile[];
}

export interface ResumeWork {
  company: string;
  position: string;
  website?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface ResumeSkill {
  name: string;
  level: string;
  keywords: string[];
}

export interface ResumeData {
  basics: ResumeBasics;
  work: ResumeWork[];
  skills: ResumeSkill[];
}

// ===================
// Portfolio Types
// ===================

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  phone: string;
  bio: string;
  profileImage: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
}

export interface SkillCategory {
  frontend: string[];
  backend: string[];
  database: string[];
  design: string[];
}

export interface Project {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormValidation {
  isValid: boolean;
  errors: { [key: string]: string };
}

export interface FormValidationRule {
  required?: boolean;
  minLength?: number;
  pattern?: RegExp;
  message?: string;
}

export interface ContactFormSchema {
  [key: string]: FormValidationRule;
}

// ===================
// Navigation Types
// ===================

export interface NavItem {
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

// ===================
// Configuration Types
// ===================

export interface GitHubConfig {
  username: string;
  featuredRepoCount: number;
  excludeForked: boolean;
  excludePrivate: boolean;
}

export interface LinkedInConfig {
  profileUrl: string;
}

// ===================
// Language Statistics Types
// ===================

export interface LanguageStats {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

// ===================
// Component Props Types
// ===================

export interface ContactInfo {
  type: string;
  label: string;
  value: string;
  href: string;
  icon: string;
  external: boolean;
}
