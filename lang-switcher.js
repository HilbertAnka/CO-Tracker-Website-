const translations = {
  de: {
    "nav-home": "Startseite",
    "nav-info": "Info",
    "nav-about": "Über Uns",
    "nav-contact": "Kontakt",
    "local-nav-home": "Start",
    "local-nav-info": "Info",
    "local-nav-table": "Tabelle",
    "hero-heading": "Transparenz für eine grünere Zukunft!",
    "hero-subheading": "Wir machen sichtbar, wo CO₂ entsteht - damit Unternehmen, Länder und Menschen gemeinsam nachhaltige Entscheidungen treffen können.",
    "textbox-heading": "Sichtbar machen, was zählt!",
    "textbox-text": "Transparenz für eine grünere Zukunft beginnt mit Wissen. Unsere Datenübersicht zeigt, welche Unternehmen welchen CO₂-Fußabdruck hinterlassen – verständlich, vergleichbar und zugänglich. Denn nur, wenn sichtbar wird, wo Emissionen entstehen, können echte Veränderungen angestoßen werden. Informiere dich und trage dazu bei, den Weg in eine verantwortungsvolle, klimabewusste Zukunft mitzugestalten.",
    "table-heading": "CO₂-Tabelle",
    "country": "Land",
    "company": "Unternehmen",
    "emissions": "CO₂-Emissionen (Tonnen pro Jahr)",
    "imprint": "Impressum",
    "policy": "Datenschutz",
    "copyright": "Copyright © 2025 CO₂ Tracker. Alle Rechte vorbehalten."
    

    
  },
  en: {
    "nav-home": "Home",
    "nav-info": "Info",
    "nav-about": "About Us",
    "nav-contact": "Contact",
   "local-nav-home": "Home",
   "local-nav-info": "Info",
   "local-nav-table": "Table",
   "hero-heading": "A greener future starts with transparency!",
   "hero-subheading": "We reveal where CO₂ is produced – empowering companies, countries, and people to make sustainable choices together.",
   "textbox-heading": "Shining a light on what matters!",
   "textbox-text": "Knowledge is the first step toward meaningful climate action. Our platform makes corporate CO₂ footprints visible – clearly, comparably, and accessibly. By showing where emissions are generated, we empower companies, policymakers, and individuals to make informed, sustainable decisions. Because real change starts with transparency. Explore the data and help shape a greener, more responsible future.",
   "table-heading": "CO₂ Data Table",
   "country": "Country",
   "company": "Company",
   "emissions": "CO₂ Emissions (tons per year)",
   "imprint": "Imprint",
   "policy": "Privacy Policy",
   "copyright": "Copyright © 2025 CO₂ Tracker. All rights reserved."



  },
  ar: {
    "nav-home": "الصفحة الرئيسية",
    "nav-info": "معلومات",
    "nav-about": "معلومات عنا",
    "nav-contact": "اتصل",
     "local-nav-home": "ابدأ",
     "local-nav-info": "معلومات",
     "local-nav-table": "جدول",
     "hero-heading": "الشفافية من أجل مستقبل أكثر اخضرارًا!",
     "hero-subheading": "نكشف عن أماكن إنتاج ثاني أكسيد الكربون – مما يمكّن الشركات والبلدان والأفراد من اتخاذ خيارات مستدامة معًا.",
     "textbox-heading": "تسليط الضوء على ما يهم.",
     "textbox-text": "المعرفة هي الخطوة الأولى نحو اتخاذ إجراءات مناخية هادفة. تتيح منصتنا رؤية البصمة الكربونية للشركات بشكل واضح وقابل للمقارنة وسهل الوصول إليه. من خلال إظهار مصادر الانبعاثات، نمكّن الشركات وصانعي السياسات والأفراد من اتخاذ قرارات مستنيرة ومستدامة. لأن التغيير الحقيقي يبدأ بالشفافية. استكشف البيانات وساعد في تشكيل مستقبل أكثر اخضرارًا ومسؤولية.",
     "table-heading": "جدول بيانات ثاني أكسيد الكربون",
     "country": "البلد",
     "company": "الشركة", 
     "emissions": "انبعاثات ثاني أكسيد الكربون (بالأطنان سنوياً)",
     "imprint": "بصمة",
     "policy": "سياسة الخصوصية",
     "copyright": "حقوق الطبع والنشر متتبع ثاني أكسيد الكربون جميع الحقوق محفوظة."
     
    
  }
};









// Sprache wechseln
function switchLanguage(lang) {
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  const elements = document.querySelectorAll("[id]");
  elements.forEach((el) => {
    const key = el.id;
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });


// Button-Text aktualisieren

  const dropdownBtn = document.getElementById("languageDropdown");
  if (dropdownBtn) {
    switch (lang) {
      case "de":
        dropdownBtn.textContent = "Deutsch";
        break;
      case "en":
        dropdownBtn.textContent = "English";
        break;
      case "ar":
        dropdownBtn.textContent = "اللغة العربية";
        break;
    }
  }


// Tabellen-Daten aktualisieren

  data = allLanguageData[lang];
  originalData = [...data];
  totalPages = Math.ceil(data.length / pageSize);
  curPage = 1;

  renderTable();
  setupSortListeners();
  renderPagination();

}


// Sprache beim Laden setzen (wenn gespeichert)
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || "de";
});





