import { HOME_TESTIMONIAL_ITEMS } from "@/lib/home-community";
import type { SiteLanguage } from "@/lib/site-language";

interface TestimonialsMarqueeProps {
  language?: SiteLanguage;
}

export default function TestimonialsMarquee({
  language = "hi",
}: TestimonialsMarqueeProps) {
  const items = HOME_TESTIMONIAL_ITEMS[language];
  const loopItems = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-border bg-[#F2EFE3] py-8">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-600">
              Voices
            </p>
            <h2 className="text-2xl font-medium text-green-900 md:text-3xl">
              {language === "hi"
                ? "ग्राहक अक्सर हमसे यही उम्मीद रखते हैं"
                : "What people usually expect from us"}
            </h2>
          </div>
          <p className="max-w-sm text-right text-xs text-neutral-500">
            {language === "hi"
              ? "ये cards उन आम ज़रूरतों को दिखाते हैं जो हम रोज़ सुनते हैं।"
              : "These cards reflect the common needs we hear in everyday conversations."}
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#F2EFE3] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#F2EFE3] to-transparent" />

          <div className="flex w-max animate-[community-marquee_36s_linear_infinite] gap-4 hover:[animation-play-state:paused]">
            {loopItems.map((item, index) => (
              <article
                key={`${item.label}-${index}`}
                className="w-[18rem] rounded-[24px] border border-border bg-white px-5 py-5 shadow-sm md:w-[22rem]"
              >
                <p className="text-base leading-7 text-green-950">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-4 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                  {item.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
