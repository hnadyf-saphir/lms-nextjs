
import { Metadata } from "next";
import About from "./components/About";
import Hero from "./components/Hero";
import { fetchOrder } from "./lib/fetchOrder";
import BlockErreur from "./components/BlockErreur";


export async function fetchSeoHome() {
  const res = await fetch("http://localhost:1337/api/home-page?populate=seo", {
    cache: "no-store",
  });
  const data = await res.json();
  const seo = data?.data?.seo;

  return {
    title: seo?.metaTitle || "Page d'accueil",
    description: seo?.metaDescription || "",
  };
}

const metaSeo = await fetchSeoHome();

export const metadata: Metadata = {
  title: metaSeo.title,
  description: metaSeo.description,
};

function renderBlock(block: any) {
  switch (block.__component) {
    case "blocks.hero":
      return <Hero key={block.id} />;
    case "blocks.about":
      return <About key={block.id} /> ;
    default:
      return <BlockErreur key="test" />;
  }
}
export default async function Home() {
  const blocks = await fetchOrder();
  return (
    <div>
      {/*
      <Hero />
      <About />
      */}
      {blocks.map(renderBlock)}

    </div>
  );
}
