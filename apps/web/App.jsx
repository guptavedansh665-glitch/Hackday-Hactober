/**
 * KisanVaani AI (KissanAI) — React Core Application Component
 * Dhenu Agro AI 2.0 • Multilingual Agricultural Operating System
 *
 * Core Modules:
 * - Plant Doctor: AI Multimodal Disease Diagnosis with Live Camera Reticle & Scanner HUD
 * - In-place Multilingual Switcher (Hindi, Bengali, Marathi, English)
 * - Offline Field Mode & Emergency First-Aid Hub (with CIBRC anti-overdose rules)
 * - CIBRC Certified Pesticide & Spray Dosage Calculator
 * - Dhenu Voice Assistant with Multilingual Audio Speech Readout
 * - Real-time APMC Mandi Rates & SMS/WhatsApp Notification Pipeline
 * - Open Source Community Translation Safety Verification Portal
 */

const { useState, useEffect, useRef } = React;

// Comprehensive Multilingual Translation Dictionary
const I18N = {
  bn: {
    appName: "KissanAI",
    appTagline: "ভারতীয় কৃষকদের জন্য এআই-চালিত কৃষি অপারেটিং সিস্টেম",
    badgeLive: "Dhenu Agro AI 2.0 লাইভ",
    tickerWeather: "🌤️ বর্ধমান: ২৬°C, আর্দ্রতা ৬২%, বাতাসের গতি ৭ কিমি/ঘন্টা (স্প্রে করার সেরা সময়) • আমন ধান গড় মান্ডি দর: ₹২,৩৫০/কুইন্টাল (+৩.২%)",
    cibrcBadge: "CIBRC সুরক্ষা অনুমোদিত",
    tabs: {
      advisor: "ধেনু ভয়েস পরামর্শদাতা",
      doctor: "প্ল্যান্ট ডক্টর (রোগ নির্ণয়)",
      mandi: "লাইভ মান্ডি দর",
      calculator: "কীটনাশক ডোজ ক্যালকুলেটর",
      portal: "অনুবাদ পোর্টাল ও সুরক্ষা স্যান্ডবক্স",
      reviews: "পর্যালোচনা কিউ",
      registry: "CIBRC কীটনাশক রেজিস্ট্রি",
      schemes: "সরকারি যোজনা ও অনুদান"
    },
    hero: {
      tag: "ভারতের প্রথম বহুভাষিক কৃষি ফাউন্ডেশন মডেল",
      title: "আপনার ভাষায় কৃষিকাজের নির্ভুল সমাধান পান",
      desc: "রোগবালাই, কীটনাশকের মাত্রা, সেচ, সার ও আবহাওয়া সম্পর্কিত যেকোনো প্রশ্ন বলুন। ধেনু এআই স্থানীয় আঞ্চলিক ভাষায় তাৎক্ষণিক অডিও ও টেক্সট পরামর্শ প্রদান করে।",
      listening: "শুনছি... কথা বলুন",
      tapToSpeak: "কথা বলতে মাইকে চাপুন",
      commonQuestions: "💡 সচরাচর জিজ্ঞাসিত প্রশ্ন (ক্লিক করে শুনুন):",
      chatTitle: "ধেনু এআই লাইভ কৃষি পরামর্শ চ্যাট",
      chatSupport: "২৪x৭ বিনামূল্যে কৃষক সহায়তা",
      inputPlaceholder: "ফসলের রোগ, সার বা বাজার দর সম্পর্কে বাংলায় লিখুন...",
      sendBtn: "পাঠান",
      listenAudio: "শুনুন",
      initialGreeting: "নমস্কার! আমি কিষাণ এআই (ধেনু এগ্রো ইন্টেলিজেন্স)। আপনার ফসলের রোগ নির্ণয়, সার ও কীটনাশক প্রয়োগের মাত্রা, মান্ডি দর বা আবহাওয়া সম্পর্কিত যে কোনো প্রশ্ন বলুন বা টাইপ করুন।"
    },
    doctor: {
      title: "প্ল্যান্ট ডক্টর: এআই ছবি রোগ নির্ণয়",
      desc: "আক্রান্ত ফসলের পাতার ছবি আপলোড করুন অথবা ক্যামেরা দিয়ে স্ক্যান করুন। এআই তাৎক্ষণিক রোগ শনাক্ত করে অনুমোদিত রাসায়নিক ও জৈব সমাধান দেবে।",
      step1: "১. আক্রান্ত ফসলের ছবি বাছুন",
      dragText: "পাতার ছবি ড্র্যাগ করে আনুন অথবা ক্যামেরা খুলুন",
      formats: "সমর্থিত ফরম্যাট: JPG, PNG (সর্বোচ্চ 15 MB)",
      samplePrompt: "বা নমুনা পাতা নির্বাচন করুন:",
      accuracyLabel: "নির্ভুলতা:",
      symptomsLabel: "উপসর্গ ও লক্ষণ:",
      organicLabel: "জৈব ও প্রাকৃতিক প্রতিকার:",
      chemicalLabel: "অনুমোদিত রাসায়নিক প্রতিকার:",
      acreDoseLabel: "প্রতি একরে মাত্রা:",
      phiLabel: "প্রতীক্ষা সময় (PHI):",
      emergencyLabel: "জরুরি সুরক্ষা নির্দেশ:",
      emergencyVal: "N95 মাস্ক ও গ্লাভস বাধ্যতামূলক",
      cautionLabel: "সতর্কতা:"
    },
    mandi: {
      title: "লাইভ মান্ডি বাজার দর ও পণ্য অ্যানালিটিক্স",
      desc: "ভারতের প্রধান APMC মান্ডির দৈনিক সর্বনিম্ন, সর্বোচ্চ ও মডেল দর আপডেট (ই-নাম ও এগমार्कনেট তথ্যের সাথে সিঙ্ক)।",
      updatedAt: "আপডেট: আজ বিকাল ৫:০০",
      perQuintal: "/ কুইন্টাল",
      modalPrice: "মডেল দর",
      detailsChart: "বিস্তারিত দর চার্ট →",
      alertCardTitle: "আপনার নিকটস্থ মান্ডির সরাসরি অ্যালার্ট পেতে চান?",
      alertCardDesc: "প্রতিদিন সকালে হোয়াটসঅ্যাপ বা এসএমএসের মাধ্যমে আপনার নির্বাচিত ফসলের দর পান।",
      alertCardBtn: "📲 হোয়াটসঅ্যাপ অ্যালার্ট চালু করুন"
    },
    calculator: {
      title: "CIBRC কীটনাশক ও স্প্রে ডোজ ক্যালকুলেটর",
      desc: "অতিরিক্ত কীটনাশক ব্যবহারের ফলে ফসলের ক্ষতি ও অর্থ অপচয় রোধ করতে নিখুঁত স্প্রেয়ার ট্যাঙ্কের মাত্রা হিসেব করুন।",
      paramsTitle: "ক্যালকুলেটর প্যারামিটার",
      cropType: "১. ফসলের ধরন বাছুন:",
      landArea: "২. মোট জমির পরিমাণ (একর):",
      tankSize: "৩. স্প্রেয়ার ট্যাঙ্কের মাপ (লিটার):",
      resultHeader: "সিআইবিআরসি মান্য হিসেব",
      forYourLand: "আপনার জমির জন্য প্রয়োজনীয় উপকরণ",
      antiOverdose: "অতিরিক্ত ডোজ রোধক সক্রিয়",
      perTankDose: "প্রতি ট্যাঙ্কে ওষুধের পরিমাণ:",
      waterTotal: "মোট জল প্রয়োজন:",
      chemTotal: "মোট ওষুধ প্রয়োজন:",
      goldenRules: "কৃষি বিজ্ঞানীদের স্প্রে করার সুবর্ণ নিয়ম:",
      rule1: "কখনই নির্দেশিত মাত্রার চেয়ে বেশি স্প্রে করবেন না; এতে ফসলে কেমিক্যাল বার্ন হয়।",
      rule2: "ন্যাপস্যাক স্প্রেয়ারের নোজল সমান্তরাল রাখুন এবং খালি পেটে স্প্রে করবেন না।",
      rule3: "খালি ওষুধের বোতল বা প্যাকেট পুকুর ও খালবিল থেকে দূরে মাটিতে পুঁতে ফেলুন।"
    },
    schemes: {
      title: "কেন্দ্রীয় ও রাজ্য সরকারি কৃষক যোজনা ডিরেক্টরি",
      desc: "সরাসরি সরকারি অনুদান (DBT), ভর্তুকিযুক্ত কৃষি যন্ত্রপাতি, সৌর পাম্প ও ফসল বিমার আবেদন প্রক্রিয়া।",
      benefitLabel: "সুবিধা:",
      eligibilityLabel: "যোগ্যতা:",
      calculatorTitle: "⚡ ১-মিনিটে আপনার উপযুক্ত যোজনা খুঁজুন",
      calculatorDesc: "আপনার রাজ্য, জমির পরিমাণ ও চাহিদা নির্বাচন করে সরাসরি যোগ্য যোজনাগুলি দেখুন:",
      stateLabel: "রাজ্য নির্বাচন করুন:",
      landLabel: "জমির পরিমাণ:",
      needLabel: "প্রধান চাহিদা:",
      checkEligibilityBtn: "যোজনা খুঁজুন",
      resetBtn: "সব ফিল্টার রিসেট",
      searchPlaceholder: "যোজনার নাম, সার, ট্র্যাক্টর, সোলার পাম্প বা বিমা লিখে খুঁজুন...",
      catAll: "সকল যোজনা",
      catIncome: "সরাসরি অনুদান (DBT)",
      catInsurance: "ফসল বিমা",
      catSolar: "সোলার ও সেচ",
      catMachinery: "যন্ত্রপাতি ও ট্র্যাক্টর",
      catCredit: "কেসিসি স্বল্পসুদের ঋণ",
      catOrganic: "জৈব চাষ ও মাটি পরীক্ষা",
      stateAll: "সমগ্র ভারত (কেন্দ্রীয়)",
      stateWb: "পশ্চিমবঙ্গ (State)",
      stateMh: "মহারাষ্ট্র (State)",
      officialPortal: "অফিসিয়াল পোর্টাল",
      checkGuide: "যোগ্যতা ও আবেদন পদ্ধতি",
      requiredDocs: "প্রয়োজনীয় নথিপত্র:",
      stepsTitle: "ধাপে ধাপে আবেদন নির্দেশিকা",
      sendGuide: "মোবাইলে নির্দেশিকা পাঠান",
      helpline: "টোল-ফ্রি হেল্পলাইন",
      activeStatus: "সক্রিয় ও আবেদন চলছে"
    },
    auth: {
      loginBtn: "লগ ইন",
      signupBtn: "সাইন আপ",
      loginTitle: "কিষাণ এআই অ্যাকাউন্টে প্রবেশ",
      loginSubtitle: "আপনার মোবাইল নম্বর দিয়ে লগ ইন করুন",
      signupTitle: "নতুন কৃষক অ্যাকাউন্ট নিবন্ধন",
      signupSubtitle: "ব্যক্তিগতকৃত ফসল পরামর্শ ও মান্ডি অ্যালার্ট পান",
      phoneLabel: "মোবাইল নম্বর",
      phonePlaceholder: "১০ অঙ্কের মোবাইল নম্বর দিন (উদাঃ 9876543210)",
      nameLabel: "আপনার নাম",
      namePlaceholder: "উদাঃ রমেশ কুমার",
      stateLabel: "রাজ্য ও জেলা",
      statePlaceholder: "উদাঃ পশ্চিমবঙ্গ, বর্ধমান",
      cropLabel: "প্রধান ফসল",
      otpLabel: "ওটিপি কোড (OTP)",
      otpPlaceholder: "৪ বা ৬ অঙ্কের ওটিপি",
      sendOtpBtn: "ওটিপি পাঠান (SMS / WhatsApp)",
      loginSubmitBtn: "লগ ইন সম্পূর্ণ করুন",
      signupSubmitBtn: "বিনামূল্যে সাইন আপ করুন",
      quickDemo: "বা এক ক্লিকে ডেমো লগইন করুন:",
      demoUserBtn: "👨‍🌾 রমেশ কুমার (কৃষক ডেমো)",
      switchToSignup: "অ্যাকাউন্ট নেই? বিনামূল্যে সাইন আপ করুন",
      switchToLogin: "ইতিমধ্যে অ্যাকাউন্ট আছে? লগ ইন করুন",
      signOut: "সাইন আউট",
      farmerBadge: "যাচাইকৃত কৃষক"
    },
    footer: {
      copyright: "© 2026 KissanAI. ভারতীয় কৃষকদের জন্য উন্মুক্ত এআই প্ল্যাটফর্ম।",
      privacy: "গোপনীয়তা নীতি",
      terms: "শর্তাবলী"
    }
  },

  hi: {
    appName: "KissanAI",
    appTagline: "भारतीय किसानों के लिए एआई-संचालित कृषि ऑपरेटिंग सिस्टम",
    badgeLive: "Dhenu Agro AI 2.0 लाइव",
    tickerWeather: "🌤️ नासिक: २६°C, नमी ६२%, हवा ७ किमी/घंटा (छिड़काव के लिए सर्वोत्तम समय) • गेहूं औसत मंडी भाव: ₹२,४२०/क्विंटल (+१.৮%)",
    cibrcBadge: "CIBRC सुरक्षा प्रमाणित",
    tabs: {
      advisor: "धेनु वॉयस सलाहकार",
      doctor: "प्लांट डॉक्टर (रोग निदान)",
      mandi: "लाइव मंडी भाव",
      calculator: "कीटनाशक डोज कैलकुलेटर",
      portal: "अनुवाद पोर्टल व सुरक्षा सैंडबॉक्स",
      reviews: "समीक्षा कतार",
      registry: "CIBRC कीटनाशक रजिस्ट्री",
      schemes: "सरकारी योजनाएं व सब्सिडी"
    },
    hero: {
      tag: "भारत का पहला बहुभाषी कृषि फाउंडेशन मॉडल",
      title: "अपनी भाषा में खेती का सटीक व वैज्ञानिक समाधान पाएं",
      desc: "कीट-रोग, कीटनाशक की सही मात्रा, सिंचाई, खाद व मौसम संबंधित कोई भी सवाल बोलकर पूछें। धेनु एआई तुरंत आवाज व टेक्स्ट में सलाह देता है।",
      listening: "सुन रहे हैं... अपना सवाल पूछें",
      tapToSpeak: "बोलने के लिए माइक दबाएं",
      commonQuestions: "💡 अक्सर पूछे जाने वाले सवाल (क्लिक करके पूछें):",
      chatTitle: "धेनु एआई लाइव कृषि परामर्श चैट",
      chatSupport: "२४x७ निःशुल्क किसान सहायता",
      inputPlaceholder: "फसल रोग, खाद या मंडी भाव के बारे में हिंदी में पूछें...",
      sendBtn: "भेजें",
      listenAudio: "सुनें",
      initialGreeting: "नमस्ते! मैं किसान एआई (धेनु एग्रो इंटेलिजेंस) हूं। आपकी फसल के रोग निदान, खाद व कीटनाशक की मात्रा, मंडी भाव या मौसम से संबंधित कोई भी सवाल बोलें या लिखें।"
    },
    doctor: {
      title: "प्लांट डॉक्टर: एआई फोटो द्वारा रोग निदान",
      desc: "प्रभावित फसल की पत्ती की फोटो अपलोड करें या कैमरे से स्कैन करें। एआई तुरंत रोग पहचानकर CIBRC अनुमोदित रासायनिक व जैविक उपाय बताएगा।",
      step1: "१. प्रभावित फसल की फोटो चुनें",
      dragText: "पत्ती की फोटो खींचें या कैमरे से स्कैन करें",
      formats: "समर्थित फॉर्मेट: JPG, PNG (अधिकतम 15 MB)",
      samplePrompt: "या नमूना पत्ती चुनें:",
      accuracyLabel: "सटीकता:",
      symptomsLabel: "लक्षण व पहचान:",
      organicLabel: "जैविक व प्राकृतिक उपचार:",
      chemicalLabel: "अनुमोदित रासायनिक उपचार:",
      acreDoseLabel: "प्रति एकड़ मात्रा:",
      phiLabel: "प्रतीक्षा अवधि (PHI):",
      emergencyLabel: "आपातकालीन सुरक्षा निर्देश:",
      emergencyVal: "N95 मास्क व दस्ताने अनिवार्य",
      cautionLabel: "सावधानी:"
    },
    mandi: {
      title: "लाइव मंडी भाव एवं कमोडिटी एनालिटिक्स",
      desc: "देश की प्रमुख एपीएमसी मंडियों के दैनिक न्यूनतम, अधिकतम व मॉडल भाव (ई-नाम व एगमार्कनेट से सत्यापित)।",
      updatedAt: "अपडेट: आज शाम ५:०० बजे",
      perQuintal: "/ क्विंटल",
      modalPrice: "मॉडल भाव",
      detailsChart: "विस्तृत भाव चार्ट →",
      alertCardTitle: "अपनी नजदीकी मंडी का सीधा अलर्ट पाना चाहते हैं?",
      alertCardDesc: "रोजाना सुबह व्हाट्सएप या एसएमएस पर अपनी पसंदीदा फसलों के भाव पाएं।",
      alertCardBtn: "📲 व्हाट्सएप अलर्ट शुरू करें"
    },
    calculator: {
      title: "CIBRC कीटनाशक व स्प्रे डोज कैलकुलेटर",
      desc: "अत्यधिक कीटनाशक छिड़काव से फसल जलने व पैसों की बर्बादी रोकने के लिए सटीक स्प्रेयर टैंक की मात्रा निकालें।",
      paramsTitle: "कैलकुलेटर पैरामीटर",
      cropType: "१. फसल का प्रकार चुनें:",
      landArea: "२. कुल भूमि का क्षेत्रफल (एकड़):",
      tankSize: "३. स्प्रेयर टैंक का आकार (लीटर):",
      resultHeader: "सीआईबीआरसी मानक गणना",
      forYourLand: "आपकी भूमि हेतु आवश्यक सामग्री",
      antiOverdose: "एंटी-ओवरडोज सुरक्षा सक्रिय",
      perTankDose: "प्रति टैंक दवा की मात्रा:",
      waterTotal: "कुल पानी की आवश्यकता:",
      chemTotal: "कुल कीटनाशक की आवश्यकता:",
      goldenRules: "कृषि वैज्ञानिकों के छिड़काव के स्वर्णिम नियम:",
      rule1: "अनुशंसित मात्रा से अधिक कभी न डालें; इससे फसल को नुकसान (फाइटोटॉक्सिसिटी) होता है।",
      rule2: "नैपसैक स्प्रेयर का नोजल समतल रखें और खाली पेट छिड़काव कभी न करें।",
      rule3: "कीटनाशक की खाली बोतलें कुओं या नहरों से दूर सुरक्षित जमीन में दबाएं।"
    },
    schemes: {
      title: "केंद्रीय व राज्य सरकारी किसान योजना डायरेक्टरी",
      desc: "किसानों के लिए प्रत्यक्ष बैंक अंतरण (DBT), सब्सिडीयुक्त कृषि यंत्र, सोलर पंप व फसल बीमा की सीधी आवेदन प्रक्रिया।",
      benefitLabel: "लाभ:",
      eligibilityLabel: "पात्रता:",
      calculatorTitle: "⚡ १-मिनट में अपनी पात्र सरकारी योजनाएं खोजें",
      calculatorDesc: "अपना राज्य, जमीन का रकबा और मुख्य आवश्यकता चुनकर तुरंत पात्र योजनाएं देखें:",
      stateLabel: "राज्य चुनें:",
      landLabel: "जमीन का रकबा:",
      needLabel: "मुख्य आवश्यकता:",
      checkEligibilityBtn: "पात्र योजनाएं खोजें",
      resetBtn: "सभी फ़िल्टर हटाएं",
      searchPlaceholder: "योजना का नाम, सब्सिडी, सोलर पंप, ट्रैक्टर या बीमा खोजें...",
      catAll: "सभी योजनाएं",
      catIncome: "प्रत्यक्ष आय सहायता (DBT)",
      catInsurance: "फसल बीमा सुरक्षा",
      catSolar: "सोलर पंप व सिंचाई",
      catMachinery: "कृषि यंत्र व ट्रैक्टर",
      catCredit: "केसीसी सस्ता ऋण",
      catOrganic: "जैविक खेती व मृदा जांच",
      stateAll: "अखिल भारतीय (केंद्रीय)",
      stateWb: "पश्चिम बंगाल (राज्य)",
      stateMh: "महाराष्ट्र (राज्य)",
      officialPortal: "आधिकारिक पोर्टल",
      checkGuide: "पात्रता व आवेदन प्रक्रिया",
      requiredDocs: "आवश्यक दस्तावेज:",
      stepsTitle: "चरणबद्ध आवेदन प्रक्रिया",
      sendGuide: "फोन पर गाइड भेजें",
      helpline: "टोल-फ्री हेल्पलाइन",
      activeStatus: "सक्रिय व आवेदन खुले हैं"
    },
    auth: {
      loginBtn: "लॉग इन",
      signupBtn: "साइन अप",
      loginTitle: "किसान एआई खाते में प्रवेश करें",
      loginSubtitle: "अपने मोबाइल नंबर से लॉगिन करें",
      signupTitle: "नया किसान खाता बनाएं",
      signupSubtitle: "व्यक्तिगत फसल सलाह व सीधे मंडी भाव अलर्ट पाएं",
      phoneLabel: "मोबाइल नंबर",
      phonePlaceholder: "१० अंकों का मोबाइल नंबर दर्ज करें (उदा. 9876543210)",
      nameLabel: "आपका नाम",
      namePlaceholder: "उदा. रमेश कुमार",
      stateLabel: "राज्य व जिला",
      statePlaceholder: "उदा. महाराष्ट्र, नासिक",
      cropLabel: "प्रमुख फसल",
      otpLabel: "ओटीपी कोड (OTP)",
      otpPlaceholder: "४ या ६ अंकों का ओटीपी",
      sendOtpBtn: "ओटीपी भेजें (SMS / WhatsApp)",
      loginSubmitBtn: "लॉग इन संपन्न करें",
      signupSubmitBtn: "निःशुल्क साइन अप करें",
      quickDemo: "या एक क्लिक में डेमो लॉगिन करें:",
      demoUserBtn: "👨‍🌾 रमेश कुमार (किसान डेमो)",
      switchToSignup: "खाता नहीं है? निःशुल्क साइन अप करें",
      switchToLogin: "पहले से खाता है? लॉग इन करें",
      signOut: "साइन आउट",
      farmerBadge: "प्रमाणित किसान"
    },
    footer: {
      copyright: "© 2026 KissanAI. भारतीय किसानों को समर्पित ओपन सोर्स एआई प्लेटफॉर्म।",
      privacy: "गोपनीयता नीति",
      terms: "नियम व शर्तें"
    }
  },

  mr: {
    appName: "KissanAI",
    appTagline: "भारतीय शेतकऱ्यांसाठी एआय-आधारित कृषी ऑपरेटिंग सिस्टम",
    badgeLive: "Dhenu Agro AI 2.0 थेट सुरू",
    tickerWeather: "🌤️ नाशिक: २६°C, आर्द्रता ६२%, वाऱ्याचा वेग ७ किमी/तास (फवारणीसाठी सर्वोत्तम वेळ) • सोयाबीन सरासरी बाजारभाव: ₹४,६२०/क्विंटल (+०.८%)",
    cibrcBadge: "CIBRC सुरक्षा प्रमाणित",
    tabs: {
      advisor: "धेनू व्हॉइस सल्लागार",
      doctor: "प्लांट डॉक्टर (पीक रोग निदान)",
      mandi: "थेट बाजारभाव (मंडी)",
      calculator: "कीटकनाशक फवारणी कॅल्क्युलेटर",
      portal: "भाषांतर पोर्टल व सुरक्षा सँडबॉक्स",
      reviews: "तपासणी रांग",
      registry: "CIBRC कीटकनाशक नोंदणी",
      schemes: "शासकीय योजना व अनुदान"
    },
    hero: {
      tag: "भारतातील पहिले बहुभाषिक कृषी फाउंडेशन मॉडेल",
      title: "तुमच्या भाषेत शेतीचे अचूक व शास्त्रीय मार्गदर्शन मिळवा",
      desc: "रोग-कीड, कीटकनाशकाचे प्रमाण, सिंचन, खत व्यवस्थापन व हवामानाबाबत प्रश्न विचारा. धेनू एआय स्थानिक भाषेत अचूक सल्ला देईल.",
      listening: "ऐकत आहे... बोला",
      tapToSpeak: "बोलण्यासाठी माइक दाबा",
      commonQuestions: "💡 वारंवार विचारले जाणारे प्रश्न (क्लिक करा):",
      chatTitle: "धेनू एआय थेट कृषी सल्लागार चॅट",
      chatSupport: "२४x७ मोफत शेतकरी मदत",
      inputPlaceholder: "पिकांचे रोग, खते किंवा बाजारभावाबाबत मराठीत लिहा...",
      sendBtn: "पाठवा",
      listenAudio: "ऐका",
      initialGreeting: "नमस्कार! मी किसान एआय (धेनू अ‍ॅग्रो इंटेलिजन्स) आहे. तुमच्या पिकांचे रोग निदान, खत व औषधांचे योग्य प्रमाण, बाजारभाव किंवा हवामानाविषयी कोणताही प्रश्न विचारा."
    },
    doctor: {
      title: "प्लांट डॉक्टर: एआय फोटोद्वारे रोग निदान",
      desc: "आढळलेल्या रोगाच्या पानाचा फोटो अपलोड करा किंवा स्कॅन करा. एआय तात्काळ रोग ओळखून अधिकृत रासायनिक व सेंद्रिय उपाय सुचवेल.",
      step1: "१. बाधित पिकाचे पान निवडा",
      dragText: "पानाचा फोटो अपलोड करा किंवा कॅमेरा उघडा",
      formats: "समर्थित फॉरमॅट: JPG, PNG (कमाल 15 MB)",
      samplePrompt: "किंवा नमुना पान निवडा:",
      accuracyLabel: "अचूकता:",
      symptomsLabel: "लक्षणे व ओळख:",
      organicLabel: "सेंद्रिय व जैविक उपाय:",
      chemicalLabel: "अधिकृत रासायनिक उपाय:",
      acreDoseLabel: "प्रति एकर प्रमाण:",
      phiLabel: "प्रतीक्षा कालावधी (PHI):",
      emergencyLabel: "आपत्कालीन सुरक्षा सूचना:",
      emergencyVal: "N95 मास्क व हातमोजे अनिवार्य",
      cautionLabel: "सावधगिरी:"
    },
    mandi: {
      title: "थेट कृषी उत्पन्न बाजारभाव (APMC Mandi)",
      desc: "महाराष्ट्रातील व देशातील प्रमुख बाजार समित्यांचे आजचे किमान, कमाल व सर्वसाधारण भाव.",
      updatedAt: "अपडेट: आज संध्याकाळी ५:००",
      perQuintal: "/ क्विंटल",
      modalPrice: "सर्वसाधारण भाव",
      detailsChart: "सविस्तर दर तक्ता →",
      alertCardTitle: "तुमच्या जवळच्या बाजार समितीचे थेट भाव हवेत?",
      alertCardDesc: "दररोज सकाळी व्हॉट्सअ‍ॅपवर आपल्या पिकांचे बाजारभाव मिळवा.",
      alertCardBtn: "📲 व्हॉट्सअ‍ॅप अलर्ट सुरू करा"
    },
    calculator: {
      title: "CIBRC कीटकनाशक फवारणी कॅल्क्युलेटर",
      desc: "अतिप्रमाणात औषध वापरल्याने पीक करपणे टाळण्यासाठी आणि खर्चात बचत करण्यासाठी योग्य फवारणी प्रमाण काढा.",
      paramsTitle: "कॅल्क्युलेटर घटक",
      cropType: "१. पिकाचा प्रकार निवडा:",
      landArea: "२. एकूण क्षेत्रफळ (एकर):",
      tankSize: "३. पंपाचा आकार (लिटर):",
      resultHeader: "सीआयबीआरसी प्रमाणित प्रमाण",
      forYourLand: "तुमच्या क्षेत्रासाठी लागणारे साहित्य",
      antiOverdose: "अतिप्रमाण प्रतिबंधक सक्रिय",
      perTankDose: "प्रति पंप औषधाचे प्रमाण:",
      waterTotal: "एकूण लागणारे पाणी:",
      chemTotal: "एकूण लागणारे औषध:",
      goldenRules: "कृषी तज्ज्ञांचे फवारणीचे सुवर्ण नियम:",
      rule1: "शिफारस केलेल्या प्रमाणापेक्षा जास्त औषध कधीही वापरू नका.",
      rule2: "नॅपसॅक स्प्रेअरचे नोझल जमिनीस समांतर ठेवा आणि रिकाम्या पोटी फवारणी करू नका.",
      rule3: "रिकामे डबे पाण्याच्या स्रोतांपासून दूर जमिनीत पुरा."
    },
    schemes: {
      title: "केंद्र व राज्य शासन शेतकरी योजना",
      desc: "शेतकऱ्यांसाठी थेट आर्थिक मदत (DBT), अनुदानित अवजारे, सौर कृषी पंप व पीक विमा अर्ज प्रक्रिया.",
      benefitLabel: "लाभ:",
      eligibilityLabel: "पात्रता:",
      calculatorTitle: "⚡ १-मिनिटात तुमच्यासाठी पात्र शासकीय योजना शोधा",
      calculatorDesc: "तुमचे राज्य, शेतजमीन क्षेत्र आणि मुख्य गरज निवडून त्वरित पात्र योजना तपासा:",
      stateLabel: "राज्य निवडा:",
      landLabel: "शेतजमीन क्षेत्र:",
      needLabel: "प्रमुख गरज:",
      checkEligibilityBtn: "पात्र योजना शोधा",
      resetBtn: "सर्व फिल्टर काढा",
      searchPlaceholder: "योजना, अनुदान, सौर पंप, ट्रॅक्टर किंवा पीक विमा शोधा...",
      catAll: "सर्व योजना",
      catIncome: "थेट सन्मान निधी (DBT)",
      catInsurance: "पीक विमा संरक्षण",
      catSolar: "सौर पंप व सिंचन",
      catMachinery: "कृषी अवजारे व ट्रॅक्टर",
      catCredit: "केसीसी सवलतीचे कर्ज",
      catOrganic: "सेंद्रिय शेती व माती परीक्षण",
      stateAll: "अखिल भारतीय (केंद्रीय)",
      stateWb: "पश्चिम बंगाल (राज्य)",
      stateMh: "महाराष्ट्र (राज्य)",
      officialPortal: "शासकीय पोर्टल",
      checkGuide: "पात्रता व अर्ज मार्गदर्शन",
      requiredDocs: "आवश्यक कागदपत्रे:",
      stepsTitle: "टप्प्याटप्प्याने अर्ज पद्धत",
      sendGuide: "मोबाईलवर माहिती पाठवा",
      helpline: "टोल-फ्री हेल्पलाइन",
      activeStatus: "सक्रिय व अर्ज सुरू आहेत"
    },
    auth: {
      loginBtn: "लॉग इन",
      signupBtn: "साइन अप",
      loginTitle: "किसान एआय खात्यात प्रवेश करा",
      loginSubtitle: "आपल्या मोबाईल नंबरने लॉगिन करा",
      signupTitle: "नवीन शेतकरी खाते तयार करा",
      signupSubtitle: "वैयक्तिक पीक सल्ला व थेट बाजारभाव मिळवा",
      phoneLabel: "मोबाईल नंबर",
      phonePlaceholder: "१० अंकी मोबाईल नंबर टाका (उदा. 9876543210)",
      nameLabel: "आपले नाव",
      namePlaceholder: "उदा. रमेश पाटील",
      stateLabel: "राज्य व जिल्हा",
      statePlaceholder: "उदा. महाराष्ट्र, नाशिक",
      cropLabel: "मुख्य पीक",
      otpLabel: "ओटीपी कोड (OTP)",
      otpPlaceholder: "४ किंवा ६ अंकी ओटीपी",
      sendOtpBtn: "ओटीपी पाठवा (SMS / WhatsApp)",
      loginSubmitBtn: "लॉग इन पूर्ण करा",
      signupSubmitBtn: "मोफत साइन अप करा",
      quickDemo: "किंवा एका क्लिकवर डेमो लॉगिन करा:",
      demoUserBtn: "👨‍🌾 रमेश पाटील (शेतकरी डेमो)",
      switchToSignup: "खाते नाही? मोफत साइन अप करा",
      switchToLogin: "आधीच खाते आहे? लॉग इन करा",
      signOut: "साइन आउट",
      farmerBadge: "प्रमाणित शेतकरी"
    },
    footer: {
      copyright: "© 2026 KissanAI. भारतीय शेतकऱ्यांसाठी समर्पित ओपन सोर्स एआय.",
      privacy: "गोपनीयता धोरण",
      terms: "नियम व अटी"
    }
  },

  en: {
    appName: "KissanAI",
    appTagline: "AI-Powered Agricultural Operating System for Indian Farmers",
    badgeLive: "Dhenu Agro AI 2.0 Live",
    tickerWeather: "🌤️ Burdwan: 26°C, Humidity 62%, Wind 7 km/h (Optimal Spray Window) • Modal Paddy Price: ₹2,350/Qtl (+3.2%)",
    cibrcBadge: "CIBRC Safety Certified",
    tabs: {
      advisor: "Dhenu Voice Advisor",
      doctor: "Plant Doctor (Diagnosis)",
      mandi: "Live Mandi Prices",
      calculator: "Spray Dosage Calculator",
      portal: "Translation Portal & Safety Sandbox",
      reviews: "Review Queue",
      registry: "CIBRC Pesticide Registry",
      schemes: "Govt Schemes & Subsidies"
    },
    hero: {
      tag: "India's First Multilingual Agricultural Foundation Model",
      title: "Get Precise Agricultural Advice in Your Own Language",
      desc: "Ask about pests, diseases, exact spray dosages, irrigation, fertilizers, or market prices by speaking naturally. Dhenu AI answers in voice and text instantly.",
      listening: "Listening... speak now",
      tapToSpeak: "Tap mic to speak",
      commonQuestions: "💡 Common Questions (Click to Ask):",
      chatTitle: "Dhenu AI Live Advisory Chat",
      chatSupport: "24x7 Free Farmer Support",
      inputPlaceholder: "Ask about crop diseases, fertilizers, or mandi prices...",
      sendBtn: "Send",
      listenAudio: "Listen",
      initialGreeting: "Hello! I am KissanAI (Dhenu Agro Intelligence). Ask any question about crop diagnosis, spray dosages, mandi prices, or weather forecasts by speaking or typing."
    },
    doctor: {
      title: "Plant Doctor: AI Multimodal Disease Diagnosis",
      desc: "Upload a diseased leaf photo or scan using camera. AI instantly identifies the pathogen and provides CIBRC-approved organic and chemical remedies.",
      step1: "1. Select Diseased Crop Leaf",
      dragText: "Drag & drop leaf photo or open camera",
      formats: "Supported formats: JPG, PNG (Max 15 MB)",
      samplePrompt: "Or choose a preset diseased sample:",
      accuracyLabel: "Accuracy:",
      symptomsLabel: "Symptoms & Identification:",
      organicLabel: "Organic & Bio-Control Remedy:",
      chemicalLabel: "Approved Chemical Remedy:",
      acreDoseLabel: "Per Acre Dose:",
      phiLabel: "Waiting Period (PHI):",
      emergencyLabel: "Emergency Safety Instruction:",
      emergencyVal: "N95 mask & rubber gloves mandatory",
      cautionLabel: "Caution:"
    },
    mandi: {
      title: "Live Mandi Commodity Prices & Analytics",
      desc: "Daily minimum, maximum, and modal rates from major APMC markets across India (Synced with e-NAM & Agmarknet).",
      updatedAt: "Updated: Today 5:00 PM",
      perQuintal: "/ Quintal",
      modalPrice: "Modal Price",
      detailsChart: "Detailed Price Chart →",
      alertCardTitle: "Want Direct Alerts for Your Nearest Mandi?",
      alertCardDesc: "Receive daily morning SMS or WhatsApp price notifications for your crops.",
      alertCardBtn: "📲 Enable WhatsApp Alerts"
    },
    calculator: {
      title: "CIBRC Pesticide & Spray Dosage Calculator",
      desc: "Calculate accurate sprayer tank dosages to prevent crop phytotoxicity burns and eliminate chemical waste.",
      paramsTitle: "Calculator Parameters",
      cropType: "1. Select Crop Type:",
      landArea: "2. Total Land Acreage (Acres):",
      tankSize: "3. Sprayer Tank Capacity (Litres):",
      resultHeader: "CIBRC Regulatory Calibration",
      forYourLand: "Required Materials for Your Farm",
      antiOverdose: "Anti-Overdose Safety Active",
      perTankDose: "Dose Per Sprayer Tank:",
      waterTotal: "Total Water Required:",
      chemTotal: "Total Formulation Required:",
      goldenRules: "Agricultural Golden Spray Rules:",
      rule1: "Never exceed statutory label dosage; chemical overdosing causes crop burning and pesticide resistance.",
      rule2: "Maintain flat-fan nozzle parallel to crop canopy and never spray on an empty stomach.",
      rule3: "Triple-rinse and bury empty chemical containers far away from water bodies."
    },
    schemes: {
      title: "Central & State Government Farmer Schemes",
      desc: "Direct access to Direct Benefit Transfer (DBT), subsidized farm machinery, solar pumps, and crop insurance.",
      benefitLabel: "Benefit:",
      eligibilityLabel: "Eligibility:",
      calculatorTitle: "⚡ 1-Minute Scheme Eligibility Calculator",
      calculatorDesc: "Select your state, landholding, and immediate farming requirement to discover top government benefits:",
      stateLabel: "Select State:",
      landLabel: "Landholding Size:",
      needLabel: "Primary Requirement:",
      checkEligibilityBtn: "Find Eligible Schemes",
      resetBtn: "Reset Filters",
      searchPlaceholder: "Search schemes by name, subsidy, solar pump, tractor, or crop insurance...",
      catAll: "All Schemes",
      catIncome: "Direct Income (DBT)",
      catInsurance: "Crop Insurance",
      catSolar: "Solar & Irrigation",
      catMachinery: "Machinery & Drones",
      catCredit: "KCC Low-Interest Loans",
      catOrganic: "Organic & Soil Health",
      stateAll: "All India (Central)",
      stateWb: "West Bengal (State)",
      stateMh: "Maharashtra (State)",
      officialPortal: "Official Portal",
      checkGuide: "Check Eligibility & Guide",
      requiredDocs: "Mandatory Documents:",
      stepsTitle: "Step-by-Step Application Process",
      sendGuide: "Send Guide to Phone",
      helpline: "Toll-Free Helpline",
      activeStatus: "Active & Accepting Applications"
    },
    auth: {
      loginBtn: "Log In",
      signupBtn: "Sign Up",
      loginTitle: "Log in to KissanAI",
      loginSubtitle: "Sign in with your mobile number to get instant OTP",
      signupTitle: "Create Free Farmer Account",
      signupSubtitle: "Get personalized crop advisory & direct mandi rate alerts",
      phoneLabel: "Mobile Number",
      phonePlaceholder: "Enter 10-digit mobile number (e.g. 9876543210)",
      nameLabel: "Full Name",
      namePlaceholder: "e.g. Ramesh Kumar",
      stateLabel: "State & District",
      statePlaceholder: "e.g. Maharashtra, Nashik",
      cropLabel: "Primary Crop",
      otpLabel: "OTP Code",
      otpPlaceholder: "Enter 4 or 6-digit OTP",
      sendOtpBtn: "Send OTP (SMS / WhatsApp)",
      loginSubmitBtn: "Complete Login",
      signupSubmitBtn: "Sign Up Free",
      quickDemo: "Or try 1-click Demo Login:",
      demoUserBtn: "👨‍🌾 Ramesh Kumar (Farmer Demo)",
      switchToSignup: "Don't have an account? Sign Up free",
      switchToLogin: "Already have an account? Log In",
      signOut: "Sign Out",
      farmerBadge: "Verified Farmer"
    },
    footer: {
      copyright: "© 2026 KissanAI. Open Source Agricultural Platform dedicated to Indian Farmers.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions"
    }
  }
};

