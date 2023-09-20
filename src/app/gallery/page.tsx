import { getWikiArtData } from "@/shared";
import SortableImageGrid from "./sortable-image-grid";
import Link from "next/link";
import { Session, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default withPageAuthRequired(async function Gallery() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  const data = await getWikiArtData();

  return (
    <>
      <main className="w-full">
        <div className="w-full h-32 text-center flex items-center justify-center text-2xl">
          <h1 className="uppercase font-medium">
            <span className=" text-amber-900">Louvre Museum</span>{" "}
            <span>at home</span>
          </h1>
        </div>
      </main>
      <div className="container mb-12 mx-auto">
        <SortableImageGrid data={data} />
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
});
