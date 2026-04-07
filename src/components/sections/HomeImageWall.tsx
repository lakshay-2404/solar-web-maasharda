import Image from "next/image";

import { HOME_IMAGE_WALL_ITEMS } from "@/lib/home-community";
import type { SiteLanguage } from "@/lib/site-language";

interface HomeImageWallProps {
  language?: SiteLanguage;
}

export default function HomeImageWall({
  language = "hi",
}: HomeImageWallProps) {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-amber-500">
            Solar Gallery
          </p>
          <h2 className="section-headline mt-3 text-green-900">
            {language === "hi"
              ? "काम, प्रोडक्ट और साइट क्वालिटी एक नज़र में"
              : "Work, products, and site quality at a glance"}
          </h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {HOME_IMAGE_WALL_ITEMS.map((item, index) => (
            <article
              key={item.src}
              className={`overflow-hidden rounded-[28px] border border-border bg-cream shadow-[0_16px_40px_rgba(15,36,25,0.08)] ${
                index === 0 ? "md:col-span-2" : ""
              }`}
            >
              <div className={`relative ${index === 0 ? "aspect-[16/9]" : "aspect-[4/5]"}`}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes={
                    index === 0
                      ? "(min-width: 768px) 60vw, 100vw"
                      : "(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                  }
                />
              </div>
              <div className="px-5 py-4">
                <p className="text-sm font-medium text-green-900">
                  {item.title[language]}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
