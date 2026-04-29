# Enspecta Chatbot — Design Spec
**Datum:** 2026-04-29

## Sammanfattning

En embeddad chattbot för enspecta.se som uppträder som "Erik", en erfaren besiktningsman. Svarar på frågor om besiktningar, besiktningsprotokoll och byggnadsteknik på svenska. Levereras som ett JavaScript-snippet Enspecta klistrar in på sin befintliga sajt.

---

## Arkitektur

Projektet består av två delar i mappen `enspecta-chatbot/`:

### Backend — Node.js/Express
- Endpoint: `POST /api/chat`
- Håller Claude API-nyckeln säkert i miljövariabel
- Innehåller systemprompt med kunskapsbas och persona
- Stateless — ingen databas, ingen serverlagring av konversationer
- Konversationshistorik skickas med från klienten vid varje anrop
- Deployas på Railway

### Widget — Vanilla JavaScript
- Minifierat `widget.js` utan externa beroenden
- Injicerar HTML och CSS direkt i DOM:en
- Fungerar på vilken webbplats som helst
- Embed: `<script src="https://chatbot.enspecta.se/widget.js"></script>`

---

## Persona

**Namn:** Erik  
**Roll:** Erfaren besiktningsman, 20 år i branschen  
**Ton:** Jordnära, rak, trygg — inte säljig. Ärlig om vad besiktning kan och inte kan garantera. Svarar alltid på svenska.

Exempel:
> "En överlåtelsebesiktning tar normalt 2–4 timmar beroende på husets storlek. Jag går igenom allt som är synligt och åtkomligt — tak, grund, fukt, el och ventilation. Det jag hittar hamnar i protokollet som du får direkt efteråt."

---

## Kunskapsbas (systemprompt-innehåll)

### Besiktningstyper
- Överlåtelsebesiktning (vid köp/sälj av fastighet)
- Nybyggnadsbesiktning (10-årsgaranti)
- Garantibesiktning (2-år)
- Energibesiktning

### Besiktningsprocessen
- Bokning → platsbesiktning → protokoll → genomgång
- Besiktning tar 2–4 timmar beroende på husets storlek
- Protokoll levereras inom 24 timmar

### Vad ingår
- Synliga och åtkomliga ytor
- Fuktmätning
- Ventilationskontroll
- Tak, grund, el, VVS (visuell kontroll)

### Vad ingår inte
- Ytor bakom väggar, under parkettgolv
- Ej åtkomliga utrymmen
- Dolda fel som inte är synliga eller åtkomliga

### Om Enspecta
- Certifierade besiktningsmän
- Oberoende — jobbar inte åt mäklare
- Verkar i hela Sverige

### Byggnadsteknik
- Vanliga byggskador: fukt, köldbryggor, sättningar, rötskador
- Symptomtolkning: mögellukt, färgavflagning, sprickor i puts
- Konstruktionstyper: platta på mark, krypgrund, källare — egenskaper och vanliga problem
- Ventilationssystem: F, FT, FTX — funktion och vanliga fel
- Energieffektivitet och tilläggsisolering
- Klassificering: akut vs. övervakansvärt vs. normalt slitage

### Fallback-beteende
- Om frågan kräver besiktning på plats: förklara varför och erbjud bokning
- Om frågan är utanför kunskapsbasen: hänvisa till kontakt (telefon/mail)
- Avsluta naturligt med bokningserbjudande när det passar

---

## Widget — UI

- Flytande cirkelknapp nere till höger (Enspecta-färger)
- Chattfönster öppnas uppåt med header: "Erik — Besiktningsmannen"
- Välkomstmeddelande visas direkt vid öppning
- Tre snabbvalsknappar vid start:
  - "Vad kostar en besiktning?"
  - "Hur går det till?"
  - "Boka besiktning"
- Typindikator (tre punkter) medan svar genereras
- Inline bokningsknapp/-länk visas i chatten vid relevanta svar

---

## Tekniska detaljer

| Parameter | Värde |
|---|---|
| Modell | `claude-haiku-4-5-20251001` |
| Max historik till API | 10 meddelanden |
| Historiklagring | `sessionStorage` (försvinner vid stängd flik) |
| Rate limiting | 20 meddelanden / IP / timme |
| CORS | Begränsad till `enspecta.se` i produktion |
| Språk | Svenska |

---

## Projektstruktur

```
enspecta-chatbot/
  backend/
    index.js          # Express-server, /api/chat endpoint
    knowledge.js      # Kunskapsbas och systemprompt
    .env.example      # ANTHROPIC_API_KEY, PORT, ALLOWED_ORIGIN
  widget/
    src/
      index.js        # Widget-källkod (vanilla JS)
      styles.js       # CSS injekteras via JS
    dist/
      widget.js       # Minifierad output
  package.json
  railway.json
```

---

## Deployment

- Backend deployas på Railway (samma setup som `enspecta-outreach`)
- Widget-filen serveras som statisk fil från samma Railway-app
- Enspecta klistrar in ett enda `<script>`-tag på sin sajt
- Miljövariabler: `ANTHROPIC_API_KEY`, `PORT`, `ALLOWED_ORIGIN`

---

## Ej inkluderat (YAGNI)

- Konversationsloggning / analytics (kan läggas till senare)
- Flerspråksstöd
- Admin-panel för att redigera kunskapsbasen
- Autentisering av slutanvändare
- Integrering med CRM
