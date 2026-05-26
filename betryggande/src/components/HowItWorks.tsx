import { ClipboardList, FileCheck, ShieldCheck, Handshake } from 'lucide-react'

const steps = [
  {
    step: '01',
    icon: ClipboardList,
    title: 'Beställ besiktning',
    description: 'Se till att fastigheten är besiktigad av en godkänd besiktningsman. Besiktningen får inte vara äldre än ett år.',
  },
  {
    step: '02',
    icon: FileCheck,
    title: 'Välj försäkring',
    description: 'Välj Standard eller Plus beroende på fastighetens konstruktion och ditt behov av skydd.',
  },
  {
    step: '03',
    icon: ShieldCheck,
    title: 'Teckna direkt',
    description: 'Teckna din försäkring enkelt online eller via telefon. Vi guidar dig genom processen.',
  },
  {
    step: '04',
    icon: Handshake,
    title: 'Trygg affär',
    description: 'Nu är du skyddad. Skulle ett dolt fel uppstå anmäler du enkelt skadan till oss – vi tar hand om resten.',
  },
]

export function HowItWorks() {
  return (
    <section id="hur-det-fungerar" className="py-28 lg:py-36 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block font-sans text-brand-blue font-medium text-xs tracking-[0.2em] uppercase mb-4">
            Hur det fungerar
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-navy leading-tight mb-4">
            Fyra enkla steg
          </h2>
          <p className="font-sans text-muted text-lg leading-relaxed">
            Från besiktning till trygg fastighetsaffär – vi gör det enkelt för dig.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isLast = index === steps.length - 1
            return (
              <div
                key={step.step}
                className={`flex flex-col items-center text-center px-6 py-8 lg:py-0 ${
                  !isLast
                    ? 'border-b border-stroke lg:border-b-0 lg:border-r lg:border-stroke'
                    : ''
                }`}
              >
                <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                  <span className="font-serif text-[80px] leading-none text-brand-blue/10 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    {step.step}
                  </span>
                  <Icon className="relative z-10 w-7 h-7 text-brand-blue" />
                </div>
                <h3 className="font-serif text-xl text-navy mb-2">{step.title}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
