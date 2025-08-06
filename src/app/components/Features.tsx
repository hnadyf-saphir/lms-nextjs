import React from 'react'


export function Features({ features }: { features: any[] }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="
            relative group cursor-pointer rounded-xl border border-primaryGreen 
            hover:border-primaryGreen hover:shadow-md transition duration-300 p-6
            active:bg-gradient-to-r active:from-primaryGreen active:to-secondaryGreen
          "
        >
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Cercle derrière l'icône */}
              <div className="absolute -inset-1 rounded-full bg-secondaryGreen"></div>
              <img
                src={feature.icon}
                alt=""
                className="relative w-10 h-10 z-10"
              />
            </div>
            <h3
              className="
                text-lg font-semibold text-primaryGreen
                group-active:text-white
              "
            >
              {feature.title}
            </h3>
          </div>
          <p
            className="
              mt-3 text-gray-700 
              group-active:text-white
            "
          >
            {feature.description}
          </p>
        </div>
      ))}
    </section>
  )
}
