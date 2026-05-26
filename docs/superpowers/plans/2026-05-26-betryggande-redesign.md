# Betryggande.se Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing generic design with a Skandinavisk Editorial redesign — DM Serif Display headings, Instrument Sans body, deep navy hero, warm off-white sections, orange CTAs — while keeping all content from the live betryggande.se.

**Architecture:** Pure visual redesign of 8 existing React components + design token update. No new files created, no routing changes, no functionality added. Each task is self-contained and independently committable.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, Lucide React

---

## File Map

| File | Action | What changes |
|------|--------|--------------|
| `betryggande/tailwind.config.js` | Modify | New color tokens (navy, stroke, bg, bg-alt), updated orange, new font families, new keyframe |
| `betryggande/index.html` | Modify | Replace Inter with DM Serif Display + Instrument Sans Google Fonts |
| `betryggande/src/index.css` | Modify | Update font-family, background, color defaults |
| `betryggande/src/components/Navbar.tsx` | Modify | Serif logo, rounded-lg CTA, clean nav links |
| `betryggande/src/components/Hero.tsx` | Modify | Solid navy bg, serif H1, inline trust signals, clean trust card, no wave |
| `betryggande/src/components/Features.tsx` | Modify | off-white bg, serif headings, stroke-border cards, live site content |
| `betryggande/src/components/HowItWorks.tsx` | Modify | bg-alt bg, big typographic step numbers, border dividers |
| `betryggande/src/components/Pricing.tsx` | Modify | Navy Plus card, stroke-border Standard card, serif price numbers |
| `betryggande/src/components/AboutBanner.tsx` | Modify | off-white bg, serif heading, contact items with icons |
| `betryggande/src/components/Contact.tsx` | Modify | `bg-bg-alt` bg (intentional deviation from spec's "white" — better section rhythm), navy Teckna card, clean contact cards. No form (live site has no form either; spec's form mention was aspirational) |
| `betryggande/src/components/Footer.tsx` | Modify | Navy bg, serif logo, legal links from live site |

---

## Task 1: Design Tokens & Fonts

**Files:**
- Modify: `betryggande/tailwind.config.js`
- Modify: `betryggande/index.html`
- Modify: `betryggande/src/index.css`

