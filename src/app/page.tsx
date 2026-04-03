import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-16 md:py-24 grid md:grid-cols-12 items-center gap-12">
        <div className="md:col-span-7">
          <div className="inline-block px-4 py-1.5 bg-primary-container text-on-primary-container text-xs font-bold tracking-widest rounded-full mb-6">
            YAMUNANAGAR'S #1 SOLAR DISTRIBUTOR
          </div>
          <h1 className="text-5xl md:text-[56px] leading-[1.1] font-extrabold text-primary mb-6 tracking-tight">
            Cut Your Electricity Bill by Up to 80% with Solar
          </h1>
          <p className="text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            Harness the power of the sun with Maa Sharda's premium distribution of top-tier solar technology. Reliable, efficient, and government-subsidized energy for your home or business.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/calculator" className="flex items-center justify-center h-12 px-8 bg-secondary text-white font-bold rounded-lg shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
              Calculate Savings
            </Link>
            <Link href="/services" className="flex items-center justify-center h-12 px-8 border border-outline/20 font-bold rounded-lg hover:bg-surface-container-low transition-all">
              View Our Brands
            </Link>
          </div>
        </div>
        <div className="md:col-span-5 relative">
          <div className="aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl relative">
            <img
              className="w-full h-full object-cover"
              alt="Modern residential house with sleek solar panels"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0bp3Ubk7s4o9QluSIIClqllaqKVJzq6pj2vNifd7w_1Mbig47XglEufYQoGrYgMvDKtqspNUo1GIAcLztccOOrclQqIcs_HlVT9HzZWzLfhm9Qc9zk9mIkRufv_hZTC091PhmbJ6aDDdmx1UCdNktH-qtx1ZhUgk0go9RT7jjy5701zSIvoPTGnHV5279WTNVLkE93QmwJYLHbUdpLgrUBHt3-MGfYTgLVR-fNnjN0bE5r9XREV_qhEijVqZEWldD0oqQgf-JicM"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-surface-container-high hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center text-white">
                <span className="material-symbols-outlined">energy_savings_leaf</span>
              </div>
              <div>
                <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Estimated Savings</p>
                <p className="text-xl font-bold text-primary">₹18,500 / Month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <h4 className="font-bold text-primary">SunEnergy Authorised</h4>
              <p className="text-sm text-on-surface-variant">Primary Partner in North India</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">account_balance</span>
            </div>
            <div>
              <h4 className="font-bold text-primary">PM Surya Ghar</h4>
              <p className="text-sm text-on-surface-variant">Registered for Direct Subsidies</p>
            </div>
          </div>
          <div className="flex items-center gap-4 group">
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center group-hover:bg-primary-container group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
            <div>
              <h4 className="font-bold text-primary">Loan Assistance</h4>
              <p className="text-sm text-on-surface-variant">Low EMI Options Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Systems Grid */}
      <section className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div>
              <p className="text-secondary font-bold tracking-widest uppercase text-sm mb-2">Package Options</p>
              <h2 className="text-4xl font-bold text-primary">Best Selling Solar Systems</h2>
            </div>
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-all" href="/services">
              View All Plans
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-surface-container-high hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl group-hover:text-white">solar_power</span>
                </div>
                <span className="bg-secondary/10 text-secondary text-xs font-black px-3 py-1 rounded-full">STARTER</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">1kW On-Grid</h3>
              <p className="text-on-surface-variant text-sm mb-6">Ideal for small families and shops.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-primary">bolt</span> 4-5 Units per day</li>
                <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-primary">aspect_ratio</span> 100 Sq. Ft Area</li>
                <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-primary">timer</span> 3-5 Year Payback</li>
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">Get Quote</button>
            </div>
            <div className="bg-primary-container rounded-3xl p-8 shadow-2xl relative overflow-hidden transform md:-translate-y-4">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-secondary">home</span>
                  </div>
                  <span className="bg-secondary text-white text-xs font-black px-3 py-1 rounded-full">MOST POPULAR</span>
                </div>
                <h3 className="text-2xl font-extrabold mb-2 text-white">3kW On-Grid</h3>
                <p className="text-on-primary-container text-sm mb-6">Perfect for medium-sized independent houses.</p>
                <ul className="space-y-4 mb-8 text-white">
                  <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-secondary">bolt</span> 12-15 Units per day</li>
                  <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-secondary">aspect_ratio</span> 300 Sq. Ft Area</li>
                  <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-secondary">shield</span> 25-Year Panel Warranty</li>
                </ul>
                <button className="w-full py-4 rounded-xl bg-secondary text-white font-black hover:scale-105 transition-all">Select Best Value</button>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-surface-container-high hover:shadow-2xl transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-surface-container-low rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl group-hover:text-white">factory</span>
                </div>
                <span className="bg-secondary/10 text-secondary text-xs font-black px-3 py-1 rounded-full">PREMIUM</span>
              </div>
              <h3 className="text-2xl font-extrabold mb-2">5kW On-Grid</h3>
              <p className="text-on-surface-variant text-sm mb-6">Designed for AC load &amp; commercial use.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-primary">bolt</span> 20-25 Units per day</li>
                <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-primary">aspect_ratio</span> 500 Sq. Ft Area</li>
                <li className="flex items-center gap-3 text-sm"><span className="material-symbols-outlined text-sm text-primary">monitoring</span> Smart Remote Monitoring</li>
              </ul>
              <button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all">Get Quote</button>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidy Hook */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">How Government Subsidy Works</h2>
          <p className="text-on-surface-variant">Get direct benefits under the PM Surya Ghar: Muft Bijli Yojana</p>
        </div>
        <div className="relative grid md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-outline-variant/30"></div>
          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center mb-6 z-10 group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">assignment</span>
            </div>
            <h4 className="font-bold text-primary mb-2">1. Site Survey</h4>
            <p className="text-sm text-on-surface-variant px-4">Our experts visit your site to assess roof health & capacity.</p>
          </div>
          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center mb-6 z-10 group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">edit_document</span>
            </div>
            <h4 className="font-bold text-primary mb-2">2. Portal Registration</h4>
            <p className="text-sm text-on-surface-variant px-4">We handle your application on the National Solar Portal.</p>
          </div>
          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center mb-6 z-10 group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">construction</span>
            </div>
            <h4 className="font-bold text-primary mb-2">3. Installation</h4>
            <p className="text-sm text-on-surface-variant px-4">Quality installation by our certified technicians in 48 hours.</p>
          </div>
          <div className="relative flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full bg-white border-2 border-primary text-primary flex items-center justify-center mb-6 z-10 group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-3xl">currency_rupee</span>
            </div>
            <h4 className="font-bold text-primary mb-2">4. Subsidy Credit</h4>
            <p className="text-sm text-on-surface-variant px-4">Subsidy amount is credited directly to your bank account.</p>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="bg-primary-container text-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-4xl font-extrabold text-secondary mb-2">15+</div>
              <p className="text-sm uppercase tracking-widest font-bold opacity-70">Years Experience</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-secondary mb-2">2500+</div>
              <p className="text-sm uppercase tracking-widest font-bold opacity-70">Installations</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-secondary mb-2">100%</div>
              <p className="text-sm uppercase tracking-widest font-bold opacity-70">Client Satisfaction</p>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-secondary mb-2">24/7</div>
              <p className="text-sm uppercase tracking-widest font-bold opacity-70">Technical Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-center text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant/50 mb-10">Trusted Brand Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl font-bold tracking-tighter">SunEnergy</span>
            <span className="text-2xl font-bold tracking-tighter">Luminous</span>
            <span className="text-2xl font-bold tracking-tighter">Adani</span>
            <span className="text-2xl font-bold tracking-tighter">UTL</span>
            <span className="text-2xl font-bold tracking-tighter">Sukam</span>
            <span className="text-2xl font-bold tracking-tighter">Microtek</span>
            <span className="text-2xl font-bold tracking-tighter">LivSuper</span>
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="max-w-4xl mx-auto px-8 py-24">
        <div className="bg-white rounded-[40px] p-12 shadow-2xl border border-surface-container-high text-center">
          <h2 className="text-4xl font-bold text-primary mb-4">Request a Free Site Visit</h2>
          <p className="text-on-surface-variant mb-10">Our experts will evaluate your solar potential and provide a customized quote.</p>
          <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <input className="w-full h-14 bg-surface-container-low border-transparent rounded-xl px-6 focus:ring-secondary focus:bg-white transition-all outline-none" placeholder="Your Full Name" type="text"/>
            </div>
            <div className="flex-1">
              <input className="w-full h-14 bg-surface-container-low border-transparent rounded-xl px-6 focus:ring-secondary focus:bg-white transition-all outline-none" placeholder="Phone Number" type="tel"/>
            </div>
            <button type="button" className="h-14 px-10 bg-primary text-white font-black rounded-xl hover:bg-secondary transition-all">Book Now</button>
          </form>
          <p className="mt-6 text-xs text-on-surface-variant">No commitments required. Available across Yamunanagar district.</p>
        </div>
      </section>
    </main>
  );
}
