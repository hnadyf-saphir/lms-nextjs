import React from "react";
import { Features } from "./Features";

async function fetchHero() {
  const path = "/api/home-page";
  const BASE_URL = "http://localhost:1337/";
  const url = new URL(path, BASE_URL);

  // Ajout des relations imbriquées nécessaires (hero_image + features.icon)
  url.searchParams.set(
    "populate[blocks][on][blocks.hero][populate][features][populate]",
    "icon"
  );
  url.searchParams.set(
    "populate[blocks][on][blocks.hero][populate]",
    "hero_image"
  );

  const response = await fetch(url.href, { cache: "no-store" }); // no-store pour éviter le cache côté Next.js
  const data = await response.json();

  const heroSection = data.data.blocks.find(
    (block: any) => block.__component === "blocks.hero"
  );

  return heroSection;
}

export default async function Hero() {
  const data = await fetchHero();

  // ✅ Préparation des features pour éviter les erreurs si icon est null
  const features = data.features.map((feature: any) => ({
    id: feature.id,
    title: feature.titre,
    description: feature.descr,
    icon: feature.icon
      ? `http://localhost:1337${feature.icon.url}`
      : "/fallback-icon.svg", // Icône par défaut si absente
  }));

  return (
    <section className="relative">
      <div className="container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between">
        {/* Texte à gauche */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-primaryGreen mb-4">
            {data.primary_Title}
          </h1>
          <p className="text-xl text-gray-700 mb-8">{data.secondary_Title}</p>

          {/* ✅ Passage des features dynamiques au composant */}
          <Features features={features} />
        </div>

        {/* Image à droite */}
        <div className="relative mt-10 lg:mt-0">
          <img
            src={`http://localhost:1337${data.hero_image.url}`}
            alt={data.hero_image.alternativeText || "Hero Image"}
            width={600}
            height={600}
            
          />
        </div>
      </div>
    </section>
  );
}
