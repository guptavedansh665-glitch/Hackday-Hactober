/**
 * KisanVaani AI — Automated Safety Regression Test Suite (node:test)
 * 
 * Verifies that all official language packs adhere strictly to agricultural
 * dosage integrity, CIBRC toxicity triangle labeling, and emergency medical negations.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const { SafetyValidator, Severity } = require('../packages/safety-validation/safety-validator.js');

describe('Agricultural Safety Regression Tests', () => {
  const basePath = path.join(__dirname, '../locales/en.json');
  const validator = new SafetyValidator(basePath);

  test('Official Hindi locale (locales/hi.json) must pass zero safety regressions', () => {
    const targetPath = path.join(__dirname, '../locales/hi.json');
    const result = validator.validateTargetFile(targetPath);

    assert.strictEqual(result.passed, true, `Hindi translation failed with ${result.criticalCount} critical issues`);
    assert.strictEqual(result.criticalCount, 0);
    assert.strictEqual(result.highCount, 0);
  });

  test('Official Marathi locale (locales/mr.json) must pass zero safety regressions', () => {
    const targetPath = path.join(__dirname, '../locales/mr.json');
    const result = validator.validateTargetFile(targetPath);

    assert.strictEqual(result.passed, true, `Marathi translation failed with ${result.criticalCount} critical issues`);
    assert.strictEqual(result.criticalCount, 0);
    assert.strictEqual(result.highCount, 0);
  });

  test('Regression Check: Detects dangerous dosage alterations', () => {
    // Malicious or accidental translation altering "15 days" to "1 day" or dropping hours
    const corruptedTiming = {
      meta: { language_code: 'corrupt_test' },
      application_timing: {
        weather_conditions: 'तेज हवा में छिड़काव न करें।', // dropped "15 km/h"
        spray_hours: 'सुबह छिड़काव करें।', // dropped "6:00 AM - 9:00 AM"
        pre_harvest_interval: 'कटाई से पहले {phi_days} दिन प्रतीक्षा करें।'
      }
    };

    const result = validator.validateTranslationObject(corruptedTiming, 'corrupt_test');
    assert.strictEqual(result.passed, false, 'Validator should have caught omitted numbers in timing');
    const missingNumIssue = result.issues.find(i => i.keyPath === 'application_timing.weather_conditions');
    assert.ok(missingNumIssue, 'Should flag missing 15 km/h warning');
    assert.strictEqual(missingNumIssue.severity, Severity.HIGH);
  });

  test('Regression Check: Detects fatal missing negation in ingestion warning', () => {
    // Dangerous error: "If swallowed, induce vomiting" instead of "do NOT induce vomiting"
    const dangerousSwallowing = {
      meta: { language_code: 'danger_test' },
      emergency_and_first_aid: {
        swallowing_warning: 'यदि निगल लिया जाए, तो उल्टी कराएं।' // Missing "न", "नहीं", "not"!
      }
    };

    const result = validator.validateTranslationObject(dangerousSwallowing, 'danger_test');
    assert.strictEqual(result.passed, false, 'Validator must reject missing negation');
    assert.ok(result.criticalCount > 0, 'Must register CRITICAL severity for ingestion hazard');
    const issue = result.issues.find(i => i.keyPath === 'emergency_and_first_aid.swallowing_warning');
    assert.strictEqual(issue.severity, Severity.CRITICAL);
    assert.match(issue.message, /Missing critical negation/i);
  });

  test('Regression Check: Catches dropped dynamic dosage placeholders', () => {
    // A translator accidentally rewrote the text without {dose_amount}
    const missingPlaceholder = {
      meta: { language_code: 'ph_test' },
      dosage_and_mixing: {
        dosage_instruction: 'साफ पानी में सही मात्रा मिलाएं।' // omitted {dose_amount} and {water_volume}
      }
    };

    const result = validator.validateTranslationObject(missingPlaceholder, 'ph_test');
    assert.strictEqual(result.passed, false);
    const issue = result.issues.find(i => i.keyPath === 'dosage_and_mixing.dosage_instruction');
    assert.ok(issue, 'Should flag dropped placeholder');
    assert.strictEqual(issue.severity, Severity.CRITICAL);
  });

  test('Regression Check: Detects missing CIBRC statutory color triangle', () => {
    const droppedColor = {
      meta: { language_code: 'color_test' },
      safety_levels: {
        danger_poison: 'खतरा - अत्यधिक विषैला' // omitted "(Red Triangle)" or "(लाल त्रिकोण)"
      }
    };

    const result = validator.validateTranslationObject(droppedColor, 'color_test');
    assert.strictEqual(result.passed, false);
    const issue = result.issues.find(i => i.keyPath === 'safety_levels.danger_poison');
    assert.ok(issue, 'Should flag missing statutory CIBRC color triangle');
  });

  test('Bengali Numeral & Ingestion Negation Check: Validates Bengali safety strings', () => {
    const bengaliSample = {
      meta: { language_code: 'bn' },
      application_timing: {
        weather_conditions: 'প্রবল বাতাসের (>১৫ কিমি/ঘন্টা) সময় বা বৃষ্টির ঠিক আগে স্প্রে করবেন না।',
        spray_hours: 'সকাল (৬:০০ থেকে ৯:০০) বা বিকেলে (৪:৩০ থেকে ৬:৩০) স্প্রে করুন।',
        pre_harvest_interval: 'ফসল কাটার আগে অন্তত {phi_days} দিন অপেক্ষা করুন।'
      },
      emergency_and_first_aid: {
        swallowing_warning: 'যদি গিলে ফেলা হয়, চিকিৎসকের নির্দেশ ছাড়া বমি করাবেন না।'
      }
    };

    const result = validator.validateTranslationObject(bengaliSample, 'bn');
    assert.strictEqual(result.criticalCount, 0, 'Bengali numerals and negations must be recognized accurately');
  });
});
