# 🗺️ KisanVaani AI — GitHub Open-Source Roadmap

This document outlines the phased implementation plan to transition **KisanVaani AI** into an open-source platform driven by community linguistic contributions and automated agricultural safety verification.

---

## 🎯 Phase 1: Community Translation & Missing String Detection (Milestone 1 — Easy)
*Goal: Remove all barriers for non-developer translators and first-time open-source contributors.*

- [x] **Canonical Base Localization Schema (`locales/en.json`)**
  - Standardized CIBRC toxicity classes, PPE requirements, dosage parameters, and emergency first-aid wording.
- [x] **Initial Regional Language Packs**
  - Hindi (`locales/hi.json`) — 100% complete & verified.
  - Marathi (`locales/mr.json`) — 100% complete & verified.
  - Bengali (`locales/bn.json`) — 42.4% draft with active Good First Issues.
- [x] **Missing Language & String Detector CLI (`packages/translation/missing-detector.js`)**
  - Scans locales directory against `en.json`.
  - Calculates coverage percentages per language.
  - Auto-exports copy-paste ready GitHub Good First Issue templates.
- [x] **Interactive Community Translation Portal (Web UI)**
  - Side-by-side translation editor with real-time placeholder checking.

---

## 🛡️ Phase 2: Automated Safety Regression Testing (Milestone 2 — Medium)
*Goal: Ensure no translation pull request ever introduces dangerous agricultural errors or drops medical warnings.*

- [x] **Safety Regression Engine (`packages/safety-validation/safety-validator.js`)**
  - Numerical extraction: preserves exact dosages (ml/L, g/acre, hours, days).
  - Regional numeral normalization (Devanagari `०-९`, Telugu `౦-౯`).
  - Negation verification: blocks omission of "NOT" in vomiting/antidote instructions.
  - CIBRC statutory color triangle preservation (Red, Yellow, Blue, Green).
- [x] **Automated Test Suite (`tests/safety-regression.test.js`)**
  - Unit tests verifying official packs and catching intentional dosage regressions.
- [x] **Continuous Integration Gate (`.github/workflows/safety-and-translation-ci.yml`)**
  - Runs on every PR to block merge if safety regression occurs.

---

## 👥 Phase 3: Translation Review & Agronomist Approval Workflow (Milestone 3 — Medium)
*Goal: Provide agricultural scientists and native reviewers a structured pipeline to audit and sign off on community translations.*

- [x] **In-Memory & API Review Queue (`server.js`, `/api/reviews`)**
  - Tracks translation submissions, status (`PENDING`, `APPROVED`, `REVISION_REQUESTED`), and contributor history.
- [x] **Reviewer Web Dashboard (`apps/web/`)**
  - Side-by-side diff comparison (Source vs Proposed).
  - Reviewer discussion thread and agricultural verification tags.
- [ ] **GitHub Bot Automation (Upcoming)**
  - Automated bot comments on PRs with safety audit summary and diff metrics.

---

## 🔌 Phase 4: Pluggable OCR, Speech Engines & Public Datasets (Milestone 4 — Medium)
*Goal: Provide extensible interfaces so contributors can add models and test completely offline.*

- [x] **Pluggable OCR Engine Adapter (`packages/ocr/ocr-adapter.js`)**
  - Abstract `BaseOCREngine` and built-in offline `MockOCREngine`.
- [x] **Pluggable Speech Engine Adapter (`packages/speech/speech-adapter.js`)**
  - Abstract `BaseSpeechEngine` and built-in offline `MockSpeechEngine`.
- [x] **Public CIBRC Pesticide-Label Dataset (`datasets/sample_labels/pesticide_registry.json`)**
  - Legally shareable, anonymized pesticide formulations (Chlorpyrifos, Imidacloprid, Mancozeb) with approved dosages and antidotes.

---

## 🔮 Phase 5: Future Enhancements (Milestone 5 — Medium to Hard)
- [ ] **Offline Language Packs**: Client-side IndexedDB caching of reviewed safety instructions.
- [ ] **Accessibility Mode**: High-contrast UI, large touch targets, and slow-speed regional speech for low-literacy farmers.
- [ ] **Public REST API & Developer SDK**: Documented endpoints for third-party AgriTech apps to request verified translations.
