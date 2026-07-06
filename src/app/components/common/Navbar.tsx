import { Link } from 'react-router-dom'
import { navigation } from '@/config/navigation'
import { Button } from '@/app/components/ui/button'
import { siteConfig } from '@/config/site'

export function Navbar() {
  return (
    <nav className="flex items-center justify-between h-16">
      <Link to="/" className="text-xl font-bold">
        {siteConfig.name}
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {navigation.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      <Button variant="outline" size="sm" className="md:hidden">
        Menu
      </Button>
    </nav>
  )
}