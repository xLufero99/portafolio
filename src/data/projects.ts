import { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 1,
    title: 'Proyecto 1',
    description: 'Descripción del primer proyecto',
    tech: ['React', 'TypeScript', 'Tailwind'],
    link: 'https://proyecto1.com',
    github: 'https://github.com/tuusuario/proyecto1'
  },
  {
    id: 2,
    title: 'Proyecto 2',
    description: 'Descripción del segundo proyecto',
    tech: ['Next.js', 'Prisma', 'PostgreSQL'],
    link: 'https://proyecto2.com'
  },
  {
    id: 3,
    title: 'Proyecto 3',
    description: 'Descripción del tercer proyecto',
    tech: ['Vue', 'Nuxt', 'Tailwind'],
    github: 'https://github.com/tuusuario/proyecto3'
  }
]