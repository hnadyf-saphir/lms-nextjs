import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:1337/api/gammes?populate=*");
    const data = await res.json();
    return data.data.map((g: any) => ({
        gamme: g.attributes.slug,
    }));
}

export default async function GammePage({ params }: { params: { gamme: string } }) {
    const res = await fetch(`http://localhost:1337/api/gammes?filters[slug][$eq]=${params.gamme}&populate=menus`);
    const json = await res.json();

    const gamme = json.data[0];

    if (!gamme) return notFound();

    return (
        <div className="px-8 py-10">
            <h1 className="text-3xl font-bold">{gamme.nom}</h1>
            <p className="mb-6">{gamme.description}</p>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {gamme.attributes.menus.data.map((menu: any) => (
                    <li key={menu.id}>
                        <a
                            href={`/nos-menus/${params.gamme}/${menu.attributes.nom.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block border p-4 hover:bg-gray-100"
                        >
                            {menu.nom}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
