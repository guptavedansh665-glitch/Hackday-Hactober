---
name: "🔌 New OCR / Speech Engine Provider"
about: "Contribute a new OCR or Speech engine adapter"
title: "[Provider] Add <Engine Name> adapter"
labels: ["backend", "provider-adapter", "enhancement"]
assignees: []
---

### 🔌 Provider Details
- **Engine Type:** OCR / Speech-to-Text / Text-to-Speech
- **Provider Name:** (e.g. PaddleOCR, Bhashini AI, Azure Speech, Whisper)
- **Supported Indian Languages:**

### 🛠️ Architecture Checklist
- [ ] Inherits from `BaseOCREngine` or `BaseSpeechEngine`
- [ ] Registered via `registerOCREngine()` or `registerSpeechEngine()`
- [ ] Offline mock fallback implemented so contributors can test without paid API keys
- [ ] Unit tests added to `tests/`
