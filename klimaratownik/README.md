# KlimaRatownik - Climate Rescuer 🌡️

## Eksploatacja okazji rynkowych - Lipiec 2025

KlimaRatownik to aplikacja webowa stworzona do wykorzystania trzech kluczowych okazji rynkowych w Polsce podczas fali upałów w lipcu 2025:

1. **KRYZYS UPAŁÓW** (40°C) → Niedobory sprzętu chłodzącego
2. **STRATY W ROLNICTWIE** → Rolnicy potrzebują pomocy w aplikowaniu o dopłaty UE
3. **BOOM TURYSTYCZNY** (+30%) → Wynajmujący przytłoczeni rezerwacjami

## 🚀 Funkcje

### 1. Mapa Sprzętu Chłodzącego w Czasie Rzeczywistym
- Skanowanie Allegro, Amazon DE i Media Expert
- Monitorowanie dostępności klimatyzatorów, basenów, parasoli UV
- Alerty Premium o powrocie produktów do sprzedaży (49 zł/mies.)

### 2. Automatyczny Asystent Dopłat UE
- Generowanie formularzy TPD/2025 dla rolników
- Wykorzystanie współrzędnych GPS pól
- Automatyczne obliczanie dopłat (199 zł/raport)

### 3. AI Chatbot Turystyczny
- Obsługa rezerwacji w 3 językach (PL/EN/DE)
- Automatyczne wykrywanie języka
- Model prowizyjny (10% od rezerwacji)

## 💻 Stos Technologiczny

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, API Routes
- **Scraping**: Cheerio, Axios
- **PDF**: jsPDF
- **Płatności**: Stripe
- **Powiadomienia**: Telegram Bot API

## 🛠️ Instalacja

```bash
# Klonowanie repozytorium
git clone https://github.com/yourusername/klimaratownik.git
cd klimaratownik

# Instalacja zależności
npm install

# Konfiguracja zmiennych środowiskowych
cp .env.local.example .env.local
# Edytuj .env.local i dodaj swoje klucze API

# Uruchomienie w trybie deweloperskim
npm run dev

# Budowanie dla produkcji
npm run build
npm start
```

## 🔧 Konfiguracja

Utwórz plik `.env.local` z następującymi zmiennymi:

```env
STRIPE_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
TELEGRAM_BOT_TOKEN=xxx
DATABASE_URL=postgresql://localhost:5432/klimaratownik
GOOGLE_MAPS_API_KEY=xxx
```

## 📊 Model Biznesowy

1. **Alerty chłodzące**: 49 zł/miesiąc (subskrypcja)
2. **Raporty dopłat**: 199 zł/raport (jednorazowo)
3. **Chatbot wynajmu**: 10% prowizji od rezerwacji

## 🚀 Plan Uruchomienia

1. **Deploy na Vercel** - Natychmiastowy deploy MVP
2. **Marketing na FB** - Grupa "Rolnik Nowoczesny" (87k członków)
3. **Google Ads** - "klimatyzacja natychmiastowa dostawa"

## 📁 Struktura Projektu

```
klimaratownik/
├── app/
│   ├── api/              # API Routes
│   ├── components/       # Komponenty React
│   ├── lib/             # Logika biznesowa
│   └── types/           # TypeScript definicje
├── public/              # Pliki statyczne
├── .env.local          # Zmienne środowiskowe
└── package.json        # Zależności
```

## 🤝 Wsparcie

- Email: support@klimaratownik.pl
- Telegram: @KlimaRatownikBot
- Telefon: +48 123 456 789

## 📜 Licencja

MIT License - możesz używać kodu do własnych projektów

---

**Stworzone z ❤️ dla polskiego rynku podczas fali upałów 2025**
