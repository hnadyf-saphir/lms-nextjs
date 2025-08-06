import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Footer, Header} from "./components"

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




async function fetchHeader() {
  const path = "/api/global-hf";
  const BASE_URL = "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  url.searchParams.set(
    "populate[header][populate][menuSuperieur][populate][submenu]", "*"
  );


  url.searchParams.set(
    "populate[header][populate][menuPrincipal][populate][menu][populate][menuItem][populate][submenu]", "*"
  );

  url.searchParams.set(
    "populate[header][populate][menuPrincipal][populate][logo][populate]", "*"
  );

  url.searchParams.set(
    "populate[header][populate][menuPrincipal][populate][cta][populate]", "*"
  );

  const response = await fetch(url.href);
  const data = await response.json();

  const header = data.data.header;
  return header;

}

async function fetchFooter() {
  const path = "/api/global-hf";
  const BASE_URL = "http://localhost:1337";
  const url = new URL(path, BASE_URL);

  url.searchParams.set(
    "populate[Footer][populate][menuFooter][populate][submenu]", "*"
  );

  url.searchParams.set(
    "populate[Footer][populate]", "LogoFooter"
  );

  const result = await fetch(url.href);
  const data = await result.json();

  const footer = data.data.Footer;
  console.log(footer);
  return footer;
  
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  //console.log(navbarData.menuItem)

  const headerData = await fetchHeader();
  const footerData = await fetchFooter();
  console.log(footerData);
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header 
          menuSuperieur= {headerData.menuSuperieur}
          logo={headerData.menuPrincipal.logo}
          menu={headerData.menuPrincipal.menu}
          cta={headerData.menuPrincipal.cta}
        />

        <main>
          {children}
        </main>

        <Footer
          menuFooter ={footerData.menuFooter}
          logoFooter = {footerData.LogoFooter}
        />

      </body>
    </html>
  );
}
