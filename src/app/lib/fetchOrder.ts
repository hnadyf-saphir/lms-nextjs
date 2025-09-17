// src/lib/fetchOrder.ts
export async function fetchOrder(page: string) {
  const baseUrl = `http://localhost:1337/api/${page}`;
  const url = new URL(baseUrl);


  // populate les blocs dynamiques (tu peux centraliser ici tous les types connus)
  url.searchParams.set(
  "populate[blocks][on][blocks.hero][populate][hero_image]",
  "true"
);
url.searchParams.set(
  "populate[blocks][on][blocks.hero][populate][features][populate][icon]",
  "true"
);

  url.searchParams.set("populate[blocks][on][blocks.about][populate]", "*");
  url.searchParams.set("populate[blocks][on][blocks.test][populate]", "*");
  


  const res = await fetch(url.href, { cache: "no-store" });
  const json = await res.json();

  return json?.data?.blocks ?? [];
}
