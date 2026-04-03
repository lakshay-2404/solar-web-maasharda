import { BRANDS } from "@/lib/constants";

export default function BrandsStrip() {
  return (
    <section className="border-y border-border bg-white py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-[0.18em] text-neutral-500">
          भरोसेमंद ब्रांड पार्टनर्स
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {BRANDS.map((brand) => (
            <div
              key={brand}
              className="rounded-full border border-border bg-cream px-4 py-2 text-sm font-medium text-green-900"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
