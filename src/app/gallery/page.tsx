import { getWikiArtData } from "@/shared";
import SortableImageGrid from "./sortable-image-grid";
import Link from "next/link";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

async function Gallery() {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }

  const data = await getWikiArtData();

  return (
    <>
      <header>
        <nav className="w-full flex flex-wrap justify-end pe-12 py-5">
          <div>
            <a
              className="underline text-semibold text-blue-600"
              href="/api/auth/logout"
            >
              Logout
            </a>
          </div>
        </nav>
      </header>
      <main className="w-full">
        <div className="w-full h-32 text-center flex flex-col items-center justify-center text-2xl">
          <h1 className="uppercase font-medium">
            <span className=" text-amber-900">Louvre Museum</span>{" "}
            <span>at home</span>
          </h1>
          <p className=" text-base">
            You can drag and re-arrange each art piece give it a try!
          </p>
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
}

export default withPageAuthRequired(Gallery, {
  returnTo: "/",
});
