"use client";

import { useState } from "react";
import Link from "next/link";

export default function Calculator() {
  const [monthlyBill, setMonthlyBill] = useState(4500);
  const [roofArea, setRoofArea] = useState("Medium");

  // Basic solar mathematics
  // Assuming ₹8 per unit -> units = monthlyBill / 8
  // 1kW system produces roughly 120 units per month
  const estimatedUnits = monthlyBill / 8;
  let systemSize = estimatedUnits / 120;
  systemSize = Math.max(1, Math.round(systemSize * 10) / 10); // Keep at least 1kW, 1 decimal place
  
  // Calculate Subsidy (PM Surya Ghar Rules)
  // Up to 2kW: 30k/kW
  // > 2kW up to 3kW: 18k/kW
  // > 3kW: Max 78k
  let subsidy = 0;
  if (systemSize <= 2) {
    subsidy = Math.round(systemSize * 30000);
  } else if (systemSize > 2 && systemSize < 3) {
    subsidy = 60000 + Math.round((systemSize - 2) * 18000);
  } else {
    subsidy = 78000; // Cap
  }

  // Cost estimates based on generic ₹65,000/kW benchmark
  const projectCost = Math.round(systemSize * 65000);
  const netCost = Math.max(0, projectCost - subsidy);
  
  // Rough EMI estimation over 48 months (4 years)
  const emi = Math.max(0, Math.round(netCost / 48));
  const savings = monthlyBill;

  return (
    <main className="max-w-7xl mx-auto px-8 py-12 md:py-20">
      {/* Hero Title Section */}
      <div className="mb-16">
        <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">ENERGY INDEPENDENCE</span>
        <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tighter mb-4 leading-tight">
          Solar Yield <br />Calculator.
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg">
          Discover the power of the sun. Calculate your potential savings and transition to clean energy with Yamunanagar's leading solar experts.
        </p>
      </div>

      {/* Two Column Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-24">
        {/* Left: Inputs */}
        <div className="space-y-8">
          <div className="bg-surface-container-low p-10 rounded-xl space-y-10">
            {/* Monthly Bill */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-headline font-bold text-primary text-xl">Average Monthly Bill</label>
                <span className="text-secondary font-bold text-lg">₹{monthlyBill.toLocaleString()}</span>
              </div>
              <input 
                className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-secondary" 
                max="25000" 
                min="500" 
                step="500" 
                type="range" 
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
              />
              <div className="flex justify-between text-xs font-bold text-outline uppercase tracking-wider">
                <span>₹500</span>
                <span>₹25,000+</span>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <label className="font-headline font-bold text-primary text-xl">Installation Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">location_on</span>
                <input className="w-full pl-12 pr-4 py-4 bg-surface rounded-lg border-none focus:ring-2 focus:ring-secondary font-bold text-primary" readOnly type="text" value="Yamunanagar, Haryana" />
              </div>
            </div>

            {/* Roof Area */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="font-headline font-bold text-primary text-xl">Available Roof Area</label>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['Small (100-300)', 'Medium (300-600)', 'Large (600+)'].map((size) => {
                  const isActive = roofArea === size;
                  return (
                    <button 
                      key={size}
                      onClick={() => setRoofArea(size)}
                      className={`py-3 px-4 rounded-lg font-bold transition-all border-2 ${
                        isActive 
                          ? 'bg-white border-secondary text-secondary shadow-md' 
                          : 'bg-white border-transparent text-on-surface-variant hover:border-outline-variant'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Card */}
        <div className="lg:sticky lg:top-32">
          <div className="bg-primary-container text-white p-10 rounded-xl atmospheric-shadow overflow-hidden relative">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-headline text-on-primary-container text-sm font-bold uppercase tracking-widest mb-2">Recommended Setup</h3>
                  <div className="text-4xl font-extrabold">{systemSize.toFixed(1)}kW On-Grid System</div>
                </div>
                <div className="bg-secondary p-3 rounded-lg">
                  <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>solar_power</span>
                </div>
              </div>
              <div className="h-px bg-white/10 w-full"></div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-on-primary-container text-xs font-bold uppercase mb-1">Monthly Savings</div>
                  <div className="text-2xl font-bold text-secondary-fixed-dim">₹{savings.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-on-primary-container text-xs font-bold uppercase mb-1">Govt. Subsidy</div>
                  <div className="text-2xl font-bold text-secondary-fixed-dim">₹{subsidy.toLocaleString()}</div>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-70">Estimated Project Cost</span>
                  <span className="font-bold">₹{projectCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-70">Net Cost (Post-Subsidy)</span>
                  <span className="font-bold">₹{netCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/10 mt-2">
                  <span className="font-bold">EMI Starts From</span>
                  <span className="text-xl font-black text-secondary-fixed">₹{emi.toLocaleString()}/mo*</span>
                </div>
              </div>
              <button onClick={() => alert("Redirecting to WhatsApp for Free Survey...")} className="w-full bg-secondary hover:bg-secondary-container text-white py-5 rounded-lg font-black text-lg transition-all transform hover:-translate-y-1">
                BOOK FREE SITE SURVEY
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table Section */}
      <section className="mb-24">
        <div className="mb-10 text-center">
          <h2 className="font-headline text-3xl font-bold text-primary mb-2">System Comparison</h2>
          <p className="text-on-surface-variant">Find the perfect capacity for your energy needs</p>
        </div>
        <div className="overflow-hidden bg-white rounded-xl shadow-lg border border-surface-container-low">
          <div className="grid grid-cols-4 border-b border-surface-container-low text-center">
            <div className="p-8 border-r border-surface-container-low bg-surface-container-low">
              <div className="text-primary font-bold text-2xl mb-1">1kW</div>
              <div className="text-xs text-on-surface-variant font-bold uppercase">Starter</div>
            </div>
            <div className="p-8 border-r border-surface-container-low bg-primary text-white">
              <div className="text-secondary font-bold text-2xl mb-1">3kW</div>
              <div className="text-xs text-white/70 font-bold uppercase">Popular</div>
            </div>
            <div className="p-8 border-r border-surface-container-low bg-surface-container-low">
              <div className="text-primary font-bold text-2xl mb-1">5kW</div>
              <div className="text-xs text-on-surface-variant font-bold uppercase">Family</div>
            </div>
            <div className="p-8 bg-surface-container-low">
              <div className="text-primary font-bold text-2xl mb-1">10kW</div>
              <div className="text-xs text-on-surface-variant font-bold uppercase">Commercial</div>
            </div>
          </div>
          <div className="divide-y divide-surface-container-low">
            <div className="grid grid-cols-4 text-center">
              <div className="p-6 font-bold text-primary">₹65,000</div>
              <div className="p-6 font-black text-primary bg-primary-container/5">₹1,95,000</div>
              <div className="p-6 font-bold text-primary">₹3,25,000</div>
              <div className="p-6 font-bold text-primary">₹6,50,000</div>
            </div>
            <div className="grid grid-cols-4 text-center bg-surface-container-low/30">
              <div className="p-6 text-sm text-on-surface-variant">₹30,000 Subsidy</div>
              <div className="p-6 text-sm font-bold text-secondary bg-primary-container/5">₹78,000 Subsidy</div>
              <div className="p-6 text-sm text-on-surface-variant">₹78,000 Subsidy</div>
              <div className="p-6 text-sm text-on-surface-variant">Institutional Rate</div>
            </div>
            <div className="grid grid-cols-4 text-center">
              <div className="p-6 text-sm">~120 Units/mo</div>
              <div className="p-6 text-sm font-bold bg-primary-container/5">~360 Units/mo</div>
              <div className="p-6 text-sm">~600 Units/mo</div>
              <div className="p-6 text-sm">~1200 Units/mo</div>
            </div>
          </div>
        </div>
        
        {/* Loan Callout */}
        <div className="mt-8 flex items-center gap-4 p-6 bg-secondary-fixed/30 rounded-lg border border-secondary/10">
          <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
          <p className="text-sm font-medium text-on-secondary-fixed-variant">
            <span className="font-bold">Financing Note:</span> All systems are eligible for zero-downpayment loans via our banking partners (SBI, PNB, and HDFC). Subject to credit approval. 
            <Link className="underline font-bold ml-2" href="/subsidy">Learn more about PM-Surya Ghar Scheme.</Link>
          </p>
        </div>
      </section>
      
      {/* Visual Context Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="h-[400px] rounded-xl overflow-hidden group border border-outline/20">
          <img 
            alt="Solar Panels" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASKNq8rDyZRjlCv36j43AISScKSq5PyTesyHK9akgg0jtyCLBBvDGXAFqR1C3Yt0XFL5dPo6cmrVJVBMJHbtTLB_L2qVqlqe_nZbvpxSGlYNSTM_mcGrZxP2DKrBnPhpqKtp_783Nci0xQjdMnofhICKb38NZgFpt_7tAaAR1b3nl1ol10IvosaPzHD9dSqqvLDsTrDrQ4wi-RtgzJydPqOmNBBWuISMijvXA3Va1ScARuslHp_op0vHjxiP0SxX-ReNUPLlbuCcc"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6">
          <h2 className="font-headline text-4xl font-extrabold text-primary tracking-tight">Yamunanagar's Trusted Solar Partners.</h2>
          <p className="text-on-surface-variant text-lg">
            With over 500+ installations in the Haryana region, Maa Sharda Distributors provides end-to-end solar solutions, from subsidy paperwork to lifetime maintenance.
          </p>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">verified_user</span>
              <span className="font-bold text-primary">Tier-1 Components</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">support_agent</span>
              <span className="font-bold text-primary">24/7 Local Support</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
