import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Home() {
  const session = await getSession();
  return (
    <main className="w-full h-screen flex items-center gap-5 flex-col justify-center">
      <div>
        <h1 className="text-4xl font-medium">Welcome to Budget Museum</h1>
      </div>

      <div className="">
        <h2 className="text-xl text-slate-600 capitalize">
          Sign In to View Gallery
        </h2>
      </div>
      <div>
        {session ? (
          <Button>
            <Link href={"/gallery"}>View Gallery</Link>
          </Button>
        ) : (
          <a
            className="underline text-semibold text-blue-600"
            href="/api/auth/login"
          >
            Login
          </a>
        )}
      </div>
    </main>
  );
}
