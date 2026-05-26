import { Home, ShoppingBag, AlertCircle, FileSearch, HeartHandshake, Award } from 'lucide-react'

const features = [
  {
    icon: Home,
    title: 'Sälja',
    description: 'Säkerställ en smidig och betryggande fastighetsförsäljning med hjälp av Betryggande Dolda Fel, skydda dig mot framtida anspråk.',
  },
  {
    icon: ShoppingBag,
    title: 'Köpa',
    description: 'Förvärva din drömfastighet med förtroende, upptäck fördelarna med Betryggande Dolda Fel försäkring som skyddar dig mot dolda fel efter köpet.',
  },
  {
    icon: AlertCircle,
    title: 'Anmäl skada',
    description: 'Har du uppdag­at ett dolt fel? Kontakta oss så snabbt som möjligt så påbörjar vi handläggningen direkt.',
  },
  {
    icon: FileSearch,
    title: 'Besiktningsbaserat',
    description: 'Försäkringen baseras på en godkänd besiktning (max 1 år gammal), vilket ger en trygg och rättvis bedömning.',
  },
  {
    icon: HeartHandshake,
    title: 'Personlig service',
    description: 'Varje fastighet är unik och vi behandlar varje kund individuellt. Ring oss så hittar vi rätt lösning för dig.',
  },
  {
    icon: Award,
    title: 'Licensierade experter',
    description: 'Vi är auktoriserade av Finansinspektionen för försäkringsdistribution och arbetar alltid i ditt intresse.',
  },
]

export function Features() {
  return (
    <section id="forsakringar" className="py-28 lg:py-36 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-16">
          <span className="inline-block font-sans text-brand-blue font-medium text-xs tracking-[0.2em] uppercase mb-4">
            Varför Betryggande
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-navy leading-tight mb-4">
            Skydd du<br />kan lita på
          </h2>
          <p className="font-sans text-muted text-lg leading-relaxed">
            Fastighetsrelaterade försäkringar med skräddarsydda lösningar för varje unik situation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-white border border-stroke rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="mb-5">
                  <Icon className="w-5 h-5 text-brand-blue" />
                </div>
                <h3 className="font-serif text-xl text-navy mb-2">{feature.title}</h3>
                <p className="font-sans text-muted text-sm leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
