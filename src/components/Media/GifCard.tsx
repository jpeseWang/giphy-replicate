import React from "react";
import Image from "next/image";
import Link from "next/link";
import { convertStr2Slug } from "@/utils/app_utils";
interface GifProps {
  title: string;
  imgSrc: string;
  id: string;
}
export const GifCard: React.FC<GifProps> = ({ title, imgSrc, id }) => {
  return (
    <Link href={`/gifs/${convertStr2Slug(title)}-${id}`}>
      <div className="group relative my-2 h-auto max-w-full">
        <Image
          src={imgSrc}
          alt="Gif Card"
          width={255}
          height={255}
          className=" cursor-pointer rounded hover:opacity-30"
        />
        <div className="absolute bottom-1 z-50 hidden px-4 font-medium text-white group-hover:inline-block ">
          <p>{title}</p>
        </div>
      </div>
    </Link>
  );
};
