"use client";
import useSWR from "swr";
import SearchBar from "@/components/Search/SearchBar";
import Loader from "@/components/Loading/Loader";
import { GifCard } from "@/components/Media/GifCard";
import { fetcher } from "@/lib/fetch";
import { convertSlug2Id } from "@/utils/app_utils";

interface SearchResultPageProps {
  params: any;
}

export default function SearchResultPage({ params }: SearchResultPageProps) {
  const gifConfig = {
    baseUrl: process.env.baseURL,
    apiKey: process.env.REACT_APP_GIPHY_API_KEY,
  };
  const id = convertSlug2Id(params.id);
  const { data, mutate, error, isLoading }: any = useSWR(
    `${gifConfig.baseUrl}/search?api_key=${gifConfig.apiKey}&q=${id}`,
    fetcher,
  );

  return (
    <main>
      <SearchBar />
      <div className="mt-6 items-center lg:px-8">
        <div className="my-4 flex">
          <div className="flex">
            <p className="text-3xl font-semibold text-white">
              {params.id}{" "}
              <span className="text-base text-gray-400">
                {data?.data.length} GIFs
              </span>
            </p>
          </div>
        </div>
        {/* Masonry Gallery */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
              {data &&
                data.data.map((item: any) => (
                  <GifCard
                    title={item.title}
                    imgSrc={item.images.downsized.url}
                    key={item.id}
                    id={item.id}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
