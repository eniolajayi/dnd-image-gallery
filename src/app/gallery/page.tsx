import { getWikiArtData } from "@/shared";
import SortableImageGrid from "./sortable-image-grid";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect, useSearchParams } from "next/navigation";
import SearchBar from "@/components/search-bar";

type PageProps =  {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

async function Gallery({searchParams}: PageProps) {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  const data = await getWikiArtData();
  let filteredData = data;
  const tags = searchParams.tags;
  if(tags){
    filteredData = data.filter((item)=>{
      //@ts-ignore
      return item.title.toLowerCase().includes(tags.toLowerCase());
    });
  }
 
  return (
    <>
      <header>
        <nav className="w-full flex flex-wrap items-center justify-end gap-6 pe-12 py-5">
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
        <SortableImageGrid data={filteredData} />
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
