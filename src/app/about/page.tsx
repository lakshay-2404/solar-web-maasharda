import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary">
          <img 
            className="w-full h-full object-cover mix-blend-overlay" 
            alt="Modern residential solar panel installation" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaBt9pFPRtrND97sFzbMlwi5yACRdawQKVkHXdSr5e8xGqje-bzg2zLPQ-cIwBQ_v83WlP11GKtaD4WZSD2W_0IgpLYzLlJ8KjUamE8Wk0qX7tVTFUDsGL0VoprR0XOX-HhfhPbcr-qHZU0h02fCmM7vp1nyvHzIGl97YTvxXyjB9tcG-zSBkFcMC31c7Ex7__EvvFNoe8eu_tFgoWTe-qUL7RqDF7EEQ74QOb0zZomty1vdzLOwdpkU91OMxRJLcMr7JZucgnrow"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-container/70"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-headline font-extrabold text-[40px] leading-tight text-white tracking-tight mb-6 mt-16">
            Yamunanagar ka Bharosemand Solar Partner
          </h1>
          <p className="font-body text-lg text-white/90 max-w-2xl mx-auto">
            Powering Yamunanagar with sustainable, clean, and cost-effective solar energy solutions for over a decade.
          </p>
        </div>
      </section>

      {/* About Text - 2 Column Layout */}
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Our Journey</span>
            <h2 className="font-headline text-3xl font-bold text-primary-container mb-8">Ek Nayi Urja ki Shuruat</h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Maa Sharda Distributors mein humara vision simple hai - har ghar aur industry ko solar power se connect karna. Yamunanagar ki garmi aur electricity bills se pareshan customers ke liye hum laye hain reliable solutions.
              </p>
              <p>
                Hum sirf panels nahi bechte, hum trust deliver karte hain. We focus on end-to-end solar ecosystem including high-efficiency panels, smart inverters, and battery storage solutions that work specifically for our local climate.
              </p>
            </div>
          </div>
          <div className="bg-surface-container-low rounded-xl p-10">
            <h3 className="font-headline text-2xl font-bold text-primary-container mb-6">Why Solar?</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>savings</span>
                <div>
                  <h4 className="font-bold text-on-surface">Paisa Bachao</h4>
                  <p className="text-on-surface-variant text-sm">Save up to 90% on monthly electricity bills with government subsidies.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                <div>
                  <h4 className="font-bold text-on-surface">Paryavaran ki Raksha</h4>
                  <p className="text-on-surface-variant text-sm">Switching to solar reduces carbon footprint and helps combat climate change.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>electric_bolt</span>
                <div>
                  <h4 className="font-bold text-on-surface">Energy Freedom</h4>
                  <p className="text-on-surface-variant text-sm">No more power cuts. Enjoy continuous energy even during peak summers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Columns */}
      <section className="bg-primary-container pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
              <h5 className="text-white font-bold mb-2">Authorized Distributor</h5>
              <p className="text-primary-fixed-dim text-sm">Certified partner for top solar brands in India.</p>
            </div>
            <div className="text-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
              <h5 className="text-white font-bold mb-2">Expert Installation</h5>
              <p className="text-primary-fixed-dim text-sm">Professional handling by trained technicians.</p>
            </div>
            <div className="text-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              <h5 className="text-white font-bold mb-2">Subsidy Processing</h5>
              <p className="text-primary-fixed-dim text-sm">Hassle-free paperwork for govt solar subsidies.</p>
            </div>
            <div className="text-center p-6 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <span className="material-symbols-outlined text-secondary text-4xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>support_agent</span>
              <h5 className="text-white font-bold mb-2">Local Support</h5>
              <p className="text-primary-fixed-dim text-sm">Quick on-ground response in Yamunanagar area.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full h-[450px] relative">
        <div className="w-full h-full bg-surface-container">
          <img 
            className="w-full h-full object-cover opacity-50 grayscale" 
            alt="Map showing Yamunanagar region" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI063ZjIE4W6VLthjEmnUuVS7MAmgvQEo342txSdf6h7ksd8_6d_1StLFwzmXkU0uwL9jhSWDplfGjfDV4WBYAEnNOMuH8goCvuCcmScvBBFpuDqOV7apYpTl-4u5vwKxuE_c94JTNtQkMdkALvXbMyW6PVbujZJ8iKvawezGSzboHZrZ2rL5Vc8CJ_FNAl0C3NuyZCTBS6j60UlUozzrzdJ3vck3fiL7jHg0UGOKu9J0r_Zuc2LsLX0AXLZom4hPkJtP4WrLVYTI"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 shadow-2xl rounded-xl max-w-sm text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">location_on</span>
              <h4 className="font-bold text-primary mb-1">Maa Sharda Distributors</h4>
              <p className="text-on-surface-variant text-sm">Yamunanagar, Haryana - 135001</p>
              <a href="https://maps.google.com/?q=Yamunanagar" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-secondary font-bold text-sm hover:underline">Get Directions</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 border-t border-surface-container-high">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-headline text-4xl font-extrabold text-primary mb-6">Contact Us Today</h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Abhi bhi koi confusion hai? Humare experts aapki solar journey ko asaan banayenge. Hume WhatsApp karein ya office visit karein.
            </p>
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">chat</span>
                </div>
                <div>
                  <h6 className="font-bold text-on-surface">WhatsApp Support</h6>
                  <p className="text-on-surface-variant">+91 98765 43210</p>
                  <p className="text-xs text-secondary font-bold mt-1">Available 9 AM - 8 PM</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">home_pin</span>
                </div>
                <div>
                  <h6 className="font-bold text-on-surface">Office Address</h6>
                  <p className="text-on-surface-variant">Shop No. 12, Main Market Road, Yamunanagar, HR</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                </div>
                <div>
                  <h6 className="font-bold text-on-surface">Business Hours</h6>
                  <p className="text-on-surface-variant">Mon - Sat: 10:00 AM - 07:00 PM</p>
                  <p className="text-on-surface-variant">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-fixed rounded-full -z-10 opacity-50"></div>
            <img 
              className="rounded-2xl shadow-xl w-full aspect-square object-cover" 
              alt="Professional solar technician smiling" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDJzdolQwDwaFkv8GEZeZJVo57soN6fFpi9NYcDU3U2aVeNAo2sYmw0y-itYVcLiwZplrZ9BLzT_cfZLlpQLOLQR6uzgH8NRpVFpGutFPTdqmmiDpFpe3RZzcCR5NOeqVNAPZA_83TO8cklEL41s-iEb-d_68Fy1ceKcug_n7rv-hYD594KrV_BCP-ToiLMa1_qYwhQklsEiq5tS2lYf6tesmJVeXWoP8Yc57wMvY7I3ZJmj3rUeOvoUkIwqfYT7H7Migvi3gyo3A"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
