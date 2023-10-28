import { NextPage } from "next";
import Navbar from "./_components/Navbar";
import { trending_mock } from "./_static/dummy_trending";
import TrendingRow from "./_components/TrendingRow";
import Footer from "./_components/Footer";

const Home: NextPage = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="w-2/3 mx-auto py-8">
        <div className="bg-[url('/images/orchestra.png')] w-full h-[500px] bg-cover bg-center rounded-lg flex flex-col justify-center gap-y-3 px-8">
          <h1 className="text-white font-fancy font-bold text-5xl w-full">
            Find performances of your favorite pieces
          </h1>
          <form>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:text-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Composers, Pieces, and Performers..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-800 dark:focus:ring-blue-800"
              >
                Explore
              </button>
            </div>
          </form>
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
