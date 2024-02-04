import Header from "@/components/Header/Header";
import SearchBar from "@/components/Search/SearchBar";
import Trending from "@/components/Media/Trending";

export default function Home() {
  return (
    <main className="">
      <SearchBar />
      <Trending />
    </main>
  );
}
