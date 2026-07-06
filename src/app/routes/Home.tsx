import { HeroSection } from '@/app/components/sections/HeroSection'
import { AboutSection } from '@/app/components/sections/AboutSection'
import { SkillsSection } from '@/app/components/sections/SkillsSection'
import { ProjectsSection } from '@/app/components/sections/ProjectsSection'
import { ContactSection } from '@/app/components/sections/ContactSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}