import Link from "next/link";
import Image from "next/image";

export default function Subsidy() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#012d1d] to-[#1b4332] py-24 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-6">
            <span className="text-secondary tracking-widest font-bold uppercase text-sm">PM Surya Ghar Yojana</span>
            <h1 className="text-white font-headline text-5xl md:text-6xl font-extrabold leading-tight">
              ₹78,000 tak Govt. Subsidy — Poori Jaankari
            </h1>
            <p className="text-on-primary-container text-lg max-w-xl">
              Switch to solar with Yamunanagar's most trusted partner. Get maximum government benefits directly in your bank account.
            </p>
            <div className="flex gap-4">
              <Link href="/calculator" className="bg-secondary text-white h-[48px] px-8 rounded-lg font-bold flex items-center gap-2 hover:brightness-110 transition-all">
                Apply Now
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full"></div>
            <img 
              alt="Solar Subsidy India" 
              className="relative z-10 rounded-2xl shadow-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrJ3VGr0XW2HyjJNKCtA9hEJLAaqkMmAStWEya73rWgLJ17AwSOakh4rhrd78U5_LBZC0Kx0TPa0Sh6P9eq8nq40iteTMXvR1tlUqOM1jZQiMqpWi0Pd264IxA_4G45Mh_gFxyyr3quIRfFYJeJyxGt44DBFMFr4dtFydGIDLs_6pYFm5WoaF-blEqhDtdJWFWfiq4HxiV4C6xYsww_vX9EOaw-HUKZa2Rg_ESiHA6zmhXfT0ccGyNCRwAl-TRD2aK1Qgu3MHcd1k"
            />
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Are you eligible?</h2>
            <p className="text-on-surface-variant max-w-2xl">Check if your residential property qualifies for the PM Surya Ghar: Muft Bijli Yojana.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
              <div className="bg-primary-container p-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">Residential Connection</h3>
                <p className="text-on-surface-variant">The subsidy is exclusively for residential houses with a valid electricity connection from local DISCOM.</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
              <div className="bg-primary-container p-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">Technical Feasibility</h3>
                <p className="text-on-surface-variant">Your roof should have sufficient shadow-free area for the requested solar capacity installation.</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
              <div className="bg-primary-container p-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">PAN & Aadhaar Linked</h3>
                <p className="text-on-surface-variant">You must have a PAN card and Aadhaar card linked to your electricity bill for direct benefit transfer.</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl flex gap-6 items-start">
              <div className="bg-primary-container p-3 rounded-lg">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <div>
                <h3 className="font-headline text-xl font-bold text-primary mb-2">Domestic Content (DCR)</h3>
                <p className="text-on-surface-variant">Subsidy is applicable only if you use Made-in-India (DCR) solar modules as per MNRE norms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidy Amount Cards */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Subsidy Amount Structure</h2>
            <p className="text-on-surface-variant">Government provides financial assistance based on system capacity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1kW */}
            <div className="bg-white p-10 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col items-center text-center">
              <span className="text-secondary font-bold text-lg mb-2">Upto 1kW</span>
              <div className="text-4xl font-black text-primary mb-6">₹30,000</div>
              <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">Perfect for small homes with basic energy needs (Lights, Fans, TV).</p>
              <ul className="text-left w-full space-y-3 border-t border-surface-container pt-6">
                <li className="flex gap-2 text-sm text-on-surface"><span className="material-symbols-outlined text-primary scale-75">check</span> Standard Subsidy</li>
                <li className="flex gap-2 text-sm text-on-surface"><span className="material-symbols-outlined text-primary scale-75">check</span> Easy Installation</li>
              </ul>
            </div>
            {/* 2kW */}
            <div className="bg-primary p-10 rounded-xl shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-xs font-bold rounded-bl-lg">POPULAR</div>
              <span className="text-on-primary-container font-bold text-lg mb-2">2kW System</span>
              <div className="text-4xl font-black text-white mb-6">₹60,000</div>
              <p className="text-on-primary-container text-sm mb-8 leading-relaxed">Ideal for medium households with 1 AC and standard appliances.</p>
              <ul className="text-left w-full space-y-3 border-t border-on-primary-container/20 pt-6">
                <li className="flex gap-2 text-sm text-white"><span className="material-symbols-outlined text-secondary scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> ₹30k per kW</li>
                <li className="flex gap-2 text-sm text-white"><span className="material-symbols-outlined text-secondary scale-75" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> Maximized ROI</li>
              </ul>
            </div>
            {/* 3kW+ */}
            <div className="bg-white p-10 rounded-xl shadow-sm border border-outline-variant/10 flex flex-col items-center text-center">
              <span className="text-secondary font-bold text-lg mb-2">3kW and Above</span>
              <div className="text-4xl font-black text-primary mb-6">₹78,000</div>
              <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">Fixed maximum subsidy for all systems 3kW or larger.</p>
              <ul className="text-left w-full space-y-3 border-t border-surface-container pt-6">
                <li className="flex gap-2 text-sm text-on-surface"><span className="material-symbols-outlined text-primary scale-75">check</span> Highest Rebate</li>
                <li className="flex gap-2 text-sm text-on-surface"><span className="material-symbols-outlined text-primary scale-75">check</span> Residential Flat Rate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DCR Callout */}
      <section className="px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-primary/5 rounded-2xl border-l-4 border-primary p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <span className="material-symbols-outlined text-5xl text-primary">verified_user</span>
              <div>
                <h3 className="font-headline text-2xl font-bold text-primary">DCR Panel Requirement</h3>
                <p className="text-on-surface-variant">Only Made-in-India Solar Cells & Modules (Domestic Content Requirement) are eligible for this subsidy.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-primary font-bold">
              <span className="material-symbols-outlined">info</span>
              <span>MNRE Approved Vendor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary">8 Steps to Subsidy</h2>
            <p className="text-on-surface-variant">Hassle-free process managed by Maa Sharda experts.</p>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-outline-variant/30 -translate-y-1/2 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-8 gap-8 relative">
              {[
                { step: 1, label: "Call us" },
                { step: 2, label: "Site Visit" },
                { step: 3, label: "Registration" },
                { step: 4, label: "DISCOM Approval" },
                { step: 5, label: "Installation" },
                { step: 6, label: "Net Metering" },
                { step: 7, label: "Claim Request" },
              ].map((item) => (
                <div key={item.step} className="flex flex-col items-center text-center space-y-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold z-10 transition-transform group-hover:scale-110">{item.step}</div>
                  <span className="text-sm font-bold text-primary">{item.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center text-center space-y-4 group">
                <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold z-10 transition-transform group-hover:scale-110">8</div>
                <span className="text-sm font-bold text-secondary">Subsidy In Bank</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Assistance */}
      <section className="py-24 px-8 bg-surface-container">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline text-4xl font-bold text-primary mb-6">Easy Loan Assistance</h2>
              <p className="text-on-surface-variant mb-8">No need to pay everything upfront. Get low-interest loans from SBI, PNB, and other leading banks with our help.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-bold text-primary mb-2">7% Interest</h4>
                  <p className="text-xs text-on-surface-variant">Concessional rates for PM Surya Ghar beneficiaries.</p>
                </div>
                <div className="bg-white p-6 rounded-lg">
                  <h4 className="font-bold text-primary mb-2">No Collateral</h4>
                  <p className="text-xs text-on-surface-variant">Residential solar loans up to 3kW require no security.</p>
                </div>
              </div>
              <div className="border-2 border-secondary p-6 rounded-xl bg-secondary-fixed/30">
                <h4 className="font-bold text-secondary flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined">priority_high</span>
                  Requirements
                </h4>
                <p className="text-sm text-on-secondary-fixed-variant">Last 6 months electricity bill, Aadhaar, and clean credit history (CIBIL) required for instant approval.</p>
              </div>
            </div>
            <div className="relative">
              <img 
                alt="Loan Assistance" 
                className="rounded-2xl shadow-2xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx762NV5hozFhqfJdAIczl5tIgXpse7tR4ioNUKqxt4Om071WSpDDHMKS4IM_K_JhSMD0Pws0B_jFfO7Qfoz4ZQQNzhSU6ssljqzexflwFNrxKT3vWXR2B-3fmpR-wXV0_QfxCkz7FDvM-3GJr8kSfVc6S0mz7d5whxCQKwR5-LjKTyeEBbcuiQSSrrRnG9ELTGdl69ZBU_o9vLGq95tLmAo26skiyK9ov0OWOi9afbgENeZ-h6ZAUfCOSfro6qRbnU4LphcG4RZA"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-lg border border-surface-container-high hidden md:block">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-4xl text-secondary">payments</span>
                  <div>
                    <p className="text-xs text-on-surface-variant">EMI starts from</p>
                    <p className="text-xl font-black text-primary">₹1,200/mo*</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
