## 🌾 Agricultural & Safety Contribution Pull Request

### 📝 Summary of Changes
<!-- Describe the purpose of this PR (new translation, safety test fix, provider adapter, UI improvement) -->

### 🛡️ Safety & Quality Checklist
- [ ] **Automated Safety Gate**: I ran `npm test` and all 9 test suites passed with 0 critical or high safety regressions.
- [ ] **Dosage & Number Integrity**: No dosage numbers, dilution rates, or pre-harvest interval (PHI) days were altered.
- [ ] **Medical Negations Intact**: Emergency ingestion instructions retain explicit negations ("do NOT induce vomiting").
- [ ] **Placeholders Preserved**: Dynamic tokens like `{dose_amount}`, `{water_volume}`, `{phi_days}` are untouched.
- [ ] **Privacy & Open Data**: Any label data added is legally shareable public information (CIBRC) with zero personally identifiable information (PII).

### 👥 Agricultural Review Status
- [ ] Self-reviewed by native speaker / agricultural student.
- [ ] Ready for review by designated agricultural reviewer.
