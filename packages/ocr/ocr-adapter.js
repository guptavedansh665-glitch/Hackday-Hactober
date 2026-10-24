/**
 * KisanVaani AI — Pluggable OCR Engine Architecture (JavaScript / Node.js)
 * 
 * Provides an extensible abstraction for optical character recognition on
 * pesticide labels, enabling contributors to plug in Tesseract.js, PaddleOCR,
 * Google Cloud Vision, AWS Rekognition, or the built-in zero-cost Mock engine.
 */

class BaseOCREngine {
  constructor(config = {}) {
    this.config = config;
    this.name = 'BaseOCREngine';
  }

  async extractText(imageBufferOrUrl) {
    throw new Error('extractText() must be implemented by OCR provider');
  }

  async extractStructuredLabel(imageBufferOrUrl) {
    throw new Error('extractStructuredLabel() must be implemented by OCR provider');
  }

  getSupportedLanguages() {
    return ['en'];
  }
}

/**
 * Mock OCR Engine for zero-cost local development and CI testing.
 * Does not require external API keys or heavy native binary installations.
 */
class MockOCREngine extends BaseOCREngine {
  constructor(config = {}) {
    super(config);
    this.name = 'MockOCREngine';
  }

  async extractText(imageBufferOrUrl) {
    return `CHLORPYRIFOS 20% EC
WARNING - HIGHLY TOXIC (Yellow Triangle)
Approved for Paddy, Cotton, Sugarcane.
Dose: 2.0 ml to 2.5 ml per Litre of water.
Pre-Harvest Interval: 15 Days.
Antidote: Administer Atropine sulphate intravenously under medical advice.
Do NOT induce vomiting.`;
  }

  async extractStructuredLabel(imageBufferOrUrl) {
    return {
      chemicalName: 'Chlorpyrifos 20% EC',
      toxicityTriangle: 'Yellow',
      toxicityLevel: 'WARNING - HIGHLY TOXIC',
      recommendedDosage: {
        amount: '2.0 ml - 2.5 ml',
        perWaterUnit: '1 Litre'
      },
      preHarvestIntervalDays: 15,
      antidote: 'Administer Atropine sulphate under medical supervision. Do not induce vomiting.',
      confidenceScore: 0.98,
      engine: this.name
    };
  }

  getSupportedLanguages() {
    return ['en', 'hi', 'mr', 'te', 'ta', 'gu', 'kn', 'bn'];
  }
}

// Registry pattern
const registry = new Map();
registry.set('mock', new MockOCREngine());

function registerOCREngine(identifier, engineInstance) {
  if (!(engineInstance instanceof BaseOCREngine)) {
    throw new TypeError('Engine must inherit from BaseOCREngine');
  }
  registry.set(identifier.toLowerCase(), engineInstance);
}

function getOCREngine(identifier = 'mock') {
  const engine = registry.get(identifier.toLowerCase());
  if (!engine) {
    throw new Error(`OCR provider '${identifier}' not registered. Available: ${Array.from(registry.keys()).join(', ')}`);
  }
  return engine;
}

module.exports = {
  BaseOCREngine,
  MockOCREngine,
  registerOCREngine,
  getOCREngine
};
