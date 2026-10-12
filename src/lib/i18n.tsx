import { createContext, useContext, useEffect, useState } from 'react'

export type Lang = 'en' | 'hi' | 'mr'

export const LANGUAGES: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
]

const en = {
  nav: {
    services: 'Services',
    schemes: 'Schemes',
    how: 'How it works',
    faq: 'FAQ',
    language: 'Language',
  },
  hero: {
    eyebrow: 'Your business friend',
    title1: 'Grow your',
    title2: 'vyapar',
    title3: 'with a friend by your side.',
    subtitle:
      'Registration, GST, loans and government schemes — explained simply, in your own language. Vyapar Mitra helps shopkeepers, artisans and small business owners across India take the next step.',
    ctaChat: 'Talk to Mitra',
    ctaSchemes: 'Explore schemes',
    badge: 'Free guidance · 24×7',
  },
  stats: [
    { value: '3', label: 'Languages supported' },
    { value: '6+', label: 'Govt. schemes explained' },
    { value: '24×7', label: 'Chat assistance' },
    { value: '₹0', label: 'Cost to use' },
  ],
  services: {
    eyebrow: 'What we help with',
    title: 'Everything a small business needs, in one place',
    items: [
      {
        title: 'Business registration',
        body: 'Understand Udyam (MSME) registration, shop licences and which documents you need to get started.',
      },
      {
        title: 'GST made simple',
        body: 'Know when GST applies to you, how to register, and what the composition scheme means for small traders.',
      },
      {
        title: 'Loans & credit',
        body: 'Learn about collateral-free loans like Mudra and how to prepare before you visit the bank.',
      },
      {
        title: 'Government schemes',
        body: 'Find schemes that fit your business type, stage and background — without the confusing paperwork language.',
      },
      {
        title: 'Digital payments',
        body: 'Start accepting UPI and QR payments, and build a digital record that helps you get credit later.',
      },
      {
        title: 'Bookkeeping basics',
        body: 'Simple habits for keeping your khata — tracking sales, expenses and udhaar so you always know where you stand.',
      },
    ],
  },
  schemes: {
    eyebrow: 'Schemes at a glance',
    title: 'Government support you may be eligible for',
    subtitle:
      'A quick overview of popular central schemes. Ask Mitra to find out which ones fit your business.',
    ask: 'Ask Mitra about this',
    items: [
      {
        name: 'PM Mudra Yojana',
        tag: 'Loans',
        body: 'Collateral-free loans for micro enterprises through banks and NBFCs, in Shishu, Kishore, Tarun and Tarun Plus categories.',
      },
      {
        name: 'Udyam Registration',
        tag: 'Registration',
        body: 'Free, paperless online registration for MSMEs that unlocks access to many government benefits and schemes.',
      },
      {
        name: 'PMEGP',
        tag: 'New business',
        body: 'Credit-linked subsidy to help set up new manufacturing and service units in rural and urban areas.',
      },
      {
        name: 'PM SVANidhi',
        tag: 'Street vendors',
        body: 'Small working-capital loans for street vendors, with interest subsidy and rewards for digital transactions.',
      },
      {
        name: 'Stand-Up India',
        tag: 'Women & SC/ST',
        body: 'Bank loans for women and SC/ST entrepreneurs to set up greenfield enterprises.',
      },
      {
        name: 'CGTMSE',
        tag: 'Credit guarantee',
        body: 'Credit guarantee cover that lets banks lend to micro and small enterprises without collateral.',
      },
    ],
  },
  how: {
    eyebrow: 'How it works',
    title: 'Three simple steps',
    steps: [
      { title: 'Choose your language', body: 'Switch between English, हिन्दी and मराठी from the top-right corner at any time.' },
      { title: 'Chat with Mitra', body: 'Mitra asks a few questions about your business to understand what you need.' },
      { title: 'Get clear next steps', body: 'Receive simple, practical guidance — documents, schemes and where to apply.' },
    ],
  },
  faq: {
    eyebrow: 'Questions',
    title: 'Frequently asked questions',
    items: [
      {
        q: 'Is Vyapar Mitra free to use?',
        a: 'Yes. All guidance and chat assistance on Vyapar Mitra is completely free.',
      },
      {
        q: 'Can Mitra apply for a loan or scheme on my behalf?',
        a: 'No. Mitra explains the process and documents, and points you to the official portal or bank. You always apply yourself through official channels.',
      },
      {
        q: 'Which languages can I use?',
        a: 'You can use English, Hindi or Marathi. Change the language from the top-right corner and Mitra will reply in that language too.',
      },
      {
        q: 'Is the information official?',
        a: 'Mitra gives general guidance. Scheme rules change from time to time, so always confirm details on the official government website or with your bank.',
      },
    ],
  },
  cta: {
    title: 'Have a question about your business?',
    body: 'Mitra is ready to help — just start a conversation.',
    button: 'Start chatting',
  },
  footer: {
    tagline: 'A friend for every Indian business.',
    note: 'Vyapar Mitra provides general guidance only and is not affiliated with any government body.',
    rights: 'All rights reserved.',
  },
  chat: {
    title: 'Mitra',
    status: 'Your business assistant',
    open: 'Chat with Mitra',
    close: 'Close chat',
    placeholder: 'Type your question…',
    send: 'Send',
    reset: 'Start over',
    greeting:
      'Namaste! 🙏 I am Mitra, your business friend. To guide you better, tell me — what kind of business do you run, or are you planning to start one?',
    quick: [
      'I want to start a new business',
      'How do I register for GST?',
      'I need a business loan',
      'Which schemes am I eligible for?',
    ],
    error: 'Sorry, I could not reply just now. Please try again in a moment.',
    disclaimer: 'Mitra can make mistakes. Confirm important details on official portals.',
  },
}

