/**
 * KisanVaani AI — Agricultural Safety Regression Validator (JavaScript / Node.js)
 * 
 * Automatically validates translated pesticide safety guidelines, dosages,
 * active chemical ingredients, and medical antidote statements to prevent
 * life-threatening translation regressions.
 */

const fs = require('fs');
const path = require('path');

const Severity = {
  CRITICAL: 'CRITICAL', // Altered dosage, missing antidote, altered negation (e.g. "induce vomiting")
  HIGH: 'HIGH',         // Missing PPE, missing safety triangle level, missing waiting period
  MEDIUM: 'MEDIUM',     // Missing placeholders, mismatched numbers in auxiliary text
  LOW: 'LOW'            // Formatting, untranslated minor UI text
};

// Regional numeral mappings
const DEVANAGARI_DIGITS = {
  '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
  '५': '5', '६': '6', '७': '7', '८': '8', '९': '9'
};

const BENGALI_DIGITS = {
  '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
  '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
};

function normalizeNumerals(text) {
  if (!text) return '';
  let res = text;
  for (const [dev, asc] of Object.entries(DEVANAGARI_DIGITS)) {
    res = res.replaceAll(dev, asc);
  }
  for (const [ben, asc] of Object.entries(BENGALI_DIGITS)) {
    res = res.replaceAll(ben, asc);
  }
  return res;
}

function extractNumbersAndRanges(text) {
  const normalized = normalizeNumerals(text);
  const pattern = /\b\d+(?::\d+)?(?:\.\d+)?\b/g;
  const matches = normalized.match(pattern);
  return new Set(matches || []);
}

function extractPlaceholders(text) {
  if (!text) return new Set();
  const pattern = /\{([a-zA-Z0-9_]+)\}/g;
  const set = new Set();
  let match;
  while ((match = pattern.exec(text)) !== null) {
    set.add(match[1]);
  }
  return set;
}

class SafetyValidator {
  constructor(baseLocalePath) {
    this.baseLocalePath = baseLocalePath || path.join(__dirname, '../../locales/en.json');
    const raw = fs.readFileSync(this.baseLocalePath, 'utf8');
    this.baseData = JSON.parse(raw);
  }

  validateTargetFile(targetLocalePath) {
    const raw = fs.readFileSync(targetLocalePath, 'utf8');
    const targetData = JSON.parse(raw);
    const localeCode = targetData.meta?.language_code || path.basename(targetLocalePath, '.json');

    return this.validateTranslationObject(targetData, localeCode);
  }

  validateTranslationObject(targetData, localeCode = 'unknown') {
    const result = {
      locale: localeCode,
      totalKeys: 0,
      checkedKeys: 0,
      passed: true,
      issues: [],
      criticalCount: 0,
      highCount: 0,
      mediumCount: 0
    };

    this._validateDictRecursive('', this.baseData, targetData, result);

    result.criticalCount = result.issues.filter(i => i.severity === Severity.CRITICAL).length;
    result.highCount = result.issues.filter(i => i.severity === Severity.HIGH).length;
    result.mediumCount = result.issues.filter(i => i.severity === Severity.MEDIUM).length;
    result.passed = (result.criticalCount === 0 && result.highCount === 0);

    return result;
  }