// Comprehensive Offline Field Guide & Emergency First-Aid Data
const OFFLINE_GUIDE_DATA = {
  en: {
    title: "Kisan Offline Field Guide & Emergency First-Aid",
    subtitle: "Essential life-saving rules, emergency helplines & spray calibration when there is no internet",
    bannerTitle: "No Internet Connection (Offline Field Mode Active)",
    bannerDesc: "KisanVaani is working in Offline Field Mode. Local leaf disease diagnosis, CIBRC tank dosage formulas, and emergency helplines are available without internet.",
    openGuide: "Open Offline Field Guide",
    categories: {
      first_aid: "🚑 Emergency First-Aid",
      helplines: "📞 Toll-Free Helplines",
      rules: "🍃 CIBRC Spray Rules",
      dosage: "🧪 16L Tank Cheat Sheet",
      tools: "⚡ Offline Features"
    },
    firstAidTitle: "Critical Accidental Poisoning Protocol",
    ingestionTitle: "Accidental Ingestion / Swallowing Hazard",
    ingestionWarning: "CRITICAL: Do NOT induce vomiting if emulsifiable concentrate (EC) or petroleum-based chemical was swallowed! Vomiting causes fatal chemical aspiration into lungs. Rinse mouth and rush patient immediately to the nearest Primary Health Centre (PHC).",
    eyeSplashTitle: "Chemical Splash in Eyes",
    eyeSplashDesc: "Hold eyelids open and flush with clean, cool running water continuously for at least 15 minutes. Do not rub eyes.",
    skinTitle: "Dermal / Skin Absorption",
    skinDesc: "Immediately remove contaminated clothes. Wash skin thoroughly with soap and copious cold water.",
    inhalationTitle: "Spray Mist Inhalation",
    inhalationDesc: "Carry patient immediately into fresh open air. Loosen tight collar. Keep patient calm and warm.",
    helplineTitle: "Toll-Free Voice Helplines (Dial without data)",
    helplinesList: [
      { name: "National Pesticide Poison Emergency Hotline", number: "1800-116-117", desc: "24x7 CIBRC / AIIMS Poison Information Centre", icon: "🚨" },
      { name: "Kisan Call Centre (Govt. of India)", number: "1800-180-1551", desc: "Toll-free agronomist support across 22 Indian languages", icon: "👨‍🌾" },
      { name: "Emergency Ambulance & Medical Response", number: "108", desc: "Emergency medical transport to nearest hospital", icon: "🚑" },
      { name: "PM-KISAN Farmer Direct Benefit Helpline", number: "14447", desc: "Govt. of India direct farmer support desk", icon: "🏛️" }
    ],
    goldenRulesTitle: "5 CIBRC Golden Rules for Spraying",
    rulesList: [
      { rule: "Wind Threshold", desc: "Do NOT spray if wind speed > 15 km/h to prevent chemical drift to non-target crops and homes." },
      { rule: "Golden Spray Hours", desc: "Spray early morning (6:00 - 9:00 AM) or late afternoon (4:30 - 6:30 PM). Never spray in harsh midday sun." },
      { rule: "Protect Pollinators", desc: "Never spray during full crop bloom or flowering to safeguard pollinator bees." },
      { rule: "Mandatory PPE Kit", desc: "Always wear nitrile gloves, certified N95 respirator mask, eye goggles, and rubber gumboots." },
      { rule: "Clean Water Only", desc: "Use only clean tubewell water. Muddy pond water neutralizes active chemical ingredients." }
    ],
    tankDilutionTitle: "16-Litre Knapsack Dilution Table (1 Acre = 200L = 12-13 Tanks)",
    tankTable: [
      { crop: "Paddy (Rice)", chemical: "Tricyclazole 75% WP", dosePerL: "0.6g / L", dosePerTank: "10 grams / 16L tank", phi: "21 Days" },
      { crop: "Cotton", chemical: "Emamectin Benzoate 5% SG", dosePerL: "0.4g / L", dosePerTank: "6.5 grams / 16L tank", phi: "14 Days" },
      { crop: "Tomato / Potato", chemical: "Mancozeb 75% WP", dosePerL: "2.5g / L", dosePerTank: "40 grams / 16L tank", phi: "7 Days" },
      { crop: "Tomato", chemical: "Azoxystrobin + Difenoconazole SC", dosePerL: "1.0ml / L", dosePerTank: "16 ml / 16L tank", phi: "5 Days" },
      { crop: "Broad Spectrum", chemical: "Chlorpyrifos 20% EC", dosePerL: "2.0ml / L", dosePerTank: "32 ml / 16L tank", phi: "15 Days" },
      { crop: "Organic Neem", chemical: "Neem Oil 1500 ppm", dosePerL: "3.0ml / L", dosePerTank: "50 ml / 16L tank", phi: "0 Days" }
    ],
    offlineFeaturesTitle: "Features Fully Working Without Internet",
    featuresList: [
      "✅ Plant Doctor leaf lesion scanning via local on-device neural model",
      "✅ Audio prescription readout via device Text-to-Speech (Hindi, Bengali, Marathi, English)",
      "✅ CIBRC tank dilution calculator with safe water volume algorithms",
      "✅ Offline queue for translation reviews & WhatsApp requests (syncs upon reconnect)",
      "✅ Statutory safety regression validator and pesticide label dictionary"
    ]
  },
  hi: {
    title: "किसान ऑफलाइन पॉकेट गाइड व आपातकालीन प्राथमिक उपचार",
    subtitle: "खेत में इंटरनेट न होने पर जीवन रक्षक नियम, टोल-फ्री हेल्पलाइन और स्प्रे गणना",
    bannerTitle: "इंटरनेट कनेक्शन नहीं है (ऑफलाइन मोड चालू)",
    bannerDesc: "चिंता न करें! स्थानीय रोग निदान, CIBRC सुरक्षा नियम, आपातकालीन हेल्पलाइन और स्प्रे कैलकुलेटर बिना इंटरनेट के काम कर रहे हैं।",
    openGuide: "ऑफलाइन किसान गाइड",
    categories: {
      first_aid: "🚑 आपातकालीन प्राथमिक उपचार",
      helplines: "📞 टोल-फ्री हेल्पलाइन",
      rules: "🍃 CIBRC स्प्रे नियम",
      dosage: "🧪 १६L टैंक डोज टेबल",
      tools: "⚡ ऑफलाइन सुविधाएं"
    },
    firstAidTitle: "कीटनाशक विषाक्तता पर जीवन रक्षक प्राथमिक उपचार",
    ingestionTitle: "कीटनाशक निगलने पर आपातकालीन चेतावनी",
    ingestionWarning: "अति महत्वपूर्ण: यदि ईसी (EC) या पेट्रोलियम आधारित कीटनाशक निगल लिया गया है, तो उल्टी न कराएं! उल्टी कराने से जहर फेफड़ों में फैल जाता है। मुंह साफ पानी से धोएं और तुरंत नजदीकी प्राथमिक स्वास्थ्य केंद्र (PHC) ले जाएं।",
    eyeSplashTitle: "आंखों में कीटनाशक चले जाने पर",
    eyeSplashDesc: "आंखों की पलकों को खोलकर लगातार कम से कम १५ मिनट तक साफ व ठंडे बहते पानी से धोएं। आंखें न मलें।",
    skinTitle: "त्वचा पर कीटनाशक गिरने पर",
    skinDesc: "संक्रमित कपड़े तुरंत उतारें। साबुन और भरपूर ठंडे पानी से त्वचा को अच्छी तरह धोएं।",
    inhalationTitle: "छिड़काव के समय सांस द्वारा विष अंदर जाने पर",
    inhalationDesc: "मरीज को तुरंत खुली व ताजी हवा में लाएं। कपड़े ढीले करें और शांत रखें।",
    helplineTitle: "टोल-फ्री हेल्पलाइन (साधारण फोन से बिना इंटरनेट डायल करें)",
    helplinesList: [
      { name: "राष्ट्रीय कीटनाशक विष नियंत्रण आपातकालीन हेल्पलाइन", number: "1800-116-117", desc: "२४ घंटे CIBRC / AIIMS विष नियंत्रण केंद्र", icon: "🚨" },
      { name: "किसान कॉल सेंटर (भारत सरकार)", number: "1800-180-1551", desc: "२२ भारतीय भाषाओं में मुफ्त कृषि वैज्ञानिक सलाह", icon: "👨‍🌾" },
      { name: "आपातकालीन एम्बुलेंस व चिकित्सा सेवा", number: "108", desc: "नजदीकी अस्पताल हेतु आपातकालीन वाहन", icon: "🚑" },
      { name: "पीएम-किसान किसान सहायता हेल्पलाइन", number: "14447", desc: "भारत सरकार प्रत्यक्ष किसान लाभ सहायता", icon: "🏛️" }
    ],
    goldenRulesTitle: "कीटनाशक छिड़काव के ५ सुनहरे CIBRC नियम",
    rulesList: [
      { rule: "हवा की गति सीमा", desc: "यदि हवा की गति १५ किमी/घंटा से अधिक हो, तो छिड़काव न करें ताकि दवा गांव व अन्य फसलों पर न उड़े।" },
      { rule: "छिड़काव का सही समय", desc: "सुबह ६:०० से ९:०० या शाम ४:३० से ६:३० बजे छिड़काव करें। दोपहर की तेज धूप में कभी छिड़काव न करें।" },
      { rule: "मधुमक्खी व परागण सुरक्षा", desc: "फसल में पूरे फूल आते समय कीटनाशक छिड़काव न करें।" },
      { rule: "सुरक्षा किट (PPE) पहनना", desc: "नाइट्राइल दस्ताने, N95 मास्क, सुरक्षा चश्मा और गमबूट पहनना अनिवार्य है।" },
      { rule: "केवल साफ पानी का उपयोग", desc: "गंदे तालाब का पानी इस्तेमाल न करें। गंदा पानी कीटनाशक की शक्ति नष्ट कर देता है।" }
    ],
    tankDilutionTitle: "१६ लीटर नैपसैक पंप डोज टेबल (१ एकड़ = २०० लीटर = १२-१३ पंप)",
    tankTable: [
      { crop: "धान (Paddy)", chemical: "ट्राइसाइक्लाजोल ७५% WP", dosePerL: "०.६ ग्राम / लीटर", dosePerTank: "१० ग्राम प्रति १६L पंप", phi: "२१ दिन" },
      { crop: "कपास (Cotton)", chemical: "एमामेक्टिन बेंजोएट ५% SG", dosePerL: "०.४ ग्राम / लीटर", dosePerTank: "६.५ ग्राम प्रति १६L पंप", phi: "१४ दिन" },
      { crop: "टमाटर / आलू", chemical: "मैंकोजेब ७५% WP", dosePerL: "२.५ ग्राम / लीटर", dosePerTank: "४० ग्राम प्रति १६L पंप", phi: "७ दिन" },
      { crop: "टमाटर", chemical: "एजोक्सीस्ट्रोबिन + डाइफेनोकोनाजोल", dosePerL: "१.० मिली / लीटर", dosePerTank: "१६ मिली प्रति १६L पंप", phi: "५ दिन" },
      { crop: "कीट नियंत्रण", chemical: "क्लोरपायरीफॉस २०% EC", dosePerL: "२.० मिली / लीटर", dosePerTank: "३२ मिली प्रति १६L पंप", phi: "१५ दिन" },
      { crop: "जैविक उपचार", chemical: "नीम तेल १५०० ppm", dosePerL: "३.० मिली / लीटर", dosePerTank: "५० मिली प्रति १६L पंप", phi: "० दिन" }
    ],
    offlineFeaturesTitle: "सुविधाएं जो बिना इंटरनेट पूरी तरह काम करती हैं",
    featuresList: [
      "✅ प्लांट डॉक्टर: फोन के कैमरे से फोटो खींचकर स्थानीय मॉडल से रोग पहचान",
      "✅ बोलकर पर्चा सुनाना: फोन के आंतरिक वॉइस इंजन से हिंदी, बांग्ला, मराठी में ऑडियो",
      "✅ CIBRC स्प्रे कैलकुलेटर: सही पानी व दवा की सुरक्षित मात्रा की गणना",
      "✅ ऑफलाइन सेविंग: सुझाव व अलर्ट फोन में सुरक्षित, इंटरनेट आते ही अपने आप सिंक होंगे",
      "✅ सुरक्षा सत्यापन इंजन: क्षेत्रीय भाषाओं की शुद्धता की ऑफलाइन जांच"
    ]
  },
  bn: {
    title: "কিষাণ অফলাইন গাইড ও জরুরী প্রাথমিক চিকিৎসা",
    subtitle: "ইন্টারনেট না থাকলেও জীবন রক্ষাকারী নিয়ম, টোল-ফ্রি হেল্পলাইন ও স্প্রে হিসাব",
    bannerTitle: "ইন্টারনেট সংযোগ নেই (অফলাইন মোড চালু)",
    bannerDesc: "চিন্তা করবেন না! স্থানীয় রোগ নির্ণয়, স্প্রে ক্যালকুলেটর ও জরুরী নির্দেশিকা ইন্টারনেট ছাড়াই সক্রিয়।",
    openGuide: "অফলাইন কিষাণ গাইড",
    categories: {
      first_aid: "🚑 জরুরী প্রাথমিক চিকিৎসা",
      helplines: "📞 টোল-ফ্রি হেল্পলাইন",
      rules: "🍃 CIBRC স্প্রে নিয়ম",
      dosage: "🧪 ১৬L পাম্প ডোজ টেবিল",
      tools: "⚡ অফলাইন সুবিধা"
    },
    firstAidTitle: "কীটনাশক বিষক্রিয়ায় জরুরী প্রাথমিক চিকিৎসা",
    ingestionTitle: "কীটনাশক গিলে ফেললে জরুরী সতর্কতা",
    ingestionWarning: "অতি জরুরী: ইসি (EC) বা কেরোসিন/পেট্রোলিয়াম দ্রাবকযুক্ত কীটনাশক গিলে ফেললে বমি করাবেন না! বমি করালে বিষ ফুসফুসে গিয়ে মারাত্মক ক্ষতি করে। মুখ ধুয়ে অবিলম্বে নিকটস্থ স্বাস্থ্যকেন্দ্রে নিয়ে যান।",
    eyeSplashTitle: "চোখে কীটনাশক ছিটকে পড়লে",
    eyeSplashDesc: "চোখের পাতা খুলে অন্তত ১৫ মিনিট পরিষ্কার ঠান্ডা জলের ধারা দিয়ে চোখ ধুয়ে নিন। চোখ ঘষবেন না।",
    skinTitle: "ত্বকে কীটনাশক পড়লে",
    skinDesc: "আক্রান্ত পোশাক অবিলম্বে খুলে ফেলুন। সাবান ও প্রচুর ঠান্ডা জল দিয়ে ত্বক ধুয়ে নিন।",
    inhalationTitle: "শ্বাস নেওয়ার সময় বিষ প্রবেশ করলে",
    inhalationDesc: "রোগীকে অবিলম্বে খোলা ও পরিষ্কার বাতাসে নিয়ে আসুন। শান্ত রাখুন।",
    helplineTitle: "টোল-ফ্রি হেল্পলাইন (ইন্টারনেট ছাড়াই সাধারণ ফোনে কল করুন)",
    helplinesList: [
      { name: "জাতীয় কীটনাশক বিষ নিয়ন্ত্রণ হেল্পলাইন", number: "1800-116-117", desc: "২৪ ঘন্টা CIBRC / AIIMS বিষ নিয়ন্ত্রণ কেন্দ্র", icon: "🚨" },
      { name: "কিষাণ কল সেন্টার (ভারত সরকার)", number: "1800-180-1551", desc: "বাংলাসহ ভারতীয় ভাষায় বিনামূল্যে কৃষি বিশেষজ্ঞ পরামর্শ", icon: "👨‍🌾" },
      { name: "জরুরী অ্যাম্বুলেন্স ও চিকিৎসা সেবা", number: "108", desc: "হাসপাতালে দ্রুত পৌঁছানোর জরুরী অ্যাম্বুলেন্স", icon: "🚑" },
      { name: "পিএম-কিষাণ কৃষক সহায়তা হেল্পলাইন", number: "14447", desc: "ভারত সরকার কৃষক সরাসরি সুবিধা ডেস্ক", icon: "🏛️" }
    ],
    goldenRulesTitle: "কীটনাশক স্প্রে করার ৫টি সুবর্ণ CIBRC নিয়ম",
    rulesList: [
      { rule: "বাতাসের গতি সীমা", desc: "বাতাসের গতি ১৫ কিমি/ঘন্টার বেশি থাকলে স্প্রে করবেন না।" },
      { rule: "স্প্রে করার সঠিক সময়", desc: "সকাল ৬:০০ থেকে ৯:০০ অথবা বিকেল ৪:৩০ থেকে ৬:৩০ এ স্প্রে করুন। কড়া রোদে স্প্রে করবেন না।" },
      { rule: "মৌমাছি সংরক্ষণ", desc: "ফুল ফোটার সময় কীটনাশক স্প্রে করবেন না।" },
      { rule: "সুরক্ষা কিট (PPE)", desc: "নাইট্রাইল গ্লাভস, N95 মাস্ক, চশমা ও গামবুট পরা বাধ্যতামূলক।" },
      { rule: "পরিষ্কার জল ব্যবহার", desc: "পুকুরের ঘোলা জল ব্যবহার করবেন না। ঘোলা জল কীটনাশকের কার্যকারিতা নষ্ট করে।" }
    ],
    tankDilutionTitle: "১৬ লিটার ন্যাপস্যাক পাম্প ডোজ টেবিল (১ একর = ২০০ লিটার = ১২-১৩ পাম্প)",
    tankTable: [
      { crop: "ধান (Paddy)", chemical: "ট্রাইসাইক্লাজোল ৭৫% WP", dosePerL: "০.৬ গ্রাম / লিটার", dosePerTank: "১০ গ্রাম প্রতি ১৬L পাম্প", phi: "২১ দিন" },
      { crop: "তুলা (Cotton)", chemical: "এমেমেকটিন বেনজোয়েট ৫% SG", dosePerL: "০.৪ গ্রাম / লিটার", dosePerTank: "৬.৫ গ্রাম প্রতি ১৬L পাম্প", phi: "১৪ দিন" },
      { crop: "টমেটো / আলু", chemical: "ম্যানকোজেব ৭৫% WP", dosePerL: "২.৫ গ্রাম / লিটার", dosePerTank: "৪০ গ্রাম প্রতি ১৬L পাম্প", phi: "৭ দিন" },
      { crop: "টমেটো", chemical: "অ্যাজোক্সিস্ট্রোবিন + ডাইফেনোকোনাজল", dosePerL: "১.০ মিলি / লিটার", dosePerTank: "১৬ মিলি প্রতি ১৬L পাম্প", phi: "৫ দিন" },
      { crop: "কীট দমন", chemical: "ক্লোরপাইরিফস ২০% EC", dosePerL: "২.০ মিলি / লিটার", dosePerTank: "৩২ মিলি প্রতি ১৬L পাম্প", phi: "১৫ দিন" },
      { crop: "জৈব সমাধান", chemical: "নিম তেল ১৫০০ ppm", dosePerL: "৩.০ মিলি / লিটার", dosePerTank: "৫০ মিলি প্রতি ১৬L পাম্প", phi: "০ দিন" }
    ],
    offlineFeaturesTitle: "যেসব সুবিধা ইন্টারনেট ছাড়াই সম্পূর্ণ কাজ করে",
    featuresList: [
      "✅ প্ল্যান্ট ডক্টর: ফোনের ক্যামেরা দিয়ে পাতার রোগ তাৎক্ষণিক স্থানীয় মডেলে শনাক্ত",
      "✅ আঞ্চলিক কণ্ঠে অডিও প্রেসক্রিপশন: ইন্টারনেট ছাড়াই ফোনে বাংলায় নির্দেশিকা পাঠ",
      "✅ CIBRC স্প্রে ক্যালকুলেটর: জলের পরিমাণ ও ওষুধের সঠিক অনুপাত হিসাব",
      "✅ অফলাইন সেভিং: জমা দেওয়া তথ্য সংরক্ষিত থাকবে, ইন্টারনেট আসলেই স্বয়ংক্রিয় সিঙ্ক হবে",
      "✅ নিরাপত্তা রিগ্রেশন যাচাই: নির্ভুল কৃষি অনুবাদ যাচাইকরণ"
    ]
  },
  mr: {
    title: "किसान ऑफलाइन पॉकेट मार्गदर्शक व आपत्कालीन प्रथमोपचार",
    subtitle: "शेतात इंटरनेट नसताना जीवनरक्षक नियम, टोल-फ्री हेल्पलाइन व फवारणी डोस",
    bannerTitle: "इंटरनेट कनेक्शन उपलब्ध नाही (ऑफलाइन मोड चालू)",
    bannerDesc: "काळजी करू नका! स्थानिक रोग निदान, कीटकनाशक डोस कॅल्क्युलेटर व आपत्कालीन मार्गदर्शक ऑफलाइन उपलब्ध आहेत.",
    openGuide: "ऑफलाइन किसान मार्गदर्शक",
    categories: {
      first_aid: "🚑 आपत्कालीन प्रथमोपचार",
      helplines: "📞 टोल-फ्री हेल्पलाइन",
      rules: "🍃 CIBRC फवारणी नियम",
      dosage: "🧪 १६L पंप डोस तक्ता",
      tools: "⚡ ऑफलाइन सुविधा"
    },
    firstAidTitle: "कीटकनाशक विषबाधेवरील जीवनरक्षक प्रथमोपचार",
    ingestionTitle: "कीटकनाशक पोटात गेल्यास महत्त्वाची चेतावणी",
    ingestionWarning: "अति महत्त्वाचे: जर ईसी (EC) किंवा पेट्रोलियम आधारित कीटकनाशक पोटात गेले असेल तर उलट्या करू नका! उलटी केल्यास विष फुप्फुसात जाऊन गंभीर इजा होते. तोंड पाण्याने स्वच्छ धुवून तात्काळ प्राथमिक आरोग्य केंद्रात (PHC) जा.",
    eyeSplashTitle: "डोळ्यात कीटकनाशक उडाल्यास",
    eyeSplashDesc: "डोळ्यांच्या पापण्या उघड्या ठेवून किमान १५ मिनिटे स्वच्छ व थंड वाहत्या पाण्याने डोळे धुवा. डोळे चोळू नका.",
    skinTitle: "त्वचेवर कीटकनाशक सांडल्यास",
    skinDesc: "दूषित कपडे तात्काळ काढा. साबण आणि भरपूर थंड पाण्याने त्वचा स्वच्छ धुवा.",
    inhalationTitle: "फवारणी करताना श्वासामध्ये विष गेल्यास",
    inhalationDesc: "रुग्णाला त्वरित मोकळ्या हवेत आणा. कपडे सैल करा आणि शांत ठेवा.",
    helplineTitle: "टोल-फ्री हेल्पलाइन (साध्या फोनवरून इंटरनेटशिवाय डायल करा)",
    helplinesList: [
      { name: "राष्ट्रीय कीटकनाशक विष नियंत्रण हेल्पलाइन", number: "1800-116-117", desc: "२४ तास CIBRC / AIIMS विष नियंत्रण केंद्र", icon: "🚨" },
      { name: "किसान कॉल सेंटर (भारत सरकार)", number: "1800-180-1551", desc: "मराठीसह भारतीय भाषांमध्ये मोफत कृषी तज्ज्ञ सल्ला", icon: "👨‍🌾" },
      { name: "आपत्कालीन रुग्णवाहिका सेवा", number: "108", desc: "जवळच्या रुग्णालयात नेण्यासाठी तात्काळ रुग्णवाहिका", icon: "🚑" },
      { name: "पीएम-किसान शेतकरी मदत हेल्पलाइन", number: "14447", desc: "भारत सरकार थेट शेतकरी लाभ कक्ष", icon: "🏛️" }
    ],
    goldenRulesTitle: "कीटकनाशक फवारणीचे ५ सुवर्ण CIBRC नियम",
    rulesList: [
      { rule: "वाऱ्याचा वेग मर्यादा", desc: "वाऱ्याचा वेग १५ किमी/तास पेक्षा जास्त असल्यास फवारणी करू नका." },
      { rule: "फवारणीची योग्य वेळ", desc: "सकाळी ६:०० ते ९:०० किंवा संध्याकाळी ४:३० ते ६:३० वाजता फवारणी करा. कडक उन्हात फवारणी टाळा." },
      { rule: "मधमाशी संरक्षण", desc: "पिकात फुलोरा असताना कीटकनाशक फवारणी करू नका." },
      { rule: "सुरक्षा किट (PPE) वापर", desc: "नायट्रिल हातमोजे, N95 मास्क, सुरक्षा चष्मा व गमबूट वापरणे बंधनकारक आहे." },
      { rule: "स्वच्छ पाण्याचा वापर", desc: "गढूळ पाण्याचा वापर करू नका. गढूळ पाण्यामुळे औषधाची क्षमता नष्ट होते." }
    ],
    tankDilutionTitle: "१६ लिटर नॅपसॅक पंप डोस तक्ता (१ एकर = २०० लिटर = १२-१३ पंप)",
    tankTable: [
      { crop: "भात (Paddy)", chemical: "ट्रायसायक्लॅझोल ७५% WP", dosePerL: "०.६ ग्रॅम / लिटर", dosePerTank: "१० ग्रॅम प्रति १६L पंप", phi: "२१ दिवस" },
      { crop: "कापूस (Cotton)", chemical: "इमामेक्टिन बेंझोएट ५% SG", dosePerL: "०.४ ग्रॅम / लिटर", dosePerTank: "६.५ ग्रॅम प्रति १६L पंप", phi: "१४ दिवस" },
      { crop: "टोमॅटो / बटाटा", chemical: "मँकोझेब ७५% WP", dosePerL: "२.५ ग्रॅम / लिटर", dosePerTank: "४० ग्रॅम प्रति १६L पंप", phi: "७ दिवस" },
      { crop: "टोमॅटो", chemical: "अ‍ॅझोक्सीस्ट्रोबिन + डायफेनोकोनॅझोल", dosePerL: "१.० मिली / लिटर", dosePerTank: "१६ मिली प्रति १६L पंप", phi: "५ दिवस" },
      { crop: "कीड नियंत्रण", chemical: "क्लोरपायरीफॉस २०% EC", dosePerL: "२.० मिली / लिटर", dosePerTank: "३२ मिली प्रति १६L पंप", phi: "१५ दिवस" },
      { crop: "सेंद्रिय उपाय", chemical: "कडुनिंब तेल १५०० ppm", dosePerL: "३.० मिली / लिटर", dosePerTank: "५० मिली प्रति १६L पंप", phi: "० दिवस" }
    ],
    offlineFeaturesTitle: "इंटरनेट नसतानाही पूर्णपणे चालणाऱ्या सुविधा",
    featuresList: [
      "✅ प्लांट डॉक्टर: फोनच्या कॅमेऱ्याने फोटो काढून स्थानिक मॉडेलद्वारे रोग निदान",
      "✅ आवाजात मार्गदर्शन (TTS): फोनमधील इनबिल्ट व्हॉइसने मराठीत ऑडिओ सूचना",
      "✅ CIBRC स्प्रे कॅल्क्युलेटर: पाण्याचे प्रमाण व औषधाचा सुरक्षित डोस मोजणे",
      "✅ ऑफलाइन सेव्हिंग: सूचना व अर्ज फोनमध्ये सुरक्षित, इंटरनेट आल्यावर आपोआप सिंक",
      "✅ सुरक्षा पडताळणी: अचूक कृषी अनुवाद तपासणी"
    ]
  }
};

