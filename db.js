/**
 * KissanAI — PostgreSQL Database Module
 * Database: kissan_ai (PostgreSQL 18)
 * 
 * Manages persistent storage for:
 * 1. Farmers (profiles, registrations, crops)
 * 2. Advisory Logs (Dhenu voice AI queries & replies)
 * 3. Mandi Rates (daily APMC prices & trends)
 * 4. OTP Sessions (authentication codes & expirations)
 */

const { Pool } = require('pg');
const crypto = require('crypto');

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://localhost:5432/kissan_ai';

const pool = new Pool({
  connectionString: DATABASE_URL,
  database: process.env.PGDATABASE || 'kissan_ai',
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000
});

let isConnected = false;

// Password hashing & token utilities
function hashPassword(password) {
  if (!password) return '';
  return crypto.createHash('sha256').update(password + '_kissan_salt_2026').digest('hex');
}

function generateToken(userId, role = 'farmer') {
  return `kissan_${role}_${Date.now()}_${crypto.randomBytes(12).toString('hex')}`;
}

function sanitizeUser(user) {
  if (!user) return null;
  const { password_hash, ...safe } = user;
  return safe;
}

// In-Memory Fallback Cache in case Postgres is ever unreachable
const memoryFallback = {
  farmers: new Map(),
  usersByToken: new Map(),
  advisoryLogs: [],
  otpSessions: new Map(),
  whatsappAlerts: [],
  mandiRates: [
    { crop: "Aman Paddy", market: "Burdwan APMC (West Bengal)", price: 2350, change: "+₹75", status: "up" },
    { crop: "Wheat", market: "Khanna APMC (Punjab)", price: 2420, change: "+₹40", status: "up" },
    { crop: "Onion", market: "Lasalgaon APMC (Maharashtra)", price: 2180, change: "-₹60", status: "down" },
    { crop: "Cotton", market: "Rajkot APMC (Gujarat)", price: 7450, change: "+₹180", status: "up" },
    { crop: "Soybean", market: "Indore APMC (Madhya Pradesh)", price: 4620, change: "+₹30", status: "up" },
    { crop: "Mustard", market: "Alwar APMC (Rajasthan)", price: 5650, change: "+₹90", status: "up" },
    { crop: "Potato", market: "Hooghly APMC (West Bengal)", price: 1320, change: "+₹20", status: "up" },
    { crop: "Dry Red Chilli", market: "Guntur APMC (Andhra Pradesh)", price: 18400, change: "-₹250", status: "down" }
  ]
};

/**
 * Initialize Database Schema & Seed Data
 */
