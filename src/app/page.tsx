import { Metadata, NextPage } from "next";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import SearchBar from "./_components/SearchBar";
import RecentSearches from "./_components/RecentSearches";
import Calendar from "./_components/Calendar";
import Logo from "./_components/Logo";

export const metadata: Metadata = {
  title: "Classicals.Live",
  description: "Find Concerts Near You",
};

const Home: NextPage = () => {
  return (
    <>
      <main className="pwa-hidden min-h-screen bg-white dark:bg-gray-800">
        <Navbar />
        <section className="w-full md:w-2/3 max-w-[1248px] mx-auto md:py-8 md:px-0 py-2 px-2">
          <div className="bg-[url('/images/orchestra.png')] w-full h-[500px] bg-cover bg-center rounded-lg flex flex-col justify-center gap-y-3 px-4 md:px-8">
            <h1 className="text-white font-fancy font-bold text-5xl w-full">
              Find your next favorite performance
            </h1>
            <SearchBar />
          </div>
        </section>

        <section className="w-full px-3 md:px-0 max-w-[1248px] md:w-2/3 mx-auto pb-8 pt-8 md:pt-2">
          <RecentSearches bannerTextSize="large" />
        </section>

        <section className="w-full px-3 md:px-0 max-w-[1248px] md:w-2/3 mx-auto overflow-x-hidden">
          <Calendar />
        </section>

        <Footer />
      </main>

      <main className="hidden pwa-visible-block px-3">
        <section className="dark:text-slate-200">
          <div className="w-full flex flex-col items-center justify-center mt-[18dvh] gap-y-4">
            <Logo />

            <span className="w-full">
              <SearchBar />
            </span>
          </div>
        </section>

        <br></br>

        <section className="dark:text-slate-200 font-modern">
          <RecentSearches bannerTextSize="small" />
        </section>
      </main>
    </>
  );
};

export default Home;
