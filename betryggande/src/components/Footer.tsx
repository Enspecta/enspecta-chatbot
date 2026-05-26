import { Phone, Mail, MapPin } from 'lucide-react'

const links = {
  Tjänster: [
    { label: 'Standard försäkring', href: '#priser' },
    { label: 'Plus försäkring', href: '#priser' },
    { label: 'Anmäl skada', href: '#kontakt' },
    { label: 'Teckna försäkring', href: 'https://www.betryggande.se/intresseanmalan' },
  ],
  Företaget: [
    { label: 'Om oss', href: '#om-oss' },
    { label: 'Hur det fungerar', href: '#hur-det-fungerar' },
    { label: 'Kontakta oss', href: '#kontakt' },
  ],
  Juridiskt: [
    { label: 'Integritetspolicy', href: '#' },
    { label: 'Förköpsinformation', href: '#' },
    { label: 'Allmänna villkor', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <a href="#" className="inline-block mb-5">
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg text-white tracking-tight">Betryggande</span>
                <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-brand-orange">
                  Försäkringar
                </span>
              </div>
            </a>
            <p className="font-sans text-white/45 text-sm leading-relaxed mb-6 max-w-xs">
              Vi erbjuder dolda fel-försäkring för husköpare och -säljare med skräddarsydda lösningar för varje unik fastighetsaffär.
            </p>
            <div className="space-y-3">
              {[
                { icon: Phone, text: '010 330 04 40', href: 'tel:0103300440' },
                { icon: Mail, text: 'info@betryggande.se', href: 'mailto:info@betryggande.se' },
                { icon: MapPin, text: 'Hyllie vattenparksgata 12, Malmö', href: null },
              ].map((item) => {
                const Icon = item.icon
                const inner = (
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                    <span className="font-sans text-white/45 text-sm">{item.text}</span>
                  </div>
                )
                return item.href ? (
                  <a key={item.text} href={item.href} className="block hover:opacity-80 transition-opacity">
                    {inner}
                  </a>
                ) : (
                  <div key={item.text}>{inner}</div>
                )
              })}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-sans font-semibold text-xs tracking-[0.2em] uppercase text-white/35 mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="font-sans text-white/55 text-sm hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-sans text-white/30 text-xs">
            © {new Date().getFullYear()} Betryggande Försäkringar i Sverige AB · Org.nr: 559389-0931
          </p>
          <div className="flex items-center gap-4 font-sans text-white/30 text-xs">
            <span>Finansinspektionen</span>
            <span>·</span>
            <span>Tydliga</span>
            <span>·</span>
            <span>InsureSec</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
