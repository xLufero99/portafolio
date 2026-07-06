import { skills } from '@/data/skills'
import { Badge } from '@/app/components/ui/badge'

export function SkillsSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Habilidades</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-lg px-4 py-2">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}