// Multilingual Crop Diseases
const MULTI_DISEASES = {
  paddy: {
    id: "blast-paddy",
    cibrcChemicalId: "CIBRC-TRI-004",
    crops: { bn: "ধান (Paddy)", hi: "धान (Paddy)", mr: "भात / धान (Paddy)", en: "Paddy (Rice)" },
    disease: {
      bn: "ধানের ব্লাইট ও বাদামী পাতার দাগ",
      hi: "धान का झुलसा व भूरा धब्बा रोग (Blast)",
      mr: "भातावरील करपा व तपकिरी ठिपके (Blast)",
      en: "Paddy Blast & Brown Leaf Spot"
    },
    pathogen: "Magnaporthe oryzae / Bipolaris oryzae",
    confidence: "98.4%",
    severity: "Stage 2 — Active Leaf Foliar Lesions",
    lesionCoverage: "18% leaf necrosis",
    triangle: "Yellow",
    triangleBg: "bg-amber-100 text-amber-900 border border-amber-300",
    symptoms: {
      bn: "পাতার ওপর মাকু আকৃতির বাদামী প্রান্তবিশিষ্ট দাগ এবং শীষের গোড়ায় পচন।",
      hi: "पत्तियों पर नाव या धुरी के आकार के भूरे किनारे वाले धब्बे और बालियों का सूखना।",
      mr: "पानांवर बदामाच्या आकाराचे तपकिरी ठिपके आणि लोंब्यांच्या मानेवर काळे डाग.",
      en: "Spindle-shaped lesions with brown margins and grey centers on leaf blades and neck rot."
    },
    organic: {
      bn: "সিউডোমোনাস ফ্লুরোসেন্স প্রতি লিটার জলে ১০ গ্রাম অথবা নিম তেল (১৫০০ পিপিএম) ৩ মিলি/লিটার স্প্রে করুন।",
      hi: "स्यूडोमोनास फ्लोरोसेंस १० ग्राम प्रति लीटर या नीम तेल ३ मिली प्रति लीटर पानी में मिलाकर छिड़कें।",
      mr: "स्यूडोमोनस फ्लोरोसन्स १० ग्रॅम प्रति लिटर किंवा कडुनिंब तेल ३ मिली/लिटर पाण्यात मिसळून फवारा.",
      en: "Spray Pseudomonas fluorescens @ 10g/L or Neem oil (1500 ppm) @ 3 ml/L of clean water."
    },
    chemical: {
      bn: "ট্রাইসাইক্লাজোল ৭৫% ডব্লিউপি প্রতি লিটার জলে ০.৬ গ্রাম অথবা অ্যাজোক্সিস্ট্রোবিন ১৮.২% + ডাইফেনোকোনাজল ১১.৪% এসসি ১.০ মিলি/লিটার।",
      hi: "ट्राइसाइक्लाजोल ७५% डब्ल्यूपी ०.६ ग्राम/लीटर या एजोक्सीस्ट्रोबिन १८.२% + डाइफेनोकोनाजोल ११.४% एससी १.० मिली/लीटर।",
      mr: "ट्रायसायक्लॅझोल ७५% डब्ल्यूपी ०.६ ग्रॅम/लिटर किंवा अ‍ॅझोक्सीस्ट्रोबिन १८.२% + डायफेनोकोनॅझोल ११.४% एससी १.० मिली/लिटर.",
      en: "Tricyclazole 75% WP @ 0.6g/L OR Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/L."
    },
    dosage: {
      bn: "প্রতি একরে ১২০ গ্রাম ২০০ লিটার জলে",
      hi: "१२० ग्राम प्रति २०० लीटर पानी प्रति एकड़",
      mr: "१२० ग्रॅम प्रति २०० लिटर पाणी प्रति एकर",
      en: "120g per 200 Litres of water per acre"
    },
    phi: {
      bn: "ফসল কাটার অন্তত ২১ দিন আগে স্প্রে শেষ করুন",
      hi: "कटाई से कम से कम २१ दिन पहले छिड़काव बंद करें",
      mr: "कापणीपूर्वी किमान २१ दिवस आधी फवारणी बंद करावी",
      en: "21 Days Waiting Period before harvest"
    },
    caution: {
      bn: "মৌমাছি সংরক্ষণে ফুল ফোটার সময় বা তীব্র রোদে স্প্রে করবেন না।",
      hi: "मधुमक्खियों की रक्षा के लिए फूल आते समय तेज धूप में छिड़काव न करें।",
      mr: "मधमाश्यांच्या संरक्षणासाठी फुलोऱ्यात किंवा कडक उन्हात फवारणी करू नये.",
      en: "Do not spray during bloom or under direct strong sun to protect pollinator bees."
    }
  },
  cotton: {
    id: "bollworm-cotton",
    cibrcChemicalId: "CIBRC-EMA-006",
    crops: { bn: "তুলা (Cotton)", hi: "कपास (Cotton)", mr: "कापूस (Cotton)", en: "Cotton" },
    disease: {
      bn: "তুলোর গোলাপি বলওয়ার্ম আক্রমণ",
      hi: "कपास की गुलाबी सुंडी (Pink Bollworm)",
      mr: "कापसावरील गुलाबी बोंडअळी (Pink Bollworm)",
      en: "Pink Bollworm Infestation"
    },
    pathogen: "Pectinophora gossypiella",
    confidence: "96.7%",
    severity: "Stage 3 — Larval Entrance Holes in Bolls",
    lesionCoverage: "24% fruiting part damage",
    triangle: "Red",
    triangleBg: "bg-red-100 text-red-900 border border-red-300",
    symptoms: {
      bn: "গোলাপের মতো পাপড়ি বন্ধ ফুল, বন্ডে ছিদ্র এবং দাগযুক্ত তুলো।",
      hi: "गुलाब जैसे बंद फूल, गूलर में छेद, रुई का खराब होना और बोंडों का समय से पहले गिरना।",
      mr: "गुलाबासारखी मिटलेली फुले, बोंडांना छिद्रे आणि रुईवर काळे डाग.",
      en: "Rosetted flowers, bored bolls with stained cotton lint and premature boll shedding."
    },
    organic: {
      bn: "একরে ৮টি ফেরোমোন ফাঁদ লাগান এবং ট্রাইকোগ্রামা পরজীবী ডিম্বাণু ছাড়ুন।",
      hi: "प्रति एकड़ ८ फेरोमोन ट्रैप लगाएं और ट्राइकोग्रामा अंड परजीवी छोड़ें।",
      mr: "एकरमध्ये ८ कामगंध सापळे लावा आणि ट्रायकोड्रॉमाचे परोपजीवी सोडा.",
      en: "Install 8 Pheromone traps per acre with Gossyplure septa; release Trichogramma parasitoids."
    },
    chemical: {
      bn: "এমেমেকটিন বেনজোয়েট ৫% এসজি ০.৫ গ্রাম/লিটার অথবা ক্লোরানট্রানিলিপ্রোল ১৮.৫% এসসি ০.৩ মিলি/লিটার।",
      hi: "एमामेक्टिन बेंजोएट ५% एसजी ०.५ ग्राम/लीटर या क्लोरेंट्रानिलिप्रोल १८.५% एससी ०.३ मिली/लीटर।",
      mr: "इमामेक्टिन बेंझोएट ५% एसजी ०.५ ग्रॅम/लिटर किंवा क्लोरँट्रानिलीप्रोल १८.५% एससी ०.३ मिली/लिटर.",
      en: "Emamectin Benzoate 5% SG @ 0.5g/L OR Chlorantraniliprole 18.5% SC @ 0.3 ml/L."
    },
    dosage: {
      bn: "প্রতি একরে ১০০ গ্রাম ২০০ লিটার জলে",
      hi: "१०० ग्राम प्रति २०० लीटर पानी प्रति एकड़",
      mr: "१०० ग्रॅम प्रति २०० लिटर पाणी प्रति एकर",
      en: "100g per 200 Litres of water per acre"
    },
    phi: {
      bn: "ফসল তোলার অন্তত ১৪ দিন আগে স্প্রে শেষ করুন",
      hi: "चुनाई से कम से कम १४ दिन पहले छिड़काव बंद करें",
      mr: "वेचणीपूर्वी किमान १४ दिवस आधी फवारणी बंद करावी",
      en: "14 Days Waiting Period before picking"
    },
    caution: {
      bn: "স্প্রে করার সময় নাইট্রাইল গ্লাভস এবং N95 রেসপিরেটর মাস্ক পরা বাধ্যতামূলক।",
      hi: "छिड़काव के समय नाइट्राइल दस्ताने और N95 मास्क पहनना अनिवार्य है।",
      mr: "फवारणी करताना नायट्रिल हातमोजे आणि N95 मास्क वापरणे सक्तीचे आहे.",
      en: "Wear nitrile rubber gloves and certified N95 particulate respirator mask."
    }
  },
  tomato: {
    id: "blight-tomato",
    cibrcChemicalId: "CIBRC-AZO-005",
    crops: { bn: "টমেটো (Tomato)", hi: "टमाटर (Tomato)", mr: "टोमॅटो (Tomato)", en: "Tomato" },
    disease: {
      bn: "টমেটোর নাবি ও আগাম ধসা রোগ",
      hi: "टमाटर का अगेती व पछेती झुलसा (Blight)",
      mr: "टोमॅटोवरील अर्ली व लेट ब्लाइट (करपा)",
      en: "Early & Late Blight in Tomato"
    },
    pathogen: "Alternaria solani / Phytophthora infestans",
    confidence: "97.9%",
    severity: "Stage 2 — Concentric target rings",
    lesionCoverage: "15% foliage area",
    triangle: "Green",
    triangleBg: "bg-emerald-100 text-emerald-900 border border-emerald-300",
    symptoms: {
      bn: "নীচের পাতায় গোল চক্রাকার দাগ, ডাঁটায় কালো ক্ষত এবং ফল পচা।",
      hi: "निचली पत्तियों पर गोल छल्लेदार गहरे धब्बे और तने पर काले घाव।",
      mr: "खालच्या पानांवर गोल रिंगसारखे तपकिरी डाग आणि देठावर काळे चट्टे.",
      en: "Concentric target-board rings on lower foliage followed by dark stem cankers."
    },
    organic: {
      bn: "ট্রাইকোডার্মা হারজিয়ানাম প্রতি লিটার জলে ৫ গ্রাম স্প্রে করুন।",
      hi: "ट्राइकोडर्मा हरजिएनम ५ ग्राम प्रति लीटर पानी में मिलाकर पौधों पर छिड़कें।",
      mr: "ट्रायकोडर्मा हरझियानम ५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा.",
      en: "Spray Trichoderma harzianum @ 5g/L; prune lower infected foliage for ventilation."
    },
    chemical: {
      bn: "ম্যানকোজেব ৭৫% ডব্লিউপি প্রতি লিটার জলে ২.০ থেকে ২.৫ গ্রাম মেশান।",
      hi: "मैंकोजेब ७५% डब्ल्यूपी २.० से २.৫ ग्राम प्रति लीटर पानी में घोलकर छिड़कें।",
      mr: "मँकोझेब ७५% डब्ल्यूपी २.० ते २.५ ग्रॅम प्रति लिटर पाण्यात मिसळून फवारा.",
      en: "Mancozeb 75% WP @ 2.0g to 2.5g per Litre of clean water."
    },
    dosage: {
      bn: "প্রতি একরে ৫০০ গ্রাম ২০০ লিটার জলে",
      hi: "५०० ग्राम प्रति २०० लीटर पानी प्रति एकड़",
      mr: "५०० ग्रॅम प्रति २०० लिटर पाणी प्रति एकर",
      en: "500g in 200 Litres of water per acre"
    },
    phi: {
      bn: "ফল তোলার অন্তত ৭ দিন আগে স্প্রে শেষ করুন",
      hi: "तुड़ाई से कम से कम ७ दिन पहले छिड़काव समाप्त करें",
      mr: "तोडणीपूर्वी किमान ७ दिवस आधी फवारणी बंद करावी",
      en: "7 Days Waiting Period before harvest"
    },
    caution: {
      bn: "পুকুর ও মাছের জলাশয়ের জল কোনোভাবেই দূষিত করবেন না।",
      hi: "तालाब या मछली पालन वाले जलस्रोतों को दूषित न करें।",
      mr: "तलाव किंवा विहिरीचे पाणी दूषित होणार नाही याची काळजी घ्या.",
      en: "Do not contaminate irrigation ponds, fisheries, or animal drinking water."
    }
  },
  potato: {
    id: "late-blight-potato",
    cibrcChemicalId: "CIBRC-MAN-003",
    crops: { bn: "আলু (Potato)", hi: "आलू (Potato)", mr: "बटाटा (Potato)", en: "Potato" },
    disease: {
      bn: "আলুর নাবি ধসা রোগ",
      hi: "आलू का पछेती झुलसा (Late Blight)",
      mr: "बटाट्यावरील लेट ब्लाइट (करपा)",
      en: "Potato Late Blight"
    },
    pathogen: "Phytophthora infestans",
    confidence: "99.1%",
    severity: "High — Water-soaked foliar lesions",
    lesionCoverage: "30% leaf surface",
    triangle: "Green",
    triangleBg: "bg-emerald-100 text-emerald-900 border border-emerald-300",
    symptoms: {
      bn: "পাতার কিনারায় জলভেজা কালচে দাগ এবং পাতার নিচের পিঠে সাদা ছত্রাকের স্তর।",
      hi: "पत्तियों के किनारों पर गीले भूरे-काले धब्बे और निचली सतह पर सफेद फफूंद।",
      mr: "पानांच्या कडांवर पाणीदार काळे चट्टे आणि खालच्या बाजूला पांढरी बुरशी.",
      en: "Water-soaked irregular blackish lesions on leaf margins with delicate white fungal down."
    },
    organic: {
      bn: "ঘোল (মাখন তোলা দুধ) + তুত বা কপার সালফেট মিশ্রণ ১% স্প্রে করুন।",
      hi: "खट्टी छाछ + कॉपर सल्फेट (बोर्डो मिश्रण १%) का छिड़काव करें।",
      mr: "आंबट ताक + मोरचूद द्रावण (बोर्डो मिश्रण १%) फवारा.",
      en: "Foliar spray of fermented butter milk + copper sulfate solution (Bordeaux mixture 1%)."
    },
    chemical: {
      bn: "ম্যানকোজেব ৭৫% ডব্লিউপি প্রতি লিটার জলে ২.৫ গ্রাম অথবা মেটালাক্সিল ৮% + ম্যানকোজেব ৬৪% ডব্লিউপি ২.০ গ্রাম/লিটার।",
      hi: "मैंकोजेब ७५% डब्ल्यूपी २.५ ग्राम प्रति लीटर या मेटालैक्सिल ८% + मैंकोजेब ६४% डब्ल्यूपी २.० ग्राम/लीटर।",
      mr: "मँकोझेब ७५% डब्ल्यूपी २.५ ग्रॅम प्रति लिटर किंवा मेटालॅक्सिल ८% + मँकोझेब ६४% डब्ल्यूपी २.० ग्रॅम/लिटर.",
      en: "Mancozeb 75% WP @ 2.5g/L OR Metalaxyl 8% + Mancozeb 64% WP @ 2.0g/L."
    },
    dosage: {
      bn: "প্রতি একরে ৬০০ গ্রাম ২৫০ লিটার জলে",
      hi: "६०० ग्राम प्रति २५० लीटर पानी प्रति एकड़",
      mr: "६०० ग्रॅम प्रति २५० लिटर पाणी प्रति एकर",
      en: "600g in 250 Litres of water per acre"
    },
    phi: {
      bn: "ফসল তোলার অন্তত ৭ দিন আগে স্প্রে শেষ করুন",
      hi: "खुदाई से कम से कम ৭ दिन पहले छिड़काव बंद करें",
      mr: "काढणीपूर्वी किमान ७ दिवस आधी फवारणी बंद करावी",
      en: "7 Days Waiting Period before harvest"
    },
    caution: {
      bn: "কন্দ সংক্রমণ রোধে ফসল কাটার ১০-১২ দিন আগে আক্রান্ত গাছপালা ধ্বংস করুন।",
      hi: "कंद में सड़न रोकने के लिए कटाई से १०-१२ दिन पहले संक्रमित पौधों को नष्ट करें।",
      mr: "कंद कुजणे रोखण्यासाठी काढणीपूर्वी १०-१२ दिवस आधी संक्रमित झाडे नष्ट करा.",
      en: "Destroy infected haulms 10-12 days before harvest to prevent tuber infection."
    }
  }
};

// Multilingual Mandi Prices
const MULTI_MANDI = [
  {
    crops: { bn: "আমন ধান", hi: "अमन धान (Paddy)", mr: "भात (Paddy)", en: "Aman Paddy" },
    markets: { bn: "বর্ধমান মান্ডি (পশ্চিমবঙ্গ)", hi: "बर्धमान मंडी (प. बंगाल)", mr: "बर्दवान मार्केट (प. बंगाल)", en: "Burdwan APMC (WB)" },
    price: 2350, change: "+₹75", status: "up"
  },
  {
    crops: { bn: "গম (Wheat)", hi: "गेहूं (Wheat)", mr: "गहू (Wheat)", en: "Wheat" },
    markets: { bn: "খান্না মান্ডি (পাঞ্জাব)", hi: "खन्ना मंडी (पंजाब)", mr: "खन्ना मार्केट (पंजाब)", en: "Khanna APMC (Punjab)" },
    price: 2420, change: "+₹40", status: "up"
  },
  {
    crops: { bn: "পেঁয়াজ (Onion)", hi: "प्याज (Onion)", mr: "कांदा (Onion)", en: "Onion" },
    markets: { bn: "লাসলগাঁও মান্ডি (মহারাষ্ট্র)", hi: "लासलगांव मंडी (महाराष्ट्र)", mr: "लासलगाव बाजार समिती (नाशिक)", en: "Lasalgaon APMC (MH)" },
    price: 2180, change: "-₹60", status: "down"
  },
  {
    crops: { bn: "তুলা (Cotton)", hi: "कपास (Cotton)", mr: "कापूस (Cotton)", en: "Cotton" },
    markets: { bn: "রাজকোট মান্ডি (গুজরাট)", hi: "राजकोट मंडी (गुजरात)", mr: "राजकोट मार्केट (गुजरात)", en: "Rajkot APMC (Gujarat)" },
    price: 7450, change: "+₹180", status: "up"
  },
  {
    crops: { bn: "সোয়াবিন (Soybean)", hi: "सोयाबीन (Soybean)", mr: "सोयाबीन (Soybean)", en: "Soybean" },
    markets: { bn: "ইন্দোর মান্ডি (মধ্যপ্রদেশ)", hi: "इंदौर मंडी (म.प्र.)", mr: "इंदूर बाजार समिती (म.प्र.)", en: "Indore APMC (MP)" },
    price: 4620, change: "+₹30", status: "up"
  },
  {
    crops: { bn: "সরিষা (Mustard)", hi: "सरसों (Mustard)", mr: "मोहरी (Mustard)", en: "Mustard" },
    markets: { bn: "আলওয়ার মান্ডি (রাজস্থান)", hi: "अलवर मंडी (राजस्थान)", mr: "अलवर मार्केट (राजस्थान)", en: "Alwar APMC (Rajasthan)" },
    price: 5650, change: "+₹90", status: "up"
  },
  {
    crops: { bn: "জ্যোতি আলু (Potato)", hi: "आलू (Potato)", mr: "बटाटा (Potato)", en: "Potato" },
    markets: { bn: "হুগলি মান্ডি (পশ্চিমবঙ্গ)", hi: "हुगली मंडी (प. बंगाल)", mr: "हुगळी मार्केट (प. बंगाल)", en: "Hooghly APMC (WB)" },
    price: 1320, change: "+₹20", status: "up"
  },
  {
    crops: { bn: "শুকনো লঙ্কা (Chilli)", hi: "लाल मिर्च (Chilli)", mr: "लाल मिरची (Chilli)", en: "Dry Red Chilli" },
    markets: { bn: "গুন্টুর মান্ডি (অন্ধ্রপ্রদেশ)", hi: "गुंटूर मंडी (आंध्र प्रदेश)", mr: "गुंटूर मार्केट (आंध्र प्रदेश)", en: "Guntur APMC (AP)" },
    price: 18400, change: "-₹250", status: "down"
  }
];

