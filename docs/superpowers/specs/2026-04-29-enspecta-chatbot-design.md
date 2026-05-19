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
- Innehåller systemprompt med kunskapsbas och persona (i `knowledge.js`)
- Stateless — ingen databas, ingen serverlagring av konversationer
- Konversationshistorik skickas med från klienten vid varje anrop
- Deployas på Railway (en instans — in-memory rate limiting är tillräckligt)

### Widget — Vanilla JavaScript
- Minifierat `widget.js` utan externa beroenden
- Injicerar HTML och CSS direkt i DOM:en med prefixade CSS-klasser (`enspecta-chat-*`) för att undvika stilkonflikter — ingen shadow DOM
- Fungerar på vilken webbplats som helst
- Embed: `<script src="https://chatbot.enspecta.se/widget.js"></script>`

### Widget-konfiguration
Kontaktuppgifter och boknings-URL definieras i ett konfig-objekt i widgetens källkod som sätts vid build-tid. Samma värden används i felmeddelanden och snabbvalslänkar:
```js
const CONFIG = {
  bookingUrl: 'https://enspecta.se/boka',
  phone: '010-XXX XX XX',       // ersätts med riktiga värden
  email: 'info@enspecta.se',
  apiUrl: 'https://chatbot.enspecta.se/api/chat',
}
```

---

## API-kontrakt

### `POST /api/chat`

**Headers (obligatoriska):**
- `Content-Type: application/json`

**Request body:**
```json
{
  "message": "Vad kostar en överlåtelsebesiktning?",
  "history": [
    { "role": "user", "content": "Hej!" },
    { "role": "assistant", "content": "Hej! Hur kan jag hjälpa dig?" }
  ]
}
```
- `message`: string, obligatorisk, max 1000 tecken
- `history`: array av `{ role: "user" | "assistant", content: string }`, valfritt, max 10 objekt
- Backenden trunkerar tyst `history` till de senaste 10 objekten om fler skickas — ingen 400 för detta

**Response (200):**
```json
{
  "reply": "En överlåtelsebesiktning kostar vanligtvis..."
}
```

**Response (400 — ogiltig request):**
```json
{
  "error": "Ogiltig förfrågan. Kontrollera att message är ifyllt och max 1000 tecken."
}
```
Triggas av: saknad `message`, `message` > 1000 tecken, `history` ej array.

**Response (429 — rate limit):**
```json
{
  "error": "För många frågor. Vänta lite och försök igen."
}
```

**Response (500 — serverfel):**
```json
{
  "error": "Något gick fel. Försök igen eller kontakta oss direkt."
}
```

---

## Persona

**Namn:** Aida  
**Roll:** Erfaren besiktningsman, 20 år i branschen  
**Ton:** Jordnära, rak, trygg — inte säljig. Ärlig om vad besiktning kan och inte kan garantera. Svarar alltid på svenska.

### Välkomstmeddelande
> "Hej! Jag är Aida, besiktningsman hos Enspecta. Jag kan svara på frågor om besiktningar, besiktningsprotokoll och byggnadsteknik. Vad kan jag hjälpa dig med?"

### Exempel på ton
> "En överlåtelsebesiktning tar normalt 2–4 timmar beroende på husets storlek. Jag går igenom allt som är synligt och åtkomligt — tak, grund, fukt, el och ventilation. Det jag hittar hamnar i protokollet som du får direkt efteråt."

---

## Systemprompt-skelett (`knowledge.js`)

```
Du är Aida, en erfaren besiktningsman med 20 år i branschen som arbetar för Enspecta.
Du svarar alltid på svenska, kortfattat och konkret.
Du är jordnära och trygg — inte säljig.
Du är ärlig om vad besiktning kan och inte kan garantera.

När en fråga kräver besiktning på plats för ett säkert svar, säg det tydligt
och erbjud bokning: "För att ge ett säkert svar behöver jag titta på det på plats.
Vill du boka en besiktning? [Boka här](https://enspecta.se/boka)"

Inkludera aldrig externa länkar i dina svar — enbart enspecta.se-URL:er.
Om du inte kan svara, hänvisa till: info@enspecta.se eller 010-XXX XX XX.

=== OM ENSPECTA ===
Certifierade och oberoende besiktningsmän. Verkar i hela Sverige.
Jobbar inte åt mäklare — alltid på köparens/ägarens sida.

=== BESIKTNINGSTYPER ===
- Överlåtelsebesiktning: genomförs vid köp/sälj. 2–4h, protokoll inom 24h.
- Nybyggnadsbesiktning: vid slutbesiktning, kopplat till 10-årsgaranti.
- Garantibesiktning: vid 2-årsbesiktning av nybygge.
- Energibesiktning: kartlägger energiförbrukning och förbättringsmöjligheter.

=== PROCESSEN ===
Bokning → platsbesiktning (2–4h) → protokoll (inom 24h) → genomgång med kund.

=== VAD INGÅR ===
Synliga och åtkomliga ytor. Fuktmätning. Ventilationskontroll.
Visuell kontroll av tak, grund, el, VVS.

=== VAD INGÅR INTE ===
Ytor bakom väggar, under parkettgolv, ej åtkomliga utrymmen.
Dolda fel som inte är synligt åtkomliga.

=== BYGGNADSTEKNIK ===
Vanliga byggskador: fukt, köldbryggor, sättningar, rötskador.
Symptom: mögellukt, färgavflagning, sprickor i puts.
Konstruktionstyper: platta på mark, krypgrund, källare — egenskaper och problem.
Ventilation: F (frånluft), FT (från- och tilluft), FTX (värmeåtervinning).
Energi: tilläggsisolering, köldbryggor, lufttäthet.
Klassificering: akut / övervaka / normalt slitage.

=== BOKNING OCH KONTAKT ===
Boka: https://enspecta.se/boka
Mail: info@enspecta.se
Tel: 010-XXX XX XX
```

