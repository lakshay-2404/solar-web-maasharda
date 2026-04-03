import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <main className="max-w-7xl mx-auto px-8 py-16">
      {/* Hero Header */}
      <header className="mb-20 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low mb-6 border border-outline-variant/15">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="text-label text-sm font-semibold tracking-wider">PREMIUM SOLAR SERVICES</span>
        </div>
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tight leading-tight mb-6">
          Yamunanagar's Trusted <br/><span className="text-secondary">Solar Power</span> Partners
        </h1>
        <p className="max-w-2xl text-on-surface-variant text-lg leading-relaxed">
          Empowering homes and industries with cutting-edge renewable technology. From initial planning to lifelong maintenance, we ensure your transition to solar is seamless.
        </p>
      </header>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* 1. Residential Solar */}
        <div className="group shadow-md bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between hover:bg-surface-container-low transition-colors duration-500 border border-outline-variant/20">
          <div>
            <div className="w-14 h-14 rounded-lg bg-primary-container flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl">home_max</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Residential Solar</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Ghar ki Bijli:</span> Save up to 90% on monthly electricity bills.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Smart Monitoring:</span> Phone pe live usage check karein.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Space Efficient:</span> Modern roof-top design setups.</p>
              </li>
            </ul>
          </div>
          <Link href="/calculator" className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2">
            Calculate Savings <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>

        {/* 2. Commercial Solar */}
        <div className="group shadow-md bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between hover:bg-surface-container-low transition-colors duration-500 border border-outline-variant/20">
          <div>
            <div className="w-14 h-14 rounded-lg bg-primary-container flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl">factory</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Commercial Solar</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Tax Benefits:</span> Section 32 ke under Accelerated Depreciation.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Heavy Load:</span> Designed for large factories and warehouses.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Durability:</span> High-grade panels with 25 years warranty.</p>
              </li>
            </ul>
          </div>
          <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2">
            Enquire Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* 3. Subsidy + Loan Assistance (Highlighted) */}
        <div className="md:col-span-2 bg-gradient-to-br from-[#012d1d] to-[#1b4332] rounded-xl p-10 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img 
              alt="solar panel texture" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2R1hUE8aWcdD9RnULzbnlfOZviRF-vGPM-cCMnLsnea06Nh96V3-K__E81T-Q7mrEsqu5T2WuznqcSfYcBTk9WxqCPtCtBuhapgo9YZLcXsFTVL22S1e9V1ytDQWBgHeUbDTBQ2lzrSh8P-UtPFpqbkikEOEl9kxRYWuy6jImjAG3LwryoCNDTK4pgfyyVSmKLMcfd7emz0aqInV4nl_wUj4famVorp9EMtUrh4IXAs9gIAd8J-OaJDqwbGdz8DyFEdY7Ptr_5kU"
            />
          </div>
          <div className="flex-1 relative z-10">
            <div className="inline-block px-4 py-1 bg-secondary rounded-full text-white text-xs font-bold mb-6">MOST POPULAR</div>
            <h3 className="font-headline text-3xl font-extrabold text-white mb-6">Subsidy + Loan Assistance</h3>
            <p className="text-on-primary-container text-lg mb-8 max-w-xl">
              Aapke solar sapne ko sach karne ke liye hum help karte hain government subsidy aur easy financing options mein. 
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-secondary-fixed text-4xl">account_balance</span>
                <div>
                  <h4 className="text-white font-bold">Bank Loans</h4>
                  <p className="text-on-primary-container text-sm">Low-interest EMI options available.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                <span className="material-symbols-outlined text-secondary-fixed text-4xl">rebase_edit</span>
                <div>
                  <h4 className="text-white font-bold">Govt Subsidy</h4>
                  <p className="text-on-primary-container text-sm">PM Surya Ghar Yojana integration.</p>
                </div>
              </div>
            </div>
            <Link href="/subsidy" className="inline-block px-10 py-4 bg-secondary text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
              Apply for Subsidy Now
            </Link>
          </div>
          <div className="flex-shrink-0 w-full md:w-1/3 relative z-10">
            <img 
              alt="Financial documents and calculator" 
              className="rounded-xl shadow-2xl rotate-3" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEYYf2EPDM8u4VNI2Lvqpxpu88Awhq-P_nnwIdrahu2HUAA740WxvoSVecMTQNNbr7gTBaQVJ6Q1Ukl3e07P3_v1-FDfsLoB-FPoStEJKdKI2pIM5JyKFrTVVqUxGj27agKts-Xf5NwDawKrWNlrGqyQYbbHBfUc7z9dreYjbVfCcocAWNah39NTGUwbmin5B0ubj4kvD2E3rf4jlMgh5B73gC9CiERqohtsgIqWR9TMWVk6xPCTn2L-IW_IvsD4MZiHab8cm7Sxo"
            />
          </div>
        </div>

        {/* 4. Hybrid Solar Systems */}
        <div className="group shadow-md bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between hover:bg-surface-container-low transition-colors duration-500 border border-outline-variant/20">
          <div>
            <div className="w-14 h-14 rounded-lg bg-primary-container flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl">dynamic_form</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Hybrid Solar Systems</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Grid + Battery:</span> Dono ka fayda. Net metering aur backup ek saath.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Uninterrupted Power:</span> Blackouts mein bhi light nahi jayegi.</p>
              </li>
            </ul>
          </div>
          <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2">
            Enquire Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* 5. Inverter Batteries + Maintenance */}
        <div className="group shadow-md bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between hover:bg-surface-container-low transition-colors duration-500 border border-outline-variant/20">
          <div>
            <div className="w-14 h-14 rounded-lg bg-primary-container flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-secondary-fixed text-3xl">battery_charging_full</span>
            </div>
            <h3 className="font-headline text-2xl font-bold text-primary mb-4">Battery & Maintenance</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Service Guarantee:</span> Annual Maintenance Contracts (AMC) available.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary mt-1">check_circle</span>
                <p className="text-on-surface-variant"><span className="font-bold text-primary">Top Brands:</span> Distribution partners for Luminous & Exide.</p>
              </li>
            </ul>
          </div>
          <button className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-secondary transition-all flex items-center justify-center gap-2">
            Enquire Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </main>
  );
}