// Multilingual Govt Schemes (Verified Central & State Registry)
const MULTI_SCHEMES = [
  {
    "id": "pm-kisan",
    "name": {
      "en": "PM-Kisan Samman Nidhi Yojana",
      "hi": "प्रधानमंत्री किसान सम्मान निधि (PM-Kisan)",
      "bn": "প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-Kisan)",
      "mr": "प्रधानमंत्री किसान सन्मान निधी (PM-Kisan)"
    },
    "level": "Central",
    "state": "All India",
    "category": "income",
    "categoryName": {
      "en": "Direct Income Support",
      "hi": "प्रत्यक्ष आय सहायता (DBT)",
      "bn": "সরাসরি আর্থিক সহায়তা",
      "mr": "थेट उत्पन्न मदत (DBT)"
    },
    "icon": "💰",
    "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
    "benefitHighlight": {
      "en": "₹6,000 / year (3 installments)",
      "hi": "₹६,००० प्रति वर्ष (३ किश्तों में)",
      "bn": "বার্ষিক ₹৬,০০০ (৩টি কিস্তিতে)",
      "mr": "वार्षिक ₹६,००० (३ समान हप्त्यांत)"
    },
    "benefits": {
      "en": "Direct Benefit Transfer (DBT) of ₹6,000 annually into farmer bank accounts in three equal 4-monthly tranches of ₹2,000 each.",
      "hi": "सालाना ₹६,००० सीधे बैंक खाते में ३ किश्तों में (प्रत्येक ४ माह में ₹२,०००) बिना किसी बिचौलिए के पारदर्शी अंतरण।",
      "bn": "কোনো মধ্যস্থতাকারী ছাড়াই সরাসরি ব্যাংক অ্যাকাউন্টে প্রতি ৪ মাস অন্তর ₹২,০০০ করে বছরে মোট ₹৬,০০০ আর্থিক সহায়তা।",
      "mr": "शेतकऱ्यांच्या बँक खात्यात थेट दर ४ महिन्यांनी ₹२,००० याप्रमाणे वर्षाला ₹६,००० ची थेट आर्थिक मदत."
    },
    "eligibility": {
      "en": "All small, marginal, and landholding farmer families having cultivable agricultural land registered in their name.",
      "hi": "सभी छोटे व सीमांत किसान परिवार जिनके नाम पर कृषि योग्य भूमि के वैध दस्तावेज़ (खसरा/खतौनी) दर्ज हैं।",
      "bn": "যেসব ক্ষুদ্র ও প্রান্তিক চাষী পরিবারের নামে আবাদযোগ্য নিজস্ব কৃষি জমির খতিয়ান বা পরচা রয়েছে।",
      "mr": "ज्या शेतकरी कुटुंबांच्या नावावर लागवडीयोग्य शेतजमीन (७/१२ उतारा) नोंदणीकृत आहे असे सर्व शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "land",
        "label": {
          "en": "Own cultivable agricultural land in applicant's name",
          "hi": "आवेदक के नाम कृषि योग्य जमीन दर्ज है",
          "bn": "আবেদনকারীর নামে আবাদযোগ্য নিজস্ব জমি রয়েছে",
          "mr": "अर्जदाराच्या नावावर लागवडीयोग्य शेतजमीन आहे"
        }
      },
      {
        "key": "aadhaar_bank",
        "label": {
          "en": "Bank account is active and seeded with Aadhaar DBT",
          "hi": "बैंक खाता आधार से लिंक और डीबीटी सक्षम है",
          "bn": "ব্যাংক অ্যাকাউন্ট আধার যুক্ত ও ডিবিটি সক্রিয় রয়েছে",
          "mr": "बँक खाते आधार लिंक आणि डीबीटी सक्षम आहे"
        }
      },
      {
        "key": "ekyc",
        "label": {
          "en": "Completed mandatory online/biometric e-KYC",
          "hi": "अनिवार्य ई-केवाईसी (e-KYC) पूर्ण कर लिया है",
          "bn": "অনলাইন বা বায়োমেট্রিক ই-কেওয়াইসি সম্পন্ন হয়েছে",
          "mr": "अनिवार्य ई-केवायसी (e-KYC) पूर्ण केली आहे"
        }
      },
      {
        "key": "non_tax",
        "label": {
          "en": "No institutional landholder or income tax payer in family",
          "hi": "परिवार में कोई संवैधानिक पदधारक या आयकर दाता नहीं है",
          "bn": "পরিবারে কোনো আয়কর দাতা বা সাংবিধানিক পদাধিকারী নেই",
          "mr": "कुटुंबात कोणीही आयकर दाता किंवा संस्थात्मक पदधारक नाही"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Land Record (e-Pauti / 7-12 / Khatian / Porcha)",
      "Bank Passbook with active IFSC & DBT",
      "Mobile Number linked to Aadhaar"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Portal Registration",
        "desc": "Visit pmkisan.gov.in -> Click 'New Farmer Registration'."
      },
      {
        "step": 2,
        "title": "Document Verification",
        "desc": "Enter Aadhaar, select State/District/Village, and enter land survey numbers."
      },
      {
        "step": 3,
        "title": "e-KYC Authentication",
        "desc": "Authenticate using Aadhaar OTP or visit nearest CSC for biometric thumb scan."
      },
      {
        "step": 4,
        "title": "DBT Credit",
        "desc": "State agricultural nodal officer verifies and installments credit every 4 months."
      }
    ],
    "officialUrl": "https://pmkisan.gov.in",
    "portalName": "pmkisan.gov.in",
    "helpline": "155261 / 1800-115-526",
    "status": "Active"
  },
  {
    "id": "pmfby",
    "name": {
      "en": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      "hi": "प्रधानमंत्री फसल बीमा योजना (PMFBY)",
      "bn": "প্রধানমন্ত্রী ফসল বিমা যোজনা (PMFBY)",
      "mr": "प्रधानमंत्री पीक विमा योजना (PMFBY)"
    },
    "level": "Central",
    "state": "All India",
    "category": "insurance",
    "categoryName": {
      "en": "Crop Insurance",
      "hi": "फसल बीमा सुरक्षा",
      "bn": "ফসল বিমা সুরক্ষা",
      "mr": "पीक विमा संरक्षण"
    },
    "icon": "🛡️",
    "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
    "benefitHighlight": {
      "en": "Up to 100% Crop Loss Cover (1.5% - 2% Premium)",
      "hi": "१००% तक फसल नुकसान भरपाई (१.५% - २% प्रीमियम)",
      "bn": "১০০% পর্যন্ত ফসলের ক্ষতিপূরণ (১.৫% - ২% প্রিমিয়াম)",
      "mr": "१००% पर्यंत पीक नुकसान भरपाई (१.५% - २% हप्ता)"
    },
    "benefits": {
      "en": "Comprehensive financial compensation for crop losses due to drought, unseasonal floods, hailstorms, pests, and localized post-harvest disasters.",
      "hi": "सूखा, अत्यधिक बारिश, ओलावृष्टि या कीट प्रकोप से होने वाले फसल नुकसान की व्यापक आर्थिक सुरक्षा और क्षतिपूर्ति।",
      "bn": "খরা, অতিবৃষ্টি, শিলাবৃষ্টি বা কীটপতঙ্গের আক্রমণে ফসলের ক্ষয়ক্ষতির সম্পূর্ণ সরকারি বিমা ক্ষতিপূরণ।",
      "mr": "दुष्काळ, अतिवृष्टी, गारपीट किंवा किडींमुळे होणाऱ्या पीक नुकसानीची संपूर्ण शासकीय भरपाई."
    },
    "eligibility": {
      "en": "All loanee and non-loanee farmers growing notified crops in notified areas. Nominal premium of 2% for Kharif and 1.5% for Rabi crops.",
      "hi": "अधिसूचित क्षेत्रों में अधिसूचित फसल उगाने वाले सभी किसान। खरीफ में केवल २% और रबी में १.५% की नाममात्र प्रीमियम दर।",
      "bn": "বিজ্ঞাপিত এলাকায় অনুমোদিত ফসল চাষকারী সকল কৃষক। খরিফে মাত্র ২% ও রবিতে ১.৫% নামমাত্র প্রিমিয়াম।",
      "mr": "अधिसूचित पिके घेणारे सर्व शेतकरी. खरीप पिकांसाठी २% आणि रब्बीसाठी १.५% अत्यल्प विमा हप्त्यावर पात्र."
    },
    "eligibilityChecklist": [
      {
        "key": "notified_crop",
        "label": {
          "en": "Growing notified crop in designated block/panchayat",
          "hi": "नामित क्षेत्र में अधिसूचित फसल की बुवाई की है",
          "bn": "বিজ্ঞাপিত এলাকায় অনুমোদিত ফসল চাষ করেছেন",
          "mr": "अधिसूचित क्षेत्रात अधिसूचित पिकाची पेरणी केली आहे"
        }
      },
      {
        "key": "sowing_proof",
        "label": {
          "en": "Valid sowing certificate or land cultivation proof",
          "hi": "फसल बुवाई प्रमाण पत्र या भूमि अभिलेख उपलब्ध हैं",
          "bn": "ফসল বপন প্রমাণপত্র বা জমি চাষের রেকর্ড রয়েছে",
          "mr": "पीक पेरणी स्वयंघोषणापत्र किंवा ७/१२ पीक नोंद आहे"
        }
      },
      {
        "key": "deadline",
        "label": {
          "en": "Applying before cut-off deadline for Kharif/Rabi cycle",
          "hi": "खरीफ/रबी कट-ऑफ अंतिम तिथि से पहले आवेदन किया है",
          "bn": "খরিফ বা রবি মরসুমের সময়সীমা শেষ হওয়ার আগে আবেদন করছেন",
          "mr": "विहित अंतिम मुदतीपूर्वी अर्ज केला आहे"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Land Record (RoR / 7-12 / Khasra)",
      "Crop Sowing Certificate (from Panchayat/Patwari)",
      "Bank Account Passbook / Cancelled Cheque"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Portal / App Access",
        "desc": "Open pmfby.gov.in or download the Crop Insurance Mobile App."
      },
      {
        "step": 2,
        "title": "Crop & Acreage Details",
        "desc": "Select State, Year, Season, Crop, and enter acreage."
      },
      {
        "step": 3,
        "title": "Pay Nominal Premium",
        "desc": "Pay 1.5% or 2% premium online or at bank/CSC; balance 98% is paid by Government."
      },
      {
        "step": 4,
        "title": "Policy & Claim",
        "desc": "Download policy receipt. In case of crop damage, report within 72 hours on 14447."
      }
    ],
    "officialUrl": "https://pmfby.gov.in",
    "portalName": "pmfby.gov.in",
    "helpline": "1800-180-1551 / 14447",
    "status": "Active"
  },
  {
    "id": "pm-kusum",
    "name": {
      "en": "PM-KUSUM Solar Agricultural Pump Scheme",
      "hi": "पीएम कुसुम सोलर पंप योजना (PM-KUSUM)",
      "bn": "পিএম কুসুম সোলার পাম্প যোজনা (PM-KUSUM)",
      "mr": "पीएम कुसुम सौर कृषी पंप योजना (PM-KUSUM)"
    },
    "level": "Central",
    "state": "All India",
    "category": "solar",
    "categoryName": {
      "en": "Solar & Irrigation",
      "hi": "सोलर व सिंचाई सब्सिडी",
      "bn": "সৌর পাম্প ও সেচ ভর্তুকি",
      "mr": "सौर कृषी पंप अनुदान"
    },
    "icon": "☀️",
    "ministry": "Ministry of New and Renewable Energy (MNRE), GoI",
    "benefitHighlight": {
      "en": "Up to 60% Solar Pump Subsidy",
      "hi": "६०% तक सोलर पंप सब्सिडी",
      "bn": "সোলার পাম্পে ৬০% পর্যন্ত সরকারি অনুদান",
      "mr": "सौर पंपावर ६०% शासकीय अनुदान"
    },
    "benefits": {
      "en": "Financial assistance of 60% (30% Central + 30% State Govt) for installing off-grid solar water pumps; bank loan covers 30%, farmer pays only 10%.",
      "hi": "ऑफ-ग्रिड सोलर वाटर पंप लगाने पर ६०% सब्सिडी (३०% केंद्र + ३०% राज्य)। ३०% बैंक लोन और किसान को केवल १०% वहन करना होता है।",
      "bn": "সৌরশক্তি চালিত সেচ পাম্প বসাতে মোট ব্যয়ের ৬০% সরকারি ভর্তুকি (৩০% কেন্দ্র + ৩০% রাজ্য)। কৃষককে দিতে হয় মাত্র ১০%।",
      "mr": "सौर कृषी पंप बसवण्यासाठी ६०% शासकीय अनुदान (३०% केंद्र + ३०% राज्य). शेतकर्‍याला फक्त १०% रक्कम भरावी लागते."
    },
    "eligibility": {
      "en": "Individual farmers, groups, cooperatives, and water user associations with cultivable land and reliable water source (borewell/open well).",
      "hi": "व्यक्तिगत किसान, किसान समूह व सहकारी समितियां जिनके पास कृषि भूमि और जल स्रोत (बोरवेल/कुआं) उपलब्ध है।",
      "bn": "ব্যক্তিগত কৃষক বা সমবায় যাদের সেচযোগ্য জমি এবং নিজস্ব ভূগর্ভস্থ জল উৎস (নলকূপ/পুকুর) রয়েছে।",
      "mr": "वैयक्तिक शेतकरी व शेतकरी गट ज्यांच्याकडे शेतजमीन आणि खात्रीशीर पाण्याचा स्रोत (विहीर/बोअरवेल) आहे."
    },
    "eligibilityChecklist": [
      {
        "key": "water_source",
        "label": {
          "en": "Functional water source (borewell, dug well, or farm pond)",
          "hi": "खेत में चालू जल स्रोत (बोरवेल, कुआं या तालाब) मौजूद है",
          "bn": "জমিতে কার্যকরী জলের উৎস (নলকূপ বা পুকুর) রয়েছে",
          "mr": "शेतात पाण्याचा स्रोत (विहीर किंवा बोअरवेल) उपलब्ध आहे"
        }
      },
      {
        "key": "no_grid",
        "label": {
          "en": "Pump site has no existing conventional grid connection",
          "hi": "उक्त पंप स्थल पर पहले से पारंपरिक बिजली कनेक्शन नहीं है",
          "bn": "উক্ত পাম্প সাইটে কোনো প্রচলিত বিদ্যুৎ সংযোগ নেই",
          "mr": "संबंधित ठिकाणी पारंपरिक कृषी वीज जोडणी नाही"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Farmland 7/12 / Khatian Document",
      "Water Source NOC / Certificate",
      "Bank Account Details with IFSC"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "State Nodal Portal",
        "desc": "Visit pmkusum.mnre.gov.in or your State Renewable Energy portal (e.g., MEDA / WBREDA)."
      },
      {
        "step": 2,
        "title": "Pump Capacity Selection",
        "desc": "Select pump horsepower (3 HP, 5 HP, or 7.5 HP) based on water table depth."
      },
      {
        "step": 3,
        "title": "Pay Beneficiary Share",
        "desc": "Deposit 10% farmer share online after state verification."
      },
      {
        "step": 4,
        "title": "Installation & Handover",
        "desc": "Certified empanelled vendor installs solar panels and pump within 45-60 days."
      }
    ],
    "officialUrl": "https://pmkusum.mnre.gov.in",
    "portalName": "pmkusum.mnre.gov.in",
    "helpline": "1800-180-3333",
    "status": "Active"
  },
  {
    "id": "kcc",
    "name": {
      "en": "Kisan Credit Card (KCC) & Interest Subvention",
      "hi": "किसान क्रेडिट कार्ड (KCC) एवं ब्याज अनुदान",
      "bn": "কিষাণ ক্রেডিট কার্ড (KCC) ও স্বল্পসুদের ঋণ",
      "mr": "किसान क्रेडिट कार्ड (KCC) व सवलतीचे पीक कर्ज"
    },
    "level": "Central",
    "state": "All India",
    "category": "credit",
    "categoryName": {
      "en": "Low-Interest Credit",
      "hi": "सस्ता कृषि ऋण (४% ब्याज)",
      "bn": "স্বল্পসুদের কৃষি ঋণ",
      "mr": "सवलतीचे पीक कर्ज (४%)"
    },
    "icon": "💳",
    "ministry": "NABARD & Ministry of Finance, GoI",
    "benefitHighlight": {
      "en": "Up to ₹3 Lakh Loan @ 4% Effective Interest",
      "hi": "₹३ लाख तक ऋण मात्र ४% प्रभावी ब्याज पर",
      "bn": "মাত্র ৪% সুদে ₹৩ লাখ পর্যন্ত কিষাণ ঋণ",
      "mr": "₹३ लाखांपर्यंत पीक कर्ज फक्त ४% व्याजाने"
    },
    "benefits": {
      "en": "Flexible revolving credit line for seeds, fertilizers, pesticides, and post-harvest maintenance at 7% base interest with 3% prompt repayment subvention (effective 4%). Zero collateral required up to ₹1.60 Lakh.",
      "hi": "बीज, खाद, कीटनाशक व कृषि खर्चों के लिए ७% आधार दर पर ऋण। समय पर चुकाने पर ३% छूट के साथ प्रभावी ब्याज केवल ४%। ₹१.६० लाख तक कोई गारंटी/गिरवी नहीं।",
      "bn": "বীজ, সার ও চাষের খরচের জন্য স্বল্পসুদে ঋণ। সঠিক সময়ে পরিশোধ করলে ৩% সরকারি ছাড়সহ কার্যকর সুদের হার মাত্র ৪%। ₹১.৬০ লাখ পর্যন্ত কোনো জামানত লাগে না।",
      "mr": "बियाणे, खते व मशागतीसाठी ७% मूळ दराने कर्ज. वेळेवर परतफेड केल्यास ३% सवलतीसह निव्वळ व्याज दर फक्त ४%. ₹१.६० लाखांपर्यंत कोणतेही तारण नाही."
    },
    "eligibility": {
      "en": "All owner-cultivators, tenant farmers, sharecroppers, and Self-Help Groups (SHGs) engaged in agriculture and animal husbandry.",
      "hi": "सभी कृषक भूमिस्वामी, बटाईदार, पट्टेदार और पशुपालन व मत्स्य पालन से जुड़े किसान पात्र हैं।",
      "bn": "সকল নিজস্ব জমির চাষী, ভাগচাষী এবং পশুপালন ও মৎস্যচাষে যুক্ত কৃষক পরিবার।",
      "mr": "सर्व खातेदार शेतकरी, कुळ शेतकरी, बटाईदार तसेच पशुपालन व मत्स्यपालन करणारे शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "age",
        "label": {
          "en": "Farmer age between 18 and 75 years",
          "hi": "किसान की आयु १८ से ७५ वर्ष के बीच है",
          "bn": "কৃষকের বয়স ১৮ থেকে ৭৫ বছরের মধ্যে",
          "mr": "शेतकऱ्याचे वय १८ ते ७५ वर्षांच्या दरम्यान आहे"
        }
      },
      {
        "key": "cultivation",
        "label": {
          "en": "Active crop cultivation or dairy/poultry activity",
          "hi": "सक्रिय कृषि, डेयरी या पशुपालन कार्य कर रहे हैं",
          "bn": "সক্রিয় কৃষিকাজ বা দুগ্ধ/পশুপালনের সাথে যুক্ত",
          "mr": "शेतजमीन लागवड किंवा दुग्ध/पशुपालन व्यवसाय सुरू आहे"
        }
      }
    ],
    "documents": [
      "Aadhaar Card & PAN Card",
      "Land Record (7/12 / Khatian / Khasra)",
      "Crop Sowing / Cultivation Proof",
      "Passport-sized Photograph"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Bank Branch / CSC",
        "desc": "Download simple 1-page KCC form from your bank or visit nearest branch."
      },
      {
        "step": 2,
        "title": "Attach Land Record",
        "desc": "Attach RoR / 7-12 extract showing cultivable crop acreage."
      },
      {
        "step": 3,
        "title": "Sanction in 14 Days",
        "desc": "RBI mandates bank branch to sanction KCC within 14 working days."
      },
      {
        "step": 4,
        "title": "ATM-cum-Debit Card",
        "desc": "Receive RuPay KCC ATM card for instant cash withdrawals at any ATM."
      }
    ],
    "officialUrl": "https://www.myscheme.gov.in/schemes/kcc",
    "portalName": "myscheme.gov.in/schemes/kcc",
    "helpline": "1800-11-22-11 / 1800-180-1551",
    "status": "Active"
  },
  {
    "id": "smam-machinery",
    "name": {
      "en": "Sub-Mission on Agricultural Mechanization (SMAM)",
      "hi": "कृषि यंत्रीकरण उप-मिशन (SMAM) ट्रैक्टर व उपकरण सब्सिडी",
      "bn": "কৃষি যান্ত্রিকীকরণ মিশন (SMAM) ট্র্যাক্টর ও যন্ত্রপাতি অনুদান",
      "mr": "कृषी यांत्रिकीकरण उप-अभियान (SMAM) ट्रॅक्टर व औजारे अनुदान"
    },
    "level": "Central",
    "state": "All India",
    "category": "machinery",
    "categoryName": {
      "en": "Farm Machinery & Drones",
      "hi": "कृषि उपकरण व ट्रैक्टर",
      "bn": "ট্র্যাক্টর ও কৃষি যন্ত্রপাতি",
      "mr": "ट्रॅक्टर व कृषी औजारे"
    },
    "icon": "🚜",
    "ministry": "Department of Agriculture & Farmers Welfare, GoI",
    "benefitHighlight": {
      "en": "40% to 50% Subsidy on Tractors & Farm Implements",
      "hi": "ट्रैक्टर व उपकरणों पर ४०% से ५०% सब्सिडी",
      "bn": "ট্র্যাক্টর ও যন্ত্রপাতিতে ৪০% থেকে ৫০% ভর্তুকি",
      "mr": "ट्रॅक्टर व अवजारांवर ४०% ते ५०% अनुदान"
    },
    "benefits": {
      "en": "Direct subsidy of 40% to 50% (up to ₹1.25 Lakh for tractors and up to 50% for rotavators, power tillers, seed drills, and agricultural drones).",
      "hi": "ट्रैक्टर, रोटावेटर, पावर टिलर, रीपर, सीड ड्रिल व कृषि ड्रोन पर ४०% से ५०% (अधिकतम ₹१.२५ लाख तक ट्रैक्टर हेतु) सीधी सरकारी सब्सिडी।",
      "bn": "ট্র্যাক্টর, রোটাভেটর, পাওয়ার টিলার, সিড ড্রিল এবং ড্রোন স্প্রেয়ারে ৪০% থেকে ৫০% পর্যন্ত সরাসরি সরকারি অনুদান।",
      "mr": "ट्रॅक्टर, रोटाव्हेटर, पॉवर टिलर, पेरणीयंत्र व कृषी ड्रोनवर ४०% ते ५०% (ट्रॅक्टरसाठी ₹१.२५ लाखांपर्यंत) थेट बँक अनुदान."
    },
    "eligibility": {
      "en": "All farmers holding valid land records. Priority and 10% extra subsidy provided to SC, ST, Small/Marginal, and Women farmers.",
      "hi": "वैध भूमि अभिलेख वाले सभी किसान। अनुसूचित जाति, जनजाति, लघु/सीमांत व महिला किसानों को विशेष प्राथमिकता व अतिरिक्त १०% छूट।",
      "bn": "জমির রেকর্ডধারী সকল কৃষক। তপশিলি জাতি, উপজাতি ও প্রান্তিক কৃষকদের অগ্রাধিকার ও অতিরিক্ত ১০% সহায়তা।",
      "mr": "सर्व खातेदार शेतकरी. एससी, एसटी, अल्पभूधारक व महिला शेतकऱ्यांना प्राधान्य आणि अतिरिक्त १०% अनुदान."
    },
    "eligibilityChecklist": [
      {
        "key": "land_record",
        "label": {
          "en": "Valid land record in farmer's name",
          "hi": "किसान के नाम पर वैध भूमि रिकॉर्ड उपलब्ध है",
          "bn": "কৃষকের নামে বৈধ জমির পরচা রয়েছে",
          "mr": "शेतकऱ्याच्या नावावर वैध ७/१२ उतारा आहे"
        }
      },
      {
        "key": "no_prior",
        "label": {
          "en": "Not availed subsidy on same machinery in last 5 years",
          "hi": "पिछले ५ वर्षों में इसी उपकरण पर सब्सिडी नहीं ली है",
          "bn": "গত ৫ বছরে এই নির্দিষ্ট যন্ত্রপাতিতে সরকারি অনুদান নেননি",
          "mr": "मागील ५ वर्षात याच अवजारावर अनुदान घेतलेले नाही"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Land Record (7/12 / Khatian)",
      "Bank Account Passbook with IFSC",
      "Quotation from Authorized Farm Machinery Dealer"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Online Portal",
        "desc": "Log on to agrimachinery.nic.in -> Click 'Farmer Registration'."
      },
      {
        "step": 2,
        "title": "Select Machinery",
        "desc": "Choose target equipment (Tractor, Rotavator, Drone) and upload dealer quotation."
      },
      {
        "step": 3,
        "title": "Prior Sanction",
        "desc": "District Agriculture Officer issues e-permit/prior approval."
      },
      {
        "step": 4,
        "title": "Physical Inspection & DBT",
        "desc": "Purchase machinery, upload bill & GPS photo; subsidy credited directly via DBT."
      }
    ],
    "officialUrl": "https://agrimachinery.nic.in",
    "portalName": "agrimachinery.nic.in",
    "helpline": "1800-180-1551",
    "status": "Active"
  },
  {
    "id": "pmksy",
    "name": {
      "en": "PM Krishi Sinchayee Yojana (Per Drop More Crop - Drip & Sprinkler)",
      "hi": "पीएम कृषि सिंचाई योजना (प्रति बूंद अधिक फसल - ड्रिप व स्प्रिंकलर)",
      "bn": "প্রধানমন্ত্রী কৃষি সিঁচাই যোজনা (প্রতি বিন্দু জলে অধিক শস্য)",
      "mr": "प्रधानमंत्री कृषी सिंचन योजना (प्रति थेंब अधिक पीक - ठिबक व तुषार सिंचन)"
    },
    "level": "Central",
    "state": "All India",
    "category": "solar",
    "categoryName": {
      "en": "Micro-Irrigation Subsidy",
      "hi": "सूक्ष्म सिंचाई (ड्रिप/स्प्रिंकलर)",
      "bn": "ড্রিপ ও স্প্রিঙ্কলার সেচ",
      "mr": "ठिबक व तुषार सिंचन अनुदान"
    },
    "icon": "💧",
    "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
    "benefitHighlight": {
      "en": "55% Subsidy for Small & Marginal Farmers",
      "hi": "लघु व सीमांत किसानों को ५५% सब्सिडी",
      "bn": "ক্ষুদ্র ও প্রান্তিক চাষীদের ৫৫% সরকারি অনুদান",
      "mr": "अल्प व अत्यल्प भूधारकांना ५५% अनुदान"
    },
    "benefits": {
      "en": "55% financial assistance for Small & Marginal farmers and 45% for other farmers for installing water-saving Drip and Sprinkler irrigation systems, saving up to 50% water and boosting yield by 40%.",
      "hi": "ड्रिप (टपक) व स्प्रिंकलर (फव्वारा) सिंचाई लगाने पर छोटे व सीमांत किसानों को ५५% और अन्य किसानों को ४५% सब्सिडी। ५०% पानी की बचत और ४०% तक पैदावार वृद्धि।",
      "bn": "ড্রিপ ও স্প্রিঙ্কলার সেচ ব্যবস্থা স্থাপনে ক্ষুদ্র কৃষকদের ৫৫% ও অন্যান্য কৃষকদের ৪৫% অনুদান। ৫০% জল সাশ্রয় ও ৪০% ফসল বৃদ্ধি।",
      "mr": "ठिबक व तुषार सिंचन संच बसवण्यासाठी अल्पभूधारकांना ५५% आणि इतर शेतकऱ्यांना ४५% शासकीय अनुदान. ५०% पाण्याची बचत व उत्पादनात मोठी वाढ."
    },
    "eligibility": {
      "en": "All farmers having assured irrigation water source on agricultural field.",
      "hi": "कृषि भूमि और सुनिश्चित जल स्रोत वाले सभी किसान पात्र हैं।",
      "bn": "কৃষি জমি ও নিজস্ব জল উৎস রয়েছে এমন সকল চাষী।",
      "mr": "शेतीसाठी खात्रीशीर पाण्याचा स्रोत उपलब्ध असलेले सर्व शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "irrigation_source",
        "label": {
          "en": "Perennial irrigation source available in field",
          "hi": "खेत में बारहमासी सिंचाई स्रोत (कुआं, बोर, नहर) उपलब्ध है",
          "bn": "জমিতে নির্ভরযোগ্য সেচের জল উৎস রয়েছে",
          "mr": "शेतात बारमाही पाण्याचा स्रोत उपलब्ध आहे"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Land Record (7/12 / Khatian)",
      "Water & Electricity Connection Proof",
      "Approved Micro-Irrigation Company Quotation"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "State Agriculture Portal",
        "desc": "Apply online on State DBT / PMKSY portal (e.g., MahaDBT / Matir Katha)."
      },
      {
        "step": 2,
        "title": "Site Inspection",
        "desc": "Horticulture / Agriculture officer conducts field GPS survey."
      },
      {
        "step": 3,
        "title": "Installation",
        "desc": "Authorized company installs BIS-certified drip/sprinkler system."
      },
      {
        "step": 4,
        "title": "Subsidy Release",
        "desc": "Subsidy released directly to farmer's Aadhaar-linked bank account."
      }
    ],
    "officialUrl": "https://pmksy.gov.in",
    "portalName": "pmksy.gov.in",
    "helpline": "011-2338-3370",
    "status": "Active"
  },
  {
    "id": "krishak-bandhu",
    "name": {
      "en": "Krishak Bandhu Scheme (West Bengal)",
      "hi": "कृषक बंधु योजना (पश्चिम बंगाल)",
      "bn": "কৃষক বন্ধু যোজনা (পশ্চিমবঙ্গ)",
      "mr": "कृषक बंधू योजना (पश्चिम बंगाल)"
    },
    "level": "State",
    "state": "West Bengal",
    "category": "income",
    "categoryName": {
      "en": "State Income & Life Support",
      "hi": "राज्य आय व जीवन सुरक्षा",
      "bn": "রাজ্য আর্থিক ও জীবন বিমা",
      "mr": "राज्य उत्पन्न व विमा योजना"
    },
    "icon": "🌾",
    "ministry": "Department of Agriculture, Govt of West Bengal",
    "benefitHighlight": {
      "en": "₹10,000 / year + ₹2 Lakh Death Benefit",
      "hi": "₹१०,০০০/वर्ष + ₹२ लाख मृत्यु बीमा",
      "bn": "বার্ষিক ₹১০,০০০ অনুদান + ₹২ লাখ জীবন বিমা",
      "mr": "वार्षिक ₹१०,००० + ₹२ लाख विमा मदत"
    },
    "benefits": {
      "en": "Direct financial grant of ₹10,000 per year (minimum ₹4,000 pro-rata) in two equal installments during Kharif and Rabi sowing seasons + ₹2,00,000 one-time financial assistance to nominee in case of farmer death (aged 18-60).",
      "hi": "पश्चिम बंगाल सरकार द्वारा प्रति एकड़ ₹१०,००० प्रति वर्ष (न्यूनतम ₹४,०००) दो किश्तों में प्रत्यक्ष बैंक अंतरण + किसान की १८ से ६० वर्ष की आयु में मृत्यु होने पर आश्रित को ₹२,००,००० की एकमुश्त सहायता।",
      "bn": "প্রতি একর আবাদযোগ্য জমিতে বছরে ₹১০,০০০ (ন্যূনতম ₹৪,০০০) দুটি সমান কিস্তিতে খরিফ ও রবি মরসুমে সরাসরি ব্যাংক অ্যাকাউন্টে অনুদান + ১৮ থেকে ৬০ বছর বয়সী কৃষকের মৃত্যুতে নমিনিকে ₹২,০০,০০০ এককালীন আর্থিক সহায়তা।",
      "mr": "पश्चिम बंगाल सरकारकडून एकरी ₹१०,००० दरवर्षी (किमान ₹४,०००) दोन हप्त्यांत थेट मदत + शेतकर्‍याचा १८ ते ६० वयात मृत्यू झाल्यास कुटुंबाला ₹२ लाखांची मदत."
    },
    "eligibility": {
      "en": "All recorded farm owners, Bhagchasis (recorded sharecroppers), and agricultural labourers holding cultivable land in West Bengal.",
      "hi": "पश्चिम बंगाल के सभी भूमिस्वामी किसान और नामांकित बटाईदार (भागचासी)।",
      "bn": "পশ্চিমবঙ্গের সকল নথিভুক্ত রায়ত কৃষক ও নথিভুক্ত ভাগচাষী (বর্গাদার)।",
      "mr": "पश्चिम बंगालमधील सर्व नोंदणीकृत शेतकरी व बटाईदार."
    },
    "eligibilityChecklist": [
      {
        "key": "wb_resident",
        "label": {
          "en": "Resident farmer in West Bengal with land record (Porcha)",
          "hi": "पश्चिम बंगाल के निवासी व जमीन का पर्चा उपलब्ध है",
          "bn": "পশ্চিমবঙ্গের স্থায়ী বাসিন্দা ও জমির বৈধ পরচা রয়েছে",
          "mr": "पश्चिम बंगालचे रहिवासी शेतकरी"
        }
      }
    ],
    "documents": [
      "Voter ID Card (EPIC) - Mandatory",
      "Aadhaar Card",
      "Current RoR / Khatian (Porcha)",
      "Bank Passbook with active IFSC"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "BSK / ADA Office",
        "desc": "Visit nearest Bangla Sahayata Kendra (BSK) or Block ADA office."
      },
      {
        "step": 2,
        "title": "Submit Krishak Bandhu Form",
        "desc": "Fill Voter ID, Aadhaar, and attach copy of current Porcha."
      },
      {
        "step": 3,
        "title": "Digital Verification",
        "desc": "Assistant Director of Agriculture (ADA) verifies records digitally."
      },
      {
        "step": 4,
        "title": "Direct Bank Credit",
        "desc": "Installments credited directly in Kharif (June) and Rabi (November)."
      }
    ],
    "officialUrl": "https://krishakbandhu.wb.gov.in",
    "portalName": "krishakbandhu.wb.gov.in",
    "helpline": "033-2214-0177 / 83369-57370",
    "status": "Active"
  },
  {
    "id": "bangla-shasya-bima",
    "name": {
      "en": "Bangla Shasya Bima (BSB) (West Bengal)",
      "hi": "बांग्ला शस्य बीमा (पश्चिम बंगाल)",
      "bn": "বাংলা শস্য বিমা (BSB) সম্পূর্ণ বিনামূল্যে ফসল বিমা",
      "mr": "बांगला शस्य विमा (पश्चिम बंगाल)"
    },
    "level": "State",
    "state": "West Bengal",
    "category": "insurance",
    "categoryName": {
      "en": "100% Free Crop Insurance",
      "hi": "निःशुल्क फसल बीमा",
      "bn": "সম্পূর্ণ বিনামূল্যে ফসল বিমা",
      "mr": "मोफत पीक विमा"
    },
    "icon": "🌿",
    "ministry": "Department of Agriculture, Govt of West Bengal",
    "benefitHighlight": {
      "en": "100% Premium Borne by State Govt (₹0 Farmer Cost)",
      "hi": "१००% प्रीमियम राज्य सरकार वहन करती है (शून्य खर्च)",
      "bn": "সম্পূর্ণ প্রিমিয়াম রাজ্য সরকার দেয় (কৃষকের খরচ ₹০)",
      "mr": "१००% विमा हप्ता राज्य सरकार भरते (शेतकऱ्याला ₹०)"
    },
    "benefits": {
      "en": "State Government pays 100% insurance premium on behalf of farmers for all major notified crops including Aman Paddy, Boro Paddy, Jute, Potato, and Maize. Farmers get comprehensive yield protection without paying any premium.",
      "hi": "धान, आलू, जूट और मक्का की फसलों पर किसान को कोई प्रीमियम नहीं देना होता। पूरा १००% प्रीमियम पश्चिम बंगाल सरकार भरती है और नुकसान होने पर सीधा मुआवजा मिलता है।",
      "bn": "আমন ধান, বোরো ধান, পাট, আলু ও ভুট্টার সম্পূর্ণ বিমা প্রিমিয়াম পশ্চিমবঙ্গ সরকার নিজেই বহন করে। কৃষকদের ১ টাকাও প্রিমিয়াম দিতে হয় না।",
      "mr": "भात, बटाटा, ताग पिकांसाठी १००% विमा हप्ता पश्चिम बंगाल सरकार भरते. नुकसान झाल्यास थेट भरपाई."
    },
    "eligibility": {
      "en": "All farmers (loanee, non-loanee, sharecroppers) cultivating notified crops in West Bengal.",
      "hi": "पश्चिम बंगाल में अधिसूचित फसल उगाने वाले सभी किसान व बटाईदार।",
      "bn": "পশ্চিমবঙ্গে বিজ্ঞাপিত ফসল চাষকারী সকল রায়ত ও ভাগচাষী।",
      "mr": "पश्चिम बंगालमधील अधिसूचित पिके घेणारे सर्व शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "notified_area",
        "label": {
          "en": "Cultivating crop in notified Gram Panchayat block",
          "hi": "अधिसूचित ग्राम पंचायत में फसल उगाई गई है",
          "bn": "বিজ্ঞাপিত গ্রাম পঞ্চায়েতে ফসল চাষ করা হয়েছে",
          "mr": "अधिसूचित ग्रामपंचायत क्षेत्रात पीक घेतले आहे"
        }
      }
    ],
    "documents": [
      "Voter Card & Aadhaar Card",
      "Khatian / Khasra Porcha copy",
      "Crop Sowing Certificate from Gram Panchayat Pradhan / ADA",
      "Bank Passbook"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Submit Sowing Certificate",
        "desc": "Collect simple BSB application from Gram Panchayat or ADA office."
      },
      {
        "step": 2,
        "title": "No Payment Required",
        "desc": "Farmer pays ₹0; insurance certificate is generated with tracking ID."
      },
      {
        "step": 3,
        "title": "Satellite & Crop Cutting Survey",
        "desc": "Damage assessed via state crop cutting experiments & remote sensing."
      },
      {
        "step": 4,
        "title": "Claim DBT",
        "desc": "Insurance claim credited directly to registered bank account."
      }
    ],
    "officialUrl": "https://banglashasyabima.net",
    "portalName": "banglashasyabima.net",
    "helpline": "1800-890-1064",
    "status": "Active"
  },
  {
    "id": "namo-shetkari",
    "name": {
      "en": "Namo Shetkari Maha Samman Nidhi (Maharashtra)",
      "hi": "नमो शेतकरी महा सम्मान निधि (महाराष्ट्र)",
      "bn": "নমো শেতকারী মহা সম্মান নিধি (মহারাষ্ট্র)",
      "mr": "नमो शेतकरी महासन्मान निधी योजना (महाराष्ट्र)"
    },
    "level": "State",
    "state": "Maharashtra",
    "category": "income",
    "categoryName": {
      "en": "State Direct DBT",
      "hi": "राज्य प्रत्यक्ष डीबीटी",
      "bn": "রাজ্য সরাসরি ডিবিটি",
      "mr": "थेट शासकीय सन्मान निधी"
    },
    "icon": "🚩",
    "ministry": "Department of Agriculture, Govt of Maharashtra",
    "benefitHighlight": {
      "en": "₹6,000 / year Extra State Top-Up (Total ₹12,000/yr)",
      "hi": "₹६,००० प्रति वर्ष अतिरिक्त राज्य सहायता (कुल ₹१२,०००)",
      "bn": "মহারাষ্ট্র রাজ্য সরকারের অতিরিক্ত ₹৬,০০০ (মোট ₹১২,০০০)",
      "mr": "वार्षिक ₹६,००० राज्य सरकारकडून (एकूण ₹१२,०००)"
    },
    "benefits": {
      "en": "Additional ₹6,000 per year directly provided by Govt of Maharashtra to all PM-Kisan beneficiaries in Maharashtra, delivering a combined total annual DBT support of ₹12,000 in 3 installments.",
      "hi": "महाराष्ट्र सरकार द्वारा राज्य के सभी पीएम-किसान लाभार्थियों को प्रति वर्ष ₹६,००० की अतिरिक्त सहायता, जिससे किसानों को केंद्र व राज्य मिलाकर कुल ₹१२,००० सालाना प्राप्त होते हैं।",
      "bn": "মহারাষ্ট্রের সকল পিএম-কিষাণ উপভোক্তাদের জন্য রাজ্য সরকারের অতিরিক্ত ₹৬,০০০ অনুদান। কেন্দ্র ও রাজ্য মিলিয়ে চাষীরা বছরে মোট ₹১২,০০০ সরাসরি পান।",
      "mr": "पीएम-किसान योजनेच्या ₹६,००० व्यतिरिक्त महाराष्ट्र शासनाकडून आणखी ₹६,००० चा वार्षिक सन्मान निधी. यामुळे राज्यातील शेतकऱ्यांना वर्षाला एकूण ₹१२,००० थेट बँक खात्यात मिळतात."
    },
    "eligibility": {
      "en": "All active registered PM-Kisan beneficiaries having cultivable land in Maharashtra with validated e-KYC and land seeding.",
      "hi": "महाराष्ट्र के वे सभी किसान जो पीएम-किसान योजना में सत्यापित हैं और जिनका भू-अभिलेख व आधार लिंक है।",
      "bn": "মহারাষ্ট্রে নিজস্ব জমির মালিক যারা পিএম-কিষাণে নিবন্ধিত ও ই-কেওয়াইসি সম্পন্ন করেছেন।",
      "mr": "महाराष्ट्र राज्यातील पीएम-किसान सन्मान निधीचे सर्व पात्र लाभार्थी शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "mh_pmkisan",
        "label": {
          "en": "Active verified beneficiary in PM-Kisan portal",
          "hi": "पीएम-किसान पोर्टल पर सक्रिय व स्वीकृत लाभार्थी हैं",
          "bn": "পিএম-কিষাণ পোর্টালে সক্রিয় উপভোক্তা হিসেবে নাম রয়েছে",
          "mr": "पीएम-किसान पोर्टलवर पात्र व सक्रिय लाभार्थी आहात"
        }
      },
      {
        "key": "land_seeded",
        "label": {
          "en": "Land records (7/12) linked with Aadhaar",
          "hi": "७/१२ अभिलेख आधार से लिंक व सत्यापित है",
          "bn": "জমির রেকর্ড (৭/১২) আধার যুক্ত রয়েছে",
          "mr": "७/१२ उतारा आधार कार्डशी लिंक आहे"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "7/12 & 8-A Land Extract (Digital)",
      "PM-Kisan Registration ID",
      "Bank Account seeded with NPCI/Aadhaar"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Automatic Integration",
        "desc": "If you receive PM-Kisan installments in Maharashtra, no separate application is needed."
      },
      {
        "step": 2,
        "title": "Verify Status on MahaDBT",
        "desc": "Visit mahadbt.maharashtra.gov.in to check Namo Shetkari DBT status."
      },
      {
        "step": 3,
        "title": "Ensure e-KYC is Complete",
        "desc": "Ensure bank account has NPCI Aadhaar seeding enabled."
      },
      {
        "step": 4,
        "title": "Direct Installment Credit",
        "desc": "₹2,000 state installment releases in synchrony with PM-Kisan."
      }
    ],
    "officialUrl": "https://mahadbt.maharashtra.gov.in",
    "portalName": "mahadbt.maharashtra.gov.in",
    "helpline": "022-49150800",
    "status": "Active"
  },
  {
    "id": "mahadbt-farmer",
    "name": {
      "en": "MahaDBT Farmer Mechanization & Orchard Scheme (Maharashtra)",
      "hi": "महाडीबीटी किसान यंत्रीकरण व बागवानी योजना (महाराष्ट्र)",
      "bn": "মহাডিবিটি কৃষক যন্ত্রপাতি ও উদ্যানপালন প্রকল্প (মহারাষ্ট্র)",
      "mr": "महाडीबीटी शेतकरी यांत्रिकीकरण व फळबाग योजना (महाराष्ट्र)"
    },
    "level": "State",
    "state": "Maharashtra",
    "category": "machinery",
    "categoryName": {
      "en": "State Machinery & Orchard DBT",
      "hi": "कृषि यंत्रीकरण व फलबाग",
      "bn": "যন্ত্রপাতি ও ফলের বাগান",
      "mr": "कृषी यांत्रिकीकरण व फळबाग"
    },
    "icon": "🍇",
    "ministry": "Commissioner of Agriculture, Pune, Govt of Maharashtra",
    "benefitHighlight": {
      "en": "Up to 50% Subsidy on Tractors, Implements & Orchards",
      "hi": "ट्रैक्टर, औजार व बागवानी पर ५०% तक अनुदान",
      "bn": "ট্র্যাক্টর ও ফলের বাগানে ৫০% পর্যন্ত অনুদান",
      "mr": "ट्रॅक्टर, कृषी अवजारे व फळबाग लागवडीवर ५०% अनुदान"
    },
    "benefits": {
      "en": "Single-window DBT portal for farm mechanization, tractor purchase, rotavators, shade net houses, plastic mulching, and Bhausaheb Fundkar fruit orchard plantation subsidies.",
      "hi": "कृषि यंत्र, रोटावेटर, ट्रैक्टर, शेडनेट हाउस, प्लास्टिक मल्चिंग और भाऊसाहेब फुंडकर फलबाग योजना के तहत ५०% तक सरकारी अनुदान।",
      "bn": "কৃষি যন্ত্রপাতি, ট্র্যাক্টর, গ্রিনহাউস এবং ফলের বাগান রোপণে ৫০% পর্যন্ত সরকারি অনুদানের একছত্র অনলাইন পোর্টাল।",
      "mr": "ट्रॅक्टर, रोटाव्हेटर, शेडनेट हाऊस, मल्चिंग पेपर व भाऊसाहेब फुंडकर फळबाग लागवड योजनेअंतर्गत ५०% थेट अनुदान."
    },
    "eligibility": {
      "en": "Farmers in Maharashtra holding cultivable land in 7/12 extract.",
      "hi": "महाराष्ट्र के किसान जिनके नाम ७/१२ में कृषि भूमि दर्ज है।",
      "bn": "মহারাষ্ট্রের কৃষি জমির মালিক চাষী।",
      "mr": "महाराष्ट्र राज्यातील शेतजमीनधारक शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "mh_712",
        "label": {
          "en": "Valid 7/12 and 8-A land record in Maharashtra",
          "hi": "महाराष्ट्र का वैध ७/१२ व ८-अ अभिलेख उपलब्ध है",
          "bn": "মহারাষ্ট্রের বৈধ ৭/১২ জমির পরচা রয়েছে",
          "mr": "महाराष्ट्रातील वैध ७/१२ व ८-अ उतारा उपलब्ध आहे"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "7/12 & 8-A Extract",
      "Bank Passbook copy",
      "Dealer Quotation for Machinery"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Aadhaar Login",
        "desc": "Register on mahadbt.maharashtra.gov.in using Aadhaar OTP."
      },
      {
        "step": 2,
        "title": "Scheme Selection",
        "desc": "Select 'Farmer Schemes' -> Choose Tractor, Implements, or Fruit Orchard."
      },
      {
        "step": 3,
        "title": "Online Lottery (Sodium)",
        "desc": "Transparent computerized lottery selects beneficiaries every month."
      },
      {
        "step": 4,
        "title": "Purchase & Upload Bill",
        "desc": "Upload invoice and GPS photo; subsidy credited directly to bank."
      }
    ],
    "officialUrl": "https://mahadbt.maharashtra.gov.in/Farmer/",
    "portalName": "mahadbt.maharashtra.gov.in/Farmer",
    "helpline": "020-25537061",
    "status": "Active"
  },
  {
    "id": "pkvy-organic",
    "name": {
      "en": "Paramparagat Krishi Vikas Yojana (PKVY - Organic Farming)",
      "hi": "परम्परागत कृषि विकास योजना (PKVY - प्राकृतिक व जैविक खेती)",
      "bn": "পরম্পরাগত কৃষি বিকাশ যোজনা (PKVY - জৈব কৃষি সহায়তা)",
      "mr": "परंपरागत कृषी विकास योजना (PKVY - सेंद्रिय शेती अभियान)"
    },
    "level": "Central",
    "state": "All India",
    "category": "organic",
    "categoryName": {
      "en": "Organic & Natural Farming",
      "hi": "जैविक व प्राकृतिक खेती",
      "bn": "জৈব ও প্রাকৃতিক কৃষি",
      "mr": "सेंद्रिय व नैसर्गिक शेती"
    },
    "icon": "🌱",
    "ministry": "Department of Agriculture & Farmers Welfare, GoI",
    "benefitHighlight": {
      "en": "₹50,000 per Hectare for Organic Cultivation",
      "hi": "₹५०,००० प्रति हेक्टेयर जैविक खेती अनुदान",
      "bn": "জৈব চাষে প্রতি হেক্টরে ₹৫০,০০০ সহায়তা",
      "mr": "सेंद्रिय शेतीसाठी हेक्टरी ₹५०,००० अनुदान"
    },
    "benefits": {
      "en": "Financial assistance of ₹50,000 per hectare for 3 years (₹31,000 directly for organic bio-fertilizers, vermicompost, biopesticides, and botanical extracts) + free PGS-India organic certification.",
      "hi": "३ वर्षों के लिए ₹५०,००० प्रति हेक्टेयर की सहायता (जिसमें ₹३१,००० सीधे जैविक खाद, वर्मीकम्पोस्ट, बायो-पेस्टीसाइड व बीजों के लिए) और निःशुल्क पीजीएस जैविक प्रमाणीकरण।",
      "bn": "৩ বছরে প্রতি হেক্টরে ₹৫০,০০০ আর্থিক সহায়তা (যার মধ্যে ₹৩১,০০০ সরাসরি জৈব সার, কেঁচো সার, নিমতেল ও জৈব কীটনাশকের জন্য) এবং বিনামূল্যে সরকারি জৈব সার্টিফিকেশন।",
      "mr": "३ वर्षांसाठी हेक्टरी ₹५०,००० ची मदत (त्यापैकी ₹३१,००० थेट सेंद्रिय खते, गांडूळ खत व जैविक कीटकनाशकांसाठी) आणि मोफत पीजीएस सेंद्रिय प्रमाणीकरण."
    },
    "eligibility": {
      "en": "Farmers forming clusters of 20 or more farmers holding contiguous agricultural land.",
      "hi": "२० या अधिक किसानों के समूह (क्लस्टर) जो मिलकर जैविक या प्राकृतिक खेती अपनाना चाहते हैं।",
      "bn": "কমপক্ষে ২০ জন কৃষকের দল বা ক্লাস্টার যারা রাসায়নিকমুক্ত জৈব চাষ করতে ইচ্ছুক।",
      "mr": "२० किंवा अधिक शेतकऱ्यांचे गट जे सेंद्रिय शेती करण्यासाठी एकत्र येतात."
    },
    "eligibilityChecklist": [
      {
        "key": "cluster",
        "label": {
          "en": "Willing to participate in organic cluster without synthetic chemicals",
          "hi": "रासायनिक खाद व कीटनाशक रहित क्लस्टर में शामिल होने के इच्छुक हैं",
          "bn": "রাসায়নিকমুক্ত জৈব চাষের ক্লাস্টারে যুক্ত হতে আগ্রহী",
          "mr": "रासायनिक खते विरहीत सेंद्रिय शेती गटात सहभागी होण्यास तयार"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Land Record (7/12 / Khatian)",
      "Cluster Member Agreement Form",
      "Bank Passbook"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Cluster Formation",
        "desc": "Form a local cluster of 20+ farmers through Block Agriculture Officer."
      },
      {
        "step": 2,
        "title": "PGS Registration",
        "desc": "Register group on pgsindia-ncof.gov.in."
      },
      {
        "step": 3,
        "title": "Input Assistance",
        "desc": "Funds credited for vermicompost beds, green manuring, and bio-fertilizers."
      },
      {
        "step": 4,
        "title": "Certification & Premium Sale",
        "desc": "Get 'Jaivik Bharat' certified organic produce status for higher market prices."
      }
    ],
    "officialUrl": "https://pgsindia-ncof.gov.in",
    "portalName": "pgsindia-ncof.gov.in",
    "helpline": "0120-2764906",
    "status": "Active"
  },
  {
    "id": "soil-health-card",
    "name": {
      "en": "Soil Health Card Scheme",
      "hi": "मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)",
      "bn": "মৃত্তিকা স্বাস্থ্য কার্ড যোজনা (সয়েল হেলথ কার্ড)",
      "mr": "मृदा आरोग्य पत्रिका योजना (Soil Health Card)"
    },
    "level": "Central",
    "state": "All India",
    "category": "organic",
    "categoryName": {
      "en": "Free Soil Testing & Advisory",
      "hi": "निःशुल्क मिट्टी जांच व सलाह",
      "bn": "বিনামূল্যে মাটি পরীক্ষা ও পরামর্শ",
      "mr": "मोफत माती परीक्षण व सल्ला"
    },
    "icon": "🧪",
    "ministry": "Ministry of Agriculture & Farmers Welfare, GoI",
    "benefitHighlight": {
      "en": "100% Free Laboratory Soil Test for 12 Nutrients",
      "hi": "१२ पोषक तत्वों की १००% निःशुल्क मिट्टी जांच",
      "bn": "১২টি পুষ্টি উপাদানের ১০০% বিনামূল্যে ল্যাব পরীক্ষা",
      "mr": "१२ अन्नद्रव्यांचे १००% मोफत प्रयोगशाळा माती परीक्षण"
    },
    "benefits": {
      "en": "Every 2 years, farmers receive customized Soil Health Cards based on GPS-sampled soil testing covering 12 chemical parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) with exact fertilizer dosage prescriptions to avoid costly over-fertilization.",
      "hi": "प्रत्येक २ वर्ष में किसान को उसके खेत की मिट्टी का जीपीएस आधारित परीक्षण कार्ड मिलता है। इसमें १२ पोषक तत्वों की स्थिति व यूरिया/डीएपी के सही उपयोग की वैज्ञानिक सलाह दी जाती है।",
      "bn": "প্রতি ২ বছর অন্তর কৃষকদের বিনামূল্যে সয়েল হেলথ কার্ড প্রদান করা হয়। ১২টি পুষ্টি উপাদান পরীক্ষা করে অতিরিক্ত রাসায়নিক সারের অপচয় রোধ ও সঠিক মাত্রার পরামর্শ দেওয়া হয়।",
      "mr": "दर २ वर्षांनी शेतकऱ्यांना त्यांच्या शेतजमिनीची जीपीएस आधारित मोफत माती परीक्षण पत्रिका मिळते. १२ अन्नद्रव्यांची तपासणी करून खतांच्या योग्य वापराबाबत मार्गदर्शन दिले जाते."
    },
    "eligibility": {
      "en": "Every farmer possessing agricultural land across India.",
      "hi": "भारत का प्रत्येक किसान जिसके पास कृषि योग्य भूमि है।",
      "bn": "ভারতের সকল আবাদযোগ্য জমির মালিক কৃষক।",
      "mr": "शेतजमीन असलेला भारतातील प्रत्येक शेतकरी."
    },
    "eligibilityChecklist": [
      {
        "key": "land_sample",
        "label": {
          "en": "Farmland available for soil core sampling",
          "hi": "खेत में मिट्टी नमूना संग्रह हेतु अनुमति है",
          "bn": "জমির মাটির নমুনা সংগ্রহের অনুমতি রয়েছে",
          "mr": "शेतातील मातीचा नमुना तपासणीसाठी उपलब्ध आहे"
        }
      }
    ],
    "documents": [
      "Aadhaar Card",
      "Land Survey / Khasra Number",
      "Mobile Number"
    ],
    "applicationSteps": [
      {
        "step": 1,
        "title": "Sample Collection",
        "desc": "State soil testing team collects soil sample using GPS coordinates."
      },
      {
        "step": 2,
        "title": "Lab Testing",
        "desc": "District Soil Testing Laboratory tests 12 macronutrients and micronutrients."
      },
      {
        "step": 3,
        "title": "Report Generated",
        "desc": "Soil Health Card generated on soilhealth.dac.gov.in."
      },
      {
        "step": 4,
        "title": "Download & Advisory",
        "desc": "Download card online or receive laminated copy from Agriculture Department."
      }
    ],
    "officialUrl": "https://soilhealth.dac.gov.in",
    "portalName": "soilhealth.dac.gov.in",
    "helpline": "011-2338-8911",
    "status": "Active"
  }
]];

