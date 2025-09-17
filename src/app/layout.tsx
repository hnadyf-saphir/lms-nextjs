import type { Metadata } from "next";
import { Playfair_Display, Barlow, Roboto } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "./components"

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
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


  const headerData = await fetchHeader();
  const footerData = await fetchFooter();

  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${barlow.variable} ${roboto.variable}`}
      >

        <div>
          <Header
            menuSuperieur={headerData.menuSuperieur}
            logo={headerData.menuPrincipal.logo}
            menu={headerData.menuPrincipal.menu}
            cta={headerData.menuPrincipal.cta}
          />
        </div>

        <main>
          {children}
        </main>

        <Footer
          menuFooter={footerData.menuFooter}
          logoFooter={footerData.LogoFooter}
        />

      </body>
    </html>
  );
}
