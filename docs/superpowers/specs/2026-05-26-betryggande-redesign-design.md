# Betryggande.se — Redesign Spec

## Overview

Redesign av betryggande.se, hemsida för Betryggande Försäkringar i Sverige AB — ett FI-licensierat försäkringsbolag i Malmö (grundat 2022) som säljer dolda fel-försäkringar för fastighetsaffärer. Projektet är en **ren redesign** av befintlig React + TypeScript + Vite-kodbas. Ingen ny funktionalitet tillkommer — samma sektioner behålls med ny visuell design.

**Designriktning:** Skandinavisk Editorial — trygg, professionell, avskalad. Inspirerat av nordiska banker och premium-försäkringsbolag. Typografin bär designen, inte dekorativa element.

---

## Design System

### Typografi

| Roll | Typsnitt | Vikt |
|------|----------|------|
| H1–H3, display-siffror | DM Serif Display | 400 (regular) |
| Brödtext, UI, labels | Instrument Sans | 400, 500, 600 |

Google Fonts import i `index.html`:
```
DM Serif Display: 400
Instrument Sans: 400, 500, 600
```

### Färgpalett

| Token | Hex | Användning |
|-------|-----|------------|
| `navy` | `#0B2545` | Hero-bakgrund, footer, primary headings |
| `brand-blue` | `#006AA7` | Befintlig varumärkesfärg — ikoner, links, accent |
| `orange` | `#E8640C` | CTA-knappar, highlights |
| `orange-dark` | `#C4510A` | Hover-state för orange |
| `bg` | `#FAFAF8` | Varm off-white, sections background |
| `bg-alt` | `#F5F5F2` | Alternativ section-bakgrund |
| `text` | `#1A1A2E` | Primär text |
| `muted` | `#6B7280` | Sekundär text |
| `border` | `#E5E5E1` | Subtila kanter |

### Spacing & Känsla

- 8px grid
- Sektionspadding: `py-28 lg:py-36`
- Inga rundade blob-former, inga generiska gradients
- Dividers: tunna raka linjer (`border-b border-border`)
- CTA-knappar: rektangulära med lätt avrundning (`rounded-lg`), inte pill-formade
- Inga wave-SVGs i sektionsövergångar — raka kanter

---

## Komponenter

### Navbar

- Transparent när hero är synlig, övergår till vit med `box-shadow` vid scroll (befintlig logik behålls)
- Logotyp: "Betryggande" i DM Serif Display, "Försäkringar" i Instrument Sans small caps nedanför
- Navigeringslänkar: Instrument Sans 500, slate-600 på vit bakgrund
- CTA-knapp: orange bakgrund, vit text, `rounded-lg` (ej pill)
- Mobilmeny: vit bakgrund, enkel lista

### Hero

- Solid `#0B2545` bakgrund — ingen gradient
- H1 i DM Serif Display (~64–72px desktop), radbruten för typografisk effekt: `"Trygg fastighets­affär –"` + ny rad `"varje gång."`
- Ingress: Instrument Sans 400, `text-white/70`, max-width 520px
- Trust-signaler: tre inline-siffror/fakta (`2022 · FI-Licensierat · Malmö`) i stället för checkmark-lista
- CTA-knappar: primär orange + sekundär ghost med vit border
- Höger kolumn (desktop): vit "trust card" med en subtil entry-animation (fade-in + translateY)
- Trust card innehåll: företagsnamn, de två prisplanerna, tre stats-siffror
- Botten: rak horisontell kant mot nästa sektion (ej wave-SVG)
- Telefonnummer behålls som sekundär kontaktlänk

### Features (Varför Betryggande)

- Bakgrund: `#FAFAF8`
- Sektion-rubrik i DM Serif Display
- 6 kort i `sm:grid-cols-2 lg:grid-cols-3`
- Kort: vit bakgrund, `border border-border`, `rounded-xl`, padding `p-6`
- Ikoner: brand-blue linjeikon utan färgad bakgrund
- Ingen `hover:-translate-y` — subtilt `hover:shadow-md` räcker

### Hur det fungerar

- Bakgrund: `#F5F5F2`
- Steg representeras av stora typografiska siffror (`01`, `02`, `03`, `04`) i DM Serif Display, ~80px, `text-brand-blue/20` som bakgrundselement
- Ovanpå: ikon, titel, beskrivning
- Desktop: 4-kolumns grid med tunn `border-r border-border` mellan stegen (ej sista)
- Ingen connecting-line SVG

### Priser

- Bakgrund: vit
- Sektion-rubrik i DM Serif Display
- 2 kort i `lg:grid-cols-2`, max-width 4xl, centrerade
- **Standard-kort**: vit bakgrund, `border border-border`, `rounded-2xl`
  - Pristabell: ren tabell-stil med `border-b border-border` per rad
  - CTA: brand-blue bakgrund
- **Plus-kort**: `#0B2545` bakgrund, vit text, `rounded-2xl`
  - "Rekommenderas"-badge: orange, positionerad top-right
  - CTA: orange bakgrund
  - Siffror i pristabell: DM Serif Display

### AboutBanner

- Tunn sektionsbrytning, max 2 kolumner
- Vänster: rubrik + 2–3 meningar om företaget
- Höger: kontaktinfo (telefon, e-post, adress)
- Bakgrund: `#FAFAF8`

### Contact

- Enkel sektion med kontaktformulär (namn, e-post, meddelande, skicka-knapp)
- Orange CTA-knapp
- Bakgrund: vit

### Footer

- Bakgrund: `#0B2545`
- Vit text, `text-white/60` för sekundär text
- 3 kolumner: logotyp + tagline | navigering | kontakt
- Nederkant: copyright i Instrument Sans, `text-white/40`

---

## Implementationsordning

1. Uppdatera `tailwind.config.js` — lägg till nya tokens (`navy`, `bg`, `bg-alt`, `border`, uppdatera `orange`)
2. Uppdatera `index.css` / `index.html` — Google Fonts import, font-family tokens
3. Komponent för komponent i denna ordning:
   - Navbar
   - Hero
   - Features
   - HowItWorks
   - Pricing
   - AboutBanner
   - Contact
   - Footer

---

## Tekniska krav

- Befintlig React + TypeScript + Vite-setup används oförändrad
- Tailwind CSS v3 (befintligt)
- Lucide React för ikoner (befintligt)
- Inga nya npm-paket utöver vad som redan finns
- Responsiv: mobile-first, breakpoints `sm` (640px), `lg` (1024px)
- Tillgänglighet: semantisk HTML, `aria-label` på knappar utan text, kontrast ≥ 4.5:1

---

## Vad som INTE ingår

- Ny funktionalitet (formulärlogik, backend-integration)
- Ny routing eller fler sidor
- Animationsbibliotek (Motion/Framer) — CSS-transitions räcker
- Nya bilder/media utöver befintliga assets
