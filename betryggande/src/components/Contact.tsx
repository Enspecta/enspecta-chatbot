import { Phone, Mail, MapPin, Clock, ArrowRight, AlertCircle } from 'lucide-react'

const contactItems = [
  {
    icon: Phone,
    label: 'Telefon',
    value: '010 330 04 40',
    href: 'tel:0103300440',
    note: 'Vardagar 08:00–16:00',
  },
  {
    icon: Mail,
    label: 'E-post',
    value: 'info@betryggande.se',
    href: 'mailto:info@betryggande.se',
    note: 'Vi svarar inom 24h',
  },
  {
    icon: MapPin,
    label: 'Kontor',
    value: 'Hyllie vattenparksgata 12',
    href: 'https://maps.google.com/?q=Hyllie+Vattenparksgata+12,+Malmö',
    note: '215 32 Malmö',
  },
  {
    icon: Clock,
    label: 'Öppettider',
    value: 'Mån–Fre 08:00–16:00',
    href: null,
    note: 'Stängt helger och röda dagar',
  },
]

export function Contact() {
  return (
    <section id="kontakt" className="py-28 lg:py-36 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-block font-sans text-brand-blue font-medium text-xs tracking-[0.2em] uppercase mb-4">
              Kontakta oss
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-navy leading-tight mb-4">
              Redo att skydda<br />din fastighetsaffär?
            </h2>
            <p className="font-sans text-muted text-lg leading-relaxed mb-10">
              Kontakta oss idag för rådgivning och offert. Vi hjälper dig att hitta rätt försäkring för just din fastighet.
            </p>

            <div className="space-y-3">
              {contactItems.map((item) => {
                const Icon = item.icon
                const inner = (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-stroke rounded-lg flex-shrink-0">
                      <Icon className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-muted uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="font-sans font-medium text-navy text-sm">{item.value}</p>
                      <p className="font-sans text-xs text-muted">{item.note}</p>
                    </div>
                  </div>
                )
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="block bg-white border border-stroke rounded-xl p-4 hover:border-brand-blue/30 transition-colors duration-200"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label} className="bg-white border border-stroke rounded-xl p-4">
                    {inner}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-5">
            <div id="teckna" className="bg-navy rounded-2xl p-8">
              <h3 className="font-serif text-2xl text-white mb-2">Teckna försäkring</h3>
              <p className="font-sans text-white/55 text-sm leading-relaxed mb-6">
                Fyll i vår intresseanmälan online — välj paket, täckningsbelopp och besiktningstyp. Klart på några minuter.
              </p>
              <a
                href="https://www.betryggande.se/intresseanmalan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-sans font-semibold text-sm py-4 rounded-lg transition-colors duration-200 mb-6"
              >
                Fyll i intresseanmälan
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="font-sans text-white/35 text-xs text-center mb-5">eller kontakta oss direkt</p>
              <div className="space-y-3">
                <a
                  href="tel:0103300440"
                  className="flex items-center justify-between border border-white/15 hover:border-white/30 rounded-lg px-5 py-4 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-brand-orange" />
                    <span className="font-sans font-medium text-white text-sm">010 330 04 40</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                </a>
                <a
                  href="mailto:info@betryggande.se"
                  className="flex items-center justify-between border border-white/15 hover:border-white/30 rounded-lg px-5 py-4 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-brand-orange" />
                    <span className="font-sans font-medium text-white text-sm">info@betryggande.se</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
                </a>
              </div>
            </div>

            <div className="bg-white border border-stroke rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-brand-blue" />
                <h3 className="font-serif text-xl text-navy">Anmäl skada</h3>
              </div>
              <p className="font-sans text-muted text-sm leading-relaxed mb-6">
                Har du ett dolt fel att anmäla? Kontakta oss så snabbt som möjligt så påbörjar vi handläggningen direkt.
              </p>
              <div className="space-y-3">
                <a href="tel:0103300440" className="flex items-center gap-3 font-sans text-sm font-medium text-muted hover:text-navy transition-colors">
                  <Phone className="w-4 h-4 text-brand-blue" />
                  010 330 04 40
                </a>
                <a href="mailto:info@betryggande.se" className="flex items-center gap-3 font-sans text-sm font-medium text-muted hover:text-navy transition-colors">
                  <Mail className="w-4 h-4 text-brand-blue" />
                  info@betryggande.se
                </a>
              </div>
            </div>

            <div className="border border-stroke rounded-xl px-5 py-4">
              <p className="font-sans text-sm font-medium text-navy">Betryggande Försäkringar i Sverige AB</p>
              <p className="font-sans text-xs text-muted mt-0.5">Org.nr: 559389-0931 · Licensierad av Finansinspektionen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
