"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function SearchBar({ label }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearchInputChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`?tags=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="relative w-[min(24rem,100%)]"
    >
      <Input
        type="search"
        id="search"
        value={searchTerm}
        placeholder={label}
        onChange={handleSearchInputChanges}
        className="transparent"
      />
      <Button size={"icon"} variant={"primary"} className="absolute top-0 right-1">
        <Search className="w-4 h-4" />
      </Button>
    </form>
  );
}
