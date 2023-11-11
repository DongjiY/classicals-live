import { Metadata, NextPage } from "next";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import SearchBar from "./_components/SearchBar";
import RecentSearches from "./_components/RecentSearches";
import Calendar from "./_components/Calendar";

export const metadata: Metadata = {
  title: "Classicals.Live",
  description: "Find Concerts Near You",
};

const Home: NextPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <section className="w-full md:w-2/3 mx-auto md:py-8">
        <div className="bg-[url('/images/orchestra.png')] w-full h-[500px] bg-cover bg-center md:rounded-lg flex flex-col justify-center gap-y-3 px-8">
          <h1 className="text-white font-fancy font-bold text-5xl w-full">
            Find your next favorite performance
          </h1>
          <SearchBar />
        </div>
      </section>

      <section className="w-10/12 md:w-2/3 mx-auto pb-8 pt-8 md:pt-2">
        <RecentSearches />
      </section>

      <section className="w-10/12 md:w-2/3 mx-auto overflow-x-hidden">
        <Calendar />
      </section>

      <Footer />
    </main>
  );
};

export default Home;