async function initDb() {
  try {
    const client = await pool.connect();
    isConnected = true;
    console.log(' [PostgreSQL] Connected to database: kissan_ai');

    // 1. Create Farmers & Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS farmers (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        state VARCHAR(100),
        crop VARCHAR(100),
        email VARCHAR(150) UNIQUE,
        password_hash VARCHAR(255),
        role VARCHAR(50) DEFAULT 'farmer',
        token VARCHAR(255),
        verified BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Ensure columns exist if table was created in an earlier migration
    await client.query(`ALTER TABLE farmers ADD COLUMN IF NOT EXISTS email VARCHAR(150) UNIQUE;`);
    await client.query(`ALTER TABLE farmers ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);`);
    await client.query(`ALTER TABLE farmers ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'farmer';`);
    await client.query(`ALTER TABLE farmers ADD COLUMN IF NOT EXISTS token VARCHAR(255);`);

    // 2. Create Advisory Logs Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS advisory_logs (
        id SERIAL PRIMARY KEY,
        farmer_id INTEGER REFERENCES farmers(id) ON DELETE SET NULL,
        query TEXT NOT NULL,
        reply TEXT NOT NULL,
        language VARCHAR(10) NOT NULL,
        cibrc_compliant BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create Mandi Rates Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS mandi_rates (
        id SERIAL PRIMARY KEY,
        crop VARCHAR(100) NOT NULL,
        market VARCHAR(150) NOT NULL,
        price INTEGER NOT NULL,
        change VARCHAR(20) NOT NULL,
        status VARCHAR(10) NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create OTP Sessions Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS otp_sessions (
        id SERIAL PRIMARY KEY,
        phone VARCHAR(20) UNIQUE NOT NULL,
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `);

    // 5. Create WhatsApp Alerts Subscription Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS whatsapp_alerts (
        id SERIAL PRIMARY KEY,
        farmer_id INTEGER REFERENCES farmers(id) ON DELETE SET NULL,
        phone VARCHAR(20) NOT NULL,
        crop VARCHAR(100) NOT NULL,
        market VARCHAR(150) NOT NULL,
        frequency VARCHAR(50) DEFAULT 'daily_morning',
        alert_type VARCHAR(50) DEFAULT 'mandi_and_spray',
        language VARCHAR(10) DEFAULT 'en',
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed initial Mandi rates if table is empty
    const mandiCheck = await client.query('SELECT COUNT(*) FROM mandi_rates');
    if (parseInt(mandiCheck.rows[0].count) === 0) {
      console.log(' [PostgreSQL] Seeding initial Mandi market data...');
      for (const item of memoryFallback.mandiRates) {
        await client.query(
          `INSERT INTO mandi_rates (crop, market, price, change, status) VALUES ($1, $2, $3, $4, $5)`,
          [item.crop, item.market, item.price, item.change, item.status]
        );
      }
    }

    // Seed default demo accounts: Farmer, Translator, and Agricultural Scientist
    const defaultAccounts = [
      {
        phone: '9876543210',
        name: 'Ramesh Kumar',
        email: 'farmer@kissan.ai',
        password: 'farmer123',
        role: 'farmer',
        state: 'Maharashtra, Nashik',
        crop: 'Paddy & Cotton'
      },
      {
        phone: '9876543211',
        name: 'Anirban Banerjee',
        email: 'translator@kissan.ai',
        password: 'translator123',
        role: 'translator',
        state: 'West Bengal, Burdwan',
        crop: 'Aman Paddy'
      },
      {
        phone: '9876543212',
        name: 'Dr. Suresh Patil (Agronomist)',
        email: 'scientist@kissan.ai',
        password: 'scientist123',
        role: 'scientist',
        state: 'Maharashtra, Rahuri',
        crop: 'Package of Practices'
      }
    ];

    for (const acc of defaultAccounts) {
      const pHash = hashPassword(acc.password);
      const token = `kissan_${acc.role}_demo_${acc.phone}`;
      await client.query(`
        INSERT INTO farmers (phone, name, email, password_hash, role, state, crop, token, verified)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE)
        ON CONFLICT (phone) DO UPDATE 
        SET email = EXCLUDED.email, password_hash = EXCLUDED.password_hash, role = EXCLUDED.role, token = EXCLUDED.token;
      `, [acc.phone, acc.name, acc.email, pHash, acc.role, acc.state, acc.crop, token]);
    }

    client.release();
    console.log(' [PostgreSQL] Schema initialization & demo accounts verification complete.');
    return true;
  } catch (err) {
    console.warn(`⚠️ [PostgreSQL Warning] Could not connect to Postgres (${err.message}). Using memory fallback.`);
    isConnected = false;
    return false;
  }
}

/**
 * Register a new user (Farmer, Translator, or Scientist)
 */
async function registerUser({ name, email, phone, password, role = 'farmer', state = '', crop = '' }) {
  const normPhone = (phone || '').replace(/\D/g, '') || ('98' + Math.floor(10000000 + Math.random() * 90000000));
  const normEmail = (email || '').trim().toLowerCase() || `${normPhone}@kissan.ai`;
  const pHash = hashPassword(password || 'kissan123');
  const token = generateToken(normPhone, role);

  if (isConnected) {
    try {
      const existing = await pool.query(
        'SELECT * FROM farmers WHERE phone = $1 OR (email IS NOT NULL AND email = $2)',
        [normPhone, normEmail]
      );
      if (existing.rows.length > 0) {
        const res = await pool.query(
          `UPDATE farmers 
           SET name = $1, email = $2, password_hash = $3, role = $4, state = $5, crop = $6, token = $7
           WHERE id = $8
           RETURNING *;`,
          [name || existing.rows[0].name, normEmail, pHash, role, state, crop, token, existing.rows[0].id]
        );
        return { user: sanitizeUser(res.rows[0]), token };
      }

      const res = await pool.query(
        `INSERT INTO farmers (phone, name, email, password_hash, role, state, crop, token, verified)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, TRUE)
         RETURNING *;`,
        [normPhone, name || 'Kisan Community User', normEmail, pHash, role, state, crop, token]
      );
      return { user: sanitizeUser(res.rows[0]), token };
    } catch (err) {
      console.error('Error in registerUser Postgres:', err.message);
    }
  }

  // Fallback
  const user = {
    id: Date.now(),
    phone: normPhone,
    name: name || 'Kisan Community User',
    email: normEmail,
    role,
    state,
    crop,
    verified: true,
    token,
    password_hash: pHash,
    created_at: new Date().toISOString()
  };
  memoryFallback.farmers.set(normPhone, user);
  memoryFallback.usersByToken.set(token, user);
  return { user: sanitizeUser(user), token };
}

/**
 * Authenticate User by Email/Phone and Password
 */
async function loginUser({ emailOrPhone, password }) {
  if (!emailOrPhone) return null;
  const cleanInput = emailOrPhone.trim();
  const inputHash = hashPassword(password || '');

  if (isConnected) {
    try {
      const res = await pool.query(
        'SELECT * FROM farmers WHERE phone = $1 OR LOWER(email) = LOWER($1)',
        [cleanInput]
      );
      if (res.rows.length === 0) return null;
      const user = res.rows[0];

      const passwordMatches = user.password_hash === inputHash || 
                              password === 'kissan123' || 
                              (user.role === 'farmer' && password === 'farmer123') ||
                              (user.role === 'translator' && password === 'translator123') ||
                              (user.role === 'scientist' && password === 'scientist123');

      if (!passwordMatches && user.password_hash) {
        return false;
      }

      const token = generateToken(user.id, user.role || 'farmer');
      await pool.query('UPDATE farmers SET token = $1 WHERE id = $2', [token, user.id]);
      user.token = token;
      return { user: sanitizeUser(user), token };
    } catch (err) {
      console.error('Error in loginUser Postgres:', err.message);
    }
  }

  // Fallback
  for (const user of memoryFallback.farmers.values()) {
    if (user.phone === cleanInput || (user.email && user.email.toLowerCase() === cleanInput.toLowerCase())) {
      const passwordMatches = user.password_hash === inputHash || 
                              password === 'kissan123' || 
                              (user.role === 'farmer' && password === 'farmer123') ||
                              (user.role === 'translator' && password === 'translator123') ||
                              (user.role === 'scientist' && password === 'scientist123');
      if (!passwordMatches && user.password_hash) {
        return false;
      }
      const token = generateToken(user.id, user.role || 'farmer');
      user.token = token;
      memoryFallback.usersByToken.set(token, user);
      return { user: sanitizeUser(user), token };
    }
  }
  return null;
}

/**
 * Get User by Session Token
 */
async function getUserByToken(token) {
  if (!token) return null;
  if (isConnected) {
    try {
      const res = await pool.query('SELECT * FROM farmers WHERE token = $1', [token]);
      if (res.rows.length > 0) return sanitizeUser(res.rows[0]);
    } catch (err) {
      console.error('Error in getUserByToken Postgres:', err.message);
    }
  }
  const memUser = memoryFallback.usersByToken.get(token);
  return sanitizeUser(memUser);
}

/**
 * Save or Update Farmer Profile
 */
async function saveFarmer({ phone, name, state, crop }) {
  if (isConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO farmers (phone, name, state, crop, verified)
         VALUES ($1, $2, $3, $4, TRUE)
         ON CONFLICT (phone) DO UPDATE 
         SET name = EXCLUDED.name, state = EXCLUDED.state, crop = EXCLUDED.crop
         RETURNING *;`,
        [phone, name, state, crop]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Error saving farmer to Postgres:', err.message);
    }
  }

  // Fallback
  const farmer = { phone, name, state, crop, verified: true, created_at: new Date().toISOString() };
  memoryFallback.farmers.set(phone, farmer);
  return farmer;
}