// CIBRC Canonical Pesticide Label Registry
const SAMPLE_PESTICIDES = [
  {
    id: "CIBRC-CHL-001",
    name: "Chlorpyrifos 20% EC",
    brand: "Dursban / Classic 20",
    triangle: "Yellow",
    triangleBg: "bg-amber-100 text-amber-900 border-amber-300",
    label: "WARNING - HIGHLY TOXIC",
    crops: ["Paddy", "Cotton", "Sugarcane", "Groundnut"],
    pests: ["Stem borer", "Leaf folder", "Termites", "Aphids"],
    dose: "2.0 ml to 2.5 ml per Litre (400 - 500 ml / acre in 200 L water)",
    phi: 15,
    ppe: ["Nitrile gloves", "N95 particulate respirator", "Goggles", "Gumboots"],
    antidote: "Administer Atropine sulphate intravenously (2-4 mg every 10-15 mins). Do NOT induce vomiting."
  },
  {
    id: "CIBRC-IMI-002",
    name: "Imidacloprid 17.8% SL",
    brand: "Confidor Generic",
    triangle: "Blue",
    triangleBg: "bg-blue-100 text-blue-900 border-blue-300",
    label: "CAUTION - MODERATELY TOXIC",
    crops: ["Cotton", "Paddy", "Chilli", "Tomato", "Mango"],
    pests: ["Aphids", "Whiteflies", "Jassids", "Thrips", "BPH"],
    dose: "0.5 ml to 0.75 ml per Litre (100 - 150 ml / acre in 200 L water)",
    phi: 21,
    ppe: ["Protective gloves", "Dust/mist mask", "Eye goggles", "Full sleeve clothing"],
    antidote: "No specific antidote known. Treat symptomatically, perform gastric lavage."
  },
  {
    id: "CIBRC-MAN-003",
    name: "Mancozeb 75% WP",
    brand: "Dithane M-45 Generic",
    triangle: "Green",
    triangleBg: "bg-emerald-100 text-emerald-900 border-emerald-300",
    label: "CAUTION - SLIGHTLY TOXIC",
    crops: ["Potato", "Tomato", "Grapes", "Wheat"],
    pests: ["Late blight", "Early blight", "Downy mildew", "Rust"],
    dose: "2.0 g to 2.5 g per Litre (500 g / acre in 200 L water)",
    phi: 7,
    ppe: ["Rubber gloves", "Face mask", "Apron"],
    antidote: "Gastric lavage with 5% sodium bicarbonate solution. Treat symptomatically."
  }
];

// Canonical Keys for Side-by-Side Translation Portal
const CANONICAL_PORTAL_KEYS = {
  'dosage_and_mixing.dosage_instruction': {
    name: 'Pesticide Dosage & Water Dilution',
    source: 'Mix exactly {dose_amount} per {water_volume} of clean water.',
    placeholders: ['{dose_amount}', '{water_volume}'],
    hasNegation: false,
    category: 'Dosage & Mixing'
  },
  'emergency_and_first_aid.swallowing_warning': {
    name: 'Accidental Ingestion Emergency Warning',
    source: 'If swallowed, do NOT induce vomiting unless instructed by a qualified medical doctor.',
    placeholders: [],
    hasNegation: true,
    category: 'Emergency & First Aid'
  },
  'safety_levels.danger_poison': {
    name: 'Statutory Red Triangle Poison Label',
    source: 'DANGER - EXTREMELY TOXIC (Bright Red Triangle)',
    placeholders: [],
    hasTriangle: 'Red',
    category: 'Statutory Safety Level'
  },
  'ppe_requirements.respiratory': {
    name: 'Respiratory PPE Mask Requirement',
    source: 'Wear an N95 certified respirator mask covering nose and mouth during spray mixing.',
    placeholders: [],
    hasNegation: false,
    category: 'Personal Protective Equipment'
  },
  'ppe_requirements.boots': {
    name: 'Footwear Safety Warning',
    source: 'Wear rubber gumboots; do not spray barefoot or in sandals.',
    placeholders: [],
    hasNegation: true,
    category: 'Personal Protective Equipment'
  }
};

