export async function fetchOrder( ) {
    const baseUrl = "http://localhost:1337/api/home-page";
    const url = new URL(baseUrl);

    url.searchParams.set("populate[blocks][on][blocks.hero][populate]", "*");
    url.searchParams.set("populate[blocks][on][blocks.about][populate]", "*");
    url.searchParams.set("populate[blocks][on][blocks.test][populate]", "*");

    const res = await fetch(url.href, {cache: "no-store"});
    const json= await res.json();
     return  json.data.blocks;
    
}