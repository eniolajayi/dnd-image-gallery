import Image from "next/image";
import SignInForm from "./login";

export default function Home() {
  return (
    <main className="w-full h-screen flex items-center gap-5 flex-col justify-center">
      <div className="">
        <h1 className="text-3xl">Sign In to Gallery</h1>
      </div>
      <div >
        <SignInForm />
      </div>
    </main>
  );
}
