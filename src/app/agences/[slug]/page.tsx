// /app/agences/[slug]/page.tsx 

import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/agences");
  const data = await res.json();

  const agences = data.data || []; // sécuriser

  return agences.map((agence: any) => ({
    slug: agence.slug,
  }));
}


async function getAgenceData(slug: string) {
  const res = await fetch(`http://localhost:1337/api/agences?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  return data.data[0]; // on prend la première agence correspondante
}

export default async function AgencePage({ params }: { params: { slug: string } }) {
  const agence = await getAgenceData(params.slug);
  if (!agence) return notFound();
  //console.log(agence);
  const { nom, adresse, email, phone } = agence;

  return (
    <section className="p-10">
      <h1 className="text-4xl font-bold mb-4">{nom}</h1>
      <p className="mb-4">{adresse}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </section>
  );
}