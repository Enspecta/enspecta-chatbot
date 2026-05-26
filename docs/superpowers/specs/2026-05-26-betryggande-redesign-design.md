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
| `stroke` | `#E5E5E1` | Subtila kanter (namnges `stroke` för att undvika konflikt med Tailwinds inbyggda `border`-utility) |

### Spacing & Känsla

- 8px grid
- Sektionspadding: `py-28 lg:py-36`
- Inga rundade blob-former, inga generiska gradients
- Dividers: tunna raka linjer (`border border-stroke`)
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
- Höger kolumn (desktop): vit "trust card" med en subtil entry-animation: `opacity 0→1` + `translateY(16px)→0`, duration 600ms, delay 200ms, easing `ease-out`, implementeras med Tailwind `animate-fade-up` eller inline CSS
- Trust card innehåll: företagsnamn ("Betryggande"), de två prisplanerna (Standard från 7 690 kr / Plus från 8 690 kr), tre stats-siffror: `2022` (Grundat) · `FI` (Licensierat) · `Malmö` (Kontor)
- Botten: rak horisontell kant mot nästa sektion (ej wave-SVG)
- Telefonnummer behålls som sekundär kontaktlänk

### Features (Varför Betryggande)

- Bakgrund: `#FAFAF8`
- Sektion-rubrik i DM Serif Display
- 6 kort i `sm:grid-cols-2 lg:grid-cols-3`
- Kort: vit bakgrund, `border border-stroke`, `rounded-xl`, padding `p-6`
- Ikoner: brand-blue linjeikon utan färgad bakgrund
- Ingen `hover:-translate-y` — subtilt `hover:shadow-md` räcker

### Hur det fungerar

- Bakgrund: `#F5F5F2`
- Steg representeras av stora typografiska siffror (`01`, `02`, `03`, `04`) i DM Serif Display, ~80px, `text-brand-blue/20` som bakgrundselement
- Ovanpå: ikon, titel, beskrivning
- Desktop (`lg`): 4-kolumns grid med tunn `border-r border-stroke` mellan stegen (ej sista)
- Mobil (`< lg`): 1-kolumns stack, `border-b border-stroke` under varje steg (ej sista), centrerad text
- Ingen connecting-line SVG

### Priser

- Bakgrund: vit
- Sektion-rubrik i DM Serif Display
- 2 kort i `lg:grid-cols-2`, max-width 4xl, centrerade
- **Standard-kort**: vit bakgrund, `border border-stroke`, `rounded-2xl`
  - Pristabell: ren tabell-stil med `border-b border-stroke` per rad
  - CTA: brand-blue bakgrund, vit text
- **Plus-kort**: `#0B2545` (navy) bakgrund, vit text, `rounded-2xl`
  - "Rekommenderas"-badge: orange, positionerad top-right
  - CTA: orange bakgrund, vit text — **intentionell inversion**: navy-kortet får orange CTA för kontrast mot den mörka bakgrunden; vit-kortet får brand-blue CTA för kontrast mot ljus bakgrund
  - Siffror i pristabell: DM Serif Display

### AboutBanner

- Reducerad padding: `py-16 lg:py-20` (jämfört med standardsektionens `py-28 lg:py-36`) — fungerar som en visuell andningspaus
- 2-kolumns grid (`lg:grid-cols-2`), stacker till 1-kolumn på mobil
- Vänster: rubrik i DM Serif Display + 2–3 meningar om företaget
- Höger: kontaktinfo (telefon, e-post, adress) med Lucide-ikoner
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

1. Uppdatera `tailwind.config.js` — lägg till nya tokens (`navy`, `bg`, `bg-alt`, `stroke`, uppdatera `orange`)
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

## Verkligt innehåll (från www.betryggande.se)

Allt innehåll i komponenter ska matcha den nuvarande live-siten:

**Kontaktuppgifter**
- Telefon: 010 330 04 40 (vardagar 08–16)
- E-post: info@betryggande.se
- Adress: Hyllie vattenparksgata 12, 215 32 Malmö
- Org.nr: 559389-0931

**Hero**
- Rubrik: "Betryggande dolda fel­försäkring"
- Ingress: "Ska du sälja eller köpa ett hus? Säkerställ en betryggande överlåtelse med Betryggande dolda fel­försäkring!"

**Kärnvärden / Features**
Tre primära: Sälja ("Säkerställ en smidig och betryggande fastighetsförsäljning med hjälp av Betryggande Dolda Fel, skydda dig mot framtida anspråk."), Köpa ("Förvärva din drömfastighet med förtroende, upptäck fördelarna med Betryggande Dolda Fel försäkring som skyddar dig mot dolda fel efter köpet."), Anmäl skada ("Har du uppdag­at ett dolt fel? Klicka på 'anmäl' och fyll i formuläret."). Övriga tre features (besiktningsbaserat, personlig service, licensierade experter) behålls från befintlig kod.

**Footer-länkar**
- Integritetspolicy (GDPR)
- Förköpsinformation
- Allmänna villkor
- Regulatoriska medlemskap: Finansinspektionen, Tydliga, InsureSec

**Priser** — behålls från befintlig kod (Standard från 7 690 kr, Plus från 8 690 kr)

---

## Vad som INTE ingår

- Ny funktionalitet (formulärlogik, backend-integration)
- Ny routing eller fler sidor
- Animationsbibliotek (Motion/Framer) — CSS-transitions räcker
- Nya bilder/media utöver befintliga assets
