import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { siteConfig } from '@/config/site'

export function ContactSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl font-bold text-center mb-12">Contacto</h2>
        <form className="space-y-6">
          <div>
            <Input type="text" placeholder="Tu nombre" />
          </div>
          <div>
            <Input type="email" placeholder="Tu email" />
          </div>
          <div>
            <Textarea rows={5} placeholder="Mensaje" />
          </div>
          <Button type="submit" className="w-full">
            Enviar Mensaje
          </Button>
        </form>
      </div>
    </section>
  )
}