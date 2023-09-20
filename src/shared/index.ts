export interface WikiArt {
  title: string;
  contentId: number;
  artistContentId: number;
  artistName: string;
  completitionYear: number | null;
  yearAsString: null | string;
  width: number;
  image: string;
  height: number;
}

export const WIKI_ART_URL =
  "https://www.wikiart.org/en/App/Painting/MostViewedPaintings?randomSeed=123&json=2&inPublicDomain=true!Blog";
export async function getWikiArtData(): Promise<WikiArt[]> {
  const res = await fetch(WIKI_ART_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch Wiki Art data");
  }
  const data = (await res.json()) as WikiArt[];
  const reducedData = data
    .slice(0, 22)
    .filter((e) => e.title !== "The School of Athens")
    .filter((e) => e.title !== "Flowers");

  return reducedData;
}
