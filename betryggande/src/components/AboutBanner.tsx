import { Phone, Mail, MapPin } from 'lucide-react'

const contactItems = [
  {
    icon: Phone,
    label: '010 330 04 40',
    href: 'tel:0103300440',
    note: 'Vardagar 08–16',
  },
  {
    icon: Mail,
    label: 'info@betryggande.se',
    href: 'mailto:info@betryggande.se',
    note: 'Vi svarar inom 24h',
  },
  {
    icon: MapPin,
    label: 'Hyllie vattenparksgata 12, 215 32 Malmö',
    href: null,
    note: 'Org.nr: 559389-0931',
  },
]

export function AboutBanner() {
  return (
    <section id="om-oss" className="py-16 lg:py-20 bg-bg border-y border-stroke">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-block font-sans text-brand-blue font-medium text-xs tracking-[0.2em] uppercase mb-4">
              Om oss
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy leading-tight mb-4">
              Fastighetsförsäkring<br />med ett personligt touch
            </h2>
            <p className="font-sans text-muted leading-relaxed">
              Betryggande Försäkringar i Sverige AB grundades 2022 med målet att samla fastighetsrelaterade försäkringar under ett tak. Vi är auktoriserade av Finansinspektionen och arbetar alltid för att ge dig den trygghet du förtjänar i din fastighetsaffär.
            </p>
          </div>

          <div className="space-y-5">
            {contactItems.map((item) => {
              const Icon = item.icon
              const inner = (
                <div className="flex items-start gap-4">
                  <Icon className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm font-medium text-navy">{item.label}</p>
                    <p className="font-sans text-xs text-muted mt-0.5">{item.note}</p>
                  </div>
                </div>
              )
              return item.href ? (
                <a key={item.label} href={item.href} className="block hover:opacity-75 transition-opacity">
                  {inner}
                </a>
              ) : (
                <div key={item.label}>{inner}</div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
