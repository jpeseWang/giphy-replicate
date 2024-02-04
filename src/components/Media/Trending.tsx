"use client";
import TrendingIcon from "@/assets/TrendingIcon";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetch";
import Image from "next/image";
import { GifCard } from "./GifCard";
import bannerImg from "./assets/HOLIDAY_BANNER_HP-2023_1.gif";
import Loader from "../Loading/Loader";

export default function Trending(): JSX.Element {
  const trendingConfig = {
    baseUrl: process.env.baseURL,
    apiKey: process.env.REACT_APP_GIPHY_API_KEY,
    limitGIFS: 20,
  };
  const { data, mutate, error, isLoading }: any = useSWR(
    `${trendingConfig.baseUrl}/trending?api_key=${trendingConfig.apiKey}&limit=${trendingConfig.limitGIFS}`,
    fetcher,
  );
  const gifData = data?.data;

  return (
    <>
      <>
        <div className="mx-auto mt-6 flex w-full max-w-6xl items-center lg:px-8">
          <Image src={bannerImg} alt="All of the Holiday GIFs!" />
        </div>
        <div className="mx-auto mt-6  max-w-6xl items-center lg:px-8">
          <div className="my-4 flex">
            <TrendingIcon />
            <h2 className="text-xl font-semibold"> &nbsp;Trending</h2>
          </div>

          {isLoading ? (
            <div className="my-16">
              <Loader />
            </div>
          ) : (
            <>
              <div className="top-0 columns-1 gap-1 sm:columns-2 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
                {data &&
                  gifData.map((item: any, index: number) => (
                    <div key={index}>
                      <GifCard
                        title={item.title}
                        imgSrc={item.images.downsized.url}
                        id={item.id}
                      />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
}