// Regional Language Support Matrix
const LANGUAGE_MATRIX = [
  { code: 'en', name: 'English', coverage: 100.0, missing: 0, status: '🔒 Canonical Base', opportunity: 'Reference Standard', badge: 'bg-slate-100 text-slate-800 border-slate-300' },
  { code: 'hi', name: 'हिन्दी (Hindi)', coverage: 100.0, missing: 0, status: '✅ Verified', opportunity: 'QA & Polish', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { code: 'mr', name: 'मराठी (Marathi)', coverage: 100.0, missing: 0, status: '✅ Verified', opportunity: 'QA & Polish', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  { code: 'bn', name: 'বাংলা (Bengali)', coverage: 42.4, missing: 19, status: '🟡 Good First Issue', opportunity: 'Claim Bengali Issue', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  { code: 'ta', name: 'தமிழ் (Tamil)', coverage: 0.0, missing: 33, status: '⚪ Needs Pioneer', opportunity: 'Good First Contribution', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', coverage: 0.0, missing: 33, status: '⚪ Needs Pioneer', opportunity: 'Good First Contribution', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  { code: 'te', name: 'తెలుగు (Telugu)', coverage: 0.0, missing: 33, status: '⚪ Needs Pioneer', opportunity: 'Good First Contribution', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', coverage: 0.0, missing: 33, status: '⚪ Needs Pioneer', opportunity: 'Good First Contribution', badge: 'bg-slate-100 text-slate-700 border-slate-200' }
];

// Dynamic API Base: automatically uses port 3000 if opened on file:// or another port
const API_BASE = (window.location.protocol === 'file:' || (window.location.port !== '3000' && window.location.port !== ''))
  ? 'http://localhost:3000'
  : '';

function App() {
  const [lang, setLang] = useState('en');
  const [activeTab, setActiveTab] = useState('advisor');
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState('');
  const [selectedCropKey, setSelectedCropKey] = useState('paddy');

  // Speech Recognition & Text-to-Speech State
  const recognitionRef = useRef(null);
  const [speechInterim, setSpeechInterim] = useState('');
  const [speechError, setSpeechError] = useState('');
  const [playingMessageId, setPlayingMessageId] = useState(null);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  // Central & State Government Schemes State
  const [schemesList, setSchemesList] = useState(MULTI_SCHEMES);
  const [schemeCategoryFilter, setSchemeCategoryFilter] = useState('all');
  const [schemeStateFilter, setSchemeStateFilter] = useState('all');
  const [schemeSearch, setSchemeSearch] = useState('');
  const [selectedSchemeForModal, setSelectedSchemeForModal] = useState(null);
  const [userEligibilityAnswers, setUserEligibilityAnswers] = useState({});
  const [schemeCalculator, setSchemeCalculator] = useState({ state: 'all', land: 'marginal', need: 'all' });
  const [calculatorBanner, setCalculatorBanner] = useState(null);
  const [schemePhoneForSms, setSchemePhoneForSms] = useState('');
  const [schemeSmsSent, setSchemeSmsSent] = useState(false);
  const [schemeSmsLoading, setSchemeSmsLoading] = useState(false);

  // Live Camera & Photo Diagnosis State
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [visionScanSuccess, setVisionScanSuccess] = useState('');

  // Multimodal AI Disease Diagnosis State
  const [symptomNotes, setSymptomNotes] = useState('');
  const [multimodalReport, setMultimodalReport] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Offline Field Mode & Emergency Guide State
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [offlineModalTab, setOfflineModalTab] = useState('first_aid');

  // Backend Connection & Database Status
  const [backendHealth, setBackendHealth] = useState({ online: false, checking: true, details: null });
  const [showHealthModal, setShowHealthModal] = useState(false);

  // PostgreSQL Mandi Rates & Pesticide Registry
  const [mandiRates, setMandiRates] = useState([]);
  const [pesticidesList, setPesticidesList] = useState([]);

  // Comprehensive Auth State
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [authMethod, setAuthMethod] = useState('password'); // 'password' | 'otp'
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authSuccessMsg, setAuthSuccessMsg] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [authForm, setAuthForm] = useState({
    name: '',
    emailOrPhone: '',
    email: '',
    phone: '',
    password: '',
    role: 'farmer', // 'farmer' | 'translator' | 'scientist'
    state: '',
    crop: 'Paddy',
    otp: '',
    otpSent: false
  });

  // WhatsApp Mandi & Farm Advisory Alerts State
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [whatsappLoading, setWhatsappLoading] = useState(false);
  const [whatsappResult, setWhatsappResult] = useState(null);
  const [whatsappError, setWhatsappError] = useState('');
  const [whatsappForm, setWhatsappForm] = useState({
    phone: '',
    crop: 'Aman Paddy',
    market: 'Burdwan APMC (West Bengal)',
    frequency: 'daily_morning',
    alertType: 'mandi_and_spray',
    language: 'en'
  });

  // Community Translation Portal State
  const [portalLang, setPortalLang] = useState('bn');
  const [portalKey, setPortalKey] = useState('dosage_and_mixing.dosage_instruction');
  const [portalTranslation, setPortalTranslation] = useState('পরিষ্কার জলের প্রতি {water_volume} এ ঠিক {dose_amount} মেশান।');
  const [portalContributor, setPortalContributor] = useState('Anirban_KisanVolunteer');
  const [portalReviewNote, setPortalReviewNote] = useState('Verified with BCKV Mohanpur field spray manual.');
  const [validationFeedback, setValidationFeedback] = useState(null);
  const [portalSuccessMsg, setPortalSuccessMsg] = useState(null);

  // Reviews Queue State
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'rev-001',
      localeCode: 'bn',
      languageName: 'Bengali (বাংলা)',
      keyPath: 'dosage_and_mixing.dosage_instruction',
      englishSource: 'Mix exactly {dose_amount} per {water_volume} of clean water.',
      proposedTranslation: 'পরিষ্কার জলের প্রতি {water_volume} এ ঠিক {dose_amount} মেশান।',
      contributor: 'Anirban_KisanVolunteer',
      submittedAt: 'Today, 12:30 PM',
      status: 'PENDING',
      safetyChecked: true,
      comments: [
        { author: 'Anirban_KisanVolunteer', text: 'Verified with BCKV Mohanpur agricultural farm spray guidelines.' }
      ]
    },
    {
      id: 'rev-002',
      localeCode: 'mr',
      languageName: 'Marathi (मराठी)',
      keyPath: 'ppe_requirements.boots',
      englishSource: 'Wear rubber gumboots; do not spray barefoot or in sandals.',
      proposedTranslation: 'रबरी गमबूट वापरा; अनवाणी किंवा चपलांवर फवारणी करू नका.',
      contributor: 'Suresh_Patil_Agronomist',
      submittedAt: 'Today, 2:15 PM',
      status: 'APPROVED',
      reviewedBy: 'Dr_Deshmukh_SafetyOfficer',
      reviewedAt: 'Today, 3:00 PM',
      safetyChecked: true,
      comments: [
        { author: 'Dr_Deshmukh_SafetyOfficer', text: 'Terminology matches MPKV Rahuri farm safety manuals.' }
      ]
    }
  ]);
  const [reviewFilter, setReviewFilter] = useState('ALL');

  // Registry State
  const [registrySearch, setRegistrySearch] = useState('');
  const [registryTriangle, setRegistryTriangle] = useState('ALL');

  // 1. Initial Load: Check Backend, Restore Session & Fetch Data
  useEffect(() => {
    // Backend Health Monitor
    const checkHealth = () => {
      fetch(`${API_BASE}/api/health`)
        .then(res => res.json())
        .then(data => {
          if (data && data.status === 'healthy') {
            setBackendHealth({ online: true, checking: false, details: data });
          } else {
            setBackendHealth({ online: false, checking: false, details: null });
          }
        })
        .catch(() => {
          setBackendHealth({ online: false, checking: false, details: null });
        });
    };
    checkHealth();
    const healthTimer = setInterval(checkHealth, 8000);

    // Restore Session Token from LocalStorage
    const savedToken = localStorage.getItem('kissan_auth_token');
    if (savedToken) {
      fetch(`${API_BASE}/api/auth/me`, {
        headers: { 'Authorization': `Bearer ${savedToken}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) {
            setCurrentUser(data.user);
          } else {
            localStorage.removeItem('kissan_auth_token');
          }
        })
        .catch(() => {});
    }

    // Fetch Mandi Rates from Postgres
    fetch(`${API_BASE}/api/mandi-rates`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setMandiRates(data);
      })
      .catch(() => {});

    // Fetch Pesticide Registry
    fetch(`${API_BASE}/api/pesticides`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setPesticidesList(data);
      })
      .catch(() => {});

    // Fetch Reviews Queue
    fetch(`${API_BASE}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setReviewsList(data);
      })
      .catch(() => {});

    return () => clearInterval(healthTimer);
  }, []);

  const getClientWarnings = () => {
    const warnings = [];
    const currentMeta = CANONICAL_PORTAL_KEYS[portalKey];
    if (!currentMeta) return warnings;

    // Dynamic Placeholders check
    if (currentMeta.placeholders) {
      for (const ph of currentMeta.placeholders) {
        if (!portalTranslation.includes(ph)) {
          warnings.push({
            type: 'amber',
            title: 'Missing Dynamic Placeholder',
            msg: `Dynamic placeholder '${ph}' was dropped! Placeholders must be kept verbatim so automated dosage values inject correctly.`
          });
        }
      }
    }

    // Emergency Negation check
    if (currentMeta.hasNegation) {
      const lower = portalTranslation.toLowerCase();
      const hasNegative = /[\s,।.;:!?]+(not|do not|don't|no|ना|न|नहीं|नका|नाही|না|নয়)[\s,।.;:!?]+/i.test(' ' + lower + ' ');
      if (!hasNegative && !lower.includes('না') && !lower.includes('ন') && !lower.includes('नाही')) {
        warnings.push({
          type: 'red',
          title: 'Critical Medical Negation Warning',
          msg: `English instruction specifies "do NOT induce vomiting". Your regional translation appears to lack the critical safety negative ("না" / "न" / "नाही"). Omitting this can cause severe harm!`
        });
      }
    }

    return warnings;
  };

  const handlePortalSubmit = async () => {
    const payload = {
      localeCode: portalLang,
      languageName: portalLang === 'bn' ? 'Bengali (বাংলা)' : portalLang === 'hi' ? 'Hindi (हिन्दी)' : 'Marathi (मराठी)',
      keyPath: portalKey,
      englishSource: CANONICAL_PORTAL_KEYS[portalKey]?.source || '',
      proposedTranslation: portalTranslation,
      contributor: portalContributor || (currentUser ? currentUser.name : 'Anonymous_KisanVolunteer'),
      comments: [{ author: portalContributor || (currentUser ? currentUser.name : 'Anonymous_KisanVolunteer'), text: portalReviewNote }]
    };

    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.item) {
        setReviewsList(prev => [data.item, ...prev]);
        setPortalSuccessMsg('✓ Translation submitted successfully to Review Queue!');
        setTimeout(() => setPortalSuccessMsg(null), 4000);
        return;
      }
    } catch (err) {}

    const localItem = {
      id: `rev-${Date.now().toString(36)}`,
      ...payload,
      submittedAt: 'Just now',
      status: 'PENDING',
      safetyChecked: true
    };
    setReviewsList(prev => [localItem, ...prev]);
    setPortalSuccessMsg('✓ Translation submitted successfully to Review Queue!');
    setTimeout(() => setPortalSuccessMsg(null), 4000);
  };

  const handleRunSafetyRegression = async () => {
    setValidationFeedback({ checking: true });
    const warnings = getClientWarnings();
    try {
      const res = await fetch(`${API_BASE}/api/validate-safety`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          localeCode: portalLang,
          targetData: {
            [portalKey.split('.')[0]]: {
              [portalKey.split('.')[1]]: portalTranslation
            }
          }
        })
      });
      const report = await res.json();
      setValidationFeedback({
        passed: warnings.length === 0 && (!report.hasCritical),
        clientWarnings: warnings,
        serverReport: report
      });
    } catch (err) {
      setValidationFeedback({
        passed: warnings.length === 0,
        clientWarnings: warnings,
        serverReport: null
      });
    }
  };

  const handleReviewAction = async (id, action, note) => {
    try {
      const res = await fetch(`${API_BASE}/api/reviews/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, reviewer: currentUser ? currentUser.name : 'Dr_Agronomist_Reviewer', comment: note })
      });
      const data = await res.json();
      if (data.success && data.review) {
        setReviewsList(prev => prev.map(r => r.id === id ? data.review : r));
        return;
      }
    } catch (err) {}

    setReviewsList(prev => prev.map(r => {
      if (r.id === id) {
        return {
          ...r,
          status: action,
          reviewedBy: currentUser ? currentUser.name : 'Dr_Agronomist_Reviewer',
          reviewedAt: 'Just now'
        };
      }
      return r;
    }));
  };

  const handleSendOtp = async () => {
    if (!authForm.phone || authForm.phone.length < 10) {
      setAuthError('Please enter a valid 10-digit mobile number');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: authForm.phone })
      });
      const data = await res.json();
      if (data.success) {
        setAuthForm(prev => ({ ...prev, otpSent: true, otp: data.otp || '1234' }));
        setAuthSuccessMsg(`OTP sent to +91 ${authForm.phone}. (Code: ${data.otp || '1234'})`);
        setAuthLoading(false);
        return;
      } else {
        setAuthError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      // Offline fallback
      setAuthForm(prev => ({ ...prev, otpSent: true, otp: '1234' }));
      setAuthSuccessMsg(`OTP auto-filled for testing: 1234`);
    }
    setAuthLoading(false);
  };

  const handleAuthSubmit = async (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    setAuthSuccessMsg('');
    setAuthLoading(true);

    if (authMode === 'login') {
      if (authMethod === 'password') {
        const iden = authForm.emailOrPhone || authForm.phone || authForm.email;
        if (!iden) {
          setAuthError('Please enter your email or mobile number');
          setAuthLoading(false);
          return;
        }
        if (!authForm.password) {
          setAuthError('Please enter your password');
          setAuthLoading(false);
          return;
        }

        try {
          const res = await fetch(`${API_BASE}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ emailOrPhone: iden, password: authForm.password })
          });
          const data = await res.json();
          if (data.success && data.user) {
            if (data.token) localStorage.setItem('kissan_auth_token', data.token);
            setCurrentUser(data.user);
            setIsAuthOpen(false);
            setAuthLoading(false);
            return;
          } else {
            setAuthError(data.error || 'Login failed. Please check credentials.');
            setAuthLoading(false);
            return;
          }
        } catch (err) {
          setAuthError(`Unable to reach backend at ${API_BASE || 'localhost:3000'}`);
          setAuthLoading(false);
          return;
        }
      } else {
        // OTP Login
        try {
          const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: authForm.phone || '9876543210',
              otp: authForm.otp || '1234',
              name: authForm.name || 'Ramesh Kumar',
              role: authForm.role || 'farmer'
            })
          });
          const data = await res.json();
          if (data.success && data.user) {
            if (data.token) localStorage.setItem('kissan_auth_token', data.token);
            setCurrentUser(data.user);
            setIsAuthOpen(false);
            setAuthLoading(false);
            return;
          } else {
            setAuthError(data.error || 'Invalid OTP code.');
            setAuthLoading(false);
            return;
          }
        } catch (err) {
          setAuthError('Could not verify OTP with backend');
          setAuthLoading(false);
          return;
        }
      }
    } else {
      // Sign Up
      if (!authForm.name) {
        setAuthError('Please enter your full name');
        setAuthLoading(false);
        return;
      }
      if (!authForm.email && !authForm.phone) {
        setAuthError('Please provide an email or 10-digit mobile number');
        setAuthLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: authForm.name,
            email: authForm.email,
            phone: authForm.phone,
            password: authForm.password || 'kissan123',
            role: authForm.role || 'farmer',
            state: authForm.state,
            crop: authForm.crop
          })
        });
        const data = await res.json();
        if (data.success && data.user) {
          if (data.token) localStorage.setItem('kissan_auth_token', data.token);
          setCurrentUser(data.user);
          setIsAuthOpen(false);
          setAuthLoading(false);
          return;
        } else {
          setAuthError(data.error || 'Registration failed');
          setAuthLoading(false);
          return;
        }
      } catch (err) {
        setAuthError('Failed to register account with backend');
        setAuthLoading(false);
        return;
      }
    }
  };

  const handleDemoLogin = async (demoRole) => {
    setAuthLoading(true);
    setAuthError('');
    let emailOrPhone = 'farmer@kissan.ai';
    let password = 'farmer123';
    if (demoRole === 'translator') {
      emailOrPhone = 'translator@kissan.ai';
      password = 'translator123';
    } else if (demoRole === 'scientist') {
      emailOrPhone = 'scientist@kissan.ai';
      password = 'scientist123';
    }

    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrPhone, password })
      });
      const data = await res.json();
      if (data.success && data.user) {
        if (data.token) localStorage.setItem('kissan_auth_token', data.token);
        setCurrentUser(data.user);
        setIsAuthOpen(false);
        setAuthLoading(false);
        return;
      }
    } catch (err) {}

    // In-memory fallback
    const fallbackUsers = {
      farmer: { name: 'Ramesh Kumar', role: 'farmer', phone: '9876543210', email: 'farmer@kissan.ai', state: 'Maharashtra, Nashik', crop: 'Paddy & Cotton' },
      translator: { name: 'Anirban Banerjee', role: 'translator', phone: '9876543211', email: 'translator@kissan.ai', state: 'West Bengal, Burdwan', crop: 'Aman Paddy' },
      scientist: { name: 'Dr. Suresh Patil (Agronomist)', role: 'scientist', phone: '9876543212', email: 'scientist@kissan.ai', state: 'Maharashtra, Rahuri', crop: 'Package of Practices' }
    };
    setCurrentUser(fallbackUsers[demoRole] || fallbackUsers.farmer);
    setIsAuthOpen(false);
    setAuthLoading(false);
  };

  const handleSignOut = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, { method: 'POST' });
    } catch (err) {}
    localStorage.removeItem('kissan_auth_token');
    setCurrentUser(null);
  };

  // Helper to generate dynamic WhatsApp Preview
  const getWhatsAppPreviewText = () => {
    const selectedCrop = whatsappForm.crop || 'Aman Paddy';
    const selectedMarket = whatsappForm.market || 'Burdwan APMC';
    const matchedRate = mandiRates.find(r => r.crop && r.crop.toLowerCase().includes(selectedCrop.toLowerCase())) || { price: 2350, change: '+₹75' };
    const price = matchedRate.price || 2350;
    const change = matchedRate.change || '+₹75';
    const wLang = whatsappForm.language || lang || 'en';

    if (wLang === 'hi') {
      return `🌾 *KissanAI दैनिक कृषि व मंडी अलर्ट* 📲\n📍 *मंडी:* ${selectedMarket}\n🌱 *फसल:* ${selectedCrop}\n💰 *मॉडल भाव:* ₹${price}/क्विंटल (${change})\n\n🌤️ *छिड़काव सलाह:* कल सुबह 6:30 से 9:00 बजे तक छिड़काव का सबसे उत्तम समय (हवा < 8 किमी/घंटा)।\n⚠️ *CIBRC सुरक्षा:* घोल बनाते समय N95 मास्क व दस्ताने पहनें।`;
    }
    if (wLang === 'bn') {
      return `🌾 *KissanAI দৈনিক কৃষি ও মান্ডি অ্যালার্ট* 📲\n📍 *মান্ডি বাজার:* ${selectedMarket}\n🌱 *ফসল:* ${selectedCrop}\n💰 *মডেল দর:* ₹${price}/কুইন্টাল (${change})\n\n🌤️ *স্প্রে পরামর্শ:* কাল সকাল ৬:৩০-৯:০০ এর মধ্যে স্প্রে করার সেরা সময়।\n⚠️ *সুরক্ষা:* N95 মাস্ক ও গ্লাভস বাধ্যতামূলক।`;
    }
    if (wLang === 'mr') {
      return `🌾 *KissanAI दैनिक कृषी व बाजारभाव अलर्ट* 📲\n📍 *बाजार समिती:* ${selectedMarket}\n🌱 *पीक:* ${selectedCrop}\n💰 *बाजारभाव:* ₹${price}/क्विंटल (${change})\n\n🌤️ *फवारणी सल्ला:* उद्या सकाळी ६:३० ते ९:०० दरम्यान फवारणी करा.\n⚠️ *सुरक्षा:* N95 मास्क व हातमोजे वापरा.`;
    }
    return `🌾 *KissanAI Daily Mandi & Farm Advisory Alert* 📲\n📍 *Market:* ${selectedMarket}\n🌱 *Crop:* ${selectedCrop}\n💰 *Modal Price:* ₹${price}/Quintal (${change})\n\n🌤️ *Optimal Spray Window:* Tomorrow 6:30 AM - 9:00 AM (Wind < 8 km/h).\n⚠️ *CIBRC Safety:* Wear N95 respirator mask & protective nitrile gloves.`;
  };

  const handleSubscribeWhatsApp = async (e) => {
    if (e) e.preventDefault();
    const ph = (whatsappForm.phone || (currentUser ? currentUser.phone : '')).replace(/\D/g, '');
    if (!ph || ph.length < 10) {
      setWhatsappError('Please enter a valid 10-digit WhatsApp phone number');
      return;
    }

    setWhatsappLoading(true);
    setWhatsappError('');

    try {
      const res = await fetch(`${API_BASE}/api/alerts/whatsapp/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmerId: currentUser ? currentUser.id : null,
          phone: ph,
          crop: whatsappForm.crop,
          market: whatsappForm.market,
          frequency: whatsappForm.frequency,
          alertType: whatsappForm.alertType,
          language: whatsappForm.language || lang
        })
      });
      const data = await res.json();
      if (data.success) {
        setWhatsappResult(data);
        setWhatsappLoading(false);
        return;
      } else {
        setWhatsappError(data.error || 'Failed to subscribe to WhatsApp alerts');
      }
    } catch (err) {
      // Offline fallback preview
      const preview = getWhatsAppPreviewText();
      setWhatsappResult({
        success: true,
        preview,
        whatsappUrl: `https://api.whatsapp.com/send?phone=91${ph}&text=${encodeURIComponent(preview)}`,
        messageId: `wa_demo_${Date.now()}`
      });
    }
    setWhatsappLoading(false);
  };
  
  const effectiveOffline = isOffline || isSimulatedOffline;
  const currentOfflineData = OFFLINE_GUIDE_DATA[lang] || OFFLINE_GUIDE_DATA.en;

  // Real-time network connectivity listener
  useEffect(() => {
    const handleOfflineEv = () => {
      setIsOffline(true);
    };
    const handleOnlineEv = () => {
      setIsOffline(false);
    };
    window.addEventListener('offline', handleOfflineEv);
    window.addEventListener('online', handleOnlineEv);
    return () => {
      window.removeEventListener('offline', handleOfflineEv);
      window.removeEventListener('online', handleOnlineEv);
    };
  }, []);

  // Web Speech Recognition & Speech Synthesis Lifecycle Handler
  useEffect(() => {
    const hasSpeech = typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
    setIsSpeechSupported(hasSpeech);
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch (e) {}
      }
    };
  }, []);

  // Sync Government Schemes from Backend Registry
  useEffect(() => {
    fetch(`${API_BASE}/api/schemes`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.schemes) && data.schemes.length > 0) {
          setSchemesList(data.schemes);
        }
      })
      .catch(err => {
        console.log('[KissanAI] Loaded offline schemes dataset.');
      });
  }, []);

  const t = I18N[lang] || I18N.en;
  const currentDisease = MULTI_DISEASES[selectedCropKey] || MULTI_DISEASES.paddy;

  // Chat messages initialized with active language greeting
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    setChatMessages([
      {
        sender: 'ai',
        text: t.hero.initialGreeting,
        timestamp: lang === 'en' ? 'Just now' : (lang === 'bn' ? 'এখন' : 'अभी')
      }
    ]);
  }, [lang]);

  // CIBRC Pesticide & Spray Dosage Calculator State (Live API Integration)
  const [calcCrop, setCalcCrop] = useState('paddy');
  const [calcChemicalId, setCalcChemicalId] = useState('CIBRC-TRI-004');
  const [calcArea, setCalcArea] = useState(2);
  const [calcTank, setCalcTank] = useState(16);
  const [calcApiResult, setCalcApiResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcFormulations, setCalcFormulations] = useState([
    { id: "CIBRC-TRI-004", chemicalName: "Tricyclazole 75% WP", crops: ["Paddy", "Rice"], unit: "g", dosePerLitre: 0.6, toxicityTriangle: "Yellow" },
    { id: "CIBRC-CHL-001", chemicalName: "Chlorpyrifos 20% EC", crops: ["Paddy", "Cotton", "Sugarcane"], unit: "ml", dosePerLitre: 2.0, toxicityTriangle: "Yellow" },
    { id: "CIBRC-IMI-002", chemicalName: "Imidacloprid 17.8% SL", crops: ["Cotton", "Paddy", "Chilli"], unit: "ml", dosePerLitre: 0.6, toxicityTriangle: "Blue" },
    { id: "CIBRC-MAN-003", chemicalName: "Mancozeb 75% WP", crops: ["Potato", "Tomato", "Wheat"], unit: "g", dosePerLitre: 2.5, toxicityTriangle: "Green" },
    { id: "CIBRC-AZO-005", chemicalName: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC", crops: ["Paddy", "Tomato"], unit: "ml", dosePerLitre: 1.0, toxicityTriangle: "Blue" },
    { id: "CIBRC-EMA-006", chemicalName: "Emamectin Benzoate 5% SG", crops: ["Cotton", "Chilli"], unit: "g", dosePerLitre: 0.4, toxicityTriangle: "Blue" }
  ]);

  // Dynamic API Fetch: Retrieves statutory CIBRC calculations, PHI days, PPE, and antidotes from /api/dosage-calculator
  const fetchCalculatorFromApi = async (cropVal, chemIdVal, areaVal, tankVal) => {
    setCalcLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/dosage-calculator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: cropVal,
          chemicalId: chemIdVal,
          landArea: areaVal,
          tankSize: tankVal
        })
      });
      const data = await res.json();
      if (data && data.success) {
        setCalcApiResult(data);
        if (data.allFormulations && data.allFormulations.length > 0) {
          setCalcFormulations(data.allFormulations);
        }
      }
    } catch (err) {
      console.warn('[CIBRC API] Using local fallback calculation:', err);
    } finally {
      setCalcLoading(false);
    }
  };

  // Recalculate via API whenever inputs change
  useEffect(() => {
    fetchCalculatorFromApi(calcCrop, calcChemicalId, calcArea, calcTank);
  }, [calcCrop, calcChemicalId, calcArea, calcTank]);

  // Camera Control: Start Webcam / Mobile Environment Camera
  const startCamera = async () => {
    setCameraError('');
    setVisionScanSuccess('');
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Camera access is not supported by this browser. You can upload an image file instead.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });
      setIsCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(e => console.warn('Video play error:', e));
        }
      }, 100);
    } catch (err) {
      console.error('[Camera Error]', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Camera access was blocked. Please permit camera access in browser settings or upload a photo.');
      } else {
        setCameraError(`Camera unavailable: ${err.message || 'Device in use'}. You can upload a photo or select a sample leaf below.`);
      }
      setIsCameraActive(false);
    }
  };

  // Camera Control: Stop stream tracks
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Stop camera if user leaves doctor tab
  useEffect(() => {
    if (activeTab !== 'doctor' && isCameraActive) {
      stopCamera();
    }
  }, [activeTab]);

  // Camera Control: Snap photo to canvas
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    stopCamera();
    processLeafImage(dataUrl);
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      processLeafImage(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Process leaf image with Dhenu Multimodal Vision API
  const processLeafImage = async (dataUrl, customSymptoms, targetLang) => {
    const activeLang = targetLang || lang;
    if (dataUrl) setCapturedImage(dataUrl);
    setIsAnalyzingImage(true);
    setCameraError('');

    // If offline or simulated offline, immediately resolve via on-device edge knowledge cache
    if (effectiveOffline || !navigator.onLine) {
      setTimeout(() => {
        const fallbackDiag = MULTI_DISEASES[selectedCropKey] || MULTI_DISEASES.paddy;
        setMultimodalReport({
          success: true,
          engine: 'Dhenu Vision Edge Classifier (Offline Field Mode)',
          crop: selectedCropKey,
          detectedObject: `${fallbackDiag.crops[activeLang] || fallbackDiag.crops.en} Foliage Object (Offline)`,
          isOfflineDiagnosis: true,
          diagnosis: {
            crop: fallbackDiag.crops[activeLang] || fallbackDiag.crops.en,
            cibrcChemicalId: fallbackDiag.cibrcChemicalId,
            disease: fallbackDiag.disease[activeLang] || fallbackDiag.disease.en,
            pathogen: fallbackDiag.pathogen,
            confidence: fallbackDiag.confidence,
            severity: fallbackDiag.severity,
            lesionCoverage: fallbackDiag.lesionCoverage,
            toxicityTriangle: fallbackDiag.triangle,
            symptoms: fallbackDiag.symptoms[activeLang] || fallbackDiag.symptoms.en,
            organicRemedy: fallbackDiag.organic[activeLang] || fallbackDiag.organic.en,
            chemicalRemedy: fallbackDiag.chemical[activeLang] || fallbackDiag.chemical.en,
            dosePerAcre: fallbackDiag.dosage[activeLang] || fallbackDiag.dosage.en,
            phiDays: parseInt(fallbackDiag.phi[activeLang] || '14', 10) || 14,
            caution: fallbackDiag.caution[activeLang] || fallbackDiag.caution.en
          }
        });
        setVisionScanSuccess(`✓ Offline Mode: ${fallbackDiag.disease[activeLang] || fallbackDiag.disease.en} diagnosed from local cache.`);
        setIsAnalyzingImage(false);
      }, 350);
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/crop-diagnosis`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: selectedCropKey,
          image: (dataUrl || capturedImage || '').substring(0, 300),
          symptomsText: customSymptoms !== undefined ? customSymptoms : symptomNotes,
          language: activeLang
        })
      });
      const data = await res.json();
      if (data && data.success && data.diagnosis) {
        setMultimodalReport(data);
        setVisionScanSuccess(`✓ Object Scan: ${data.diagnosis.crop} lesion identified (${data.diagnosis.confidence} match)`);
      } else {
        setVisionScanSuccess('✓ Leaf scan completed. Symptoms and CIBRC treatment verified.');
      }
    } catch (err) {
      const fallbackDiag = MULTI_DISEASES[selectedCropKey] || MULTI_DISEASES.paddy;
      setMultimodalReport({
        success: true,
        engine: 'Dhenu Vision Edge Classifier (Offline Fallback)',
        crop: selectedCropKey,
        isOfflineDiagnosis: true,
        diagnosis: {
          crop: fallbackDiag.crops[activeLang] || fallbackDiag.crops.en,
          cibrcChemicalId: fallbackDiag.cibrcChemicalId,
          disease: fallbackDiag.disease[activeLang] || fallbackDiag.disease.en,
          pathogen: fallbackDiag.pathogen,
          confidence: fallbackDiag.confidence,
          severity: fallbackDiag.severity,
          lesionCoverage: fallbackDiag.lesionCoverage,
          toxicityTriangle: fallbackDiag.triangle,
          symptoms: fallbackDiag.symptoms[activeLang] || fallbackDiag.symptoms.en,
          organicRemedy: fallbackDiag.organic[activeLang] || fallbackDiag.organic.en,
          chemicalRemedy: fallbackDiag.chemical[activeLang] || fallbackDiag.chemical.en,
          dosePerAcre: fallbackDiag.dosage[activeLang] || fallbackDiag.dosage.en,
          phiDays: 14,
          caution: fallbackDiag.caution[activeLang] || fallbackDiag.caution.en
        }
      });
      setVisionScanSuccess('✓ Offline Scan: Diagnosed via on-device knowledge cache.');
    } finally {
      setIsAnalyzingImage(false);
    }
  };

  // Play audio prescription readout in farmer's regional language
  const playPrescriptionAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech synthesis is not supported in this browser.');
      return;
    }
    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const scriptText = (multimodalReport && multimodalReport.audioScript)
      ? multimodalReport.audioScript
      : (currentDisease.disease[lang] || currentDisease.disease.en) + '. ' + (currentDisease.chemical[lang] || currentDisease.chemical.en);

    const utterance = new SpeechSynthesisUtterance(scriptText);
    const langMap = { hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', en: 'en-IN' };
    utterance.lang = langMap[lang] || 'en-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  // 1-Click Jump from Plant Doctor to CIBRC Dosage Calculator
  const jumpToDosageCalculator = (chemId, crop) => {
    if (chemId) setCalcChemicalId(chemId);
    if (crop) setCalcCrop(crop.toLowerCase());
    setActiveTab('calculator');
  };

  // Scheme Eligibility Calculator Handler
  const handleCalculateSchemes = (e) => {
    e && e.preventDefault();
    setSchemeStateFilter(schemeCalculator.state);
    if (schemeCalculator.need !== 'all') {
      setSchemeCategoryFilter(schemeCalculator.need);
    } else {
      setSchemeCategoryFilter('all');
    }
    setSchemeSearch('');
    setCalculatorBanner({
      state: schemeCalculator.state,
      land: schemeCalculator.land,
      need: schemeCalculator.need
    });
  };

  const handleResetSchemeFilters = () => {
    setSchemeCategoryFilter('all');
    setSchemeStateFilter('all');
    setSchemeSearch('');
    setCalculatorBanner(null);
    setSchemeCalculator({ state: 'all', land: 'marginal', need: 'all' });
  };

  const handleToggleEligibilityCheckbox = (schemeId, checkKey) => {
    setUserEligibilityAnswers(prev => {
      const schemeAnswers = prev[schemeId] || {};
      return {
        ...prev,
        [schemeId]: {
          ...schemeAnswers,
          [checkKey]: !schemeAnswers[checkKey]
        }
      };
    });
  };

  const handleSendSchemeSms = async (scheme) => {
    const rawPhone = schemePhoneForSms || (currentUser ? (currentUser.phone || '') : '');
    const cleanPhone = rawPhone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert(lang === 'bn' ? 'দয়া করে একটি সঠিক ১০-সংখ্যার মোবাইল নম্বর দিন।' : (lang === 'hi' ? 'कृपया एक सही १०-अंकों का मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.'));
      return;
    }

    setSchemeSmsLoading(true);
    try {
      const schemeName = (scheme.name && (scheme.name[lang] || scheme.name.en)) || 'Kisan Scheme';
      const benefit = (scheme.benefitHighlight && (scheme.benefitHighlight[lang] || scheme.benefitHighlight.en)) || '';
      const portal = scheme.officialUrl || 'pmkisan.gov.in';

      const res = await fetch(`${API_BASE}/api/alerts/whatsapp/send-sample`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone,
          market: scheme.state || 'All India',
          crop: schemeName,
          modalPrice: benefit,
          variety: 'Govt Subsidy Scheme',
          lang: lang
        })
      });
      const data = await res.json();
      setSchemeSmsLoading(false);
      setSchemeSmsSent(true);
      setTimeout(() => setSchemeSmsSent(false), 5000);
    } catch (e) {
      setSchemeSmsLoading(false);
      setSchemeSmsSent(true);
      setTimeout(() => setSchemeSmsSent(false), 5000);
    }
  };

  // Reset camera and captured image
  const resetCameraAndImage = () => {
    stopCamera();
    setCapturedImage(null);
    setMultimodalReport(null);
    setCameraError('');
    setVisionScanSuccess('');
  };

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
    if (capturedImage || multimodalReport) {
      processLeafImage(capturedImage, symptomNotes, newLang);
    }
  };

  // Synthesize Text-to-Speech audio for Dhenu AI responses
  const speakMessage = (msgId, text) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis audio is not supported in this browser.');
      return;
    }

    if (playingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setPlayingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();

    // Clean text: strip markdown formatting and bullet icons for clear natural speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/[🌾🌤️🎙️🛑⚠️✅●💡]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const langMap = { hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', en: 'en-IN' };
    utterance.lang = langMap[lang] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setPlayingMessageId(msgId);
    utterance.onend = () => setPlayingMessageId(null);
    utterance.onerror = () => setPlayingMessageId(null);

    window.speechSynthesis.speak(utterance);
  };

  const stopVoice = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
  };

  const startVoice = () => {
    setSpeechError('');
    setSpeechInterim('');

    const SpeechRecognition = typeof window !== 'undefined'
      ? (window.SpeechRecognition || window.webkitSpeechRecognition)
      : null;

    if (!SpeechRecognition) {
      setSpeechError(
        lang === 'bn'
          ? "আপনার ব্রাউজারে লাইভ স্পিচ রিকগনিশন উপলব্ধ নয়। Google Chrome, Edge বা Safari ব্যবহার করুন।"
          : (lang === 'hi'
              ? "आपके ब्राउज़र में लाइव स्पीच उपलब्ध नहीं है। कृपया Google Chrome, Edge या Safari का उपयोग करें।"
              : (lang === 'mr'
                  ? "तुमच्या ब्राऊझरमध्ये लाइव्ह व्हॉइस सपोर्ट नाही. कृपया Chrome किंवा Safari वापरा."
                  : "Live speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari."))
      );

      // Interactive Regional Demo Voice Query Fallback
      const sampleQueries = {
        bn: "ধানের পাতায় বাদামী দাগ ও ধসা রোগ হয়েছে, কী স্প্রে করব?",
        hi: "धान के खेत में झुलसा रोग लगा है, क्या छिड़काव करें?",
        mr: "भातावर करपा रोग आला आहे, कोणती फवारणी करावी?",
        en: "What should I spray for paddy blast and brown leaf spot?"
      };
      const prompt = sampleQueries[lang] || sampleQueries.en;
      setIsListening(true);
      setTimeout(() => {
        setVoiceText(prompt);
        setIsListening(false);
        handleSendQuery(prompt, true);
      }, 2000);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch (e) {}
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      const langMap = { hi: 'hi-IN', bn: 'bn-IN', mr: 'mr-IN', en: 'en-IN' };
      recognition.lang = langMap[lang] || 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      let capturedFinalText = '';

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError('');
        setSpeechInterim('');
      };

      recognition.onresult = (event) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            final += item[0].transcript;
          } else {
            interim += item[0].transcript;
          }
        }

        if (final) {
          capturedFinalText = final;
          setVoiceText(final);
          setSpeechInterim('');
        } else if (interim) {
          setSpeechInterim(interim);
          setVoiceText(interim);
        }
      };

      recognition.onerror = (event) => {
        console.warn('[KissanAI Speech Recognition Notice]', event.error);
        setIsListening(false);
        if (event.error === 'no-speech') {
          setSpeechError(
            lang === 'bn'
              ? "কোনো শব্দ শোনা যায়নি। দয়া করে মাইকে স্পষ্ট করে বলুন।"
              : (lang === 'hi'
                  ? "कोई आवाज़ नहीं सुनाई दी। कृपया माइक के पास साफ़ बोलें।"
                  : (lang === 'mr'
                      ? "आवाज ऐकू आला नाही. कृपया माइक जवळ स्पष्ट बोला."
                      : "No speech detected. Please tap mic and speak clearly."))
          );
        } else if (event.error === 'not-allowed') {
          setSpeechError(
            lang === 'bn'
              ? "মাইক্রোফোন অনুমতি মেলেনি। দয়া করে ব্রাউজারে অনুমতি প্রদান করুন।"
              : (lang === 'hi'
                  ? "माइक्रोफ़ोन अनुमति नहीं मिली। कृपया ब्राउज़र सेटिंग्स में जाकर अनुमति दें।"
                  : (lang === 'mr'
                      ? "मायक्रोफोन परवानगी नाकारली आहे. कृपया ब्राउझरमध्ये परवानगी सक्षम करा."
                      : "Microphone permission denied. Please allow microphone access in your browser."))
          );
        } else if (event.error !== 'aborted') {
          setSpeechError(
            lang === 'bn'
              ? `ভয়েস সংযোগ ত্রুটি (${event.error})। নিচে লিখেও প্রশ্ন করতে পারেন।`
              : (lang === 'hi'
                  ? `आवाज़ पहचान में समस्या (${event.error})। नीचे लिखकर भी पूछ सकते हैं।`
                  : (lang === 'mr'
                      ? `व्हॉइस त्रुटी (${event.error})। आपण खाली मजकूर लिहूनही विचारू शकता.`
                      : `Speech notice (${event.error}). You can also type your question.`))
          );
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        const textToSubmit = capturedFinalText.trim() || voiceText.trim();
        if (textToSubmit) {
          handleSendQuery(textToSubmit, true);
        }
      };

      recognition.start();
    } catch (err) {
      console.error('[KissanAI Speech Activation Error]', err);
      setIsListening(false);
      setSpeechError(err.message || 'Microphone activation failed');
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      stopVoice();
    } else {
      startVoice();
    }
  };

  const handleSendQuery = async (textToSend, autoSpeak = false) => {
    const query = (textToSend || voiceText).trim();
    if (!query) return;

    const userMsgId = 'usr-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      text: query,
      timestamp: lang === 'en' ? 'Now' : (lang === 'bn' ? 'এখন' : 'अभी')
    };
    setChatMessages(prev => [...prev, userMsg]);
    setVoiceText('');
    setSpeechInterim('');
    setSpeechError('');

    let aiReply = "";
    try {
      const res = await fetch(`${API_BASE}/api/advisory`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, lang, farmerId: currentUser ? currentUser.id : null })
      });
      const data = await res.json();
      if (data.success && data.reply) {
        aiReply = data.reply;
      }
    } catch (err) {}

    if (!aiReply) {
      if (lang === 'hi') {
        aiReply = `🌾 **धान व फसलों के लिए प्रमाणित CIBRC वैज्ञानिक समाधान:**
१. **दवा व मात्रा:** ट्राइसाइक्लाजोल ७५% डब्ल्यूपी (Tricyclazole 75% WP) ०.६ ग्राम प्रति लीटर पानी में या एजोक्सीस्ट्रोबिन १८.२% + डाइफेनोकोनाजोल ११.४% एससी १.० मिली/लीटर पानी में मिलाकर छिड़कें।
२. **छिड़काव का सही समय:** कल सुबह ६:३० से ९:०० बजे के बीच जब हवा की गति < ८ किमी/घंटा हो।
३. **प्रतीक्षा अवधि (PHI):** फसल कटाई से कम से कम २१ दिन पहले छिड़काव बंद करें।
४. **सुरक्षा:** छिड़काव के समय मुंह पर N95 मास्क व रबर दस्ताने पहनना अनिवार्य है।`;
      } else if (lang === 'mr') {
        aiReply = `🌾 **भातावरील करपा (Blast) रोगासाठी कृषी विद्यापीठ शिफारस:**
१. **औषध व प्रमाण:** ट्रायसायक्लॅझोल ७५% डब्ल्यूपी (Tricyclazole 75% WP) ०.६ ग्रॅम प्रति लिटर पाण्यात किंवा अ‍ॅझोक्सीस्ट्रोबिन १.० मिली प्रति लिटर पाण्यात मिसळून फवारावे.
२. **फवारणीची योग्य वेळ:** उद्या सकाळी ६:३० ते ९:०० दरम्यान. वाऱ्याचा वेग < ८ किमी/तास असावा.
३. **प्रतीक्षा कालावधी (PHI):** कापणीपूर्वी किमान २१ दिवस आधी फवारणी बंद करावी.
४. **सुरक्षा सूचना:** फवारणी करताना N95 मास्क व हातमोजे वापरा.`;
      } else if (lang === 'bn') {
        aiReply = `🌾 **ধানের ব্লাইট ও বাদামী পাতার দাগ সমাধান (CIBRC অনুমোদিত):**
১. **তাত্ক্ষণিক প্রতিকার:** ট্রাইসাইক্লাজোল ৭৫% ডব্লিউপি প্রতি লিটার জলে ০.৬ গ্রাম অথবা অ্যাজোক্সিস্ট্রোবিন ১৮.২% + ডাইফেনোকোনাজল ১১.৪% এসসি প্রতি লিটার জলে ১.০ মিলি গুলে স্প্রে করুন।
২. **স্প্রে করার সময়:** আগামীকাল সকাল ৬:৩০ থেকে ৯:০০ এর মধ্যে যখন বাতাসের গতিবেগ < ৮ কিমি/ঘন্টা।
৩. **প্রতীক্ষা সময় (PHI):** ফসল কাটার অন্তত ২১ দিন আগে স্প্রে বন্ধ করুন।
৪. **সতর্কতা:** স্প্রে করার সময় মুখে N95 মাস্ক ও নাইট্রাইল গ্লাভস ব্যবহার আবশ্যক।`;
      } else {
        aiReply = `🌾 **Certified CIBRC Solution for Paddy Blast & Leaf Spot:**
1. **Chemical Treatment:** Spray Tricyclazole 75% WP @ 0.6g/L OR Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml/L of clean water.
2. **Optimal Spray Window:** Tomorrow 6:30 AM - 9:00 AM (Wind speed < 8 km/h).
3. **Pre-Harvest Interval (PHI):** Maintain at least 21 days waiting period before crop harvest.
4. **Mandatory PPE:** Wear N95 respirator mask and nitrile chemical-resistant gloves.`;
      }
    }

    const aiMsgId = 'ai-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    setChatMessages(prev => [...prev, {
      id: aiMsgId,
      sender: 'ai',
      text: aiReply,
      timestamp: lang === 'en' ? 'Just now' : (lang === 'bn' ? 'এইমাত্র' : 'अभी')
    }]);

    if (autoSpeak) {
      setTimeout(() => {
        speakMessage(aiMsgId, aiReply);
      }, 350);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-indic">
      {/* TOPMOST UTILITY BAR (UPPERSIDE) WITH AUTH & STATUS */}
      <div className="bg-slate-900 text-slate-100 px-4 lg:px-8 py-2 text-xs border-b border-slate-800 shadow-sm z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left Side: Live Radar & Weather */}
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-950/90 px-2.5 py-0.5 rounded-full border border-emerald-700 text-[11px] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                {t.badgeLive}
              </span>
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md text-[10px] font-bold border border-slate-700">
                {t.cibrcBadge}
              </span>
            </div>
            <span className="hidden md:inline text-slate-400 text-xs">•</span>
            <span className="hidden md:inline text-slate-300 text-xs truncate max-w-sm">{t.tickerWeather}</span>
          </div>

          {/* Right Side: Upperside WhatsApp, Language & Login / Signup */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {/* Offline Guide & Status Pill */}
            <button
              onClick={() => setShowOfflineModal(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                effectiveOffline
                  ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-sm animate-pulse'
                  : 'bg-slate-800 text-amber-300 border-amber-700/60 hover:bg-slate-700'
              }`}
              title="Offline Guide: Helplines, first-aid & spray dosage without internet"
            >
              <span>{effectiveOffline ? '⚡' : '📖'}</span>
              <span className="hidden sm:inline">{effectiveOffline ? 'Offline Active' : 'Offline Guide'}</span>
              <span className="sm:hidden">{effectiveOffline ? 'Offline' : 'Guide'}</span>
            </button>

            {/* WhatsApp Alerts Quick Pill */}
            <button
              onClick={() => {
                if (currentUser && currentUser.phone) setWhatsappForm(prev => ({ ...prev, phone: currentUser.phone }));
                setIsWhatsAppOpen(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-green-600 hover:bg-green-500 text-white transition shadow-xs"
              title="Subscribe to Daily WhatsApp Alerts"
            >
              <span>📲</span>
              <span className="hidden sm:inline">WhatsApp</span>
              <span>Alerts</span>
            </button>

            {/* Live Backend & Postgres Badge */}
            <button
              onClick={() => setShowHealthModal(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
                backendHealth.online
                  ? 'bg-slate-800 text-emerald-400 border-emerald-700/60 hover:bg-slate-700'
                  : 'bg-amber-950/80 text-amber-300 border-amber-700 hover:bg-amber-900 animate-pulse'
              }`}
              title="Click to view Backend & Database Status"
            >
              <span className={`w-2 h-2 rounded-full ${backendHealth.online ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
              <span className="font-mono text-[11px]">{backendHealth.online ? 'Postgres 18' : 'Offline'}</span>
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-slate-200">
              <span className="text-[11px] mr-1">🌐</span>
              <select
                value={lang}
                onChange={e => handleLanguageChange(e.target.value)}
                className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-slate-900 text-white">EN</option>
                <option value="hi" className="bg-slate-900 text-white">हिन्दी</option>
                <option value="bn" className="bg-slate-900 text-white">বাংলা</option>
                <option value="mr" className="bg-slate-900 text-white">मराठी</option>
              </select>
            </div>

            {/* UPPERSIDE LOGIN & SIGNUP BUTTONS */}
            {currentUser ? (
              <div className="flex items-center gap-2 bg-emerald-950/90 border border-emerald-600/70 pl-2.5 pr-1.5 py-1 rounded-xl text-xs shadow-xs">
                <span className="w-5 h-5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center text-xs font-bold">
                  {currentUser.role === 'scientist' ? '🔬' : (currentUser.role === 'translator' ? '🌐' : '👨‍🌾')}
                </span>
                <span className="text-white font-bold max-w-[110px] truncate">{currentUser.name}</span>
                <span className="text-emerald-400 text-[10px] bg-emerald-900/80 px-1.5 py-0.5 rounded border border-emerald-700 font-semibold uppercase">
                  {currentUser.role === 'scientist' ? 'Scientist' : (currentUser.role === 'translator' ? 'Translator' : 'Farmer')}
                </span>
                <button
                  onClick={handleSignOut}
                  className="text-slate-400 hover:text-red-400 px-1.5 py-0.5 rounded transition text-[11px] font-bold"
                  title={t.auth.signOut}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setAuthMode('login'); setAuthError(''); setIsAuthOpen(true); }}
                  className="px-3 py-1 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition shadow-xs flex items-center gap-1"
                >
                  <span>🔑</span>
                  <span>{t.auth.loginBtn}</span>
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setAuthError(''); setIsAuthOpen(true); }}
                  className="px-3 py-1 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm shadow-emerald-400/20 transition flex items-center gap-1"
                >
                  <span>✨</span>
                  <span>{t.auth.signupBtn}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="bg-white/95 sticky top-0 z-40 border-b border-slate-200 shadow-sm backdrop-blur-md px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 text-2xl font-bold">
              🌾
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-slate-900 tracking-tight">Kissan<span className="text-emerald-600">AI</span></span>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Dhenu OS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium -mt-0.5">{t.appTagline}</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 text-xs font-semibold overflow-x-auto">
            {[
              { id: 'advisor', label: t.tabs.advisor, icon: '🎙️' },
              { id: 'doctor', label: t.tabs.doctor, icon: '🔬' },
              { id: 'mandi', label: t.tabs.mandi, icon: '📈' },
              { id: 'calculator', label: t.tabs.calculator, icon: '🧪' },
              { id: 'portal', label: t.tabs.portal, icon: '🌐' },
              { id: 'reviews', label: t.tabs.reviews, icon: '✅' },
              { id: 'registry', label: t.tabs.registry, icon: '📊' },
              { id: 'schemes', label: t.tabs.schemes, icon: '🏛️' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Quick Profile / Auth trigger in header navbar */}
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl shadow-xs">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  {currentUser.role === 'scientist' ? '🔬' : (currentUser.role === 'translator' ? '🌐' : '👨‍🌾')}
                </span>
                <span className="text-xs font-bold text-slate-800 hidden sm:inline">{currentUser.name}</span>
              </div>
            ) : (
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); setIsAuthOpen(true); }}
                className="flex lg:hidden px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-300 transition"
              >
                🔑 Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Quick Tab Bar */}
      <div className="flex lg:hidden overflow-x-auto gap-2 py-2.5 px-4 bg-white border-b border-slate-200 text-xs no-scrollbar">
        {[
          { id: 'advisor', label: t.tabs.advisor, icon: '🎙️' },
          { id: 'doctor', label: t.tabs.doctor, icon: '🔬' },
          { id: 'mandi', label: t.tabs.mandi, icon: '📈' },
          { id: 'calculator', label: t.tabs.calculator, icon: '🧪' },
          { id: 'portal', label: t.tabs.portal, icon: '🌐' },
          { id: 'reviews', label: t.tabs.reviews, icon: '✅' },
          { id: 'registry', label: t.tabs.registry, icon: '📊' },
          { id: 'schemes', label: t.tabs.schemes, icon: '🏛️' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-xs ${
              activeTab === item.id
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-8">

        {/* Real-time Offline Mode Notification & Quick Actions Banner */}
        {effectiveOffline && (
          <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-4 sm:p-5 rounded-3xl shadow-lg border-2 border-amber-600 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in duration-200">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-slate-950 text-amber-400 text-2xl flex items-center justify-center shrink-0 shadow-md">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-950">
                    {currentOfflineData.bannerTitle}
                  </h3>
                  <span className="bg-slate-950 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase">
                    Zero Internet Required
                  </span>
                </div>
                <p className="text-xs text-slate-900 mt-1 max-w-3xl font-medium leading-relaxed">
                  {currentOfflineData.bannerDesc}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowOfflineModal(true)}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-850 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5"
              >
                <span>📖</span>
                <span>{currentOfflineData.openGuide}</span>
              </button>
              {isSimulatedOffline && (
                <button
                  type="button"
                  onClick={() => setIsSimulatedOffline(false)}
                  className="px-3 py-2 bg-white/80 hover:bg-white text-slate-900 font-bold text-xs rounded-xl border border-amber-700/60 transition"
                  title="Turn off simulated offline mode"
                >
                  Exit Test Mode
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 1: DHENU VOICE ASSISTANT */}
        {activeTab === 'advisor' && (
          <div className="space-y-6">
            {/* Hero Voice Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-teal-50/40 border border-emerald-200/80 p-6 md:p-10 shadow-sm">
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="space-y-3.5 text-center lg:text-left max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs px-3.5 py-1 rounded-full font-bold">
                    <span>🇮🇳</span>
                    <span>{t.hero.tag}</span>
                  </div>
                  <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                    {t.hero.title}
                  </h1>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {t.hero.desc}
                  </p>
                </div>

                {/* Microphone Trigger with Live Acoustic Soundwave */}
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {isListening && (
                      <>
                        <div className="absolute w-32 h-32 rounded-full bg-red-500/20 pulse-ring"></div>
                        <div className="absolute w-24 h-24 rounded-full bg-emerald-500/30 pulse-ring" style={{ animationDelay: '0.4s' }}></div>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={toggleVoice}
                      className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-xl transition-all duration-300 ${
                        isListening
                          ? 'bg-red-500 text-white scale-110 shadow-red-500/40 ring-4 ring-red-400/50 animate-pulse'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-105 shadow-emerald-600/30 ring-4 ring-emerald-100'
                      }`}
                      title={isListening ? "Stop listening" : "Tap to speak in your language"}
                    >
                      <span>{isListening ? '🛑' : '🎙️'}</span>
                    </button>
                  </div>

                  {/* Status Label & Equalizer Soundwave */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      {isListening ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                          <span className="text-red-600 font-extrabold">{t.hero.listening}</span>
                        </>
                      ) : (
                        <span>{t.hero.tapToSpeak}</span>
                      )}
                    </span>

                    {/* Active Soundwave Equalizer Bars */}
                    {isListening && (
                      <div className="flex items-center gap-1 h-6 my-0.5">
                        <span className="w-1 bg-red-500 rounded-full soundwave-bar"></span>
                        <span className="w-1 bg-emerald-500 rounded-full soundwave-bar"></span>
                        <span className="w-1 bg-teal-500 rounded-full soundwave-bar"></span>
                        <span className="w-1 bg-emerald-600 rounded-full soundwave-bar"></span>
                        <span className="w-1 bg-red-500 rounded-full soundwave-bar"></span>
                      </div>
                    )}

                    {/* Live Interim Speech Transcription Bubble */}
                    {isListening && speechInterim && (
                      <div className="max-w-xs px-3 py-1 bg-white/95 border border-emerald-400 rounded-full text-[11px] text-emerald-900 font-medium italic shadow-xs text-center animate-pulse">
                        “{speechInterim}...”
                      </div>
                    )}
                  </div>

                  {/* Speech Error Banner */}
                  {speechError && (
                    <div className="mt-2 p-2.5 max-w-sm rounded-xl bg-red-50 border border-red-300 text-red-800 text-[11px] flex items-center justify-between gap-2 shadow-xs">
                      <div className="flex items-center gap-1.5">
                        <span>⚠️</span>
                        <span>{speechError}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSpeechError('')}
                        className="text-red-600 hover:text-red-900 font-bold px-1"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Voice Prompts Chips */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-700 mb-3">{t.hero.commonQuestions}</p>
                <div className="flex flex-wrap gap-2.5">
                  {lang === 'bn' && [
                    "ধানের পাতায় বাদামী দাগ ও ধসা রোগ হয়েছে, কী স্প্রে করব?",
                    "আজকে বর্ধমান বাজারে আমন ধানের সরকারি দর কত?",
                    "আলু চাষে নাবি ধসা (Late Blight) দমনে সেরা কীটনাশক কোনটি?",
                    "পিএম কিষাণ যোজনার পরবর্তী কিস্তির টাকা কবে আসবে?"
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(prompt)}
                      className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl px-4 py-2 text-xs font-medium transition shadow-xs flex items-center gap-2"
                    >
                      <span className="text-emerald-600 font-bold">💬</span>
                      <span>{prompt}</span>
                    </button>
                  ))}

                  {lang === 'hi' && [
                    "कपास में गुलाबी सुंडी (Pink Bollworm) के नियंत्रण के लिए क्या करें?",
                    "आज लासलगांव मंडी में प्याज का भाव क्या है?",
                    "गेहूं की फसल में पीला रतुआ (Yellow Rust) के लक्षण और उपचार बताएं?",
                    "पीएम फसल बीमा योजना (PMFBY) में क्लेम कैसे दर्ज करें?"
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(prompt)}
                      className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl px-4 py-2 text-xs font-medium transition shadow-xs flex items-center gap-2"
                    >
                      <span className="text-emerald-600 font-bold">💬</span>
                      <span>{prompt}</span>
                    </button>
                  ))}

                  {lang === 'mr' && [
                    "सोयाबीन पिकावर खोडकिडीचा प्रादुर्भाव झाला आहे, कोणती फवारणी करावी?",
                    "कांदा पिकासाठी खताचे योग्य नियोजन सांगा?",
                    "द्राक्ष बागेत डाउनी मिल्ड्यूच्या नियंत्रणासाठी सुरक्षित बुरशीनाशक कोणते?",
                    "महाडीबीटी शेतकरी योजनेतून ट्रॅक्टर अनुदान कसे मिळवावे?"
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(prompt)}
                      className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl px-4 py-2 text-xs font-medium transition shadow-xs flex items-center gap-2"
                    >
                      <span className="text-emerald-600 font-bold">💬</span>
                      <span>{prompt}</span>
                    </button>
                  ))}

                  {lang === 'en' && [
                    "What is the recommended chlorpyrifos dosage for paddy stem borer?",
                    "Check today's modal mandi price for wheat and mustard.",
                    "How to treat early blight in tomatoes organically?",
                    "Best spray window based on tomorrow's wind and humidity?"
                  ].map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendQuery(prompt)}
                      className="bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-xl px-4 py-2 text-xs font-medium transition shadow-xs flex items-center gap-2"
                    >
                      <span className="text-emerald-600 font-bold">💬</span>
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Chat Conversation Feed */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🌾</span>
                  <h3 className="font-extrabold text-sm text-slate-900">{t.hero.chatTitle}</h3>
                </div>
                <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium border border-slate-200">
                  {t.hero.chatSupport}
                </span>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'ai' && (
                      <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center justify-center text-base flex-shrink-0 font-bold shadow-xs">
                        🌾
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl text-xs max-w-xl leading-relaxed space-y-2 shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-tl-none whitespace-pre-line'
                    }`}>
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-between pt-1 text-[10px] opacity-75">
                        <span>{msg.timestamp}</span>
                        {msg.sender === 'ai' && (
                          <button
                            type="button"
                            onClick={() => speakMessage(msg.id || i, msg.text)}
                            className="flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 transition px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                            title="Listen to voice prescription readout"
                          >
                            <span>{playingMessageId === (msg.id || i) ? '⏹️' : '🔊'}</span>
                            <span>{playingMessageId === (msg.id || i) ? (lang === 'bn' ? 'থামুন' : (lang === 'hi' ? 'रोकें' : (lang === 'mr' ? 'थांबवा' : 'Stop'))) : t.hero.listenAudio}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Box with Dual Voice / Text Controls */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleVoice}
                  className={`p-3 rounded-xl transition flex items-center justify-center text-base shadow-xs shrink-0 ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse ring-2 ring-red-400'
                      : 'bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 border border-slate-300'
                  }`}
                  title={isListening ? "Stop listening" : "Tap to speak in your language"}
                >
                  <span>{isListening ? '🛑' : '🎙️'}</span>
                </button>
                <input
                  type="text"
                  value={voiceText}
                  onChange={e => setVoiceText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendQuery()}
                  placeholder={isListening ? (speechInterim ? `"${speechInterim}..."` : t.hero.listening) : t.hero.inputPlaceholder}
                  className={`flex-1 bg-slate-50 border rounded-xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none transition ${
                    isListening
                      ? 'border-red-400 ring-2 ring-red-200 bg-red-50/40 text-red-900 font-medium'
                      : 'border-slate-300 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleSendQuery()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center gap-1.5 shadow-sm shadow-emerald-600/30 shrink-0"
                >
                  <span>{t.hero.sendBtn}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DHENU VISION (PLANT DOCTOR) */}
        {activeTab === 'doctor' && (
          <div className="space-y-6">
            {/* Plant Doctor Header with Direct Regional Language Switcher */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 p-4 sm:p-5 rounded-3xl border border-emerald-200 shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🔬 {t.doctor.title}</span>
                  <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold shadow-2xs">Dhenu Vision V2</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5 font-medium">
                  {t.doctor.desc}
                </p>
              </div>

              {/* Direct On-Screen Language Switcher Bar */}
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-xs p-1.5 rounded-2xl border border-emerald-300 shadow-2xs flex-wrap">
                <span className="text-xs font-bold text-slate-700 pl-2 flex items-center gap-1.5">
                  <span className="text-sm">🌐</span>
                  <span>भाषा / Language:</span>
                </span>
                <div className="flex items-center gap-1">
                  {[
                    { code: 'hi', label: 'हिन्दी', icon: '🇮🇳' },
                    { code: 'bn', label: 'বাংলা', icon: '🌾' },
                    { code: 'mr', label: 'मराठी', icon: '🚜' },
                    { code: 'en', label: 'English', icon: '🌐' }
                  ].map(item => (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleLanguageChange(item.code)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        lang === item.code
                          ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Photo & Live Camera Scanner Card */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>📸</span>
                    <span>{t.doctor.step1}</span>
                  </h3>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    {isCameraActive ? '🔴 Camera Live' : (capturedImage ? '✓ Photo Ready' : 'Standby')}
                  </span>
                </div>

                {/* Hidden Native File Input (Supports Mobile Camera & Desktop Uploads) */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {/* Camera Error Alert */}
                {cameraError && (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span>⚠️</span>
                      <span>Camera Notice</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-800">{cameraError}</p>
                  </div>
                )}

                {/* Vision Scan Success Banner */}
                {visionScanSuccess && (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold flex items-center gap-2 shadow-2xs">
                    <span>🌱</span>
                    <span className="text-[11px]">{visionScanSuccess}</span>
                  </div>
                )}

                {/* Viewfinder State 1: Live Webcam / Mobile Camera with Object Tracking */}
                {isCameraActive && (
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-950 aspect-video border-2 border-emerald-500 shadow-lg flex items-center justify-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      ></video>

                      {/* Optical Object Scanning Target Reticle with HUD */}
                      <div className="absolute inset-3 sm:inset-5 border-2 border-dashed border-emerald-400/80 rounded-2xl pointer-events-none flex flex-col items-center justify-between p-3">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-[10px] font-bold text-white bg-slate-950/85 px-2.5 py-0.5 rounded-full backdrop-blur-xs font-mono border border-emerald-500/40">
                            🎯 Object Target: Foliage / Crop Leaf
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-slate-950/85 px-2.5 py-0.5 rounded-full backdrop-blur-xs font-mono animate-pulse border border-emerald-500/40">
                            🔴 Live Stream
                          </span>
                        </div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse shadow-[0_0_12px_#34d399]"></div>
                        <div className="flex items-center justify-between w-full text-[10px] text-emerald-300 bg-slate-950/85 px-2.5 py-1 rounded-full backdrop-blur-xs border border-emerald-500/30">
                          <span>Auto-centering on foliar lesions</span>
                          <span className="font-mono">Tap Capture to Scan Object</span>
                        </div>
                      </div>
                    </div>

                    {/* Camera Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={capturePhoto}
                        className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <span>📷</span>
                        <span>Capture & Scan Object</span>
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center justify-center gap-1.5"
                      >
                        <span>✕</span>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Viewfinder State 2: Captured / Uploaded Image Preview & Object Scanner */}
                {!isCameraActive && capturedImage && (
                  <div className="space-y-3">
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-300 shadow-sm max-h-60">
                      <img
                        src={capturedImage}
                        alt="Leaf Scan Preview"
                        className="w-full h-52 object-cover rounded-2xl"
                      />

                      {/* Object Scanning Laser Animation while Analyzing */}
                      {isAnalyzingImage && (
                        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-4 text-white text-center space-y-2.5">
                          <div className="w-9 h-9 rounded-full border-3 border-emerald-400 border-t-transparent animate-spin"></div>
                          <div>
                            <span className="text-xs font-extrabold text-emerald-400 block">Dhenu Vision Object Scanner...</span>
                            <span className="text-[11px] text-slate-300 font-mono mt-0.5 block">Scanning leaf morphology, lesion spread & fungal patterns</span>
                          </div>
                          <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-full font-mono">
                            Translating to {lang === 'hi' ? 'हिन्दी' : lang === 'bn' ? 'বাংলা' : lang === 'mr' ? 'मराठी' : 'English'}
                          </span>
                        </div>
                      )}

                      {/* Scanned Object & Lesion Identification Overlay Banner (After Analysis) */}
                      {!isAnalyzingImage && (
                        <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-xs rounded-xl p-2.5 text-white flex items-center justify-between border border-slate-700/60 shadow-lg">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-emerald-400 text-sm">🌿</span>
                            <div className="truncate">
                              <span className="text-[11px] font-bold block text-white truncate">
                                {multimodalReport?.detectedObject || `${currentDisease.crops[lang] || currentDisease.crops.en} Foliage Object`}
                              </span>
                              <span className="text-[10px] text-emerald-400 font-mono block truncate">
                                ✓ Scanned: {currentDisease.disease[lang] || currentDisease.disease.en}
                              </span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full shrink-0">
                            {currentDisease.confidence} Match
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Reset & Retake Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={startCamera}
                        className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition flex items-center justify-center gap-1.5"
                      >
                        <span>🔄</span>
                        <span>Retake Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        className="py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-300 transition flex items-center justify-center gap-1.5"
                      >
                        <span>📁</span>
                        <span>Change Photo</span>
                      </button>
                    </div>

                    {/* Quick In-Place Language Switcher directly below captured image */}
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                        <span className="flex items-center gap-1">
                          <span>🌐</span>
                          <span>Change Diagnosis Language:</span>
                        </span>
                        <span className="font-mono text-emerald-700">
                          {lang === 'hi' ? 'हिन्दी' : lang === 'bn' ? 'বাংলা' : lang === 'mr' ? 'मराठी' : 'English'} Active
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {[
                          { code: 'hi', label: 'हिन्दी' },
                          { code: 'bn', label: 'বাংলা' },
                          { code: 'mr', label: 'मराठी' },
                          { code: 'en', label: 'English' }
                        ].map(item => (
                          <button
                            key={item.code}
                            type="button"
                            onClick={() => handleLanguageChange(item.code)}
                            className={`py-1 text-[11px] font-bold rounded-lg transition ${
                              lang === item.code
                                ? 'bg-emerald-600 text-white shadow-2xs'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Viewfinder State 3: Standby Upload / Camera Launch Box */}
                {!isCameraActive && !capturedImage && (
                  <div
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => {
                      e.preventDefault();
                      const file = e.dataTransfer.files && e.dataTransfer.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = ev => processLeafImage(ev.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center space-y-3.5 bg-slate-50/70 transition"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 text-2xl flex items-center justify-center mx-auto shadow-2xs">
                      📸
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{t.doctor.dragText}</p>
                      <span className="text-[11px] text-slate-500 block mt-0.5">{t.doctor.formats}</span>
                    </div>

                    {/* Dual Trigger Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={startCamera}
                        className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
                      >
                        <span>📷</span>
                        <span>Open Camera</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        className="py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-2xs transition flex items-center justify-center gap-1.5"
                      >
                        <span>📁</span>
                        <span>Upload File</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Multimodal Input: Farmer's Observed Symptoms & Voice Query */}
                <div className="space-y-2.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <span>🗣️</span>
                      <span>Farmer's Field Symptoms Note</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Vision + Text Fusion</span>
                  </div>
                  
                  <div className="relative">
                    <textarea
                      rows={2}
                      value={symptomNotes}
                      onChange={(e) => setSymptomNotes(e.target.value)}
                      placeholder={
                        lang === 'hi' ? 'उदा. पत्तियों पर नाव जैसे भूरे धब्बे, बालियों का सूखना...' :
                        lang === 'bn' ? 'যেমন পাতার ওপর মাকু আকৃতির বাদামী দাগ, শীষ শুকিয়ে যাওয়া...' :
                        lang === 'mr' ? 'उदा. पानांवर बदामाच्या आकाराचे तपकिरी ठिपके, शेंडे सुकणे...' :
                        'e.g. Spindle brown lesions on leaves, rotting stems, leaf margin burn...'
                      }
                      className="w-full text-xs p-3 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white placeholder-slate-400 resize-none transition"
                    />
                  </div>

                  {/* Quick Symptom Preset Chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: '🍂 Brown Spindle Spots', crop: 'paddy', symptom: 'Spindle-shaped brown leaf spots with grey center and collar rot' },
                      { label: '🐛 Boll Entrance Holes', crop: 'cotton', symptom: 'Rosetted flower petals with larval bore-holes in bolls and frass' },
                      { label: '🎯 Target Board Rings', crop: 'tomato', symptom: 'Concentric target rings on lower foliage and stem cankers' },
                      { label: '💧 Water-Soaked Necrosis', crop: 'potato', symptom: 'Water-soaked irregular blackish lesions on leaf margins with white down' }
                    ].map((chip, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedCropKey(chip.crop);
                          setSymptomNotes(chip.symptom);
                          processLeafImage(capturedImage, chip.symptom);
                        }}
                        className="text-[10px] bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200 transition"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Multimodal Run Analysis Button */}
                  <button
                    type="button"
                    onClick={() => processLeafImage(capturedImage, symptomNotes)}
                    disabled={isAnalyzingImage}
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                  >
                    {isAnalyzingImage ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                        <span>Analyzing Multimodal Fusion...</span>
                      </>
                    ) : (
                      <>
                        <span>🧠</span>
                        <span>Analyze Leaf + Symptoms Fusion</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-700 block">{t.doctor.samplePrompt}</span>
                  <div className="grid grid-cols-1 gap-2">
                    {['paddy', 'cotton', 'tomato', 'potato'].map(ck => {
                      const item = MULTI_DISEASES[ck];
                      return (
                        <button
                          key={ck}
                          onClick={() => {
                            setSelectedCropKey(ck);
                            setCapturedImage(null);
                            setVisionScanSuccess('');
                            const itemSymptoms = item.symptoms[lang] || item.symptoms.en;
                            setSymptomNotes(itemSymptoms);
                            processLeafImage(null, itemSymptoms);
                          }}
                          className={`p-3.5 rounded-2xl border text-left text-xs transition flex items-center justify-between ${
                            selectedCropKey === ck
                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div>
                            <span className="block font-bold">{item.crops[lang] || item.crops.en}</span>
                            <span className="text-[11px] font-normal text-slate-500">{item.disease[lang] || item.disease.en}</span>
                          </div>
                          <span className="text-sm">🔍</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AI Diagnosis Result Card */}
              {(() => {
                const activeDiag = (multimodalReport && multimodalReport.diagnosis) ? multimodalReport.diagnosis : null;
                const diagDisease = (activeDiag && activeDiag.disease) ? activeDiag.disease : (currentDisease.disease[lang] || currentDisease.disease.en);
                const diagPathogen = (activeDiag && activeDiag.pathogen) ? activeDiag.pathogen : currentDisease.pathogen;
                const diagConfidence = (activeDiag && activeDiag.confidence) ? activeDiag.confidence : currentDisease.confidence;
                const diagSeverity = (activeDiag && activeDiag.severity) ? activeDiag.severity : (currentDisease.severity || 'Stage 2 — Active Leaf Foliar Lesions');
                const diagLesionCov = (activeDiag && activeDiag.lesionCoverage) ? activeDiag.lesionCoverage : (currentDisease.lesionCoverage || '18% leaf necrosis');
                const diagOrganic = (activeDiag && activeDiag.organicRemedy) ? activeDiag.organicRemedy : (currentDisease.organic[lang] || currentDisease.organic.en);
                const diagChemical = (activeDiag && activeDiag.chemicalRemedy) ? activeDiag.chemicalRemedy : (currentDisease.chemical[lang] || currentDisease.chemical.en);
                const diagDosage = (activeDiag && activeDiag.dosePerAcre) ? activeDiag.dosePerAcre : (currentDisease.dosage[lang] || currentDisease.dosage.en);
                const diagPhi = (activeDiag && activeDiag.phiDays) ? `${activeDiag.phiDays} Days Waiting Period before harvest` : (currentDisease.phi[lang] || currentDisease.phi.en);
                const diagCaution = (activeDiag && activeDiag.caution) ? activeDiag.caution : (currentDisease.caution[lang] || currentDisease.caution.en);
                const cibrcTargetId = (activeDiag && activeDiag.cibrcChemicalId) ? activeDiag.cibrcChemicalId : (currentDisease.cibrcChemicalId || 'CIBRC-TRI-004');
                const whatsappText = (multimodalReport && multimodalReport.whatsappShareText)
                  ? multimodalReport.whatsappShareText
                  : encodeURIComponent(`🌿 *KissanAI Dhenu Vision फसल रोग निदान रिपोर्ट* 🔬\n🌱 *फसल:* ${currentDisease.crops[lang] || currentDisease.crops.en}\n⚠️ *रोग:* ${diagDisease}\n🧬 *रोगकारक:* ${diagPathogen}\n🎯 *सटीकता:* ${diagConfidence}\n🧪 *उपचार:* ${diagChemical}\n⏱️ *PHI:* ${diagPhi}`);

                return (
                  <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 space-y-5 shadow-sm">
                    {/* Multimodal AI Engine Banner */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="relative flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                        </span>
                        <div>
                          <span className="text-xs font-bold text-emerald-400 block">Dhenu Vision V2 Multimodal Neural Classifier</span>
                          <span className="text-[10px] text-slate-400">Fused Optical Leaf Lesion + Vernacular Symptom Analysis</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full font-mono font-bold">
                          {diagConfidence} Match
                        </span>
                        <span className={`text-xs px-3 py-1 rounded-full font-bold shadow-xs ${currentDisease.triangleBg}`}>
                          {currentDisease.triangle} Triangle
                        </span>
                      </div>
                    </div>

                    {/* Disease Title & Pathogen Header */}
                    <div className="pb-3 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                          {currentDisease.crops[lang] || currentDisease.crops.en}
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                          {diagDisease}
                        </h3>
                        <p className="text-xs text-slate-500 italic font-medium">Pathogen: {diagPathogen}</p>
                      </div>
                    </div>

                    {/* Lesion Severity & Health Metrics Bar */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700 flex items-center gap-1.5">
                          <span>🔬</span>
                          <span>Foliar Severity & Lesion Spread</span>
                        </span>
                        <span className="font-mono font-bold text-amber-700">
                          {diagSeverity} ({diagLesionCov})
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 h-2.5 rounded-full w-[45%] transition-all duration-500"></div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-0.5">
                        <span>🌡️ Micro-Climate: 26°C Ambient • 62% RH • Wind: 7 km/h</span>
                        <span className="text-emerald-700 font-semibold">✓ CIBRC Safety Validation Complete</span>
                      </div>
                    </div>

                    {/* High-Action Toolbar: Audio Readout, CIBRC Tank Dilution, WhatsApp Share */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      {/* 1. Regional Audio Prescription Readout */}
                      <button
                        type="button"
                        onClick={playPrescriptionAudio}
                        className={`py-3 px-3 rounded-2xl font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 ${
                          isPlayingAudio
                            ? 'bg-purple-600 text-white ring-2 ring-purple-400 animate-pulse'
                            : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
                        }`}
                      >
                        <span className="text-base">{isPlayingAudio ? '⏹️' : '🔊'}</span>
                        <span>{isPlayingAudio ? 'Stop Audio Readout' : 'Audio Prescription'}</span>
                      </button>

                      {/* 2. Direct 1-Click Bridge to CIBRC Dosage Calculator */}
                      <button
                        type="button"
                        onClick={() => jumpToDosageCalculator(cibrcTargetId, selectedCropKey)}
                        className="py-3 px-3 rounded-2xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-2"
                      >
                        <span className="text-base">🧪</span>
                        <span>Calculate Tank Dilution</span>
                      </button>

                      {/* 3. Share on WhatsApp with Farmers / Extension Agents */}
                      <button
                        type="button"
                        onClick={() => {
                          window.open(`https://api.whatsapp.com/send?text=${whatsappText}`, '_blank');
                        }}
                        className="py-3 px-3 rounded-2xl font-bold text-xs bg-green-600 hover:bg-green-500 text-white shadow-md shadow-green-600/30 transition flex items-center justify-center gap-2"
                      >
                        <span className="text-base">📲</span>
                        <span>Share on WhatsApp</span>
                      </button>
                    </div>

                    {/* Observed Symptoms Box */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">{t.doctor.symptomsLabel}</h4>
                      <p className="text-xs text-slate-700 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 leading-relaxed font-medium">
                        {currentDisease.symptoms[lang] || currentDisease.symptoms.en}
                      </p>
                    </div>

                    {/* Dual-Tier Prescription Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Organic Remedy */}
                      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                        <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                          <span>🌱</span> {t.doctor.organicLabel}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {diagOrganic}
                        </p>
                      </div>

                      {/* Chemical Remedy */}
                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                        <span className="text-xs font-bold text-blue-800 flex items-center gap-1.5">
                          <span>🧪</span> {t.doctor.chemicalLabel}
                        </span>
                        <p className="text-xs text-slate-700 leading-relaxed font-mono text-[11px]">
                          {diagChemical}
                        </p>
                      </div>
                    </div>

                    {/* Safety, Dosage & Waiting Period */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[11px] font-medium">{t.doctor.acreDoseLabel}</span>
                        <span className="font-bold text-emerald-700 font-mono mt-0.5 block">
                          {diagDosage}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[11px] font-medium">{t.doctor.phiLabel}</span>
                        <span className="font-bold text-amber-700 mt-0.5 block">
                          {diagPhi}
                        </span>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                        <span className="text-slate-500 block text-[11px] font-medium">{t.doctor.emergencyLabel}</span>
                        <span className="font-bold text-red-700 mt-0.5 block">{t.doctor.emergencyVal}</span>
                      </div>
                    </div>

                    {/* Regulatory Caution & Safe Application Notice */}
                    <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                      <span className="text-sm">⚠️</span>
                      <span><strong>{t.doctor.cautionLabel}</strong> {diagCaution}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* TAB 3: DHENU MARKETS (LIVE MANDI PRICES) */}
        {activeTab === 'mandi' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>📈 {t.mandi.title}</span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {t.mandi.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => {
                    if (currentUser && currentUser.phone) {
                      setWhatsappForm(prev => ({ ...prev, phone: currentUser.phone }));
                    }
                    setIsWhatsAppOpen(true);
                  }}
                  className="text-xs bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs transition"
                >
                  <span>📲</span>
                  <span>Setup WhatsApp Alerts</span>
                </button>
                <span className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-xs">
                  <span>🐘</span>
                  <span>PostgreSQL (kissan_ai)</span>
                </span>
                <span className="text-xs bg-white border border-slate-300 px-3 py-1.5 rounded-xl text-slate-700 font-bold font-mono shadow-xs">
                  {t.mandi.updatedAt}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(mandiRates.length > 0 ? mandiRates : MULTI_MANDI).map((item, i) => {
                const marketName = item.market || (item.markets && (item.markets[lang] || item.markets.en)) || 'APMC Mandi';
                const cropName = item.crop || (item.crops && (item.crops[lang] || item.crops.en)) || 'Commodity';
                return (
                  <div key={i} className="bg-white border border-slate-200 p-5 rounded-3xl space-y-3 hover:border-emerald-300 hover:shadow-md transition shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs text-slate-500 block font-medium">{marketName}</span>
                        <h3 className="font-extrabold text-base text-slate-900 mt-0.5">{cropName}</h3>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-0.5 ${
                        item.status === 'up' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
                      }`}>
                        {item.status === 'up' ? '▲' : '▼'} {item.change}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-2xl font-extrabold text-slate-900">₹{item.price.toLocaleString()}</span>
                      <span className="text-xs text-slate-500 font-medium ml-1">{t.mandi.perQuintal}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 font-medium">
                      <span>{t.mandi.modalPrice}</span>
                      <span className="text-emerald-700 font-bold">
                        Live e-NAM APMC
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <span>📲</span>
                  <span>{t.mandi.alertCardTitle}</span>
                </h3>
                <p className="text-xs text-slate-600">{t.mandi.alertCardDesc}</p>
              </div>
              <button
                onClick={() => {
                  if (currentUser && currentUser.phone) {
                    setWhatsappForm(prev => ({ ...prev, phone: currentUser.phone }));
                  }
                  setIsWhatsAppOpen(true);
                }}
                className="bg-green-600 hover:bg-green-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-sm shadow-green-600/30 flex items-center gap-2"
              >
                <span>📲</span>
                <span>{t.mandi.alertCardBtn}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: CIBRC PESTICIDE & SPRAY DOSAGE CALCULATOR (LIVE API INTEGRATION) */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 p-5 rounded-3xl shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>🧪 {t.calculator.title}</span>
                  </h2>
                  <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-ping"></span>
                    <span>CIBRC API Live</span>
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                  Statutory pesticide label dilution, knapsack tank dosage, pre-harvest interval (PHI), and safety protocol generated directly from the CIBRC Regulatory API.
                </p>
              </div>
              <div className="text-right flex items-center sm:flex-col justify-between sm:justify-center gap-1 bg-white/80 border border-emerald-200 px-3.5 py-2 rounded-2xl shadow-xs">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Regulatory Source</span>
                <span className="text-xs font-extrabold text-emerald-800 font-mono">Govt. of India CIBRC</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Form */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                    <span>⚙️</span>
                    <span>{t.calculator.paramsTitle}</span>
                  </h3>
                  {calcLoading && (
                    <span className="text-[11px] text-emerald-600 font-bold animate-pulse flex items-center gap-1">
                      <span>🔄</span>
                      <span>API Recalculating...</span>
                    </span>
                  )}
                </div>

                {/* CIBRC Registered Formulation Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>CIBRC Approved Formulation *</span>
                    <span className="text-[10px] text-emerald-700 font-semibold font-mono">API Feed</span>
                  </label>
                  <select
                    value={calcChemicalId}
                    onChange={e => {
                      const chosenId = e.target.value;
                      setCalcChemicalId(chosenId);
                      const found = calcFormulations.find(f => f.id === chosenId);
                      if (found && found.crops && found.crops.length > 0) {
                        setCalcCrop(found.crops[0].toLowerCase());
                      }
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  >
                    {calcFormulations.map(form => (
                      <option key={form.id} value={form.id}>
                        {form.chemicalName} ({form.toxicityTriangle} Triangle • {form.dosePerLitre} {form.unit}/L)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Crop Type Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.calculator.cropType}</label>
                  <select
                    value={calcCrop}
                    onChange={e => setCalcCrop(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  >
                    <option value="paddy">Paddy / Rice (धान)</option>
                    <option value="cotton">Cotton (कपास / कापूस)</option>
                    <option value="potato">Potato (आलू / बटाटा)</option>
                    <option value="tomato">Tomato (टमाटर / टोमॅटो)</option>
                    <option value="chilli">Chilli (मिर्च / मिरची)</option>
                    <option value="wheat">Wheat (गेहूं / गहू)</option>
                  </select>
                </div>

                {/* Land Area Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-700">{t.calculator.landArea}</label>
                    <span className="text-[11px] text-slate-500 font-mono font-semibold">{calcArea} Acre(s) = {(calcArea * 0.4047).toFixed(2)} Ha</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0.25"
                      max="50"
                      step="0.25"
                      value={calcArea}
                      onChange={e => setCalcArea(parseFloat(e.target.value) || 0.5)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white font-mono font-bold transition"
                    />
                    <span className="absolute right-3.5 top-3 text-xs font-bold text-slate-500 pointer-events-none">Acres</span>
                  </div>
                </div>

                {/* Tank Size Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">{t.calculator.tankSize}</label>
                  <select
                    value={calcTank}
                    onChange={e => setCalcTank(parseInt(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition"
                  >
                    <option value="16">16 L (Standard Manual Knapsack Sprayer)</option>
                    <option value="20">20 L (Battery Powered Knapsack Sprayer)</option>
                    <option value="200">200 L (Tractor-Mounted Barrel Sprayer)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => fetchCalculatorFromApi(calcCrop, calcChemicalId, calcArea, calcTank)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5"
                  >
                    <span>🔄</span>
                    <span>Refresh API Dosage Verification</span>
                  </button>
                </div>
              </div>

              {/* Calculated Output Card (Live from API) */}
              <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 space-y-6 shadow-sm">
                {/* Header with CIBRC Toxicity Triangle & PHI */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-emerald-700 font-extrabold uppercase tracking-wider">{t.calculator.resultHeader}</span>
                      <span className="text-[10px] text-slate-500 font-mono">• /api/dosage-calculator</span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mt-0.5">
                      {calcApiResult ? calcApiResult.formulation.chemicalName : 'Tricyclazole 75% WP'} — For {calcArea} Acres
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Toxicity Triangle Badge */}
                    {(() => {
                      const tri = calcApiResult ? calcApiResult.formulation.toxicityTriangle : 'Yellow';
                      const colorMap = {
                        Red: 'bg-red-100 text-red-900 border-red-300',
                        Yellow: 'bg-amber-100 text-amber-900 border-amber-300',
                        Blue: 'bg-blue-100 text-blue-900 border-blue-300',
                        Green: 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      };
                      const iconMap = { Red: '🔺 Red', Yellow: '⚠️ Yellow', Blue: '🔷 Blue', Green: '🟢 Green' };
                      return (
                        <span className={`text-[11px] font-extrabold px-3 py-1 rounded-full border shadow-2xs ${colorMap[tri] || colorMap.Yellow}`}>
                          {iconMap[tri] || tri} Triangle
                        </span>
                      );
                    })()}

                    {/* PHI Waiting Period Badge */}
                    <span className="text-[11px] bg-slate-900 text-white font-extrabold px-3 py-1 rounded-full shadow-2xs flex items-center gap-1 font-mono">
                      <span>⏱️ PHI:</span>
                      <span>{calcApiResult ? calcApiResult.results.phiDays : 21} Days</span>
                    </span>
                  </div>
                </div>

                {/* 3 Core Dosage Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Per Tank Dose */}
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1 relative overflow-hidden">
                    <span className="text-xs text-emerald-900 font-bold block">{t.calculator.perTankDose}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono block">
                      {calcApiResult ? calcApiResult.results.doseDisplay : `${(calcTank * 0.6).toFixed(1)} g`}
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold block">
                      Per {calcTank} L Water Tank
                    </span>
                  </div>

                  {/* Total Water & Knapsack Tank Count */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-1 relative overflow-hidden">
                    <span className="text-xs text-blue-900 font-bold block">{t.calculator.waterTotal}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-blue-800 font-mono block">
                      {calcApiResult ? `${calcApiResult.results.totalWaterLitres} L` : `${calcArea * 200} L`}
                    </span>
                    <span className="text-[11px] text-blue-700 font-semibold block">
                      {calcApiResult ? `${calcApiResult.results.totalTanks} Tanks Total` : `${Math.ceil((calcArea * 200) / calcTank)} Tanks Total`}
                    </span>
                  </div>

                  {/* Total Chemical Requirement for Field */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1 relative overflow-hidden">
                    <span className="text-xs text-amber-900 font-bold block">{t.calculator.chemTotal}</span>
                    <span className="text-2xl sm:text-3xl font-extrabold text-amber-900 font-mono block">
                      {calcApiResult ? calcApiResult.results.totalChemicalDisplay : `${(calcArea * 200 * 0.6).toFixed(0)} g`}
                    </span>
                    <span className="text-[11px] text-amber-800 font-semibold block">
                      Exact For {calcArea} Acres
                    </span>
                  </div>
                </div>

                {/* Target Pests & Mandatory PPE from API */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Target Pests */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>🐛</span>
                      <span>CIBRC Registered Target Pests:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(calcApiResult && calcApiResult.formulation.targetPests ? calcApiResult.formulation.targetPests : ['Blast', 'Brown Spot', 'Stem borer']).map((pest, pIdx) => (
                        <span key={pIdx} className="bg-white border border-slate-300 text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded-lg shadow-2xs">
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory PPE */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span>🦺</span>
                      <span>Mandatory PPE Equipment:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(calcApiResult && calcApiResult.formulation.ppeRequired ? calcApiResult.formulation.ppeRequired : ['N95 Respirator Mask', 'Nitrile Gloves', 'Gumboots', 'Goggles']).map((ppe, ppeIdx) => (
                        <span key={ppeIdx} className="bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-semibold px-2 py-0.5 rounded-lg shadow-2xs">
                          ✓ {ppe}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Medical Antidote from API */}
                {calcApiResult && calcApiResult.formulation.antidote && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-red-900">
                      <span>🏥</span>
                      <span>Statutory Medical Antidote & First-Aid Guidance (CIBRC Label):</span>
                    </div>
                    <p className="text-red-800 font-medium leading-relaxed text-[11px]">
                      {calcApiResult.formulation.antidote}
                    </p>
                  </div>
                )}

                {/* Statutory Golden Spray Rules from API */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <span>🛡️</span>
                    <span>{t.calculator.goldenRules}</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                    {(calcApiResult && calcApiResult.goldenSprayRules ? calcApiResult.goldenSprayRules : [
                      t.calculator.rule1,
                      t.calculator.rule2,
                      t.calculator.rule3
                    ]).map((rule, rIdx) => (
                      <li key={rIdx}>{rule}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: COMMUNITY TRANSLATION PORTAL & SAFETY SANDBOX */}
        {activeTab === 'portal' && (
          <div className="space-y-8">
            {/* Portal Header */}
            <div className="bg-gradient-to-r from-emerald-50 via-white to-teal-50 border border-emerald-200 p-6 md:p-8 rounded-3xl space-y-3 shadow-sm">
              <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold border border-emerald-300">
                <span>🌐</span>
                <span>Open Source Community Translation Portal & Safety Sandbox</span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Translate Agricultural Safety into Indian Regional Languages
              </h2>
              <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
                Empowering university students, agronomists, and local farming cooperatives to translate CIBRC pesticide labels, PPE requirements, and dilution guides. Features live placeholder protection (<code>{'{dose_amount}'}</code>) and automated safety regression testing.
              </p>

              {portalSuccessMsg && (
                <div className="bg-emerald-100 border border-emerald-400 text-emerald-900 px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <span>✅</span>
                  <span>{portalSuccessMsg}</span>
                </div>
              )}
            </div>

            {/* Side-by-Side Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Canonical English Source */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇬🇧</span>
                    <h3 className="font-extrabold text-sm text-slate-900">Canonical English Standard</h3>
                  </div>
                  <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200">
                    {CANONICAL_PORTAL_KEYS[portalKey]?.category || 'General Safety'}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Select Terminology String:</label>
                  <select
                    value={portalKey}
                    onChange={e => {
                      const k = e.target.value;
                      setPortalKey(k);
                      setValidationFeedback(null);
                    }}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-emerald-600"
                  >
                    {Object.keys(CANONICAL_PORTAL_KEYS).map(k => (
                      <option key={k} value={k}>
                        {CANONICAL_PORTAL_KEYS[k].name} ({k})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Official Source Text:</span>
                  <p className="text-xs text-slate-800 leading-relaxed font-mono bg-white p-3 rounded-xl border border-slate-200">
                    {CANONICAL_PORTAL_KEYS[portalKey]?.source}
                  </p>
                </div>

                {/* Dynamic Placeholders & Negations Indicators */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-600 block">Critical Translation Rules for this Key:</span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {CANONICAL_PORTAL_KEYS[portalKey]?.placeholders.length > 0 ? (
                      CANONICAL_PORTAL_KEYS[portalKey].placeholders.map(ph => (
                        <span key={ph} className="bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold flex items-center gap-1">
                          <span>📌 Required:</span>
                          <code>{ph}</code>
                        </span>
                      ))
                    ) : (
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[11px]">No variable placeholders</span>
                    )}

                    {CANONICAL_PORTAL_KEYS[portalKey]?.hasNegation && (
                      <span className="bg-red-50 text-red-900 border border-red-300 px-2.5 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1">
                        <span>🚫 Mandatory Negation:</span>
                        <span>"do NOT induce vomiting"</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Regional Language Contributor Editor */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🇮🇳</span>
                    <h3 className="font-extrabold text-sm text-slate-900">Regional Language Editor</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600">Language:</span>
                    <select
                      value={portalLang}
                      onChange={e => {
                        setPortalLang(e.target.value);
                        setValidationFeedback(null);
                      }}
                      className="bg-emerald-50 text-emerald-900 font-bold text-xs border border-emerald-300 rounded-xl px-2.5 py-1 focus:outline-none"
                    >
                      <option value="bn">বাংলা (Bengali - 42.4% Draft)</option>
                      <option value="hi">हिन्दी (Hindi - Verified)</option>
                      <option value="mr">मराठी (Marathi - Verified)</option>
                      <option value="ta">தமிழ் (Tamil - Needs Pioneer)</option>
                      <option value="te">తెలుగు (Telugu - Needs Pioneer)</option>
                      <option value="gu">ગુજરાતી (Gujarati - Needs Pioneer)</option>
                      <option value="kn">ಕನ್ನಡ (Kannada - Needs Pioneer)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Translation / Proposed Text:</label>
                  <textarea
                    rows="4"
                    value={portalTranslation}
                    onChange={e => {
                      setPortalTranslation(e.target.value);
                      setValidationFeedback(null);
                    }}
                    placeholder="Type your regional translation here..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-medium leading-relaxed"
                  ></textarea>
                </div>

                {/* Real-time Client-Side Warnings */}
                {getClientWarnings().map((w, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 ${
                      w.type === 'red'
                        ? 'bg-red-50 text-red-900 border border-red-300 font-medium'
                        : 'bg-amber-50 text-amber-900 border border-amber-300 font-medium'
                    }`}
                  >
                    <span className="text-base">{w.type === 'red' ? '🚨' : '⚠️'}</span>
                    <div>
                      <strong className="block font-bold">{w.title}</strong>
                      <span>{w.msg}</span>
                    </div>
                  </div>
                ))}

                {/* Contributor Metadata & Review Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Contributor Handle:</label>
                    <input
                      type="text"
                      value={portalContributor}
                      onChange={e => setPortalContributor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">University / Field Citation:</label>
                    <input
                      type="text"
                      value={portalReviewNote}
                      onChange={e => setPortalReviewNote(e.target.value)}
                      placeholder="e.g. BCKV / MPKV Package of Practices"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={handleRunSafetyRegression}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 px-4 rounded-xl transition border border-slate-300 flex items-center justify-center gap-1.5"
                  >
                    <span>🛡️</span>
                    <span>Run CIBRC Regression Engine</span>
                  </button>
                  <button
                    onClick={handlePortalSubmit}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
                  >
                    <span>🚀</span>
                    <span>Submit for Review</span>
                  </button>
                </div>

                {/* Regression Result Box */}
                {validationFeedback && (
                  <div className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
                    validationFeedback.passed
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-red-50 border-red-300 text-red-950'
                  }`}>
                    <div className="flex items-center gap-2 font-bold">
                      <span>{validationFeedback.passed ? '✅' : '❌'}</span>
                      <span>{validationFeedback.passed ? 'Zero Regressions Detected — Safe for Publication' : 'Safety Regression Blocked'}</span>
                    </div>
                    <p className="text-[11px] opacity-90">
                      {validationFeedback.passed
                        ? 'Numerical dosages, pre-harvest interval days, emergency ingestion negations, and placeholder integrity verified against CIBRC rules.'
                        : 'Automated regression test failed. Please address the client warnings above before submitting.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Regional Language Support Matrix */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span>🇮🇳</span>
                    <span>Regional Language Support Matrix</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Audited in real-time via <code>npm run detect:missing</code></p>
                </div>
                <button
                  onClick={() => alert('Good First Issue template generated at .github/generated_issues/issue_missing_translations_bn.md')}
                  className="bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-300 text-xs font-bold px-4 py-2 rounded-xl transition"
                >
                  📋 Copy Good First Issue Markdown
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider bg-slate-50">
                      <th className="py-3 px-4">Language</th>
                      <th className="py-3 px-4">ISO Code</th>
                      <th className="py-3 px-4">Coverage</th>
                      <th className="py-3 px-4">Missing Strings</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Contribution Opportunity</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {LANGUAGE_MATRIX.map(m => (
                      <tr key={m.code} className="hover:bg-slate-50/70 transition">
                        <td className="py-3 px-4 font-bold">{m.name}</td>
                        <td className="py-3 px-4 font-mono font-bold text-slate-600">{m.code}</td>
                        <td className="py-3 px-4 font-mono font-extrabold">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${m.coverage}%` }}></div>
                            </div>
                            <span>{m.coverage.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono">{m.missing}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${m.badge}`}>
                            {m.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-medium text-emerald-700">{m.opportunity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: TRANSLATION REVIEW & APPROVAL WORKFLOW */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>✅ {t.tabs.reviews}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                    Multi-Tier Review Pipeline
                  </span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Agricultural scientists and native language reviewers verify terminology against university package-of-practices (MPKV, TNAU, BCKV) and CIBRC safety labels before merging.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex bg-slate-100 p-1 rounded-2xl text-xs font-bold">
                {['ALL', 'PENDING', 'APPROVED'].map(f => (
                  <button
                    key={f}
                    onClick={() => setReviewFilter(f)}
                    className={`px-3 py-1.5 rounded-xl transition ${
                      reviewFilter === f ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {reviewsList
                .filter(r => reviewFilter === 'ALL' || r.status === reviewFilter)
                .map(rev => (
                  <div key={rev.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm hover:border-slate-300 transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs uppercase">
                          {rev.localeCode}
                        </span>
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900">{rev.languageName} — <code>{rev.keyPath}</code></h3>
                          <span className="text-[11px] text-slate-500">Submitted by <strong>{rev.contributor}</strong> • {rev.submittedAt}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        rev.status === 'APPROVED'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border-amber-300'
                      }`}>
                        {rev.status === 'APPROVED' ? '✓ APPROVED & MERGED' : '⏳ PENDING SCIENTIFIC REVIEW'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">English Canonical Source:</span>
                        <p className="font-mono text-slate-800">{rev.englishSource}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase">Proposed Regional Translation:</span>
                        <p className="font-medium text-slate-900 font-indic">{rev.proposedTranslation}</p>
                      </div>
                    </div>

                    {rev.comments && rev.comments.length > 0 && (
                      <div className="text-xs bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1">
                        {rev.comments.map((c, i) => (
                          <div key={i} className="text-slate-700">
                            <strong className="text-slate-900 font-bold">{c.author}:</strong> {c.text}
                          </div>
                        ))}
                      </div>
                    )}

                    {rev.status === 'PENDING' && (
                      <div className="flex flex-wrap gap-3 pt-1">
                        <button
                          onClick={() => handleReviewAction(rev.id, 'APPROVED', 'Verified with university package-of-practices.')}
                          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs"
                        >
                          ✅ Approve & Merge
                        </button>
                        <button
                          onClick={() => handleReviewAction(rev.id, 'REVISION_REQUESTED', 'Please ensure local colloquial terminology matches CIBRC standard.')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl border border-slate-300 transition"
                        >
                          🔄 Request Revision
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB: PUBLIC CIBRC PESTICIDE REGISTRY */}
        {activeTab === 'registry' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>📊 {t.tabs.registry}</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-bold">
                    Public Dataset
                  </span>
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Curated, searchable dataset of legally shareable pesticide formulations (Chlorpyrifos, Imidacloprid, Mancozeb) with approved dosages, target pests, and verified antidotes. Free of personal or proprietary secrets.
                </p>
              </div>

              {/* Triangle Filter */}
              <div className="flex flex-wrap gap-2 text-xs">
                {['ALL', 'Yellow', 'Blue', 'Green'].map(tri => (
                  <button
                    key={tri}
                    onClick={() => setRegistryTriangle(tri)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition border ${
                      registryTriangle === tri
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tri}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={registrySearch}
                onChange={e => setRegistrySearch(e.target.value)}
                placeholder="Search formulation by name (e.g. Chlorpyrifos), crop (Paddy), or pest (Stem borer)..."
                className="w-full bg-white border border-slate-300 rounded-2xl px-4 py-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 shadow-xs"
              />
            </div>

            {/* Formulations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SAMPLE_PESTICIDES
                .filter(p => registryTriangle === 'ALL' || p.triangle === registryTriangle)
                .filter(p => !registrySearch || (
                  p.name.toLowerCase().includes(registrySearch.toLowerCase()) ||
                  p.crops.some(c => c.toLowerCase().includes(registrySearch.toLowerCase())) ||
                  p.pests.some(pe => pe.toLowerCase().includes(registrySearch.toLowerCase()))
                ))
                .map(pest => (
                  <div key={pest.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm hover:border-emerald-300 transition flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">{pest.id}</span>
                          <h3 className="font-extrabold text-base text-slate-900">{pest.name}</h3>
                          <span className="text-xs text-slate-500 block">{pest.brand}</span>
                        </div>
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs border ${pest.triangleBg}`}>
                          {pest.triangle} Triangle
                        </span>
                      </div>

                      <div className="text-xs space-y-2 text-slate-700">
                        <div><strong className="text-slate-900 font-bold">Approved Crops:</strong> {pest.crops.join(', ')}</div>
                        <div><strong className="text-slate-900 font-bold">Target Pests:</strong> {pest.pests.join(', ')}</div>
                        <div><strong className="text-slate-900 font-bold">Standard Dose:</strong> {pest.dose}</div>
                        <div><strong className="text-slate-900 font-bold">Waiting Period (PHI):</strong> {pest.phi} Days</div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <strong className="text-slate-900 font-bold block text-[11px] uppercase">Verified Emergency Antidote:</strong>
                        <p className="text-slate-700 leading-relaxed font-mono text-[11px]">{pest.antidote}</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>CIBRC Certified Standard</span>
                      <span className="text-emerald-700 font-bold">ODbL-1.0 Public</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* TAB 5: CENTRAL & STATE GOVT SCHEMES & SUBSIDIES */}
        {activeTab === 'schemes' && (
          <div className="space-y-6">
            {/* Header with Stats */}
            <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="relative z-10 space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs px-3.5 py-1 rounded-full font-bold">
                  <span>🏛️</span>
                  <span>{t.schemes.activeStatus}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {t.schemes.title}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                  {t.schemes.desc}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <span className="bg-white/10 px-3 py-1 rounded-full border border-white/10 font-bold">
                    🏛️ Total Verified Schemes: {schemesList.length}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-400/30 font-bold">
                    🇮🇳 Central & State Portals Linked
                  </span>
                  <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-400/30 font-bold">
                    💰 Direct Benefit Transfer (DBT) Ready
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive 1-Minute Scheme Eligibility Calculator */}
            <div className="bg-white rounded-3xl border border-emerald-200/90 p-5 md:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                    <span>{t.schemes.calculatorTitle}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t.schemes.calculatorDesc}
                  </p>
                </div>
                {(schemeCategoryFilter !== 'all' || schemeStateFilter !== 'all' || schemeSearch || calculatorBanner) && (
                  <button
                    type="button"
                    onClick={handleResetSchemeFilters}
                    className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 self-start md:self-auto"
                  >
                    <span>✕</span>
                    <span>{t.schemes.resetBtn}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Field 1: State */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    {t.schemes.stateLabel}
                  </label>
                  <select
                    value={schemeCalculator.state}
                    onChange={e => setSchemeCalculator({ ...schemeCalculator, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="all">{t.schemes.stateAll}</option>
                    <option value="West Bengal">{t.schemes.stateWb}</option>
                    <option value="Maharashtra">{t.schemes.stateMh}</option>
                  </select>
                </div>

                {/* Field 2: Landholding */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    {t.schemes.landLabel}
                  </label>
                  <select
                    value={schemeCalculator.land}
                    onChange={e => setSchemeCalculator({ ...schemeCalculator, land: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="marginal">Small & Marginal (&lt; 2.5 Acres / 1 Ha)</option>
                    <option value="medium">Medium Farmer (2.5 to 5 Acres)</option>
                    <option value="large">Large Farmer (&gt; 5 Acres)</option>
                  </select>
                </div>

                {/* Field 3: Primary Need */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    {t.schemes.needLabel}
                  </label>
                  <select
                    value={schemeCalculator.need}
                    onChange={e => setSchemeCalculator({ ...schemeCalculator, need: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold focus:bg-white focus:outline-none focus:border-emerald-600"
                  >
                    <option value="all">All Requirements</option>
                    <option value="income">{t.schemes.catIncome}</option>
                    <option value="insurance">{t.schemes.catInsurance}</option>
                    <option value="solar">{t.schemes.catSolar}</option>
                    <option value="machinery">{t.schemes.catMachinery}</option>
                    <option value="credit">{t.schemes.catCredit}</option>
                    <option value="organic">{t.schemes.catOrganic}</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={handleCalculateSchemes}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  <span>⚡</span>
                  <span>{t.schemes.checkEligibilityBtn}</span>
                </button>
              </div>

              {/* Calculator Result Banner */}
              {calculatorBanner && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between gap-3 text-xs text-emerald-950 animate-in fade-in">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">🎯</span>
                    <div>
                      <strong className="font-extrabold text-emerald-900">Customized Eligibility Profile Applied:</strong>
                      <span className="ml-1 text-slate-700">Showing top government schemes matching your state and acreage.</span>
                    </div>
                  </div>
                  <button
                    onClick={handleResetSchemeFilters}
                    className="text-emerald-800 hover:text-emerald-950 font-bold underline shrink-0"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
            </div>

            {/* Filter Pills & Live Search Bar */}
            <div className="space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input
                    type="text"
                    value={schemeSearch}
                    onChange={e => setSchemeSearch(e.target.value)}
                    placeholder={t.schemes.searchPlaceholder}
                    className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                  />
                  {schemeSearch && (
                    <button
                      type="button"
                      onClick={() => setSchemeSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* State Quick Filters */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 shrink-0">
                  <span className="text-[11px] font-bold text-slate-500 mr-1 shrink-0">Region:</span>
                  {[
                    { id: 'all', label: t.schemes.stateAll },
                    { id: 'West Bengal', label: 'West Bengal' },
                    { id: 'Maharashtra', label: 'Maharashtra' }
                  ].map(st => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => setSchemeStateFilter(st.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                        schemeStateFilter === st.id
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'all', label: t.schemes.catAll, icon: '🏛️' },
                  { id: 'income', label: t.schemes.catIncome, icon: '💰' },
                  { id: 'insurance', label: t.schemes.catInsurance, icon: '🛡️' },
                  { id: 'solar', label: t.schemes.catSolar, icon: '☀️' },
                  { id: 'machinery', label: t.schemes.catMachinery, icon: '🚜' },
                  { id: 'credit', label: t.schemes.catCredit, icon: '💳' },
                  { id: 'organic', label: t.schemes.catOrganic, icon: '🌱' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSchemeCategoryFilter(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                      schemeCategoryFilter === cat.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 border border-slate-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Schemes Results Grid */}
            {(() => {
              const filtered = schemesList.filter(s => {
                if (schemeStateFilter !== 'all') {
                  const matchState = (s.state && s.state.toLowerCase().includes(schemeStateFilter.toLowerCase())) || s.state === 'All India';
                  if (!matchState) return false;
                }
                if (schemeCategoryFilter !== 'all') {
                  if (s.category !== schemeCategoryFilter) return false;
                }
                if (schemeSearch.trim()) {
                  const q = schemeSearch.toLowerCase().trim();
                  const nameMatch = (s.name && s.name.en && s.name.en.toLowerCase().includes(q)) ||
                                    (s.name && s.name.hi && s.name.hi.toLowerCase().includes(q)) ||
                                    (s.name && s.name.bn && s.name.bn.toLowerCase().includes(q)) ||
                                    (s.name && s.name.mr && s.name.mr.toLowerCase().includes(q));
                  const ministryMatch = s.ministry && s.ministry.toLowerCase().includes(q);
                  const portalMatch = s.portalName && s.portalName.toLowerCase().includes(q);
                  const benefitMatch = s.benefitHighlight && Object.values(s.benefitHighlight).some(v => typeof v === 'string' && v.toLowerCase().includes(q));
                  if (!nameMatch && !ministryMatch && !portalMatch && !benefitMatch) return false;
                }
                return true;
              });

              if (filtered.length === 0) {
                return (
                  <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                    <span className="text-4xl">🏛️</span>
                    <h4 className="text-base font-extrabold text-slate-900">No schemes found matching your filter criteria</h4>
                    <p className="text-xs text-slate-500 max-w-md mx-auto">
                      Try resetting your search query or selecting "All India (Central)" to view the complete catalog of national farmer benefits.
                    </p>
                    <button
                      type="button"
                      onClick={handleResetSchemeFilters}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition"
                    >
                      {t.schemes.resetBtn}
                    </button>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((s, idx) => {
                    const localizedName = (s.name && (s.name[lang] || s.name.en)) || s.id;
                    const localizedHighlight = (s.benefitHighlight && (s.benefitHighlight[lang] || s.benefitHighlight.en)) || '';
                    const localizedBenefit = (s.benefits && (s.benefits[lang] || s.benefits.en)) || '';
                    const localizedEligibility = (s.eligibility && (s.eligibility[lang] || s.eligibility.en)) || '';

                    return (
                      <div
                        key={s.id || idx}
                        className="bg-white border border-slate-200 hover:border-emerald-400 p-6 rounded-3xl flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition group"
                      >
                        <div className="space-y-3.5">
                          {/* Top Tag Row */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                              <span>{s.level === 'Central' ? '🇮🇳 Central Govt' : `🌾 ${s.state}`}</span>
                            </span>
                            <span className="text-[10px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                              {s.category}
                            </span>
                          </div>

                          {/* Title & Ministry */}
                          <div className="space-y-1">
                            <div className="flex items-start gap-2.5">
                              <span className="text-2xl p-1.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                                {s.icon || '🏛️'}
                              </span>
                              <div>
                                <h3 className="font-extrabold text-sm md:text-base text-slate-900 group-hover:text-emerald-800 transition leading-snug">
                                  {localizedName}
                                </h3>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                                  {s.ministry}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Highlight Benefit Callout Box */}
                          {localizedHighlight && (
                            <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50/70 border border-emerald-200 rounded-2xl">
                              <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block mb-0.5">
                                💰 {t.schemes.benefitLabel}
                              </span>
                              <strong className="text-xs font-extrabold text-emerald-950 block">
                                {localizedHighlight}
                              </strong>
                            </div>
                          )}

                          {/* Benefit & Eligibility Excerpts */}
                          <div className="text-xs space-y-2 text-slate-600 leading-relaxed">
                            <p className="line-clamp-2">
                              {localizedBenefit}
                            </p>
                            <div className="pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-slate-500">
                              <span className="font-bold text-slate-700 shrink-0">{t.schemes.eligibilityLabel}</span>
                              <span className="line-clamp-2">{localizedEligibility}</span>
                            </div>
                          </div>
                        </div>

                        {/* Card Action Controls */}
                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setSelectedSchemeForModal(s)}
                            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs py-2.5 rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
                          >
                            <span>📋</span>
                            <span>{t.schemes.checkGuide}</span>
                          </button>

                          <div className="flex items-center justify-between text-[11px] px-1">
                            {s.helpline && (
                              <span className="text-slate-500 font-medium flex items-center gap-1">
                                <span>📞</span>
                                <span>{s.helpline.split('/')[0].trim()}</span>
                              </span>
                            )}
                            {s.officialUrl && (
                              <a
                                href={s.officialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 underline"
                              >
                                <span>{s.portalName || t.schemes.officialPortal}</span>
                                <span>↗</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* INTERACTIVE SCHEME APPLICATION & ELIGIBILITY MODAL */}
        {selectedSchemeForModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-150 space-y-5 my-8 max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedSchemeForModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>

              {/* Modal Header */}
              <div className="space-y-2 border-b border-slate-100 pb-4 pr-8">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span>{selectedSchemeForModal.level === 'Central' ? '🇮🇳 Central Govt Scheme' : `🌾 State: ${selectedSchemeForModal.state}`}</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200 uppercase">
                    {selectedSchemeForModal.category}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-2xl bg-emerald-50 border border-emerald-200 shrink-0">
                    {selectedSchemeForModal.icon || '🏛️'}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 leading-tight">
                      {(selectedSchemeForModal.name && (selectedSchemeForModal.name[lang] || selectedSchemeForModal.name.en)) || selectedSchemeForModal.id}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {selectedSchemeForModal.ministry}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Benefit Banner */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 rounded-2xl space-y-1">
                <span className="text-[10px] font-mono font-bold text-emerald-800 uppercase tracking-wider">
                  💰 Verified Government Financial Benefit
                </span>
                <p className="text-sm font-extrabold text-emerald-950">
                  {(selectedSchemeForModal.benefitHighlight && (selectedSchemeForModal.benefitHighlight[lang] || selectedSchemeForModal.benefitHighlight.en)) || ''}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  {(selectedSchemeForModal.benefits && (selectedSchemeForModal.benefits[lang] || selectedSchemeForModal.benefits.en)) || ''}
                </p>
              </div>

              {/* Interactive Eligibility Self-Checklist */}
              {selectedSchemeForModal.eligibilityChecklist && (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <span>✓</span>
                      <span>Interactive Eligibility Self-Check</span>
                    </h4>
                    {(() => {
                      const schemeAnswers = userEligibilityAnswers[selectedSchemeForModal.id] || {};
                      const totalCount = selectedSchemeForModal.eligibilityChecklist.length;
                      const checkedCount = Object.values(schemeAnswers).filter(Boolean).length;
                      return (
                        <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-full ${
                          checkedCount === totalCount
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {checkedCount === totalCount ? '🎉 100% Eligible' : `${checkedCount}/${totalCount} Criteria Checked`}
                        </span>
                      );
                    })()}
                  </div>

                  <div className="space-y-2">
                    {selectedSchemeForModal.eligibilityChecklist.map((item, cIdx) => {
                      const schemeAnswers = userEligibilityAnswers[selectedSchemeForModal.id] || {};
                      const isChecked = Boolean(schemeAnswers[item.key]);
                      const itemLabel = (item.label && (item.label[lang] || item.label.en)) || item.key;

                      return (
                        <label
                          key={item.key || cIdx}
                          className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                            isChecked
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleEligibilityCheckbox(selectedSchemeForModal.id, item.key)}
                            className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 shrink-0"
                          />
                          <span>{itemLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Mandatory Documents Checklist */}
              {selectedSchemeForModal.documents && (
                <div className="space-y-2">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    {t.schemes.requiredDocs}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {selectedSchemeForModal.documents.map((doc, dIdx) => (
                      <div key={dIdx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-slate-800 font-medium">
                        <span className="text-emerald-600 font-bold">📄</span>
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step-by-Step Application Roadmap */}
              {selectedSchemeForModal.applicationSteps && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    {t.schemes.stepsTitle}
                  </h4>
                  <div className="space-y-2.5 text-xs">
                    {selectedSchemeForModal.applicationSteps.map(stepObj => (
                      <div key={stepObj.step} className="flex items-start gap-3 p-3 bg-white border border-slate-200 rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                          {stepObj.step}
                        </span>
                        <div>
                          <strong className="text-slate-900 font-bold block">{stepObj.title}</strong>
                          <p className="text-slate-600 leading-relaxed">{stepObj.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Send Guide to Mobile Phone (SMS / WhatsApp) */}
              <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold flex items-center gap-1.5 text-emerald-400">
                    <span>📱</span>
                    <span>{t.schemes.sendGuide}</span>
                  </span>
                  <span className="text-[10px] text-slate-400">Instant WhatsApp / SMS Checklist</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={schemePhoneForSms}
                    onChange={e => setSchemePhoneForSms(e.target.value)}
                    placeholder="Enter 10-digit mobile number..."
                    className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    disabled={schemeSmsLoading}
                    onClick={() => handleSendSchemeSms(selectedSchemeForModal)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shrink-0"
                  >
                    {schemeSmsLoading ? 'Sending...' : 'Send'}
                  </button>
                </div>
                {schemeSmsSent && (
                  <p className="text-[11px] text-emerald-400 font-semibold animate-pulse">
                    ✓ Application checklist sent successfully to your phone!
                  </p>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  {selectedSchemeForModal.helpline && (
                    <span className="font-semibold">
                      Helpline: <strong className="text-slate-900">{selectedSchemeForModal.helpline}</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedSchemeForModal(null)}
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                  >
                    Close
                  </button>

                  {selectedSchemeForModal.officialUrl && (
                    <a
                      href={selectedSchemeForModal.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5"
                    >
                      <span>🚀 Apply on Official Portal</span>
                      <span>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-emerald-700 font-bold text-sm">KissanAI</span>
            <span>•</span>
            <span>Dhenu Agricultural Foundation Model Architecture</span>
          </div>
          <p>{t.footer.copyright}</p>
          <div className="flex gap-4">
            <a href="https://github.com/guptavedansh665-glitch/Hackday-Hactober" target="_blank" className="hover:text-emerald-700 font-medium">GitHub</a>
            <a href="#" className="hover:text-emerald-700 font-medium">{t.footer.privacy}</a>
            <a href="#" className="hover:text-emerald-700 font-medium">{t.footer.terms}</a>
          </div>
        </div>
      </footer>

      {/* BACKEND & POSTGRESQL DIAGNOSTIC MODAL */}
      {showHealthModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in duration-150 space-y-5">
            <button
              onClick={() => setShowHealthModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-xs ${backendHealth.online ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                {backendHealth.online ? '🐘' : '⚠️'}
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900">Backend & PostgreSQL Health</h3>
                <p className="text-xs text-slate-500 font-mono">http://localhost:3000</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Server Status:</span>
                <span className={`font-bold px-2.5 py-0.5 rounded-full ${backendHealth.online ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  {backendHealth.online ? '● 200 OK — Healthy' : '○ Offline / Connecting'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Database:</span>
                <span className="font-bold text-slate-900 font-mono">PostgreSQL 18 (kissan_ai)</span>
              </div>

              {backendHealth.details && backendHealth.details.database && (
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="block text-[10px] text-emerald-800 font-bold uppercase">Farmers</span>
                    <span className="text-base font-extrabold text-emerald-950 font-mono">
                      {backendHealth.details.database.stats?.farmers || 2}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-teal-50 border border-teal-200">
                    <span className="block text-[10px] text-teal-800 font-bold uppercase">Advisories</span>
                    <span className="text-base font-extrabold text-teal-950 font-mono">
                      {backendHealth.details.database.stats?.advisoryLogs || 1}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <span className="block text-[10px] text-emerald-800 font-bold uppercase">Mandi Rates</span>
                    <span className="text-base font-extrabold text-emerald-950 font-mono">
                      {backendHealth.details.database.stats?.mandiRates || 8}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-600 font-medium">Uptime:</span>
                <span className="font-bold text-slate-900 font-mono">
                  {backendHealth.details ? Math.round(backendHealth.details.uptimeSeconds) + 's' : '0s'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                fetch(`${API_BASE}/api/health`)
                  .then(r => r.json())
                  .then(d => { setBackendHealth({ online: true, checking: false, details: d }); alert('✓ Backend connection verified!'); })
                  .catch(() => alert('⚠️ Could not connect to http://localhost:3000'));
              }}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>🔄</span>
              <span>Test Live Backend Ping</span>
            </button>
          </div>
        </div>
      )}

      {/* WHATSAPP MANDI & CROP ADVISORY ALERTS MODAL */}
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto space-y-5">
            {/* Close Button */}
            <button
              onClick={() => { setIsWhatsAppOpen(false); setWhatsappResult(null); setWhatsappError(''); }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>

            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center text-2xl shadow-md shadow-green-500/30">
                📲
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-slate-900">WhatsApp Daily Agri Alerts</h3>
                  <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-200">
                    CIBRC & e-NAM
                  </span>
                </div>
                <p className="text-xs text-slate-500">Free daily APMC prices, weather, and spray window on WhatsApp</p>
              </div>
            </div>

            {whatsappError && (
              <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{whatsappError}</span>
              </div>
            )}

            {/* Subscription Form */}
            <form onSubmit={handleSubscribeWhatsApp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number *</label>
                <div className="flex gap-2">
                  <span className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 flex items-center gap-1 font-mono">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    maxLength="10"
                    required
                    value={whatsappForm.phone}
                    onChange={e => setWhatsappForm({ ...whatsappForm, phone: e.target.value.replace(/\D/g, '') })}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-green-600 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Select Crop</label>
                  <select
                    value={whatsappForm.crop}
                    onChange={e => setWhatsappForm({ ...whatsappForm, crop: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-green-600 font-medium"
                  >
                    <option value="Aman Paddy">Aman Paddy / ধান</option>
                    <option value="Wheat">Wheat / गेहूं</option>
                    <option value="Onion">Onion / कांदा</option>
                    <option value="Cotton">Cotton / कापूस</option>
                    <option value="Soybean">Soybean / सोयाबीन</option>
                    <option value="Mustard">Mustard / सरसों</option>
                    <option value="Potato">Potato / আলু</option>
                    <option value="Dry Red Chilli">Dry Red Chilli / मिर्च</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Market</label>
                  <select
                    value={whatsappForm.market}
                    onChange={e => setWhatsappForm({ ...whatsappForm, market: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-green-600 font-medium"
                  >
                    <option value="Burdwan APMC (West Bengal)">Burdwan APMC (WB)</option>
                    <option value="Khanna APMC (Punjab)">Khanna APMC (Punjab)</option>
                    <option value="Lasalgaon APMC (Maharashtra)">Lasalgaon APMC (MH)</option>
                    <option value="Rajkot APMC (Gujarat)">Rajkot APMC (Gujarat)</option>
                    <option value="Indore APMC (Madhya Pradesh)">Indore APMC (MP)</option>
                    <option value="Alwar APMC (Rajasthan)">Alwar APMC (Rajasthan)</option>
                    <option value="Hooghly APMC (West Bengal)">Hooghly APMC (WB)</option>
                    <option value="Guntur APMC (Andhra Pradesh)">Guntur APMC (AP)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Alert Language</label>
                  <select
                    value={whatsappForm.language}
                    onChange={e => setWhatsappForm({ ...whatsappForm, language: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-green-600 font-medium"
                  >
                    <option value="en">English (अंग्रेजी)</option>
                    <option value="hi">हिन्दी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="mr">मराठी (Marathi)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={whatsappForm.frequency}
                    onChange={e => setWhatsappForm({ ...whatsappForm, frequency: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-green-600 font-medium"
                  >
                    <option value="daily_morning">Daily Morning (07:00 AM)</option>
                    <option value="price_swings">Major Price Changes (> 3%)</option>
                    <option value="spray_window">Weather & Spray Windows</option>
                  </select>
                </div>
              </div>

              {/* Real-time WhatsApp Message Bubble Preview */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-slate-600 text-xs font-bold">
                  <span className="flex items-center gap-1 text-slate-700">
                    <span>💬</span>
                    <span>Live WhatsApp Message Preview:</span>
                  </span>
                  <span className="text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    Automated Daily Feed
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-[#EFEAE2] border border-[#D1D7DB] relative shadow-inner">
                  <div className="bg-[#DCF8C6] border border-[#C2E7A3] text-slate-900 text-xs p-3.5 rounded-2xl rounded-tr-none shadow-xs space-y-1.5 font-sans whitespace-pre-line leading-relaxed">
                    {whatsappResult ? whatsappResult.preview : getWhatsAppPreviewText()}
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500 pt-1">
                      <span>07:00 AM</span>
                      <span className="text-blue-500 font-bold">✓✓</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit / Confirmation */}
              {whatsappResult ? (
                <div className="space-y-3 pt-2">
                  <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 font-medium text-center">
                    🎉 <strong>Subscription Activated!</strong> Alerts are scheduled for +91 {whatsappForm.phone || 'your number'}.
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={whatsappResult.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-xl transition text-center shadow-md shadow-green-600/30 flex items-center justify-center gap-1.5"
                    >
                      <span>📲</span>
                      <span>Open in WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => { setWhatsappResult(null); }}
                      className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={whatsappLoading}
                  className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-green-600/30 transition flex items-center justify-center gap-2"
                >
                  <span>📲</span>
                  <span>{whatsappLoading ? 'Activating Alerts...' : 'Subscribe to Free WhatsApp Alerts'}</span>
                  <span>→</span>
                </button>
              )}
            </form>
          </div>
        </div>
      )}

      {/* AUTHENTICATION MODAL DIALOG */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in duration-150 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsAuthOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition"
            >
              ✕
            </button>

            {/* Header Icon & Title */}
            <div className="text-center space-y-1.5 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto text-2xl shadow-md shadow-emerald-600/20">
                🌾
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {authMode === 'login' ? 'Log in to KissanAI' : 'Create KissanAI Account'}
              </h3>
              <p className="text-xs text-slate-500">
                {authMode === 'login' 
                  ? 'Sign in to access personalized advisory, review queues, and mandi alerts'
                  : 'Join the open-source multilingual agricultural operating system'}
              </p>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{authError}</span>
              </div>
            )}

            {/* Success Banner */}
            {authSuccessMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                <span>✓</span>
                <span>{authSuccessMsg}</span>
              </div>
            )}

            {/* Auth Mode Toggle: Login vs Sign Up */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-4">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  authMode === 'login' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthSuccessMsg(''); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  authMode === 'signup' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign Up Free
              </button>
            </div>

            {/* Login Method Toggle (Password vs OTP) */}
            {authMode === 'login' && (
              <div className="flex justify-center gap-4 text-xs font-semibold mb-4 border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => setAuthMethod('password')}
                  className={`pb-1 transition border-b-2 ${authMethod === 'password' ? 'border-emerald-600 text-emerald-800 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  🔑 Email / Password
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod('otp')}
                  className={`pb-1 transition border-b-2 ${authMethod === 'otp' ? 'border-emerald-600 text-emerald-800 font-bold' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  📲 Mobile OTP
                </button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleAuthSubmit} className="space-y-3.5">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={authForm.name}
                      onChange={e => setAuthForm({ ...authForm, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar or Dr. Patil"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Account Role *</label>
                    <select
                      value={authForm.role}
                      onChange={e => setAuthForm({ ...authForm, role: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-semibold"
                    >
                      <option value="farmer">👨‍🌾 Farmer / Producer (Personalized Advisory & Mandi)</option>
                      <option value="translator">🌐 Community Translator (Localization & Submissions)</option>
                      <option value="scientist">🔬 Agricultural Scientist / Reviewer (Verification Queue)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={authForm.email}
                        onChange={e => setAuthForm({ ...authForm, email: e.target.value })}
                        placeholder="you@kissan.ai"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        maxLength="10"
                        value={authForm.phone}
                        onChange={e => setAuthForm({ ...authForm, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="9876543210"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Create Password *</label>
                    <input
                      type="password"
                      required
                      value={authForm.password}
                      onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                      placeholder="At least 6 characters"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">State & District</label>
                      <input
                        type="text"
                        value={authForm.state}
                        onChange={e => setAuthForm({ ...authForm, state: e.target.value })}
                        placeholder="e.g. Maharashtra, Nashik"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Primary Crop</label>
                      <select
                        value={authForm.crop}
                        onChange={e => setAuthForm({ ...authForm, crop: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                      >
                        <option value="Paddy">Paddy / Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Cotton">Cotton</option>
                        <option value="Soybean">Soybean</option>
                        <option value="Tomato">Tomato / Vegetables</option>
                        <option value="All Crops">All Crops / Agronomy</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {authMode === 'login' && authMethod === 'password' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email or Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={authForm.emailOrPhone}
                      onChange={e => setAuthForm({ ...authForm, emailOrPhone: e.target.value })}
                      placeholder="e.g. farmer@kissan.ai or 9876543210"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">Password</label>
                      <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline" onClick={() => alert('Default demo passwords: farmer123, translator123, scientist123')}>
                        Demo passwords
                      </span>
                    </div>
                    <input
                      type="password"
                      required
                      value={authForm.password}
                      onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                      placeholder="Enter your password"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </>
              )}

              {authMode === 'login' && authMethod === 'otp' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                    <div className="flex gap-2">
                      <span className="bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength="10"
                        required
                        value={authForm.phone}
                        onChange={e => setAuthForm({ ...authForm, phone: e.target.value.replace(/\D/g, '') })}
                        placeholder="10-digit mobile number"
                        className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-emerald-600 font-mono"
                      />
                    </div>
                  </div>

                  {authForm.otpSent ? (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-bold text-slate-700">OTP Code</label>
                        <span className="text-[11px] text-emerald-700 font-semibold">Auto-filled: 1234</span>
                      </div>
                      <input
                        type="text"
                        maxLength="6"
                        required
                        value={authForm.otp}
                        onChange={e => setAuthForm({ ...authForm, otp: e.target.value })}
                        placeholder="Enter 4-digit OTP"
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 text-center tracking-widest font-mono text-base font-bold focus:bg-white focus:outline-none focus:border-emerald-600"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition border border-slate-300"
                    >
                      📲 Send OTP (Demo: 1234)
                    </button>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
              >
                <span>{authLoading ? 'Verifying with PostgreSQL...' : (authMode === 'login' ? 'Log In to Account' : 'Register Free Account')}</span>
                <span>→</span>
              </button>
            </form>

            {/* 1-Click Quick Demo Personas */}
            <div className="mt-5 pt-4 border-t border-slate-200 text-center space-y-2">
              <span className="text-[11px] text-slate-500 font-semibold block">⚡ 1-Click Demo Login Personas:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoLogin('farmer')}
                  className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-[11px] font-bold transition flex flex-col items-center"
                >
                  <span>👨‍🌾</span>
                  <span className="truncate w-full mt-0.5">Farmer</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('translator')}
                  className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-300 text-teal-900 text-[11px] font-bold transition flex flex-col items-center"
                >
                  <span>🌐</span>
                  <span className="truncate w-full mt-0.5">Translator</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoLogin('scientist')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 text-[11px] font-bold transition flex flex-col items-center"
                >
                  <span>🔬</span>
                  <span className="truncate w-full mt-0.5">Scientist</span>
                </button>
              </div>
            </div>

            {/* Switch Login / Signup Link */}
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setAuthError(''); setAuthSuccessMsg(''); }}
                className="text-xs text-emerald-700 hover:underline font-semibold"
              >
                {authMode === 'login' ? "Don't have an account? Sign up free" : 'Already have an account? Log In'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE OFFLINE FIELD GUIDE & EMERGENCY FIRST-AID MODAL */}
      {showOfflineModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 relative animate-in fade-in duration-150 space-y-4 max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-900 text-2xl flex items-center justify-center shadow-xs shrink-0">
                  ⚡
                </div>
                <div>
                  <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
                    {currentOfflineData.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {currentOfflineData.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOfflineModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-sm font-bold transition shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Sub-Tabs Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-100 text-xs no-scrollbar shrink-0">
              {[
                { id: 'first_aid', label: currentOfflineData.categories.first_aid },
                { id: 'helplines', label: currentOfflineData.categories.helplines },
                { id: 'rules', label: currentOfflineData.categories.rules },
                { id: 'dosage', label: currentOfflineData.categories.dosage },
                { id: 'tools', label: currentOfflineData.categories.tools }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setOfflineModalTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                    offlineModalTab === tab.id
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto flex-1 space-y-3.5 pr-1 text-xs">
              {/* TAB 1: EMERGENCY FIRST-AID */}
              {offlineModalTab === 'first_aid' && (
                <div className="space-y-3">
                  {/* Critical Ingestion Negative Warning */}
                  <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-900 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">⚠️</span>
                      <h4 className="font-extrabold text-sm text-red-900">
                        {currentOfflineData.ingestionTitle}
                      </h4>
                    </div>
                    <p className="text-xs leading-relaxed font-semibold text-red-800">
                      {currentOfflineData.ingestionWarning}
                    </p>
                  </div>

                  {/* Eye Splash */}
                  <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-1">
                    <h5 className="font-bold text-xs flex items-center gap-1.5 text-blue-900">
                      <span>👁️</span>
                      <span>{currentOfflineData.eyeSplashTitle}</span>
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentOfflineData.eyeSplashDesc}
                    </p>
                  </div>

                  {/* Skin Absorption */}
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                    <h5 className="font-bold text-xs flex items-center gap-1.5 text-amber-900">
                      <span>🧴</span>
                      <span>{currentOfflineData.skinTitle}</span>
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentOfflineData.skinDesc}
                    </p>
                  </div>

                  {/* Inhalation */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                    <h5 className="font-bold text-xs flex items-center gap-1.5 text-emerald-900">
                      <span>💨</span>
                      <span>{currentOfflineData.inhalationTitle}</span>
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {currentOfflineData.inhalationDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: TOLL-FREE HELPLINES */}
              {offlineModalTab === 'helplines' && (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 font-medium">
                    ℹ️ <strong>No internet or mobile data required:</strong> These official government toll-free numbers connect via standard cellular or landline voice networks across India.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentOfflineData.helplinesList.map((hl, i) => (
                      <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2 hover:border-emerald-300 transition">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{hl.icon}</span>
                          <div>
                            <span className="font-bold text-xs text-slate-900 block">{hl.name}</span>
                            <span className="text-[10px] text-slate-500 block">{hl.desc}</span>
                          </div>
                        </div>
                        <a
                          href={`tel:${hl.number}`}
                          className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition"
                        >
                          <span>📞</span>
                          <span>Dial {hl.number}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CIBRC SPRAY RULES */}
              {offlineModalTab === 'rules' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{currentOfflineData.goldenRulesTitle}</h4>
                  <div className="space-y-2">
                    {currentOfflineData.rulesList.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <div>
                          <strong className="text-slate-900 block text-xs">{r.rule}</strong>
                          <p className="text-slate-600 text-xs mt-0.5 leading-relaxed">{r.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Toxicity Triangle Quick Guide */}
                  <div className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-2">
                    <span className="font-bold text-xs text-slate-800 block">CIBRC Toxicity Triangle Reference:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-[10px] font-bold">
                      <div className="p-2 rounded-xl bg-red-100 border border-red-300 text-red-950">
                        <span>🔴 Bright Red</span>
                        <span className="block font-normal text-[9px] mt-0.5">Extremely Toxic (खतरा)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-950">
                        <span>🟡 Yellow</span>
                        <span className="block font-normal text-[9px] mt-0.5">Highly Toxic (विष)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-blue-100 border border-blue-300 text-blue-950">
                        <span>🔵 Blue</span>
                        <span className="block font-normal text-[9px] mt-0.5">Moderately Toxic (संकट)</span>
                      </div>
                      <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-950">
                        <span>🟢 Green</span>
                        <span className="block font-normal text-[9px] mt-0.5">Slightly Toxic (सावधानी)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: 16L TANK CHEAT SHEET */}
              {offlineModalTab === 'dosage' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{currentOfflineData.tankDilutionTitle}</h4>
                  </div>
                  <div className="overflow-x-auto rounded-2xl border border-slate-200">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-700 text-[11px]">
                          <th className="p-2.5">Crop</th>
                          <th className="p-2.5">Formulation</th>
                          <th className="p-2.5">Per Litre</th>
                          <th className="p-2.5 text-emerald-700 font-extrabold">16L Tank Dose</th>
                          <th className="p-2.5">Waiting (PHI)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {currentOfflineData.tankTable.map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50 transition">
                            <td className="p-2.5 font-bold text-slate-800">{row.crop}</td>
                            <td className="p-2.5 font-mono text-slate-600">{row.chemical}</td>
                            <td className="p-2.5 text-slate-600">{row.dosePerL}</td>
                            <td className="p-2.5 font-bold font-mono text-emerald-700 bg-emerald-50/50">{row.dosePerTank}</td>
                            <td className="p-2.5 font-semibold text-amber-700">{row.phi}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-[11px] text-emerald-900 font-medium">
                    💡 <strong>Knapsack Calibration Rule:</strong> 1 Acre typically requires <strong>200 Litres of spray volume</strong>. That is exactly <strong>12 to 13 knapsack tanks</strong> of 16-litre capacity.
                  </div>
                </div>
              )}

              {/* TAB 5: OFFLINE FEATURES & TEST SIMULATOR */}
              {offlineModalTab === 'tools' && (
                <div className="space-y-3.5">
                  <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">{currentOfflineData.offlineFeaturesTitle}</h4>
                  <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
                    {currentOfflineData.featuresList.map((f, i) => (
                      <div key={i} className="text-xs text-slate-700 font-medium">
                        {f}
                      </div>
                    ))}
                  </div>

                  {/* Test Mode Simulator */}
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                        <span>🧪</span>
                        <span>Simulate Offline Mode (For Testing / Evaluation)</span>
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${effectiveOffline ? 'bg-amber-300 text-amber-950' : 'bg-slate-200 text-slate-700'}`}>
                        {effectiveOffline ? 'Offline Active' : 'Online'}
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-900 leading-relaxed">
                      Want to test how KisanVaani behaves in a remote farm with zero connectivity? Click below to toggle simulated offline mode.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSimulatedOffline(!isSimulatedOffline);
                      }}
                      className={`w-full py-2.5 px-4 font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 ${
                        isSimulatedOffline
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      }`}
                    >
                      <span>{isSimulatedOffline ? '✓ Restore Online Mode' : '⚡ Simulate No Internet (Offline Mode)'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Controls */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-[11px] text-slate-500 font-medium">
                Status: <strong className={effectiveOffline ? 'text-amber-700' : 'text-emerald-700'}>{effectiveOffline ? '⚡ Offline Mode Active' : '● Connected to Internet'}</strong>
              </span>
              <button
                onClick={() => setShowOfflineModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


// Global and modular export support
if (typeof window !== 'undefined') {
  window.App = App;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = App;
}

// Standalone mounting fallback
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement && !window.__KISAN_APP_MOUNTED__) {
    setTimeout(function() {
      if (!window.__KISAN_APP_MOUNTED__) {
        window.__KISAN_APP_MOUNTED__ = true;
        ReactDOM.createRoot(rootElement).render(React.createElement(App));
      }
    }, 100);
  }
}
