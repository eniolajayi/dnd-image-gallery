"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-72 text-center flex items-center justify-center text-2xl">
      <h2 className="mb-10">Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