export type Dict = typeof en

const hi: Dict = {
  nav: {
    services: 'सेवाएँ',
    schemes: 'योजनाएँ',
    how: 'कैसे काम करता है',
    faq: 'सवाल-जवाब',
    language: 'भाषा',
  },
  hero: {
    eyebrow: 'आपका व्यापार साथी',
    title1: 'अपना',
    title2: 'व्यापार',
    title3: 'बढ़ाइए, एक मित्र के साथ।',
    subtitle:
      'रजिस्ट्रेशन, जीएसटी, लोन और सरकारी योजनाएँ — आसान शब्दों में, आपकी अपनी भाषा में। व्यापार मित्र पूरे भारत के दुकानदारों, कारीगरों और छोटे व्यापारियों को अगला कदम उठाने में मदद करता है।',
    ctaChat: 'मित्र से बात करें',
    ctaSchemes: 'योजनाएँ देखें',
    badge: 'मुफ़्त मार्गदर्शन · 24×7',
  },
  stats: [
    { value: '3', label: 'भाषाओं में उपलब्ध' },
    { value: '6+', label: 'सरकारी योजनाओं की जानकारी' },
    { value: '24×7', label: 'चैट सहायता' },
    { value: '₹0', label: 'उपयोग शुल्क' },
  ],
  services: {
    eyebrow: 'हम किसमें मदद करते हैं',
    title: 'छोटे व्यापार की हर ज़रूरत, एक ही जगह',
    items: [
      {
        title: 'व्यापार रजिस्ट्रेशन',
        body: 'उद्यम (MSME) रजिस्ट्रेशन, दुकान लाइसेंस और शुरुआत के लिए ज़रूरी दस्तावेज़ों को समझें।',
      },
      {
        title: 'आसान जीएसटी',
        body: 'जानिए जीएसटी आप पर कब लागू होता है, रजिस्ट्रेशन कैसे करें और छोटे व्यापारियों के लिए कंपोज़िशन स्कीम क्या है।',
      },
      {
        title: 'लोन और क्रेडिट',
        body: 'मुद्रा जैसे बिना गारंटी वाले लोन के बारे में जानें और बैंक जाने से पहले तैयारी कैसे करें।',
      },
      {
        title: 'सरकारी योजनाएँ',
        body: 'अपने व्यापार के प्रकार और ज़रूरत के हिसाब से योजनाएँ खोजें — बिना उलझी सरकारी भाषा के।',
      },
      {
        title: 'डिजिटल भुगतान',
        body: 'UPI और QR से भुगतान लेना शुरू करें और ऐसा डिजिटल रिकॉर्ड बनाएँ जो आगे लोन पाने में मदद करे।',
      },
      {
        title: 'हिसाब-किताब की बुनियाद',
        body: 'अपना खाता रखने की आसान आदतें — बिक्री, खर्च और उधार का हिसाब ताकि आपको हमेशा अपनी स्थिति पता रहे।',
      },
    ],
  },
  schemes: {
    eyebrow: 'योजनाएँ एक नज़र में',
    title: 'सरकारी सहायता जिसके आप पात्र हो सकते हैं',
    subtitle:
      'लोकप्रिय केंद्रीय योजनाओं का संक्षिप्त परिचय। कौन-सी योजना आपके व्यापार के लिए सही है, यह मित्र से पूछें।',
    ask: 'इसके बारे में मित्र से पूछें',
    items: [
      {
        name: 'प्रधानमंत्री मुद्रा योजना',
        tag: 'लोन',
        body: 'बैंकों और NBFC के ज़रिए सूक्ष्म उद्यमों के लिए बिना गारंटी का लोन — शिशु, किशोर, तरुण और तरुण प्लस श्रेणियों में।',
      },
      {
        name: 'उद्यम रजिस्ट्रेशन',
        tag: 'रजिस्ट्रेशन',
        body: 'MSME के लिए मुफ़्त, पेपरलेस ऑनलाइन रजिस्ट्रेशन, जिससे कई सरकारी लाभों और योजनाओं का रास्ता खुलता है।',
      },
      {
        name: 'PMEGP',
        tag: 'नया व्यापार',
        body: 'ग्रामीण और शहरी क्षेत्रों में नई विनिर्माण और सेवा इकाइयाँ लगाने के लिए क्रेडिट से जुड़ी सब्सिडी।',
      },
      {
        name: 'पीएम स्वनिधि',
        tag: 'रेहड़ी-पटरी',
        body: 'रेहड़ी-पटरी वालों के लिए छोटा कार्यशील पूंजी लोन, ब्याज सब्सिडी और डिजिटल लेनदेन पर इनाम के साथ।',
      },
      {
        name: 'स्टैंड-अप इंडिया',
        tag: 'महिला और SC/ST',
        body: 'नया उद्यम शुरू करने के लिए महिला और SC/ST उद्यमियों को बैंक लोन।',
      },
      {
        name: 'CGTMSE',
        tag: 'क्रेडिट गारंटी',
        body: 'क्रेडिट गारंटी कवर, जिससे बैंक सूक्ष्म और लघु उद्यमों को बिना गारंटी के लोन दे पाते हैं।',
      },
    ],
  },
  how: {
    eyebrow: 'कैसे काम करता है',
    title: 'तीन आसान कदम',
    steps: [
      { title: 'अपनी भाषा चुनें', body: 'ऊपर दाएँ कोने से कभी भी English, हिन्दी और मराठी में बदलें।' },
      { title: 'मित्र से बात करें', body: 'मित्र आपकी ज़रूरत समझने के लिए आपके व्यापार के बारे में कुछ सवाल पूछता है।' },
      { title: 'साफ़ अगले कदम पाएँ', body: 'आसान और काम का मार्गदर्शन पाएँ — दस्तावेज़, योजनाएँ और कहाँ आवेदन करें।' },
    ],
  },
  faq: {
    eyebrow: 'सवाल',
    title: 'अक्सर पूछे जाने वाले सवाल',
    items: [
      {
        q: 'क्या व्यापार मित्र का उपयोग मुफ़्त है?',
        a: 'हाँ। व्यापार मित्र पर सारा मार्गदर्शन और चैट सहायता पूरी तरह मुफ़्त है।',
      },
      {
        q: 'क्या मित्र मेरी ओर से लोन या योजना के लिए आवेदन कर सकता है?',
        a: 'नहीं। मित्र प्रक्रिया और दस्तावेज़ समझाता है और आपको आधिकारिक पोर्टल या बैंक तक पहुँचने का रास्ता बताता है। आवेदन हमेशा आप स्वयं आधिकारिक माध्यम से करते हैं।',
      },
      {
        q: 'मैं कौन-सी भाषाएँ इस्तेमाल कर सकता हूँ?',
        a: 'आप English, हिन्दी या मराठी इस्तेमाल कर सकते हैं। ऊपर दाएँ कोने से भाषा बदलें, मित्र भी उसी भाषा में जवाब देगा।',
      },
      {
        q: 'क्या यह जानकारी आधिकारिक है?',
        a: 'मित्र सामान्य मार्गदर्शन देता है। योजनाओं के नियम समय-समय पर बदलते हैं, इसलिए विवरण हमेशा आधिकारिक सरकारी वेबसाइट या अपने बैंक से पक्का करें।',
      },
    ],
  },
  cta: {
    title: 'अपने व्यापार के बारे में कोई सवाल है?',
    body: 'मित्र मदद के लिए तैयार है — बस बातचीत शुरू करें।',
    button: 'चैट शुरू करें',
  },
  footer: {
    tagline: 'हर भारतीय व्यापार का मित्र।',
    note: 'व्यापार मित्र केवल सामान्य मार्गदर्शन देता है और किसी सरकारी संस्था से जुड़ा नहीं है।',
    rights: 'सर्वाधिकार सुरक्षित।',
  },
  chat: {
    title: 'मित्र',
    status: 'आपका व्यापार सहायक',
    open: 'मित्र से चैट करें',
    close: 'चैट बंद करें',
    placeholder: 'अपना सवाल लिखें…',
    send: 'भेजें',
    reset: 'फिर से शुरू करें',
    greeting:
      'नमस्ते! 🙏 मैं मित्र हूँ, आपका व्यापार साथी। आपको सही जानकारी देने के लिए बताइए — आप कौन-सा व्यापार करते हैं, या कोई नया व्यापार शुरू करना चाहते हैं?',
    quick: [
      'मैं नया व्यापार शुरू करना चाहता हूँ',
      'जीएसटी रजिस्ट्रेशन कैसे करें?',
      'मुझे व्यापार के लिए लोन चाहिए',
      'मैं किन योजनाओं का पात्र हूँ?',
    ],
    error: 'माफ़ कीजिए, अभी जवाब नहीं दे पाया। कृपया थोड़ी देर बाद फिर कोशिश करें।',
    disclaimer: 'मित्र से गलती हो सकती है। ज़रूरी जानकारी आधिकारिक पोर्टल पर पक्की करें।',
  },
}

