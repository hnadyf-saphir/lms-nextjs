import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Les menus services",
  description: "create new website",
};


async function fetchNavBar() {
  const path = "/api/home-page";
  const BASE_URL = "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  url.searchParams.set(
    "populate[blocks][on][blocks.navbar][populate][logo][populate]",
    "*"
  );
  url.searchParams.set(
    "populate[blocks][on][blocks.navbar][populate][menuItem][populate]",
    "*"
  );
  url.searchParams.set(
    "populate[blocks][on][blocks.navbar][populate][CTA][populate]",
    "*"
  );

  //envoi une requete GET à strapi
  const response = await fetch(url.href);
  //la reponse htpp transformé en objet json
  const data = await response.json();

  //tableau composants dynamiques
  const navBarBlock = data.data.blocks.find(
    (block) => block.__component === "blocks.navbar"
  );
  return navBarBlock;

}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const navbarData = await fetchNavBar();
  //console.log(navbarData.logo.url)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar
          logo={navbarData.logo}
          menuItem={navbarData.menuItem}
          CTA={navbarData.CTA}
        />
        
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
