// src/components/Hero.tsx
import React from "react";
import { Features } from "./Features";
import { BlockProps } from "./blocks/registry";

export default function Hero({ data }: BlockProps) {
  if (!data) return null;

  const features =
    data.features?.map((feature: any) => ({
      id: feature.id,
      title: feature.titre,
      description: feature.descr,
      icon: feature.icon
        ? `http://localhost:1337${feature.icon.url}`
        : "/fallback-icon.svg",
    })) 

  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between">
       
        <div className="max-w-2xl">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-primaryGreen mb-4">
            {data.primary_Title}
          </h1>
          <p className="font-barlow text-2xl font-semibold text-gray-700 mb-8">{data.secondary_Title}</p>

          <Features features={features} />
        </div>

        {/* Image */}
        {data.hero_image && (
          <div className="relative mt-10 lg:mt-0">
            <img
              src={`http://localhost:1337${data.hero_image.url}`}
              alt={data.hero_image.alternativeText || "Hero Image"}
              width={600}
              height={600}
            />
          </div>
        )}
      </div>
    </section>
  );
}
