import { Check, X } from 'lucide-react'
import { cn } from '../lib/utils'

const tiers = [
  {
    name: 'Standard',
    description: 'Grundläggande skydd för de flesta fastigheter.',
    highlight: false,
    prices: [
      { coverage: '750 000 kr', premium: '7 690 kr' },
      { coverage: '1 000 000 kr', premium: '7 900 kr' },
      { coverage: '1 500 000 kr', premium: '8 900 kr' },
      { coverage: '2 000 000 kr', premium: '9 900 kr' },
    ],
    features: [
      { text: 'Dolda fel-ersättning', included: true },
      { text: 'Gäller säljare & köpare', included: true },
      { text: 'Snabb skadehantering', included: true },
      { text: 'Personlig rådgivning', included: true },
      { text: 'Riskkonstruktioner täcks', included: false },
    ],
  },
  {
    name: 'Plus',
    description: 'Utökat skydd som även täcker riskkonstruktioner.',
    highlight: true,
    prices: [
      { coverage: '750 000 kr', premium: '8 690 kr' },
      { coverage: '1 000 000 kr', premium: '8 900 kr' },
      { coverage: '1 500 000 kr', premium: '9 900 kr' },
      { coverage: '2 000 000 kr', premium: '10 900 kr' },
    ],
    features: [
      { text: 'Dolda fel-ersättning', included: true },
      { text: 'Gäller säljare & köpare', included: true },
      { text: 'Snabb skadehantering', included: true },
      { text: 'Personlig rådgivning', included: true },
      { text: 'Riskkonstruktioner täcks', included: true },
    ],
  },
]

export function Pricing() {
  return (
    <section id="priser" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="inline-block font-sans text-brand-blue font-medium text-xs tracking-[0.2em] uppercase mb-4">
            Priser & täckning
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-navy leading-tight mb-4">
            Välj rätt skyddsnivå
          </h2>
          <p className="font-sans text-muted text-lg leading-relaxed">
            Alla priser är engångspremier. Välj täckningsbelopp utifrån fastighetens värde och ditt behov.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                'relative rounded-2xl overflow-hidden',
                tier.highlight ? 'bg-navy' : 'bg-white border border-stroke'
              )}
            >
              {tier.highlight && (
                <div className="absolute top-6 right-6 bg-brand-orange text-white font-sans text-xs font-semibold px-3 py-1.5">
                  Rekommenderas
                </div>
              )}

              <div className="p-8">
                <h3 className={cn('font-serif text-2xl mb-1', tier.highlight ? 'text-white' : 'text-navy')}>
                  {tier.name}
                </h3>
                <p className={cn('font-sans text-sm mb-8', tier.highlight ? 'text-white/55' : 'text-muted')}>
                  {tier.description}
                </p>

                <div className={cn(
                  'rounded-lg overflow-hidden mb-8',
                  tier.highlight ? 'border border-white/15' : 'border border-stroke'
                )}>
                  <div className={cn(
                    'grid grid-cols-2 font-sans text-xs font-semibold tracking-widest uppercase px-5 py-3',
                    tier.highlight ? 'text-white/35 border-b border-white/10' : 'text-muted border-b border-stroke'
                  )}>
                    <span>Täckning</span>
                    <span className="text-right">Premie</span>
                  </div>
                  {tier.prices.map((price, i) => (
                    <div
                      key={price.coverage}
                      className={cn(
                        'grid grid-cols-2 px-5 py-3',
                        i < tier.prices.length - 1
                          ? tier.highlight ? 'border-b border-white/10' : 'border-b border-stroke'
                          : ''
                      )}
                    >
                      <span className={cn('font-sans text-sm', tier.highlight ? 'text-white/65' : 'text-muted')}>
                        {price.coverage}
                      </span>
                      <span className={cn('font-serif text-right text-base', tier.highlight ? 'text-white' : 'text-navy')}>
                        {price.premium}
                      </span>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature.text} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className={cn('w-4 h-4 flex-shrink-0', tier.highlight ? 'text-brand-orange' : 'text-brand-blue')} />
                      ) : (
                        <X className={cn('w-4 h-4 flex-shrink-0', tier.highlight ? 'text-white/20' : 'text-stroke')} />
                      )}
                      <span className={cn(
                        'font-sans text-sm',
                        feature.included
                          ? tier.highlight ? 'text-white/85' : 'text-navy'
                          : tier.highlight ? 'text-white/30 line-through' : 'text-muted line-through'
                      )}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#teckna"
                  className={cn(
                    'block text-center font-sans font-semibold py-3.5 rounded-lg transition-colors duration-200',
                    tier.highlight
                      ? 'bg-brand-orange hover:bg-brand-orange-dark text-white'
                      : 'bg-brand-blue hover:bg-brand-blue-dark text-white'
                  )}
                >
                  Välj {tier.name}
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center font-sans text-muted text-sm mt-8">
          Kräver godkänd besiktning (max 1 år gammal). Kontakta oss för skräddarsydda offerter.
        </p>
      </div>
    </section>
  )
}
