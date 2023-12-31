import { WikiArt, getWikiArtData } from "@/shared";
import SortableImageGrid from "./sortable-image-grid";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect, useSearchParams } from "next/navigation";
import SearchBar from "@/components/search-bar";
import { Suspense } from "react";

type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function Gallery({ searchParams }: PageProps) {
  const session = await getSession();
  const tags = searchParams.tags;

  if (!session) {
    redirect("/");
  }

  const data = await getWikiArtData();
  let filteredData: WikiArt[] = [];
  if (tags) {
    filteredData = data.filter((item) => {
      //@ts-ignore
      return item.title.toLowerCase().includes(tags.toLowerCase());
    });
  } else {
    filteredData = data;
  }

  return (
    <>
      <header>
        <nav className="w-full flex flex-wrap items-center justify-center gap-6 px-2 md:pe-12 py-5">
          <SearchBar label="Filter art piece by their tags (i.e title)" />
          <a
            className="underline text-semibold text-blue-600"
            href="/api/auth/logout"
          >
            Logout
          </a>
        </nav>
      </header>
      <main className="w-full">
        <div className="w-full h-32 mb-8 text-center flex flex-col items-center justify-center text-2xl">
          <h1 className="uppercase font-medium">
            <span className=" text-amber-900">Louvre Museum</span>{" "}
            <span>at home</span>
          </h1>
          <p className=" text-base w-[min(35ch,100%-2rem)]">
            You can drag and re-arrange each art piece give it a try!
          </p>
        </div>
      </main>
      <div className="container mb-12 mx-auto">
        {filteredData.length === 0 ? (
          <div className="h-64 text-center p-5">
            <span>No Results Found</span>
            <div className="text-center mb-4">
              <Link
                className="underline text-semibold text-blue-600"
                href={"/gallery"}
              >
                Clear results
              </Link>
            </div>
          </div>
        ) : (
          <Suspense fallback={<>Loading Images</>}>
            <SortableImageGrid
              data={filteredData.length === 0 ? data : filteredData}
            />
          </Suspense>
        )}
      </div>
      <footer className="h-64 text-center p-5">
        <span>
          Artworks are courtesy of{" "}
          <Link
            className=" text-blue-500 underline"
            href={"https://www.wikiart.org/"}
          >
            WikiArt
          </Link>
        </span>
      </footer>
    </>
  );
}

//@ts-ignore
export default withPageAuthRequired(Gallery, {
  returnTo: "/",
});