const mr: Dict = {
  nav: {
    services: 'सेवा',
    schemes: 'योजना',
    how: 'हे कसे काम करते',
    faq: 'प्रश्नोत्तरे',
    language: 'भाषा',
  },
  hero: {
    eyebrow: 'तुमचा व्यापारी मित्र',
    title1: 'तुमचा',
    title2: 'व्यापार',
    title3: 'वाढवा, एका मित्रासोबत.',
    subtitle:
      'नोंदणी, जीएसटी, कर्ज आणि सरकारी योजना — सोप्या शब्दांत, तुमच्या स्वतःच्या भाषेत. व्यापार मित्र देशभरातील दुकानदार, कारागीर आणि लघु व्यावसायिकांना पुढचे पाऊल टाकण्यासाठी मदत करतो.',
    ctaChat: 'मित्राशी बोला',
    ctaSchemes: 'योजना पाहा',
    badge: 'मोफत मार्गदर्शन · 24×7',
  },
  stats: [
    { value: '3', label: 'भाषांमध्ये उपलब्ध' },
    { value: '6+', label: 'सरकारी योजनांची माहिती' },
    { value: '24×7', label: 'चॅट सहाय्य' },
    { value: '₹0', label: 'वापर शुल्क' },
  ],
  services: {
    eyebrow: 'आम्ही कशात मदत करतो',
    title: 'लघु व्यवसायाची प्रत्येक गरज, एकाच ठिकाणी',
    items: [
      {
        title: 'व्यवसाय नोंदणी',
        body: 'उद्यम (MSME) नोंदणी, दुकान परवाना आणि सुरुवात करण्यासाठी लागणारी कागदपत्रे समजून घ्या.',
      },
      {
        title: 'सोपा जीएसटी',
        body: 'जीएसटी तुम्हाला कधी लागू होतो, नोंदणी कशी करावी आणि लहान व्यापाऱ्यांसाठी कंपोझिशन योजना काय आहे ते जाणून घ्या.',
      },
      {
        title: 'कर्ज आणि पत',
        body: 'मुद्रासारख्या तारणमुक्त कर्जांविषयी जाणून घ्या आणि बँकेत जाण्यापूर्वी तयारी कशी करावी ते शिका.',
      },
      {
        title: 'सरकारी योजना',
        body: 'तुमच्या व्यवसायाच्या प्रकारानुसार आणि गरजेनुसार योजना शोधा — गोंधळात टाकणाऱ्या सरकारी भाषेशिवाय.',
      },
      {
        title: 'डिजिटल पेमेंट',
        body: 'UPI आणि QR द्वारे पेमेंट स्वीकारायला सुरुवात करा आणि पुढे कर्ज मिळवण्यास मदत करणारा डिजिटल रेकॉर्ड तयार करा.',
      },
      {
        title: 'हिशोबाची मूलतत्त्वे',
        body: 'तुमचा खाता ठेवण्याच्या सोप्या सवयी — विक्री, खर्च आणि उधारीचा हिशोब, म्हणजे तुमची स्थिती नेहमी कळेल.',
      },
    ],
  },
  schemes: {
    eyebrow: 'योजना एका नजरेत',
    title: 'तुम्ही पात्र असू शकता असे सरकारी सहाय्य',
    subtitle:
      'लोकप्रिय केंद्रीय योजनांचा थोडक्यात आढावा. तुमच्या व्यवसायासाठी कोणती योजना योग्य आहे, हे मित्राला विचारा.',
    ask: 'याबद्दल मित्राला विचारा',
    items: [
      {
        name: 'प्रधानमंत्री मुद्रा योजना',
        tag: 'कर्ज',
        body: 'बँका आणि NBFC मार्फत सूक्ष्म उद्योगांसाठी तारणमुक्त कर्ज — शिशु, किशोर, तरुण आणि तरुण प्लस श्रेणींमध्ये.',
      },
      {
        name: 'उद्यम नोंदणी',
        tag: 'नोंदणी',
        body: 'MSME साठी मोफत, कागदविरहित ऑनलाइन नोंदणी, ज्यामुळे अनेक सरकारी लाभ आणि योजनांचा मार्ग खुला होतो.',
      },
      {
        name: 'PMEGP',
        tag: 'नवीन व्यवसाय',
        body: 'ग्रामीण आणि शहरी भागात नवीन उत्पादन व सेवा उद्योग सुरू करण्यासाठी कर्जाशी जोडलेले अनुदान.',
      },
      {
        name: 'पीएम स्वनिधी',
        tag: 'फेरीवाले',
        body: 'फेरीवाल्यांसाठी लहान खेळते भांडवल कर्ज, व्याज अनुदान आणि डिजिटल व्यवहारांवर बक्षिसांसह.',
      },
      {
        name: 'स्टँड-अप इंडिया',
        tag: 'महिला व SC/ST',
        body: 'नवीन उद्योग सुरू करण्यासाठी महिला आणि SC/ST उद्योजकांना बँक कर्ज.',
      },
      {
        name: 'CGTMSE',
        tag: 'पत हमी',
        body: 'पत हमी संरक्षण, ज्यामुळे बँका सूक्ष्म व लघु उद्योगांना तारणाशिवाय कर्ज देऊ शकतात.',
      },
    ],
  },
  how: {
    eyebrow: 'हे कसे काम करते',
    title: 'तीन सोप्या पायऱ्या',
    steps: [
      { title: 'तुमची भाषा निवडा', body: 'वरच्या उजव्या कोपऱ्यातून कधीही English, हिन्दी आणि मराठी मध्ये बदला.' },
      { title: 'मित्राशी गप्पा मारा', body: 'तुमची गरज समजून घेण्यासाठी मित्र तुमच्या व्यवसायाबद्दल काही प्रश्न विचारतो.' },
      { title: 'स्पष्ट पुढील पावले मिळवा', body: 'सोपे आणि उपयुक्त मार्गदर्शन मिळवा — कागदपत्रे, योजना आणि अर्ज कुठे करावा.' },
    ],
  },
  faq: {
    eyebrow: 'प्रश्न',
    title: 'वारंवार विचारले जाणारे प्रश्न',
    items: [
      {
        q: 'व्यापार मित्र वापरणे मोफत आहे का?',
        a: 'होय. व्यापार मित्रवरील सर्व मार्गदर्शन आणि चॅट सहाय्य पूर्णपणे मोफत आहे.',
      },
      {
        q: 'मित्र माझ्या वतीने कर्ज किंवा योजनेसाठी अर्ज करू शकतो का?',
        a: 'नाही. मित्र प्रक्रिया आणि कागदपत्रे समजावून सांगतो आणि तुम्हाला अधिकृत पोर्टल किंवा बँकेकडे जाण्याचा मार्ग दाखवतो. अर्ज नेहमी तुम्ही स्वतः अधिकृत माध्यमातून करता.',
      },
      {
        q: 'मी कोणत्या भाषा वापरू शकतो?',
        a: 'तुम्ही English, हिन्दी किंवा मराठी वापरू शकता. वरच्या उजव्या कोपऱ्यातून भाषा बदला, मित्रही त्याच भाषेत उत्तर देईल.',
      },
      {
        q: 'ही माहिती अधिकृत आहे का?',
        a: 'मित्र सर्वसाधारण मार्गदर्शन देतो. योजनांचे नियम वेळोवेळी बदलतात, त्यामुळे तपशील नेहमी अधिकृत सरकारी संकेतस्थळावर किंवा तुमच्या बँकेकडून खात्री करून घ्या.',
      },
    ],
  },
  cta: {
    title: 'तुमच्या व्यवसायाबद्दल काही प्रश्न आहे?',
    body: 'मित्र मदतीसाठी तयार आहे — फक्त संवाद सुरू करा.',
    button: 'चॅट सुरू करा',
  },
  footer: {
    tagline: 'प्रत्येक भारतीय व्यवसायाचा मित्र.',
    note: 'व्यापार मित्र फक्त सर्वसाधारण मार्गदर्शन देतो आणि कोणत्याही सरकारी संस्थेशी संलग्न नाही.',
    rights: 'सर्व हक्क राखीव.',
  },
  chat: {
    title: 'मित्र',
    status: 'तुमचा व्यवसाय सहाय्यक',
    open: 'मित्राशी चॅट करा',
    close: 'चॅट बंद करा',
    placeholder: 'तुमचा प्रश्न लिहा…',
    send: 'पाठवा',
    reset: 'पुन्हा सुरू करा',
    greeting:
      'नमस्कार! 🙏 मी मित्र, तुमचा व्यापारी साथी. तुम्हाला योग्य माहिती देण्यासाठी सांगा — तुम्ही कोणता व्यवसाय करता, किंवा नवीन व्यवसाय सुरू करण्याचा विचार करत आहात?',
    quick: [
      'मला नवीन व्यवसाय सुरू करायचा आहे',
      'जीएसटी नोंदणी कशी करावी?',
      'मला व्यवसायासाठी कर्ज हवे आहे',
      'मी कोणत्या योजनांसाठी पात्र आहे?',
    ],
    error: 'माफ करा, आत्ता उत्तर देता आले नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.',
    disclaimer: 'मित्राकडून चूक होऊ शकते. महत्त्वाची माहिती अधिकृत पोर्टलवर तपासा.',
  },
}

export const dictionaries: Record<Lang, Dict> = { en, hi, mr }

const STORAGE_KEY = 'vyapar-mitra-lang'

type I18nValue = { lang: Lang; setLang: (lang: Lang) => void; t: Dict }

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'hi' || saved === 'mr') setLangState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (next: Lang) => {
    setLangState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  return (
    <I18nContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider')
  return ctx
}
