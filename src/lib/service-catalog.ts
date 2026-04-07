import type { SiteLanguage } from "@/lib/site-language";

export const SERVICE_AREAS = [
  "Yamunanagar",
  "Ambala",
  "Karnal",
  "Kurukshetra",
] as const;

export interface ServiceItem {
  slug: string;
  title: string;
  summary: string;
  heroTitle: string;
  heroDescription: string;
  bullets: string[];
  detailPoints: string[];
  leadHeading: string;
  leadDescription: string;
  metaTitle: string;
  metaDescription: string;
}

type LocalizedValue<T> = Record<SiteLanguage, T>;

interface ServiceSeed {
  slug: string;
  title: LocalizedValue<string>;
  summary: LocalizedValue<string>;
  heroTitle: LocalizedValue<string>;
  heroDescription: LocalizedValue<string>;
  bullets: LocalizedValue<string[]>;
  detailPoints: LocalizedValue<string[]>;
  leadHeading: LocalizedValue<string>;
  leadDescription: LocalizedValue<string>;
  metaTitle: LocalizedValue<string>;
  metaDescription: LocalizedValue<string>;
}

const SERVICE_SEEDS: ServiceSeed[] = [
  {
    slug: "residential-solar",
    title: {
      hi: "घरेलू सौर प्रणाली",
      en: "Residential Solar Systems",
    },
    summary: {
      hi: "घर के बिजली बिल, छत की उपलब्ध जगह और सब्सिडी के अनुसार पूरी योजना।",
      en: "Complete rooftop planning based on household bill, roof space, and subsidy fitment.",
    },
    heroTitle: {
      hi: "घरेलू सौर प्रणाली की पूरी योजना",
      en: "Complete planning for residential solar systems",
    },
    heroDescription: {
      hi: "सही क्षमता तय करना, दस्तावेज जुटाना, लोड पासिंग, पोर्टल आवेदन, UHBVN मंजूरी, स्थापना और मीटर परिवर्तन तक पूरा काम हम संभालते हैं।",
      en: "We handle correct kW sizing, document collection, load passing, portal filing, UHBVN approvals, installation, and meter change in one flow.",
    },
    bullets: {
      hi: [
        "मासिक बिल के अनुसार सही क्षमता",
        "सब्सिडी की पूरी सहायता",
        "मीटर परिवर्तन और अंतिम सुपुर्दगी",
      ],
      en: [
        "Sizing matched to your monthly bill",
        "End-to-end subsidy guidance",
        "Meter change and final handover",
      ],
    },
    detailPoints: {
      hi: [
        "ज़रूरी दस्तावेज हम आपसे एक बार में लेते हैं।",
        "लोड पासिंग और फाइल तैयार करना हमारी टीम संभालती है।",
        "पोर्टल आवेदन से UHBVN मंजूरी तक पूरा अनुसरण हम करते हैं।",
        "स्थापना और मीटर परिवर्तन तय समय-क्रम में करवाया जाता है।",
      ],
      en: [
        "We collect the required documents from the client.",
        "Our team handles load passing and file preparation.",
        "We follow the case from portal filing to UHBVN approval.",
        "Installation and meter replacement happen on a coordinated timeline.",
      ],
    },
    leadHeading: {
      hi: "घरेलू सौर योजना के लिए निःशुल्क परामर्श लें",
      en: "Get a free consultation for residential solar",
    },
    leadDescription: {
      hi: "नाम, फोन, पसंद की क्षमता और मासिक बिल बताइए। हम व्हाट्सऐप पर अगला साफ़ कदम भेजेंगे।",
      en: "Share your name, phone, preferred system, and monthly bill. We will send the next practical step on WhatsApp.",
    },
    metaTitle: {
      hi: "घरेलू सौर सेवा | Maa Sharda Distributors",
      en: "Residential Solar Service | Maa Sharda Distributors",
    },
    metaDescription: {
      hi: "घरेलू रूफटॉप सौर योजना, सब्सिडी सहायता, UHBVN मंजूरी, स्थापना और मीटर परिवर्तन सेवा।",
      en: "Residential rooftop solar planning, subsidy handling, UHBVN approval, installation, and meter change support.",
    },
  },
  {
    slug: "commercial-solar",
    title: {
      hi: "व्यावसायिक सौर प्रणाली",
      en: "Commercial Solar Systems",
    },
    summary: {
      hi: "दुकान, क्लिनिक, कार्यालय और व्यावसायिक उपयोग के लिए बचत-केंद्रित सौर योजना।",
      en: "Savings-focused solar planning and execution for shops, clinics, offices, and commercial loads.",
    },
    heroTitle: {
      hi: "व्यावसायिक सौर प्रणाली की पेशेवर योजना",
      en: "Professional planning for commercial solar systems",
    },
    heroDescription: {
      hi: "व्यावसायिक परिसरों के लिए लोड समीक्षा, छत की उपयुक्तता, फाइल तैयारी, मंजूरी और स्थापना का पूरा क्रम एक ही कार्यप्रवाह में मिलता है।",
      en: "For commercial properties, load review, rooftop suitability, file preparation, approvals, and installation support are delivered through one workflow.",
    },
    bullets: {
      hi: [
        "व्यावसायिक लोड की समीक्षा",
        "कार्यान्वयन की समय-योजना",
        "ब्रांड और इन्वर्टर का सही मेल",
      ],
      en: [
        "Commercial load review",
        "Execution timeline planning",
        "Brand and inverter matching",
      ],
    },
    detailPoints: {
      hi: [
        "लोड पैटर्न और दिन के उपयोग के अनुसार प्रणाली सुझाई जाती है।",
        "प्रस्ताव से कार्यान्वयन तक एक ही संपर्क बिंदु मिलता है।",
        "स्थल की तैयारी, फाइल का क्रम और स्थापना टीम का तालमेल हम संभालते हैं।",
        "व्यवसाय का रुकाव कम रहे, इस योजना पर खास ध्यान रखा जाता है।",
      ],
      en: [
        "The system recommendation is based on load pattern and daytime usage.",
        "You get single-point coordination from proposal to execution.",
        "We handle site readiness, file flow, and installation team alignment.",
        "Planning focuses on keeping business downtime low.",
      ],
    },
    leadHeading: {
      hi: "व्यावसायिक सौर योजना पर बात करें",
      en: "Talk to us about commercial solar",
    },
    leadDescription: {
      hi: "अपनी व्यावसायिक आवश्यकता बताइए। हम उपयुक्त प्रणाली दिशा और कार्य योजना समझाएंगे।",
      en: "Share your commercial requirement and we will recommend a suitable system direction and execution plan.",
    },
    metaTitle: {
      hi: "व्यावसायिक सौर सेवा | Maa Sharda Distributors",
      en: "Commercial Solar Service | Maa Sharda Distributors",
    },
    metaDescription: {
      hi: "दुकान, कार्यालय, क्लिनिक और अन्य व्यावसायिक परिसरों के लिए सौर योजना और कार्यान्वयन सेवा।",
      en: "Commercial solar design and execution support for shops, offices, clinics, and other business properties.",
    },
  },
  {
    slug: "hybrid-systems",
    title: {
      hi: "हाइब्रिड और बैकअप प्रणाली",
      en: "Hybrid and Backup Systems",
    },
    summary: {
      hi: "जहां बिल बचत के साथ बिजली कटौती का बैकअप भी चाहिए, वहां हाइब्रिड योजना और बैटरी सहायता।",
      en: "For homes and businesses that need bill savings along with power-cut backup, we plan hybrid systems and battery support.",
    },
    heroTitle: {
      hi: "हाइब्रिड प्रणाली और बैकअप की सही योजना",
      en: "The right plan for hybrid systems and backup",
    },
    heroDescription: {
      hi: "हाइब्रिड इन्वर्टर, बैटरी क्षमता, जरूरी लोड की योजना और स्थापना सहायता के साथ एकीकृत समाधान दिया जाता है।",
      en: "We provide an integrated solution with hybrid inverter selection, battery sizing, essential-load planning, and installation support.",
    },
    bullets: {
      hi: [
        "बिजली कटौती के लिए बैकअप योजना",
        "बैटरी और इन्वर्टर का सही मेल",
        "भविष्य में विस्तार के योग्य डिजाइन",
      ],
      en: [
        "Power-cut backup planning",
        "Battery and inverter matching",
        "Future expansion ready design",
      ],
    },
    detailPoints: {
      hi: [
        "ज़रूरी लोड की सूची पहले ही स्पष्ट कर दी जाती है।",
        "बैटरी की जरूरत अनुमान से नहीं, वास्तविक उपयोग के आधार पर तय की जाती है।",
        "सब्सिडी-योग्य प्रणालियों के लिए दस्तावेजी क्रम अलग से मिलाया जाता है।",
        "स्थापना, शुरूआत और सुपुर्दगी साफ़ रूप से समझाई जाती है।",
      ],
      en: [
        "Critical-load mapping is defined upfront.",
        "Battery requirements are decided from actual use-case, not guesswork.",
        "Documentation flow is aligned separately for subsidy-fit systems.",
        "Installation, commissioning, and handover are explained clearly.",
      ],
    },
    leadHeading: {
      hi: "हाइब्रिड सौर योजना के लिए निःशुल्क परामर्श लें",
      en: "Get a free consultation for hybrid solar",
    },
    leadDescription: {
      hi: "अगर आपको बैकअप भी चाहिए, तो अपनी आवश्यकता बताइए। हम सही हाइब्रिड व्यवस्था और बैटरी दिशा स्पष्ट करेंगे।",
      en: "If you need backup too, share your requirement and we will recommend the right hybrid layout and battery direction.",
    },
    metaTitle: {
      hi: "हाइब्रिड सौर प्रणाली | Maa Sharda Distributors",
      en: "Hybrid Solar Systems | Maa Sharda Distributors",
    },
    metaDescription: {
      hi: "हाइब्रिड सौर प्रणाली, बैटरी बैकअप योजना, इन्वर्टर मिलान और स्थापना सहायता।",
      en: "Hybrid solar systems, battery backup planning, inverter matching, and installation support.",
    },
  },
  {
    slug: "subsidy-paperwork",
    title: {
      hi: "सब्सिडी और कागजी कार्य",
      en: "Subsidy and Paperwork Support",
    },
    summary: {
      hi: "दस्तावेज जुटाने से पोर्टल आवेदन, मंजूरी के अनुसरण और सब्सिडी पूरी होने तक पूरा उत्तरदायित्व।",
      en: "Full ownership from document collection to portal filing, approval follow-up, and subsidy completion.",
    },
    heroTitle: {
      hi: "सब्सिडी और कागजी कार्य हम संभालते हैं",
      en: "We handle subsidy and paperwork support",
    },
    heroDescription: {
      hi: "ज़रूरी दस्तावेज लेने के बाद हम लोड पासिंग, पोर्टल आवेदन, UHBVN मंजूरी, स्थापना समय-योजना और मीटर परिवर्तन तक पूरा क्रम चलाते हैं।",
      en: "After collecting the required documents, we drive load passing, portal filing, UHBVN approvals, installation scheduling, and meter change support.",
    },
    bullets: {
      hi: [
        "दस्तावेज हम एकत्र करते हैं",
        "पोर्टल आवेदन हम करते हैं",
        "मंजूरी और मीटर परिवर्तन का अनुसरण हम करते हैं",
      ],
      en: [
        "We collect the documents",
        "We file the portal application",
        "We track approvals and meter change",
      ],
    },
    detailPoints: {
      hi: [
        "ग्राहक को अलग-अलग कार्यालयों के चक्कर नहीं लगाने पड़ते।",
        "लोड पासिंग और फाइल की तैयारी पर पहले से ध्यान दिया जाता है।",
        "पोर्टल और UHBVN का अनुसरण हमारी ओर से होता है।",
        "सब्सिडी पूरी होने तक स्थिति स्पष्ट रखी जाती है।",
      ],
      en: [
        "Clients do not need to run between separate offices.",
        "Load passing and file readiness are handled upfront.",
        "Portal and UHBVN follow-up happens from our side.",
        "Status stays clear until subsidy completion.",
      ],
    },
    leadHeading: {
      hi: "सब्सिडी आवेदन के लिए संपर्क करें",
      en: "Contact us for subsidy filing support",
    },
    leadDescription: {
      hi: "अपनी मूल जानकारी बताइए। हम सब्सिडी की उपयुक्तता और अगला जरूरी कदम समझाएंगे।",
      en: "Share the basic details and we will explain subsidy fitment and the required next step.",
    },
    metaTitle: {
      hi: "सौर सब्सिडी कागजी सहायता | Maa Sharda Distributors",
      en: "Solar Subsidy Paperwork Support | Maa Sharda Distributors",
    },
    metaDescription: {
      hi: "सौर सब्सिडी कागजी कार्य, दस्तावेज एकत्रण, लोड पासिंग, पोर्टल आवेदन, UHBVN मंजूरी और मीटर परिवर्तन सहायता।",
      en: "Solar subsidy paperwork, document collection, load passing, portal filing, UHBVN approvals, and meter change support.",
    },
  },
  {
    slug: "financing-support",
    title: {
      hi: "वित्त सहायता",
      en: "Financing Support",
    },
    summary: {
      hi: "90% तक वित्त सुविधा के लिए फाइल तैयार करने और बैंक आवेदन में हमारी टीम साथ रहती है।",
      en: "File-readiness and bank-application support for up to 90% financing through our team.",
    },
    heroTitle: {
      hi: "वित्त सहायता की फाइल भी हम तैयार कराते हैं",
      en: "We also prepare the financing file",
    },
    heroDescription: {
      hi: "यदि ग्राहक वित्त सुविधा लेना चाहता है, तो ज़रूरी दस्तावेज, फाइल तैयारी और बैंक आवेदन का क्रम हम व्यवस्थित करते हैं।",
      en: "If a customer wants financing, we organize the required documents, file preparation, and bank application support.",
    },
    bullets: {
      hi: [
        "90% तक वित्त सहायता*",
        "फाइल तैयारी हमारी ओर से",
        "बैंक आवेदन समन्वय",
      ],
      en: [
        "Up to 90% financing support*",
        "File preparation on our end",
        "Bank application coordination",
      ],
    },
    detailPoints: {
      hi: [
        "हम सीधे वित्त नहीं देते, लेकिन फाइल तैयार कर सही आवेदन में मदद करते हैं।",
        "ज़रूरी दस्तावेजों को व्यवस्थित रूप में सजाया जाता है।",
        "प्रणाली प्रस्ताव और वित्त फाइल का मेल बनाए रखा जाता है।",
        "ग्राहक को बिखरे हुए समन्वय से बचाया जाता है।",
      ],
      en: [
        "We do not directly provide financing, but we help prepare the file and apply correctly.",
        "Required documents are organized in a structured format.",
        "The system proposal and finance file stay aligned.",
        "The customer is protected from fragmented coordination.",
      ],
    },
    leadHeading: {
      hi: "वित्त सहायता के लिए बात करें",
      en: "Talk to us about financing support",
    },
    leadDescription: {
      hi: "यदि आप वित्त सुविधा के साथ सौर लगवाना चाहते हैं, तो अपनी मूल जानकारी बताइए। हम फाइल की तैयारी और अगला कदम स्पष्ट करेंगे।",
      en: "If you want solar with financing, share your basic details and we will clarify file readiness and the next step.",
    },
    metaTitle: {
      hi: "सौर वित्त सहायता | Maa Sharda Distributors",
      en: "Solar Financing Support | Maa Sharda Distributors",
    },
    metaDescription: {
      hi: "सौर वित्त सहायता, फाइल तैयारी और बैंक आवेदन समन्वय।",
      en: "Solar financing support including file preparation and bank-application coordination.",
    },
  },
  {
    slug: "batteries",
    title: {
      hi: "बैटरी और बैकअप समाधान",
      en: "Battery and Backup Solutions",
    },
    summary: {
      hi: "हाइब्रिड, बैकअप और आवश्यक लोड वाले उपयोग के लिए बैटरी और योजना सहायता।",
      en: "Battery and planning support for hybrid, backup, and essential-load use cases.",
    },
    heroTitle: {
      hi: "बैटरी और बैकअप समाधान",
      en: "Battery and backup solutions",
    },
    heroDescription: {
      hi: "बैटरी को हम अलग उत्पाद की तरह नहीं देखते। बैकअप की जरूरत, लोड, इन्वर्टर मिलान और लंबे उपयोग को साथ देखकर सुझाव दिया जाता है।",
      en: "We do not treat battery selection as a standalone product choice. We recommend it by reviewing backup need, load, inverter compatibility, and long-term usage together.",
    },
    bullets: {
      hi: [
        "बैटरी क्षमता मार्गदर्शन",
        "हाइब्रिड अनुकूलता योजना",
        "ज़रूरी लोड बैकअप सहायता",
      ],
      en: [
        "Battery sizing guidance",
        "Hybrid compatibility planning",
        "Critical load backup support",
      ],
    },
    detailPoints: {
      hi: [
        "हर ग्राहक को एक जैसी बैटरी क्षमता नहीं सुझाई जाती।",
        "लोड और बैकअप अवधि के अनुसार योजना बनाई जाती है।",
        "हाइब्रिड प्रणालियों के साथ बैटरी की अनुकूलता पर साफ़ ध्यान रखा जाता है।",
        "स्थापना और स्थान-चयन को भी योजना में शामिल किया जाता है।",
      ],
      en: [
        "We do not suggest the same battery size to every customer.",
        "Planning is based on load and required backup duration.",
        "Battery compatibility with hybrid systems is checked clearly.",
        "Installation and placement are included in the plan too.",
      ],
    },
    leadHeading: {
      hi: "बैटरी समाधान के लिए पूछताछ करें",
      en: "Ask us about battery solutions",
    },
    leadDescription: {
      hi: "यदि आपको बैकअप समाधान चाहिए, तो अपना उपयोग बताइए। हम उपयुक्त बैटरी दिशा सुझाएंगे।",
      en: "If you need a backup solution, share your use case and we will recommend a suitable battery direction.",
    },
    metaTitle: {
      hi: "सौर बैटरी और बैकअप समाधान | Maa Sharda Distributors",
      en: "Solar Batteries and Backup Solutions | Maa Sharda Distributors",
    },
    metaDescription: {
      hi: "बैटरी क्षमता, बैकअप योजना और हाइब्रिड अनुकूल बैटरी समाधान।",
      en: "Battery sizing, backup planning, and hybrid-compatible battery solutions.",
    },
  },
];

function localizeService(seed: ServiceSeed, language: SiteLanguage): ServiceItem {
  return {
    slug: seed.slug,
    title: seed.title[language],
    summary: seed.summary[language],
    heroTitle: seed.heroTitle[language],
    heroDescription: seed.heroDescription[language],
    bullets: seed.bullets[language],
    detailPoints: seed.detailPoints[language],
    leadHeading: seed.leadHeading[language],
    leadDescription: seed.leadDescription[language],
    metaTitle: seed.metaTitle[language],
    metaDescription: seed.metaDescription[language],
  };
}

export function getAllServiceSlugs() {
  return SERVICE_SEEDS.map((service) => service.slug);
}

export function getLocalizedServiceCatalog(language: SiteLanguage) {
  return SERVICE_SEEDS.map((service) => localizeService(service, language));
}

export function getLocalizedServiceBySlug(
  slug: string,
  language: SiteLanguage
) {
  const service = SERVICE_SEEDS.find((item) => item.slug === slug);
  return service ? localizeService(service, language) : null;
}
