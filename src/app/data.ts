export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  url?: string;
  image: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
}

export interface TechSkill {
  name: string;
  icon: string;
  level: number;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Duelith",
    category: "Esports",
    year: "2026",
    url: "https://duelith.pages.dev",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&h=700&fit=crop&auto=format",
  },
];

export const MIS_TECNOLOGIAS: TechSkill[] = [
  { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", level: 80 },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 55 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 70 },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 75 },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg", level: 70 },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 75 },
];

export const SERVICES: Service[] = [
  {
    number: "",
    title: "",
    description: "",
  },
  {
    number: "02",
    title: "",
    description:
      "Distinctive systems built from first principles — mark, palette, type, and voice unified into a singular presence.",
  },
  {
    number: "03",
    title: "Editorial Photography",
    description:
      "High-contrast, cinematic imagery for campaigns, editorial features, and luxury product launches.",
  },
  {
    number: "04",
    title: "Film & Motion",
    description:
      "Narrative-driven video production from concept through final color grade, scored and sound-designed.",
  },
];

export const TECH_SKILLS: TechSkill[] = [
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 95 },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 90 },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", level: 88 },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", level: 85 },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 80 },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", level: 92 },
  { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg", level: 78 },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 75 },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 82 },
  { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 80 },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", level: 85 },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg", level: 70 },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 88 },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 92 },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", level: 90 },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", level: 88 },
];

export const SECTION_NAMES = ["Portada", "Perfil", "Proyectos", "Servicios", "Contacto"];