*(Faktisk kontaktinfo och URL fylls i under implementation med riktiga värden från Enspecta.)*

---

## Kunskapsbas — ämnesområden

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
- Fuktmätning, ventilationskontroll
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
- Konstruktionstyper: platta på mark, krypgrund, källare
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
- Chattfönster öppnas uppåt med header: "Aida — Besiktningsmannen"
- Välkomstmeddelande visas direkt vid öppning (se ovan)
- Tre snabbvalsknappar vid start:
  - "Vad kostar en besiktning?" → skickar frågan som ett chattmeddelande
  - "Hur går det till?" → skickar frågan som ett chattmeddelande
  - "Boka besiktning" → öppnar `CONFIG.bookingUrl` i ny flik (ingen API-anrop)
- Typindikator (tre punkter) medan svar genereras
- Markdown-rendering: widgeten renderar `[text](url)` i Eriks svar som klickbara knappar **endast om URL:en matchar `enspecta.se`** — externa länkar renderas som vanlig text

### Felhantering i widgeten
- API-fel (network, 500): visar `"Något gick fel. Försök igen eller ring oss på " + CONFIG.phone`
- Rate limit (429): visar det felmeddelande som backenden returnerar
- Inget retry — användaren uppmanas att försöka igen manuellt

---

## Tekniska detaljer

| Parameter | Värde |
|---|---|
| Modell | `claude-haiku-4-5-20251001` (Haiku 4.5, verifierat korrekt ID) |
| Max tokens | `1024` |
| Max historik till API | 10 meddelanden (backend trunkerar tyst) |
| Historikformat | `[{ role: "user"\|"assistant", content: string }]` i Claude Messages-format |
| Historiklagring | `sessionStorage` (försvinner vid stängd flik) |
| Rate limiting | `express-rate-limit`, 20 req / IP / timme, in-memory (en Railway-instans) |
| CORS (produktion) | `enspecta.se`, `www.enspecta.se` |
| CORS (dev) | regex `^http://localhost:\d+$` — tillåter alla lokala portar |
| CSS-isolering | Prefixade klasser `enspecta-chat-*` (ingen shadow DOM) |
| Språk | Svenska |

---

## Projektstruktur

```
enspecta-chatbot/
  backend/
    index.js          # Express-server, /api/chat endpoint, rate limiting, CORS
    knowledge.js      # Systemprompt och kunskapsbas
    .env.example      # ANTHROPIC_API_KEY, PORT, ALLOWED_ORIGINS
  widget/
    src/
      index.js        # Widget-källkod (vanilla JS) inkl. CONFIG-objekt
      styles.js       # CSS-sträng med prefixade klasser, injekteras via JS
      dev.html        # Enkel HTML-sida för lokal manuell test av widgeten
    dist/
      widget.js       # Minifierad output (byggs med esbuild)
  package.json        # scripts: build, start, dev
  railway.json
```

---

## Deployment

- Backend och widget-distribution deployas på Railway som en app
- `npm run build` kör esbuild och genererar `widget/dist/widget.js`
- Widget serveras som statisk fil från Express på sökvägen `/widget.js`
- Enspecta klistrar in ett enda `<script>`-tag på sin sajt
- Miljövariabler: `ANTHROPIC_API_KEY`, `PORT`, `ALLOWED_ORIGINS` (kommaseparerade)

### `railway.json`
```json
{
  "build": {
    "builder": "nixpacks",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm start"
  }
}
```

### `package.json` scripts
```json
{
  "build": "esbuild widget/src/index.js --bundle --minify --outfile=widget/dist/widget.js",
  "start": "node backend/index.js",
  "dev": "nodemon backend/index.js"
}
```

### Lokal utveckling
```bash
cp backend/.env.example backend/.env  # fyll i ANTHROPIC_API_KEY
npm install
npm run build                          # bygg widget till dist/
npm run dev                            # nodemon på port 3000
# öppna widget/src/dev.html i webbläsaren för manuell test
```
CORS i dev-läge tillåter automatiskt `localhost:*` via regex — ingen extra konfiguration krävs.

---

## Integrationsnoteringar för Enspecta

- Embed-kod: `<script src="https://chatbot.enspecta.se/widget.js"></script>` sist i `<body>`
- CSS-klasser prefixas med `enspecta-chat-` — risk för konflikter är minimal
- Om sajten har Content Security Policy (CSP) behöver `script-src` och `connect-src` tillåta `chatbot.enspecta.se`
- Enspecta ansvarar för att testa embed-koden på sin live-sajt
- Kontakta Enspecta för riktiga värden inför deploy: boknings-URL, telefon, e-post

---

## Ej inkluderat (YAGNI)

- Konversationsloggning / analytics (kan läggas till senare)
- Flerspråksstöd
- Admin-panel för att redigera kunskapsbasen
- Autentisering av slutanvändare
- Integrering med CRM
- Streaming-svar (enkelt svar per anrop räcker för nu)
- Multi-instans Railway-deployment (in-memory rate limiting räcker för nu)
