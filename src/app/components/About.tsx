

import React from "react";

const featureItems = [
  {
    icon: "/icons/menu.svg",
    title: "Menus élaborés par une diététicienne",
  },
  {
    icon: "/icons/delivery.svg",
    title: "Livraison rapide chez vous",
  },
  {
    icon: "/icons/order.svg",
    title: "Commande simple en ligne",
  },
  {
    icon: "/icons/taxes.svg",
    title: "Aides fiscales possibles",
  },
];

async function fetchAbout() {
  const path = "/api/home-page";
  const BASE_URL = "http://localhost:1337/";
  const url = new URL(path, BASE_URL);

  // Ajout des relations imbriquées nécessaires (hero_image + features.icon)
  url.searchParams.set(
    "populate[blocks][on][blocks.about][populate]",
    "*"
  );
 

  const response = await fetch(url.href, { cache: "no-store" }); // no-store pour éviter le cache côté Next.js
  const data = await response.json();

  const aboutSection = data.data.blocks.find(
    (block: any) => block.__component === "blocks.about"
  );

  return aboutSection;
}

export default async function About() {
    const data = await fetchAbout();
  return (
    <section className="bg-[#F0F9D2] py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          {data.primary_title}
        </h2>

        <div className="flex flex-col lg:flex-row items-center bg-white rounded-3xl overflow-hidden shadow-md">
          {/* Texte */}
          <div className="w-full lg:w-1/2 p-8">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              {data.secondary_title}
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              {data.descr}
            </p>
            
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={`http://localhost:1337${data.image.url}`}
              alt="Qui sommes nous"
              className="w-full h-full object-cover rounded-tr-3xl rounded-br-3xl"
            />
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {featureItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm"
            >
              <img src={item.icon} alt={item.title} className="w-10 h-10 mb-3" />
              <p className="text-sm font-medium text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
