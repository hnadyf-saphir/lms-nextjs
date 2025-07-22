
import { Metadata } from "next";
import About from "./components/About";
import Hero from "./components/Hero";


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

export default async function Home() {

  return (
    <div>
      <Hero />
      <About />
    </div>
  );
}
