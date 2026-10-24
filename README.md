# 🌾 KisanVaani AI

> **Community-Driven Agricultural Safety Platform**  
> Democratizing verified pesticide safety instructions, statutory CIBRC guidelines, and regional language translations for farmers across India through open-source collaboration and automated safety regression testing.

[![CI Status](https://img.shields.io/badge/CI-Passing-emerald?style=for-the-badge&logo=github-actions)](.github/workflows/safety-and-translation-ci.yml)
[![Good First Issues](https://img.shields.io/badge/Good%20First%20Issues-Available-blue?style=for-the-badge&logo=github)](.github/generated_issues/)
[![Safety Testing](https://img.shields.io/badge/Safety%20Regression-Automated%20Gate-red?style=for-the-badge&logo=shield)](packages/safety-validation/safety-validator.js)
[![Stack](https://img.shields.io/badge/Stack-React%20%2B%20Node.js-61DAFB?style=for-the-badge&logo=react)](package.json)
[![License](https://img.shields.io/badge/License-Apache--2.0-yellow?style=for-the-badge)](LICENSE)

---

## 🌟 Why This Exists

Commercial AI models often hallucinate or soften life-critical agricultural instructions when translating between English and Indian regional languages:
- **Dosage Alteration:** Confusing `2 ml/L` with `20 ml/L` burns crops and wastes farmer capital.
- **Lost Negations:** Translating *"Do NOT induce vomiting"* as *"Induce vomiting"* can cause fatal aspiration pneumonia during pesticide poisoning emergencies.
- **Omitted Antidotes & PPE:** Dropping required respirators or specific antidotes (e.g., Atropine sulphate) puts human lives at risk.

**KisanVaani AI solves this** by transforming the codebase into an open-source platform where:
1. **The community contributes and refines regional translations** (Hindi, Marathi, Telugu, Tamil, Gujarati, Bengali, etc.).
2. **Agricultural scientists & agronomists review and approve wording** before publication.
3. **Automated Safety Regression Tests run on every pull request**, mathematically verifying that no dosage, number, or emergency negation is ever altered.
4. **Developers can plug in OCR and Speech engines** and test locally at zero API cost using built-in mock mode.

---

## 🚀 Core Features (Selected Priorities)

### 1. 🌐 Community Translation Portal
An intuitive web portal where community members, university students, and local farming groups can translate pesticide safety terminology, PPE equipment, and dilution guidelines into Indian regional languages.
- Real-time client-side warning if dynamic placeholders (`{dose_amount}`) are accidentally dropped.
- Side-by-side English vs Regional editor.

### 2. 🔍 Missing Translation Detector (`npm run detect:missing`)
A CLI auditor that scans locale files against canonical `en.json`, calculates language coverage percentages, and **automatically generates copy-paste ready GitHub "Good First Issue" templates** for community volunteers.

### 3. ✅ Translation Review & Approval Workflow
A multi-tier review pipeline where agricultural scientists and native language reviewers verify terminology against university package-of-practices (e.g. MPKV, TNAU, ANGRAU) and CIBRC safety labels before merging.

### 4. 🛡️ Automated Safety Regression Testing (`npm test`)
A specialized regression engine that blocks any pull request if:
- Numerical dosages, acreage volumes, or pre-harvest interval (PHI) days are altered.
- Emergency ingestion negations (*"do NOT induce vomiting"*) are omitted or softened.
- Statutory CIBRC color triangles (Red, Yellow, Blue, Green) are missing.
- Regional numerals (Devanagari `०-९`, Telugu `౦-౯`) are checked and normalized.

### 5. 🔌 Pluggable OCR & Speech Engine Adapters
A clean abstraction allowing contributors to plug in OCR engines (Tesseract, PaddleOCR, Cloud Vision) and Speech engines (Bhashini AI, Whisper, Web Speech) without touching core business logic. Includes **zero-cost offline Mock Mode**.

### 6. 📊 Public CIBRC Pesticide-Label Dataset
A curated, searchable dataset of legally shareable pesticide formulations (Chlorpyrifos, Imidacloprid, Mancozeb) with approved dosages, target pests, and verified antidotes. Free of personal or proprietary secrets.

---

## 📁 Repository Structure

```
kisanvaani-ai/
├── apps/
│   └── web/                               # React-based Community Portal & Review UI
│       └── index.html                     # Interactive translation portal & safety sandbox
├── packages/
│   ├── safety-validation/                 # Safety regression validation engine
│   │   └── safety-validator.js            # Automated numerical & medical negation checks
│   ├── translation/                       # Localization & community tools
│   │   └── missing-detector.js            # Missing strings detector & Good First Issue generator
│   ├── ocr/                               # Pluggable OCR architecture
│   │   └── ocr-adapter.js                 # Base interface & zero-cost Mock engine
│   └── speech/                            # Pluggable Speech architecture
│       └── speech-adapter.js              # Base interface & zero-cost Mock engine
├── locales/                               # Multilingual community language packs
│   ├── en.json                            # Canonical English reference
│   ├── hi.json                            # Hindi (100% verified)
│   ├── mr.json                            # Marathi (100% verified)
│   └── te.json                            # Telugu (36.4% draft - open for contributors)
├── datasets/
│   └── sample_labels/                     # Public agricultural safety datasets
│       └── pesticide_registry.json        # CIBRC-compliant formulation database
├── tests/
│   ├── safety-regression.test.js          # Unit & regression tests for dosage safety
│   └── locales-integrity.test.js          # Schema and JSON syntax parity tests
├── .github/
│   ├── workflows/                         # GitHub Actions CI
│   │   └── safety-and-translation-ci.yml  # Automated PR safety gate
│   ├── ISSUE_TEMPLATE/                    # Good First Issue & Safety Bug templates
│   ├── generated_issues/                  # Auto-generated contributor issues
│   └── PULL_REQUEST_TEMPLATE.md           # Safety checklist for contributors
├── server.js                              # Node.js API server for web portal
├── CONTRIBUTING.md                        # Contributor guide for translators & developers
├── CODE_OF_CONDUCT.md                     # Contributor Covenant Code of Conduct
├── ROADMAP.md                             # Phased open-source GitHub milestone roadmap
└── package.json                           # Scripts and project metadata
```

---

## 🇮🇳 Regional Language Support Matrix

| Language | ISO Code | Coverage | Missing Strings | Status | Contribution Opportunity |
|---|---|---|---|---|---|
| **English** | `en` | 100.0% | 0 | 🔒 Canonical Base | Reference Standard |
| **हिन्दी (Hindi)** | `hi` | 100.0% | 0 | ✅ Verified | QA & Terminology Polish |
| **मराठी (Marathi)** | `mr` | 100.0% | 0 | ✅ Verified | QA & Terminology Polish |
| **বাংলা (Bengali)** | `bn` | 42.4% | 19 | 🟡 Good First Issue | [Claim Bengali Issue](.github/generated_issues/issue_missing_translations_bn.md) |
| **தமிழ் (Tamil)** | `ta` | 0.0% | 33 | ⚪ Needs Pioneer | Good First Contribution |
| **ગુજરાતી (Gujarati)** | `gu` | 0.0% | 33 | ⚪ Needs Pioneer | Good First Contribution |
| **తెలుగు (Telugu)** | `te` | 0.0% | 33 | ⚪ Needs Pioneer | Good First Contribution |
| **ಕನ್ನಡ (Kannada)** | `kn` | 0.0% | 33 | ⚪ Needs Pioneer | Good First Contribution |

---

## ⚡ Quickstart for Contributors

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **Zero API keys needed!** Mock mode is enabled by default.

### 2. Installation & Running Tests
```bash
# Clone the repository
git clone https://github.com/kisanvaani-ai/kisanvaani-ai.git
cd kisanvaani-ai

# Run all automated tests (zero external dependencies required)
npm test
```

### 3. Check Language Coverage & Missing Translations
```bash
# Audit locales and export ready-to-post GitHub Good First Issues
npm run detect:missing -- --export-issues
```

### 4. Run the Community Portal & Review Server
```bash
npm start
# Open http://localhost:3000 in your browser
```

---

## 🛡️ How Safety Regression Testing Works

When a contributor submits a translation PR, GitHub Actions runs `packages/safety-validation/safety-validator.js`.

```javascript
const { SafetyValidator } = require('./packages/safety-validation/safety-validator.js');
const validator = new SafetyValidator('locales/en.json');

// Checks target translation against safety rules
const report = validator.validateTargetFile('locales/te.json');

if (!report.passed) {
  console.error(`🚨 Merged blocked: ${report.criticalCount} critical safety regressions!`);
}
```

### What Gets Flagged as a Critical Blocker?
1. **Omitted / Changed Numbers:** Changing `2.0 ml` to `20 ml`, or altering `15 days` waiting period.
2. **Missing Ingestion Negation:** Any translation in `emergency_and_first_aid.swallowing_warning` that fails to include negative particles (*"not"*, *"न"*, *"नहीं"*, *"नका"*, *"వద్దు"*, etc.).
3. **Dropped Dynamic Placeholders:** Omitting `{dose_amount}` or `{phi_days}`.
4. **Missing Statutory CIBRC Color Codes:** Failing to mention the toxicity triangle (Red, Yellow, Blue, Green).

---

## 🤝 How to Contribute

| If you are a... | You can contribute by... |
|---|---|
| **Language Contributor** | Translating missing strings in `locales/*.json` using our [Community Portal](http://localhost:3000) or directly on GitHub. |
| **Agronomist / Scientist** | Reviewing pending translations in the [Review Queue](http://localhost:3000) to confirm local agricultural terms. |
| **Frontend / React Developer** | Improving mobile accessibility, dark/light theme, and offline language pack caching. |
| **Backend Developer** | Adding new OCR engines (PaddleOCR, Tesseract) or Speech engines (Bhashini AI) in `packages/`. |
| **QA / Tester** | Writing adversarial test cases in `tests/safety-regression.test.js` to catch subtle mistranslations. |

See [CONTRIBUTING.md](file:///CONTRIBUTING.md) for full setup instructions and coding standards.

---

## 📜 Statutory Disclaimer & Data License

- **Central Insecticides Board & Registration Committee (CIBRC):** Pesticide formulations in `datasets/sample_labels/` are compiled from public, published regulatory guidelines of the Ministry of Agriculture & Farmers Welfare, Govt. of India.
- **No Proprietary Data:** Datasets contain no personally identifiable information (PII) or confidential business secrets.
- **Code License:** [Apache-2.0](LICENSE) | **Dataset License:** ODbL-1.0 (Open Database License).
