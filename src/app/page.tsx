import { Metadata, NextPage } from "next";
import Navbar from "./_components/Navbar";
import { trending_mock } from "./_static/dummy_trending";
import TrendingRow from "./_components/TrendingRow";
import Footer from "./_components/Footer";
import { SyntheticEvent } from "react";
import SearchBar from "./_components/SearchBar";

export const metadata: Metadata = {
  title: "ClassicalsLive",
};

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <section className="w-2/3 mx-auto py-8">
        <div className="bg-[url('/images/orchestra.png')] w-full h-[500px] bg-cover bg-center rounded-lg flex flex-col justify-center gap-y-3 px-8">
          <h1 className="text-white font-fancy font-bold text-5xl w-full">
            Find performances of your favorite pieces
          </h1>
          <SearchBar />
        </div>
      </section>

      <section className="mt-4 w-2/3 mx-auto max-h-[300px] overflow-y-scroll overflow-x-hidden">
        <h1 className="font-modern font-bold text-2xl dark:text-white">
          Trending This Week
        </h1>
        <div className="w-full py-2">
          <ul className="flex flex-col gap-y-2">
            {trending_mock.map((item, index) => (
              <TrendingRow {...item} key={index} />
            ))}
          </ul>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
