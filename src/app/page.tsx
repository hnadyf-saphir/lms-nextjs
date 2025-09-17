
import { Metadata } from "next";
import BlockManager from "./components/blocks/BlockManager";
import { fetchOrder } from "./lib/fetchOrder";
import "./globals.css";

// Fetch du SEO depuis Strapi
async function fetchSeoHome() {
  const res = await fetch("http://localhost:1337/api/home-page?populate=seo");
  const data = await res.json();
  const seo = data?.data?.seo;

  return {
    title: seo?.seoTitle || "Page d'accueil",
    description: seo?.seoDescription || " ",
  };
}

//Next.js Metadata (App Router)
export const metadata: Metadata = await fetchSeoHome();

//Page Home
export default async function HomePage() {
//fetchOrder universel → récupère les blocks
  const blocks = await fetchOrder<any[]>("home-page", { pick: "blocks" });

  return (
    <div >
      <BlockManager blocks={blocks} />
    </div>
  );
}
