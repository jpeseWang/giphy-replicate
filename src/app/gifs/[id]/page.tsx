"use client";
import useSWR from "swr";
import Link from "next/link";
import Loader from "@/components/Loading/Loader";
import Image from "next/image";
import SearchBar from "@/components/Search/SearchBar";
import {
  FaFacebookSquare,
  FaTwitter,
  FaHeart,
  FaShareSquare,
  FaPaperPlane,
} from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { ImEmbed } from "react-icons/im";
import { fetcher } from "@/lib/fetch";
import { convertSlug2Id } from "@/utils/app_utils";
interface SearchResultPageProps {
  params: any;
}

export default function SearchResultPage({ params }: SearchResultPageProps) {
  const gifsConfig = {
    baseUrl: process.env.baseURL,
    apiKey: process.env.REACT_APP_GIPHY_API_KEY,
  };
  const id = convertSlug2Id(params.id);
  const { data, mutate, error, isLoading }: any = useSWR(
    `${gifsConfig.baseUrl}/${id}?api_key=${gifsConfig.apiKey}`,
    fetcher,
  );
  const gifsData = data?.data;

  return (
    <main className="">
      <SearchBar />
      <div className="mt-6 items-center lg:px-8">
        {!gifsData ? (
          <Loader />
        ) : (
          <>
            {data && (
              <div className="grid grid-cols-12">
                <div className="col-span-3">
                  {gifsData.user ? (
                    <>
                      <div className="flex">
                        <Image
                          src={gifsData.user.avatar_url}
                          alt=""
                          width={50}
                          height={50}
                          className="h-[50px] w-[50px] rounded-full"
                        />
                        <div className="ml-2">
                          <p>{gifsData.user.display_name}</p>
                          <p className="text-sm font-medium text-gray-400">
                            @{gifsData.user.username}
                          </p>
                        </div>
                      </div>
                      <div className="my-12 pr-16 text-xs text-gray-400">
                        {gifsData.user.description}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400">
                          Follow on:
                        </h4>
                        <div className="mt-4 flex gap-x-4">
                          <FaFacebookSquare className=" h-5 w-5" />
                          <RiInstagramFill className=" h-5 w-5" />
                          <FaTwitter className=" h-5 w-5" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mr-6 truncate text-sm">
                      <h4 className="mb-2 font-semibold text-[#A6A6A6]">
                        Source
                      </h4>
                      <Link
                        href={`${gifsData.source}`}
                        className="mb-4 inline-flex gap-x-2 truncate"
                      >
                        <FaShareSquare className="h-4 w-4" /> {gifsData.source}
                      </Link>
                    </div>
                  )}
                  {/* Author info */}
                </div>
                <div className="col-span-6 px-4">
                  <p className="mb-2 text-sm text-[#A6A6A6]">
                    {gifsData.title}
                  </p>
                  <Image
                    src={gifsData.images.downsized.url}
                    alt=""
                    width={500}
                    height={375}
                  />
                </div>
                <div className="col-span-3 mt-6 pl-4">
                  <div className="mb-4 font-semibold">
                    <FaHeart className="mr-4 inline h-6 w-6 cursor-pointer hover:scale-125" />{" "}
                    Favorite
                  </div>
                  <div className="mb-4 font-semibold">
                    <FaPaperPlane className="mr-4 inline h-6 w-6 cursor-pointer hover:scale-125" />{" "}
                    Share
                  </div>
                  <div className="mb-4 font-semibold">
                    <ImEmbed className="mr-4 inline h-6 w-6 cursor-pointer hover:scale-125" />{" "}
                    Embed
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
