/**
 * KisanVaani AI — Pluggable Speech Engine Architecture (JavaScript / Node.js)
 * 
 * Provides an extensible abstraction for Speech-to-Text (STT) and
 * Text-to-Speech (TTS) for regional Indian languages, allowing contributors
 * to plug in Web Speech API, Whisper, Bhashini AI, Azure Speech, or Mock engine.
 */

class BaseSpeechEngine {
  constructor(config = {}) {
    this.config = config;
    this.name = 'BaseSpeechEngine';
  }

  async transcribeAudio(audioStreamOrBuffer, languageCode = 'hi') {
    throw new Error('transcribeAudio() must be implemented by Speech provider');
  }

  async synthesizeSpeech(text, languageCode = 'hi', voiceGender = 'female') {
    throw new Error('synthesizeSpeech() must be implemented by Speech provider');
  }

  getSupportedVoices() {
    return [];
  }
}

/**
 * Mock Speech Engine for local testing without paid cloud voice quotas.
 */
class MockSpeechEngine extends BaseSpeechEngine {
  constructor(config = {}) {
    super(config);
    this.name = 'MockSpeechEngine';
  }

  async transcribeAudio(audioStreamOrBuffer, languageCode = 'hi') {
    const samples = {
      'hi': 'क्लोरोपायरीफॉस का स्प्रे करने का सही समय क्या है?',
      'mr': 'क्लोरोपायरीफॉस फवारणीची योग्य वेळ कोणती आहे?',
      'bn': 'ধানের জমিতে ক্লোরপাইরিফস স্প্রে করার সঠিক সময় কোনটি?',
      'en': 'What is the recommended dosage for chlorpyrifos on paddy?'
    };
    return {
      transcript: samples[languageCode] || samples['en'],
      confidence: 0.96,
      language: languageCode,
      provider: this.name
    };
  }

  async synthesizeSpeech(text, languageCode = 'hi', voiceGender = 'female') {
    return {
      audioUrl: `mock://audio/stream?lang=${languageCode}&gender=${voiceGender}&hash=${Buffer.from(text.slice(0, 16)).toString('hex')}`,
      durationSeconds: Math.max(2, Math.round(text.length / 15)),
      mimeType: 'audio/mp3',
      provider: this.name
    };
  }

  getSupportedVoices() {
    return [
      { id: 'hi-IN-Mock1', language: 'hi', name: 'Asha (Mock Hindi)' },
      { id: 'mr-IN-Mock1', language: 'mr', name: 'Gauri (Mock Marathi)' },
      { id: 'bn-IN-Mock1', language: 'bn', name: 'Ananya (Mock Bengali)' },
      { id: 'en-IN-Mock1', language: 'en', name: 'Kavya (Mock English)' }
    ];
  }
}

const speechRegistry = new Map();
speechRegistry.set('mock', new MockSpeechEngine());

function registerSpeechEngine(identifier, engineInstance) {
  if (!(engineInstance instanceof BaseSpeechEngine)) {
    throw new TypeError('Engine must inherit from BaseSpeechEngine');
  }
  speechRegistry.set(identifier.toLowerCase(), engineInstance);
}

function getSpeechEngine(identifier = 'mock') {
  const engine = speechRegistry.get(identifier.toLowerCase());
  if (!engine) {
    throw new Error(`Speech provider '${identifier}' not registered. Available: ${Array.from(speechRegistry.keys()).join(', ')}`);
  }
  return engine;
}

module.exports = {
  BaseSpeechEngine,
  MockSpeechEngine,
  registerSpeechEngine,
  getSpeechEngine
};
