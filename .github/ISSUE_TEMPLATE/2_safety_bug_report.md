---
name: "🚨 Safety-Critical Translation Regression"
about: "Report a dangerous dosage, altered unit, missing antidote, or misleading pesticide warning"
title: "[SAFETY] Dangerous error in <Language> translation"
labels: ["safety-critical", "bug", "high-priority"]
assignees: []
---

### ⚠️ Immediate Hazard Description
*Describe the safety risk (e.g. incorrect dosage causing crop burning, omitted poison antidote, missing negation).*

### 📍 Location of Error
- **Locale File:** `locales/<lang>.json`
- **Key Path:** `dosage_and_mixing...` or `emergency_and_first_aid...`
- **Current Translated Text:**
- **Correct CIBRC Approved Translation:**

### 🧪 Reproduction
1. Run `npm run validate:safety -- --target locales/<lang>.json`
2. Note the safety validator output and severity flags.
