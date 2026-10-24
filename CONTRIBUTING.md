# 🌾 Contributing to KisanVaani AI

Thank you for your interest in contributing to **KisanVaani AI**! Our mission is to transform agricultural safety into an open-source platform where farmers, agricultural students, translators, and developers collaborate to provide life-saving pesticide guidance in every Indian regional language.

---

## 🎯 Contribution Tracks

| Role | What You Can Contribute | Skill Level | Where to Start |
|---|---|---|---|
| **Community Translators** | Translate pesticide warnings, dosage guidelines, and interface text into Marathi, Hindi, Telugu, Tamil, Gujarati, etc. | Beginner (No coding required) | `locales/*.json` or Community Translation Portal |
| **Agricultural Reviewers & Agronomists** | Review community translations for terminology accuracy, pre-harvest intervals, and CIBRC safety guidelines. | Intermediate | Review & Approval Queue |
| **Frontend Developers** | Enhance the React Community Portal, mobile responsive UI, and offline-first language download packs. | Intermediate | `apps/web/` |
| **Backend & Architecture Developers** | Build pluggable adapters for OCR engines (Tesseract, PaddleOCR) and Speech engines (Bhashini, Whisper). | Intermediate | `packages/ocr/`, `packages/speech/` |
| **QA & Safety Testers** | Add safety regression test cases, verify numerical dosage extractions, and flag potential safety hazards. | Beginner to Intermediate | `tests/safety-regression.test.js` |

---

## 🚀 Quickstart for Local Development

### Prerequisites
- Node.js (v18 or higher)
- No paid AI API keys required! Built-in **Mock Mode** allows 100% offline local development at zero cost.

### Setup Steps
```bash
# 1. Clone your fork
git clone https://github.com/<your-username>/kisanvaani-ai.git
cd kisanvaani-ai

# 2. Run the test suite (node:test built into Node.js)
npm test

# 3. Check language coverage & missing translations
npm run detect:missing

# 4. Launch the local Community Translation & Review Web App
npm start
# Open http://localhost:3000 in your browser
```

---

## 🌐 How to Add or Improve a Language Translation

1. Check current language coverage using `npm run detect:missing`.
2. Locate or create your language file in `locales/<lang-code>.json` (e.g. `locales/te.json` for Telugu, `locales/gu.json` for Gujarati).
3. Use the canonical base file `locales/en.json` as your reference.
4. **Mandatory Safety Rules for Translators:**
   - **Never alter numbers or dosages:** If English specifies `2.0 ml`, the translation must include `2.0 ml` or `२.० मिली`.
   - **Preserve dynamic placeholders:** Keep `{dose_amount}`, `{water_volume}`, and `{phi_days}` intact.
   - **Ingestion poison warning negation:** When translating `swallowing_warning`, ALWAYS include explicit negation (e.g. *"do NOT induce vomiting"* / *"उल्टी कराने का प्रयास न करें"* / *"उलटी करण्याचा प्रयत्न करू नका"*).
   - **CIBRC color triangles:** Ensure statutory toxicity classifications (`Red`, `Yellow`, `Blue`, `Green`) are retained.
5. Verify your changes locally:
   ```bash
   npm run validate:safety -- --target locales/<your-lang>.json
   ```
6. Commit and open a Pull Request!

---

## 🔌 Adding a Pluggable OCR or Speech Engine

All external engines inherit from our pluggable base classes:
- **OCR Engine:** Subclass `BaseOCREngine` in `packages/ocr/ocr-adapter.js`
- **Speech Engine:** Subclass `BaseSpeechEngine` in `packages/speech/speech-adapter.js`

Always implement an offline mock fallback so other developers can run tests without paid credentials.

---

## 🛡️ Code of Conduct
Please review our [CODE_OF_CONDUCT.md](file:///CODE_OF_CONDUCT.md). We maintain a welcoming, inclusive, and harassment-free environment for everyone.