- [ ] **Step 1: Update tailwind.config.js**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B2545',
        stroke: '#E5E5E1',
        bg: '#FAFAF8',
        'bg-alt': '#F5F5F2',
        muted: '#6B7280',
        brand: {
          blue: '#006AA7',
          'blue-dark': '#005589',
          'blue-light': '#E6F3FA',
          orange: '#E8640C',
          'orange-dark': '#C4510A',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'trust-card': 'trustCard 0.6s ease-out 0.2s both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        trustCard: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Update index.html — swap fonts**

Replace the Inter `<link>` tag:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
```
With:
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
```

- [ ] **Step 3: Update src/index.css**

Replace the body block:
```css
body {
  margin: 0;
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;
  color: #1a1a2e;
}
```
With:
```css
body {
  margin: 0;
  font-family: 'Instrument Sans', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #FAFAF8;
  color: #1A1A2E;
}
```

Also remove the scrollbar thumb color change (optional polish — update to navy):
```css
::-webkit-scrollbar-thumb {
  background: #0B2545;
  border-radius: 3px;
}
```

- [ ] **Step 4: Verify build passes**

```bash
cd betryggande && npm run build
```
Expected: Build completes with no TypeScript errors. (Font may not load in build output — that's fine, it loads at runtime via CDN.)

- [ ] **Step 5: Commit**

```bash
cd betryggande
git add tailwind.config.js index.html src/index.css
git commit -m "feat: add editorial design tokens and swap fonts to DM Serif Display + Instrument Sans"
```

---

## Task 2: Navbar

**Files:**
- Modify: `betryggande/src/components/Navbar.tsx`

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
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
            aria-label="Öppna meny"
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/Navbar.tsx && git commit -m "feat: redesign Navbar with serif logo and editorial styling"
```

---

## Task 3: Hero

**Files:**
- Modify: `betryggande/src/components/Hero.tsx`

- [ ] **Step 1: Replace Hero.tsx**

```tsx
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/Hero.tsx && git commit -m "feat: redesign Hero with solid navy background and editorial typography"
```

---

## Task 4: Features

**Files:**
- Modify: `betryggande/src/components/Features.tsx`

- [ ] **Step 1: Replace Features.tsx**

```tsx
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
        {/* Section header — left-aligned for editorial feel */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/Features.tsx && git commit -m "feat: redesign Features with stroke-border cards and live site content"
```

---

## Task 5: HowItWorks

**Files:**
- Modify: `betryggande/src/components/HowItWorks.tsx`

- [ ] **Step 1: Replace HowItWorks.tsx**

```tsx
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
        {/* Section header */}
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

        {/* Steps grid */}
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
                {/* Icon with big number behind */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/HowItWorks.tsx && git commit -m "feat: redesign HowItWorks with typographic step numbers and border dividers"
```

---

## Task 6: Pricing

**Files:**
- Modify: `betryggande/src/components/Pricing.tsx`

- [ ] **Step 1: Replace Pricing.tsx**

```tsx
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
        {/* Section header */}
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
              {/* Rekommenderas badge */}
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

                {/* Price table */}
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

                {/* Feature list */}
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

                {/* CTA — intentional inversion: navy card gets orange CTA, white card gets brand-blue CTA */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/Pricing.tsx && git commit -m "feat: redesign Pricing with navy Plus card and serif price numbers"
```

---

## Task 7: AboutBanner

**Files:**
- Modify: `betryggande/src/components/AboutBanner.tsx`

- [ ] **Step 1: Replace AboutBanner.tsx**

```tsx
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
          {/* Left */}
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

          {/* Right — contact */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/AboutBanner.tsx && git commit -m "feat: redesign AboutBanner as editorial about+contact section"
```

---

## Task 8: Contact

**Files:**
- Modify: `betryggande/src/components/Contact.tsx`

- [ ] **Step 1: Replace Contact.tsx**

```tsx
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
          {/* Left */}
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

          {/* Right */}
          <div className="space-y-5">
            {/* Teckna card */}
            <div id="teckna" className="bg-navy rounded-2xl p-8">
              <h3 className="font-serif text-2xl text-white mb-2">Teckna försäkring</h3>
              <p className="font-sans text-white/55 text-sm leading-relaxed mb-8">
                Ring oss eller skicka ett mail så hjälper vi dig teckna rätt försäkring för din fastighetsaffär.
              </p>
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

            {/* Anmäl skada card */}
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

            {/* Org info */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
cd betryggande && git add src/components/Contact.tsx && git commit -m "feat: redesign Contact with navy Teckna card and clean contact items"
```

---

## Task 9: Footer

**Files:**
- Modify: `betryggande/src/components/Footer.tsx`

- [ ] **Step 1: Replace Footer.tsx**

```tsx
import { Phone, Mail, MapPin } from 'lucide-react'

const links = {
  Tjänster: [
    { label: 'Standard försäkring', href: '#priser' },
    { label: 'Plus försäkring', href: '#priser' },
    { label: 'Anmäl skada', href: '#kontakt' },
    { label: 'Teckna försäkring', href: '#teckna' },
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
          {/* Brand column */}
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

          {/* Link columns */}
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

        {/* Bottom bar */}
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
```

- [ ] **Step 2: Verify build**

```bash
cd betryggande && npm run build
```
Expected: no errors.

- [ ] **Step 3: Final full build check**

```bash
cd betryggande && npm run build
```
Expected: clean build, no warnings about undefined classes or missing tokens.

- [ ] **Step 4: Commit**

```bash
cd betryggande && git add src/components/Footer.tsx && git commit -m "feat: redesign Footer with navy background and legal links from live site"
```

---

## Notes for implementors

- **No test setup exists** in this project — TDD is adapted to: write component → `npm run build` → fix TypeScript errors → commit.
- **Font loading**: Google Fonts load at runtime via CDN. `npm run build` will succeed even if fonts aren't visible in a headless build check.
- **`bg-bg` classname**: Tailwind will generate `bg-bg` from the `bg: '#FAFAF8'` color token. This is valid Tailwind v3 syntax.
- **`text-muted` classname**: Generated from `muted: '#6B7280'` token. Same pattern.
- **Old tailwind classes** (`bg-hero-gradient`, `shadow-card`, `shadow-orange`, `brand-orange-light`) are removed from the config in Task 1. If the build fails with "unknown class" errors, check that no old component still references these — they should all be replaced by Task 9.