  _validateDictRecursive(prefix, baseObj, targetObj, result) {
    for (const [k, v] of Object.entries(baseObj)) {
      if (k === 'meta') continue;
      const currentPath = prefix ? `${prefix}.${k}` : k;
      result.totalKeys++;

      if (!targetObj || !(k in targetObj)) {
        const isCriticalSection = ['emergency', 'safety_levels', 'dosage', 'ppe'].some(s => currentPath.includes(s));
        if (isCriticalSection) {
          result.issues.push({
            severity: Severity.HIGH,
            keyPath: currentPath,
            message: `Missing critical safety section or key: '${currentPath}'`,
            sourceSnippet: String(typeof v === 'object' ? JSON.stringify(v) : v).slice(0, 80),
            targetSnippet: '<MISSING>',
            recommendation: 'Translate this safety-critical field before publishing.'
          });
        }
        continue;
      }

      const targetVal = targetObj[k];

      if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
        if (typeof targetVal === 'object' && targetVal !== null) {
          this._validateDictRecursive(currentPath, v, targetVal, result);
        } else {
          result.issues.push({
            severity: Severity.HIGH,
            keyPath: currentPath,
            message: `Structure mismatch at '${currentPath}': expected JSON object`,
            sourceSnippet: String(v).slice(0, 80),
            targetSnippet: String(targetVal).slice(0, 80),
            recommendation: 'Restore JSON object hierarchy.'
          });
        }
      } else if (typeof v === 'string') {
        result.checkedKeys++;
        if (typeof targetVal === 'string') {
          this._validateStringPair(currentPath, v, targetVal, result);
        }
      }
    }
  }

  _validateStringPair(pathStr, sourceText, targetText, result) {
    // 1. Placeholder check
    const sourcePh = extractPlaceholders(sourceText);
    const targetPh = extractPlaceholders(targetText);

    for (const ph of sourcePh) {
      if (!targetPh.has(ph)) {
        const isDoseOrPhi = pathStr.includes('dosage') || pathStr.includes('pre_harvest');
        result.issues.push({
          severity: isDoseOrPhi ? Severity.CRITICAL : Severity.HIGH,
          keyPath: pathStr,
          message: `Missing dynamic safety placeholder: {${ph}}`,
          sourceSnippet: sourceText,
          targetSnippet: targetText,
          recommendation: `Include the exact placeholder variable {${ph}} in target translation.`
        });
      }
    }

    // 2. Numerical extraction in safety-critical categories
    const isSafetyCritical = ['dosage', 'application_timing', 'emergency', 'ppe'].some(s => pathStr.includes(s));
    if (isSafetyCritical) {
      const sourceNums = extractNumbersAndRanges(sourceText);
      const targetNums = extractNumbersAndRanges(targetText);

      for (const num of sourceNums) {
        if (!targetNums.has(num)) {
          result.issues.push({
            severity: pathStr.includes('dosage') ? Severity.CRITICAL : Severity.HIGH,
            keyPath: pathStr,
            message: `Omitted or altered number in safety instruction: '${num}'`,
            sourceSnippet: sourceText,
            targetSnippet: targetText,
            recommendation: 'Ensure all numerical values (quantities, hours, days, dosages) are preserved exactly.'
          });
        }
      }
    }

    // 3. Swallowing / ingestion warning negation
    if (pathStr.includes('swallowing_warning')) {
      const normTarget = targetText.toLowerCase();
      const tokens = normTarget.split(/[\s,।.;:!?\n\r"']+/);
      const multiWordNegations = [
        'not', 'never', 'do not', 'don\'t',
        'नहीं', 'नाही', 'नका', 'नको',
        'করবেন না', 'বমি করাবেন না',
        'வேண்டாம்', 'નહીં'
      ];
      const standaloneNegations = ['not', 'no', 'न', 'मत', 'না', 'নয়'];

      const hasMulti = multiWordNegations.some(neg => normTarget.includes(neg));
      const hasStandalone = standaloneNegations.some(neg => tokens.includes(neg));
      const hasNegation = hasMulti || hasStandalone;

      if (!hasNegation) {
        result.issues.push({
          severity: Severity.CRITICAL,
          keyPath: pathStr,
          message: "Missing critical negation in ingestion warning ('do NOT induce vomiting')",
          sourceSnippet: sourceText,
          targetSnippet: targetText,
          recommendation: 'Vomiting after pesticide ingestion can cause fatal lung aspiration. Ensure explicit negation is present.'
        });
      }
    }

    // 4. Toxicity triangle color markers
    if (pathStr.includes('safety_levels')) {
      const colorMarkers = {
        'danger_poison': ['red', 'लाल', 'লাল', 'சிகப்பு', 'લાલ'],
        'warning_poison': ['yellow', 'पीला', 'पिवळा', 'হলুদ', 'மஞ்சள்', 'પીળો'],
        'caution_danger': ['blue', 'नीला', 'निळा', 'নীল', 'நீலம்', 'વાદળી'],
        'caution': ['green', 'हरा', 'हिरवा', 'সবুজ', 'பச்சை', 'લીલો']
      };
      const leafKey = pathStr.split('.').pop();
      if (leafKey in colorMarkers) {
        const expectedTerms = colorMarkers[leafKey];
        const normTarget = targetText.toLowerCase();
        const hasColor = expectedTerms.some(term => normTarget.includes(term));
        if (!hasColor) {
          result.issues.push({
            severity: Severity.HIGH,
            keyPath: pathStr,
            message: `Missing standard CIBRC toxicity color indication for '${leafKey}'`,
            sourceSnippet: sourceText,
            targetSnippet: targetText,
            recommendation: 'Label must mention the CIBRC statutory color triangle category.'
          });
        }
      }
    }
  }
}

function printReport(result) {
  const icon = result.passed ? '✅ PASS' : '❌ FAILED (SAFETY REGRESSION DETECTED)';
  console.log('\n========================================================');
  console.log(`Safety Regression Test Report: [${result.locale.toUpperCase()}] - ${icon}`);
  console.log(`Total Keys Checked: ${result.checkedKeys} / ${result.totalKeys}`);
  console.log(`Critical Issues: ${result.criticalCount} | High Issues: ${result.highCount} | Medium: ${result.mediumCount}`);
  console.log('========================================================\n');

  if (result.issues.length === 0) {
    console.log(`✓ No safety regressions detected for locale '${result.locale}'. Certified for deployment.\n`);
    return;
  }

  result.issues.forEach((issue, idx) => {
    const badge = issue.severity === Severity.CRITICAL ? '🔴' : (issue.severity === Severity.HIGH ? '🟠' : '🟡');
    console.log(`${badge} Issue #${idx + 1} [${issue.severity}] at '${issue.keyPath}'`);
    console.log(`   Reason: ${issue.message}`);
    console.log(`   Source: ${issue.sourceSnippet}`);
    console.log(`   Target: ${issue.targetSnippet}`);
    console.log(`   Fix:    ${issue.recommendation}\n`);
  });
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  let targetPath = null;
  let basePath = path.join(__dirname, '../../locales/en.json');

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--target' && args[i + 1]) {
      targetPath = args[i + 1];
      i++;
    } else if (args[i] === '--base' && args[i + 1]) {
      basePath = args[i + 1];
      i++;
    }
  }

  const validator = new SafetyValidator(basePath);

  if (targetPath) {
    const res = validator.validateTargetFile(targetPath);
    printReport(res);
    process.exit(res.passed ? 0 : 1);
  } else {
    // Validate all locales in locales dir
    const localesDir = path.join(__dirname, '../../locales');
    const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json') && f !== 'en.json');
    let allPassed = true;

    files.forEach(f => {
      const fullPath = path.join(localesDir, f);
      const res = validator.validateTargetFile(fullPath);
      printReport(res);
      if (!res.passed) allPassed = false;
    });

    process.exit(allPassed ? 0 : 1);
  }
}

module.exports = {
  SafetyValidator,
  Severity,
  normalizeNumerals,
  extractNumbersAndRanges,
  extractPlaceholders
};