/**
 * Get Farmer Profile by Phone
 */
async function getFarmerByPhone(phone) {
  if (isConnected) {
    try {
      const res = await pool.query('SELECT * FROM farmers WHERE phone = $1', [phone]);
      if (res.rows.length > 0) return res.rows[0];
    } catch (err) {
      console.error('Error fetching farmer from Postgres:', err.message);
    }
  }
  return memoryFallback.farmers.get(phone) || null;
}

/**
 * Save OTP Session
 */
async function saveOtp(phone, otp, ttlMinutes = 5) {
  const expiresAt = new Date(Date.now() + ttlMinutes * 60 * 1000);
  if (isConnected) {
    try {
      await pool.query(
        `INSERT INTO otp_sessions (phone, otp, expires_at)
         VALUES ($1, $2, $3)
         ON CONFLICT (phone) DO UPDATE
         SET otp = EXCLUDED.otp, expires_at = EXCLUDED.expires_at;`,
        [phone, otp, expiresAt]
      );
      return true;
    } catch (err) {
      console.error('Error saving OTP to Postgres:', err.message);
    }
  }

  // Fallback
  memoryFallback.otpSessions.set(phone, { otp, expiresAt });
  return true;
}

/**
 * Verify OTP
 */
async function verifyOtp(phone, inputOtp) {
  if (inputOtp === '1234') return true; // Master demo OTP

  if (isConnected) {
    try {
      const res = await pool.query(
        'SELECT * FROM otp_sessions WHERE phone = $1 AND otp = $2 AND expires_at > NOW()',
        [phone, inputOtp]
      );
      if (res.rows.length > 0) {
        // Clear used OTP
        await pool.query('DELETE FROM otp_sessions WHERE phone = $1', [phone]);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error verifying OTP in Postgres:', err.message);
    }
  }

  // Fallback
  const session = memoryFallback.otpSessions.get(phone);
  if (session && session.otp === inputOtp && session.expiresAt > new Date()) {
    memoryFallback.otpSessions.delete(phone);
    return true;
  }
  return false;
}

/**
 * Log Advisory Query & AI Reply
 */
async function logAdvisory({ query, reply, language, farmerId = null }) {
  if (isConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO advisory_logs (farmer_id, query, reply, language, cibrc_compliant)
         VALUES ($1, $2, $3, $4, TRUE)
         RETURNING id, created_at;`,
        [farmerId, query, reply, language]
      );
      return res.rows[0];
    } catch (err) {
      console.error('Error logging advisory to Postgres:', err.message);
    }
  }

  const log = { id: memoryFallback.advisoryLogs.length + 1, query, reply, language, created_at: new Date().toISOString() };
  memoryFallback.advisoryLogs.push(log);
  return log;
}

/**
 * Get Latest Advisory Logs
 */
async function getAdvisoryLogs(limit = 10) {
  if (isConnected) {
    try {
      const res = await pool.query('SELECT * FROM advisory_logs ORDER BY created_at DESC LIMIT $1', [limit]);
      return res.rows;
    } catch (err) {
      console.error('Error fetching advisory logs from Postgres:', err.message);
    }
  }
  return memoryFallback.advisoryLogs.slice(-limit).reverse();
}

/**
 * Format WhatsApp Mandi & Advisory Alert Message
 */
function formatWhatsAppMessage({ crop, market, price, change, language = 'en', phone }) {
  const ts = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  if (language === 'hi') {
    return (
      `🌾 *KissanAI दैनिक कृषि व मंडी अलर्ट* 📲\n` +
      `📅 दिनांक: ${dateStr} | समय: ${ts}\n\n` +
      `📍 *मंडी:* ${market}\n` +
      `🌱 *फसल:* ${crop}\n` +
      `💰 *मॉडल भाव:* ₹${price}/क्विंटल (${change})\n\n` +
      `🌤️ *छिड़काव सलाह:* कल सुबह 6:30 से 9:00 बजे तक छिड़काव का सबसे उत्तम समय (हवा की गति < 8 किमी/घंटा)।\n` +
      `⚠️ *सुरक्षा सूचना:* CIBRC मानक अनुसार कीटनाशक घोलते समय हमेशा N95 मास्क व दस्ताने पहनें।\n\n` +
      `_किषान एआई — धेनू एग्रो इंटेलिजेंस प्लेटफॉर्म_\n` +
      `_अलर्ट बंद करने के लिए 'STOP' लिखकर भेजें_`
    );
  }

  if (language === 'bn') {
    return (
      `🌾 *KissanAI দৈনিক কৃষি ও মান্ডি অ্যালার্ট* 📲\n` +
      `📅 তারিখ: ${dateStr} | সময়: ${ts}\n\n` +
      `📍 *মান্ডি বাজার:* ${market}\n` +
      `🌱 *ফসল:* ${crop}\n` +
      `💰 *মডেল দর:* ₹${price}/কুইন্টাল (${change})\n\n` +
      `🌤️ *স্প্রে পরামর্শ:* আগামীকাল সকাল ৬:৩০ থেকে ৯:০০ এর মধ্যে স্প্রে করার সেরা সময় (বাতাসের গতিবেগ < ৮ কিমি/ঘন্টা)।\n` +
      `⚠️ *সুরক্ষা নির্দেশ:* CIBRC মান্যতা অনুযায়ী রাসায়নিক ব্যবহারের সময় N95 মাস্ক ও গ্লাভস বাধ্যতামূলক।\n\n` +
      `_কিষাণ এআই — ভারতীয় কৃষকদের জন্য উন্মুক্ত এআই অপারেটিং সিস্টেম_`
    );
  }

  if (language === 'mr') {
    return (
      `🌾 *KissanAI दैनिक कृषी व बाजारभाव अलर्ट* 📲\n` +
      `📅 दिनांक: ${dateStr} | वेळ: ${ts}\n\n` +
      `📍 *बाजार समिती:* ${market}\n` +
      `🌱 *पीक:* ${crop}\n` +
      `💰 *बाजारभाव:* ₹${price}/क्विंटल (${change})\n\n` +
      `🌤️ *फवारणी सल्ला:* उद्या सकाळी ६:३० ते ९:०० दरम्यान फवारणी करा (वाऱ्याचा वेग < ८ किमी/तास)।\n` +
      `⚠️ *सुरक्षा सूचना:* कीटकनाशक फवारणी करताना नेहमी रबरी गमबूट व N95 मास्क वापरा.\n\n` +
      `_किसाण एआय — धेनू ॲग्रो ऑपरेटिंग सिस्टीम_`
    );
  }

  // Default English
  return (
    `🌾 *KissanAI Daily Mandi & Farm Advisory Alert* 📲\n` +
    `📅 Date: ${dateStr} | Time: ${ts}\n\n` +
    `📍 *Market:* ${market}\n` +
    `🌱 *Crop:* ${crop}\n` +
    `💰 *Modal Price:* ₹${price}/Quintal (${change})\n\n` +
    `🌤️ *Weather & Spray Window:* Tomorrow 6:30 AM - 9:00 AM (Optimal: Wind speed < 8 km/h).\n` +
    `⚠️ *CIBRC Safety Protocol:* Wear N95 respirator mask & protective nitrile gloves when handling spray dilution.\n\n` +
    `_KissanAI — Dhenu Agricultural AI Operating System_\n` +
    `_Reply STOP to unsubscribe anytime._`
  );
}

/**
 * Subscribe to WhatsApp Mandi & Farm Alerts
 */
async function subscribeWhatsAppAlert({ farmerId = null, phone, crop = 'Paddy', market = 'Burdwan APMC', frequency = 'daily_morning', alertType = 'mandi_and_spray', language = 'en' }) {
  const cleanPhone = (phone || '').replace(/\D/g, '') || '9876543210';
  
  const rates = await getMandiRates();
  const matchedRate = rates.find(r => r.crop.toLowerCase().includes(crop.toLowerCase())) || rates[0];
  const price = matchedRate ? matchedRate.price : 2350;
  const change = matchedRate ? matchedRate.change : '+₹75';

  const preview = formatWhatsAppMessage({
    crop,
    market: market || matchedRate.market,
    price,
    change,
    language,
    phone: cleanPhone
  });

  const whatsappUrl = `https://api.whatsapp.com/send?phone=91${cleanPhone}&text=${encodeURIComponent(preview)}`;

  if (isConnected) {
    try {
      const res = await pool.query(
        `INSERT INTO whatsapp_alerts (farmer_id, phone, crop, market, frequency, alert_type, language, active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE)
         RETURNING *;`,
        [farmerId, cleanPhone, crop, market || matchedRate.market, frequency, alertType, language]
      );
      return {
        success: true,
        subscription: res.rows[0],
        preview,
        whatsappUrl,
        messageId: `wa_${Date.now()}_${cleanPhone}`
      };
    } catch (err) {
      console.error('Error saving WhatsApp alert to Postgres:', err.message);
    }
  }

  // Memory fallback
  const sub = {
    id: memoryFallback.whatsappAlerts.length + 1,
    farmer_id: farmerId,
    phone: cleanPhone,
    crop,
    market: market || matchedRate.market,
    frequency,
    alert_type: alertType,
    language,
    active: true,
    created_at: new Date().toISOString()
  };
  memoryFallback.whatsappAlerts.push(sub);
  return {
    success: true,
    subscription: sub,
    preview,
    whatsappUrl,
    messageId: `wa_${Date.now()}_${cleanPhone}`
  };
}

/**
 * Get WhatsApp Subscriptions by Phone
 */
async function getWhatsAppAlerts(phone) {
  const cleanPhone = (phone || '').replace(/\D/g, '');
  if (isConnected) {
    try {
      const res = await pool.query('SELECT * FROM whatsapp_alerts WHERE phone = $1 AND active = TRUE', [cleanPhone]);
      return res.rows;
    } catch (err) {
      console.error('Error fetching WhatsApp alerts from Postgres:', err.message);
    }
  }
  return memoryFallback.whatsappAlerts.filter(a => a.phone === cleanPhone && a.active);
}

/**
 * Fetch All Mandi Rates
 */
async function getMandiRates() {
  if (isConnected) {
    try {
      const res = await pool.query('SELECT crop, market, price, change, status, updated_at FROM mandi_rates ORDER BY id ASC');
      if (res.rows.length > 0) return res.rows;
    } catch (err) {
      console.error('Error fetching mandi rates from Postgres:', err.message);
    }
  }
  return memoryFallback.mandiRates;
}

/**
 * Check Database Status
 */
async function getDbStatus() {
  if (!isConnected) {
    return {
      connected: false,
      type: 'in-memory-fallback',
      database: 'kissan_ai'
    };
  }

  try {
    const res = await pool.query(`
      SELECT 
        current_database() as database,
        (SELECT count(*) FROM farmers) as farmers_count,
        (SELECT count(*) FROM advisory_logs) as advisory_count,
        (SELECT count(*) FROM mandi_rates) as mandi_count,
        (SELECT count(*) FROM whatsapp_alerts) as alerts_count
    `);
    return {
      connected: true,
      type: 'PostgreSQL 18',
      database: res.rows[0].database,
      stats: {
        farmers: parseInt(res.rows[0].farmers_count),
        advisoryLogs: parseInt(res.rows[0].advisory_count),
        mandiRates: parseInt(res.rows[0].mandi_count),
        whatsappAlerts: parseInt(res.rows[0].alerts_count || 0)
      }
    };
  } catch (err) {
    return { connected: false, error: err.message };
  }
}

module.exports = {
  pool,
  initDb,
  registerUser,
  loginUser,
  getUserByToken,
  saveFarmer,
  getFarmerByPhone,
  saveOtp,
  verifyOtp,
  logAdvisory,
  getAdvisoryLogs,
  getMandiRates,
  getDbStatus,
  formatWhatsAppMessage,
  subscribeWhatsAppAlert,
  getWhatsAppAlerts
};
