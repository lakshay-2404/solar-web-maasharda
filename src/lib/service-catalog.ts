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

export const SERVICE_CATALOG: ServiceItem[] = [
  {
    slug: "residential-solar",
    title: "Residential Solar System",
    summary:
      "घर के मासिक बिल, रूफ स्पेस और सब्सिडी fitment ke hisaab se complete rooftop planning.",
    heroTitle: "Residential सोलर सिस्टम की पूरी योजना",
    heroDescription:
      "घर ke liye sahi kW sizing, documents collection, load passing, portal filing, UHBVN approval, installation aur meter change tak poora kaam hum sambhalte hain.",
    bullets: [
      "मासिक बिल ke hisaab se sizing",
      "सब्सिडी end-to-end handling",
      "मीटर change aur final handover",
    ],
    detailPoints: [
      "Required documents hum client se collect karte hain.",
      "Load passing aur file preparation humari team sambhalti hai.",
      "Portal par filing se UHBVN approval tak follow-up hum karte hain.",
      "Installation aur meter replacement coordinated timeline me hota hai.",
    ],
    leadHeading: "घरेलू सोलर के लिए मुफ्त परामर्श लें",
    leadDescription:
      "Naam, phone, preferred system aur monthly bill share kariye. Hum WhatsApp par clear next step bhej denge.",
    metaTitle: "Residential Solar Service | Maa Sharda Distributors",
    metaDescription:
      "Residential rooftop solar planning, subsidy handling, UHBVN approval, installation aur meter change support by Maa Sharda Distributors.",
  },
  {
    slug: "commercial-solar",
    title: "व्यावसायिक सोलर सिस्टम",
    summary:
      "Shop, clinic, office aur commercial load ke liye savings-focused solar planning aur execution.",
    heroTitle: "व्यावसायिक सोलर सिस्टम की प्रोफेशनल प्लानिंग",
    heroDescription:
      "Commercial properties ke liye load review, rooftop suitability, file preparation, approvals aur installation support ek hi workflow me diya jaata hai.",
    bullets: [
      "Commercial load review",
      "Execution timeline planning",
      "Brand and inverter matching",
    ],
    detailPoints: [
      "Load pattern aur daytime usage ke hisaab se system recommend hota hai.",
      "Proposal se execution tak single-point coordination milta hai.",
      "Site readiness, file flow aur installation team alignment hum handle karte hain.",
      "Business downtime ko minimum rakhne ki planning pe focus rehta hai.",
    ],
    leadHeading: "व्यावसायिक सोलर के लिए बात करें",
    leadDescription:
      "Commercial requirement share kariye. Hum aapko suitable system direction aur execution plan batayenge.",
    metaTitle: "Commercial Solar Service | Maa Sharda Distributors",
    metaDescription:
      "Commercial solar design and execution support for shops, offices, clinics and other business properties.",
  },
  {
    slug: "hybrid-systems",
    title: "हाइब्रिड और बैकअप सिस्टम",
    summary:
      "Jahan bill savings ke saath power-cut backup bhi chahiye, wahan hybrid planning and battery support.",
    heroTitle: "हाइब्रिड सिस्टम और बैकअप की सही योजना",
    heroDescription:
      "Hybrid inverter, battery sizing, essential load planning aur installation support ke saath aapko ek integrated solution milta hai.",
    bullets: [
      "Power-cut backup planning",
      "Battery aur inverter matching",
      "Future expansion ready design",
    ],
    detailPoints: [
      "Critical load mapping pehle hi clear kar di jaati hai.",
      "Battery requirement sirf estimate se nahi, actual use-case se decide hoti hai.",
      "Subsidy-fit systems ke liye documentation flow separately aligned hota hai.",
      "Installation aur commissioning ke baad handover clearly explained hota hai.",
    ],
    leadHeading: "हाइब्रिड सिस्टम के लिए मुफ्त परामर्श लें",
    leadDescription:
      "Agar aapko backup bhi chahiye to apni requirement share kariye. Hum hybrid layout aur battery direction clear kar denge.",
    metaTitle: "Hybrid Solar Systems | Maa Sharda Distributors",
    metaDescription:
      "Hybrid solar systems, battery backup planning, inverter matching and installation support by Maa Sharda Distributors.",
  },
  {
    slug: "subsidy-paperwork",
    title: "सब्सिडी और कागजी कार्य",
    summary:
      "Documents collection se portal filing, approval follow-up aur subsidy completion tak full ownership.",
    heroTitle: "सब्सिडी और कागजी कार्य हम संभालते हैं",
    heroDescription:
      "Client se required documents lene ke baad hum load passing, portal filing, UHBVN approvals, installation scheduling aur meter change tak poora flow chalate hain.",
    bullets: [
      "Documents hum collect karte hain",
      "Portal filing hum karte hain",
      "Approval aur meter change hum track karte hain",
    ],
    detailPoints: [
      "Client ko alag-alag offices ke chakkar lagane ki zarurat nahi hoti.",
      "Load passing aur file readiness pe pehle se focus rakha jaata hai.",
      "Portal aur UHBVN follow-up humari side se hota hai.",
      "Subsidy completion tak status clear rakha jaata hai.",
    ],
    leadHeading: "सब्सिडी फाइलिंग के लिए संपर्क करें",
    leadDescription:
      "Basic details share kariye. Hum aapko subsidy fitment aur required next step samjha denge.",
    metaTitle: "Solar Subsidy Paperwork Support | Maa Sharda Distributors",
    metaDescription:
      "Solar subsidy paperwork, document collection, load passing, portal filing, UHBVN approvals and meter change support.",
  },
  {
    slug: "financing-support",
    title: "फाइनेंसिंग सहायता",
    summary:
      "Up to 90% financing ke liye file readiness aur bank application support humari team ke through.",
    heroTitle: "फाइनेंसिंग फाइल भी हम तैयार करते हैं",
    heroDescription:
      "Agar customer financing lena chahta hai to required documents, file preparation aur bank application support hum apni side se organise karte hain.",
    bullets: [
      "Up to 90% financing support*",
      "File preparation on our end",
      "Bank application coordination",
    ],
    detailPoints: [
      "Hum direct financing provide nahi karte, lekin process file ko ready karke apply karne me help karte hain.",
      "Required documents ko structured format me organise kiya jaata hai.",
      "System proposal aur finance file ko aligned rakha jaata hai.",
      "Customer ko fragmented coordination se bachaya jaata hai.",
    ],
    leadHeading: "फाइनेंसिंग सहायता के लिए बात करें",
    leadDescription:
      "Agar aap financing ke saath solar lagwana chahte hain to basic details share kariye. Hum file readiness aur next step clear karenge.",
    metaTitle: "Solar Financing Support | Maa Sharda Distributors",
    metaDescription:
      "Solar financing support including file preparation and bank application coordination by Maa Sharda Distributors.",
  },
  {
    slug: "batteries",
    title: "बैटरी और बैकअप समाधान",
    summary:
      "Hybrid, backup aur essential load use-cases ke liye batteries aur related planning support.",
    heroTitle: "बैटरी और बैकअप समाधान",
    heroDescription:
      "Battery selection ko hum standalone product nahi mante. Backup requirement, load, inverter compatibility aur long-term usage ko saath me dekhkar recommend kiya jaata hai.",
    bullets: [
      "Battery sizing guidance",
      "Hybrid compatibility planning",
      "Critical load backup support",
    ],
    detailPoints: [
      "Har customer ko same battery size suggest nahi ki jaati.",
      "Load aur backup duration ke hisaab se planning hoti hai.",
      "Hybrid systems ke saath battery compatibility pe clear focus hota hai.",
      "Installation aur placement ko bhi planning me include kiya jaata hai.",
    ],
    leadHeading: "बैटरी समाधान के लिए पूछताछ करें",
    leadDescription:
      "Agar aapko backup solution chahiye to apna use-case share kariye. Hum suitable battery direction batayenge.",
    metaTitle: "Solar Batteries and Backup Solutions | Maa Sharda Distributors",
    metaDescription:
      "Battery sizing, backup planning and hybrid-compatible battery solutions by Maa Sharda Distributors.",
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICE_CATALOG.find((service) => service.slug === slug) ?? null;
}
