import { Metadata, NextPage } from "next";
import Navbar from "../_components/Navbar";
import ResultsRowWrapper from "./_components/ResultsRowWrapper";
import SearchBar from "../_components/SearchBar";

export const metadata: Metadata = {
  title: "Concert Results",
};

const SearchResultsPage: NextPage = () => {
  return (
    <main>
      <Navbar />

      <section className="w-full max-w-[1248px] px-2 md:px-0 md:w-1/2 mx-auto mt-4">
        <SearchBar />
      </section>

      <section className="w-full max-w-[1248px] px-2 md:px-0 md:w-1/2 mx-auto py-6">
        <ResultsRowWrapper />
      </section>
    </main>
  );
};

export default SearchResultsPage;
