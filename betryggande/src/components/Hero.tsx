import { ArrowRight, Phone } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-navy overflow-hidden flex items-center">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text content */}
          <div className="animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
              <span className="font-sans text-white/80 text-xs font-medium tracking-[0.2em] uppercase">
                Dolda fel-försäkring
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[68px] text-white leading-[1.08] tracking-tight mb-6">
              Betryggande<br />
              dolda fel&shy;försäkring
            </h1>

            <p className="font-sans text-lg text-white/65 leading-relaxed mb-8 max-w-lg">
              Ska du sälja eller köpa ett hus? Säkerställ en betryggande överlåtelse med Betryggande dolda fel&shy;försäkring!
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-4 mb-10 font-sans text-sm text-white/45">
              <span>Grundat 2022</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span>FI-Licensierat</span>
              <span className="w-1 h-1 rounded-full bg-white/25" />
              <span>Malmö</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#teckna"
                className="inline-flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white font-sans font-semibold px-7 py-4 rounded-lg transition-colors duration-200 text-base"
              >
                Teckna försäkring
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#forsakringar"
                className="inline-flex items-center gap-2 border border-white/25 text-white font-sans font-semibold px-7 py-4 rounded-lg hover:bg-white/5 transition-colors duration-200 text-base"
              >
                Läs mer
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 mt-10 pt-8 border-t border-white/10">
              <Phone className="w-4 h-4 text-white/35 flex-shrink-0" />
              <div>
                <p className="font-sans text-white/40 text-xs">Ring oss vardagar 08–16</p>
                <a
                  href="tel:0103300440"
                  className="font-sans text-white font-semibold text-base hover:text-brand-orange transition-colors"
                >
                  010 330 04 40
                </a>
              </div>
            </div>
          </div>

          {/* Right — trust card */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="bg-white rounded-2xl p-8 w-[340px] shadow-2xl animate-trust-card">
              <div className="mb-6">
                <p className="font-serif text-xl text-navy mb-0.5">Betryggande</p>
                <p className="font-sans text-xs text-muted tracking-[0.2em] uppercase">
                  Försäkringar i Sverige AB
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  { label: 'Standard', price: 'från 7 690 kr' },
                  { label: 'Plus', price: 'från 8 690 kr' },
                ].map((plan) => (
                  <div
                    key={plan.label}
                    className="flex items-center justify-between border border-stroke rounded-lg px-4 py-3"
                  >
                    <p className="font-sans font-medium text-sm text-navy">{plan.label}</p>
                    <p className="font-serif text-navy text-sm">{plan.price}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center pt-5 border-t border-stroke">
                {[
                  { value: '2022', label: 'Grundat' },
                  { value: 'FI', label: 'Licensierat' },
                  { value: 'Malmö', label: 'Kontor' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-navy text-xl">{stat.value}</p>
                    <p className="font-sans text-muted text-xs mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
