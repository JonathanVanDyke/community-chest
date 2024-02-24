"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Search = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.length > 0)
        console.log("You searched for:", search, "Congratulations!");
      else console.log("You cleared the search bar!");
    }, 300);
    return () => clearTimeout(timeoutId);
  }, [search]);

  return (
    <div className="flex justify-center">
      <div className="relative mt-2 w-full rounded-md shadow-sm md:w-3/4">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Image
            className="p-3px"
            src="/icons/search.png"
            alt="Search"
            width="16"
            height="16"
          />
        </div>
        <input
          type="text"
          name="search"
          id="input-search"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          placeholder="Find an item to borrow"
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default Search;
