/**
 * KisanVaani AI — Locales Schema and Integrity Tests (node:test)
 * 
 * Verifies that all JSON locale files are syntactically valid,
 * have appropriate metadata headers, and do not contain corrupted keys.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('Localization File Integrity Tests', () => {
  const localesDir = path.join(__dirname, '../locales');
  const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.json'));

  test('All locale files must be valid, well-formed JSON', () => {
    files.forEach(file => {
      const fullPath = path.join(localesDir, file);
      const raw = fs.readFileSync(fullPath, 'utf8');
      assert.doesNotThrow(() => {
        JSON.parse(raw);
      }, `Failed to parse JSON file: ${file}`);
    });
  });

  test('All locale files must contain required metadata schema', () => {
    files.forEach(file => {
      const fullPath = path.join(localesDir, file);
      const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));

      assert.ok(data.meta, `Missing 'meta' block in ${file}`);
      assert.ok(data.meta.language_code, `Missing 'meta.language_code' in ${file}`);
      assert.ok(data.meta.language_name, `Missing 'meta.language_name' in ${file}`);
      assert.ok(data.meta.version, `Missing 'meta.version' in ${file}`);
    });
  });

  test('English canonical base locale must define complete category tree', () => {
    const enPath = path.join(localesDir, 'en.json');
    const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));

    const requiredCategories = [
      'ui',
      'safety_levels',
      'ppe_requirements',
      'dosage_and_mixing',
      'application_timing',
      'emergency_and_first_aid',
      'storage_and_disposal'
    ];

    requiredCategories.forEach(cat => {
      assert.ok(enData[cat], `Base locale en.json is missing top-level category '${cat}'`);
      assert.strictEqual(typeof enData[cat], 'object');
    });
  });
});
