"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [searchParam, setSearchParam] = useState("");
  const router = useRouter();

  return (
    <div className=" mx-auto flex max-w-6xl items-center lg:px-8">
      <input
        type="text"
        className="h-[68px] w-full rounded-l px-4 text-xl font-light text-gray-800 placeholder:text-xl placeholder:font-light"
        placeholder="Search all the GIFs and Stickers"
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
      />
      <div
        onClick={() => {
          searchParam != "" && router.push(`/search/${searchParam}`);
        }}
        className="flex h-[68px] w-[68px] cursor-pointer items-center justify-center rounded-r bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <MagnifyingGlassIcon className="h-9 w-9" />
      </div>
    </div>
  );
}
