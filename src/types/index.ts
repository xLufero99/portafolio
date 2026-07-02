export interface Project {
  id: string | number
  title: string
  description: string
  image?: string
  tech: string[]
  link?: string
  github?: string
}

export interface Skill {
  name: string
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  icon?: string
}

export interface NavItem {
  name: string
  href: string
}

export interface SiteConfig {
  name: string
  description: string
  author: string
  url?: string
  links?: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}