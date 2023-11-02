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

      <section className="w-11/12 md:w-1/2 mx-auto mt-4">
        <SearchBar />
      </section>

      <section className="w-11/12 md:w-1/2 mx-auto py-6">
        <ResultsRowWrapper />
      </section>
    </main>
  );
};

export default SearchResultsPage;
