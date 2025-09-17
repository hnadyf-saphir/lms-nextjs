// src/components/About.tsx
import React from "react";
import type { BlockProps } from "./blocks/registry";

const FALLBACK_FEATURES = [
  { icon: "/icons/menus.svg",     title: "Menus élaborés par une diététicienne" },
  { icon: "/icons/livraison.svg", title: "Livraison rapide chez vous" },
  { icon: "/icons/commande.svg",  title: "Commande simple en ligne" },
  { icon: "/icons/aides.svg",     title: "Aides fiscales possibles" },
];

const API = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export default function About({ data }: BlockProps<any>) {
  if (!data) return null;

 
 

  // Features (optionnel depuis Strapi) sinon fallback local
  const features =
    (data.features ?? []).length > 0
      ? data.features.map((f: any) => {
          const file = f?.icon?.data?.attributes;
          const raw = file?.url as string | undefined;
          const iconUrl = raw ? (raw.startsWith("http") ? raw : `${API}${raw}`) : "/fallback-icon.svg";
          return { icon: iconUrl, title: f?.title ?? f?.titre ?? "" };
        })
      : FALLBACK_FEATURES;

  return (
    <section className="bg-[#F0F9D2] py-16 w-full">
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
            <p className="text-gray-700 mb-4 leading-relaxed">{data.descr}</p>
          </div>

          {/* Image */}
         
            <div className="w-full lg:w-1/2">
              <img
                src={`http://localhost:1337${data.image.url}`}
                alt= "Qui sommes nous"
                className="w-full h-full object-cover rounded-tr-3xl rounded-br-3xl"
              />
            </div>
          
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {features.map((item: any, i: number) => (
            <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm">
              <img src={item.icon} alt={item.title} className="w-20 h-20 mb-3" />
              <p className="text-lg font-medium text-gray-700">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
