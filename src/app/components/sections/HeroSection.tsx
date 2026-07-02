import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function HeroSection() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Hola, soy <span className="text-primary">{siteConfig.author}</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            {siteConfig.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Ver Proyectos</Button>
            <Button size="lg" variant="outline">
              Contactarme
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}