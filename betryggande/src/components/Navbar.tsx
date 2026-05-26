import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'
import { cn } from '../lib/utils'

const navLinks = [
  { label: 'Försäkringar', href: '#forsakringar' },
  { label: 'Hur det fungerar', href: '#hur-det-fungerar' },
  { label: 'Priser', href: '#priser' },
  { label: 'Anmäl skada', href: '#kontakt' },
  { label: 'Om oss', href: '#om-oss' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white border-b border-stroke'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none">
            <span className={cn(
              'font-serif text-lg tracking-tight transition-colors',
              scrolled ? 'text-navy' : 'text-white'
            )}>
              Betryggande
            </span>
            <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-brand-orange">
              Försäkringar
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 font-sans text-sm font-medium transition-colors duration-200',
                  scrolled
                    ? 'text-muted hover:text-navy'
                    : 'text-white/75 hover:text-white'
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0103300440"
              className={cn(
                'flex items-center gap-2 font-sans text-sm font-medium transition-colors',
                scrolled ? 'text-muted hover:text-navy' : 'text-white/70 hover:text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              010 330 04 40
            </a>
            <a
              href="#teckna"
              className="bg-brand-orange hover:bg-brand-orange-dark text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors duration-200"
            >
              Teckna försäkring
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'lg:hidden p-2 transition-colors',
              scrolled ? 'text-navy' : 'text-white'
            )}
            aria-label={mobileOpen ? 'Stäng meny' : 'Öppna meny'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-stroke shadow-lg p-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-sans text-sm font-medium text-muted hover:text-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 pb-1 border-t border-stroke mt-2 space-y-2">
              <a
                href="tel:0103300440"
                className="flex items-center gap-2 px-4 py-3 font-sans text-sm text-muted"
              >
                <Phone className="w-4 h-4" />
                010 330 04 40
              </a>
              <a
                href="#teckna"
                className="block text-center bg-brand-orange text-white font-sans font-semibold py-3 rounded-lg"
              >
                Teckna försäkring
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
