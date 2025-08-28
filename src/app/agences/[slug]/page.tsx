// /app/agences/[slug]/page.tsx 

import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const res = await fetch("http://localhost:1337/api/agences");
  const data = await res.json();
  console.log(data)
  const agences = data.data || []; 

  return agences
    .filter((agence: any) => agence.attributes?.slug)  
    .map((agence: any) => ({
      slug: agence.attributes.slug,
    }));

}


async function getAgenceData(slug: string) {
  const res = await fetch(`http://localhost:1337/api/agences?filters[slug][$eq]=${slug}&populate=*`);
  const data = await res.json();
  return data; 
}

export default async function AgencePage({ params }: { params: { slug: string } }) {
  const agenceData = await getAgenceData(params.slug);
  const agence = agenceData.data[0];

  if (!agence) return notFound();

  const { nom, adresse, email, phone } = agence;

  return (
    <section className="p-10">
      <h1 className="text-4xl font-bold mb-4">{nom}</h1>
      <p className="mb-4 text-red-500">{adresse}</p>
      <p>{email}</p>
      <p>{phone}</p>
    </section>
  );
}