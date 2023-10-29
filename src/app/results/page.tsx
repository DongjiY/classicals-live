import { Metadata, NextPage } from "next";
import Navbar from "../_components/Navbar";
import ResultsRowWrapper from "./_components/ResultsRowWrapper";
import { useSearchParams } from "next/navigation";

export const metadata: Metadata = {
  title: "Concert Results",
};

const SearchResultsPage: NextPage = () => {
  return (
    <main>
      <Navbar />

      <section className="w-1/2 mx-auto py-6">
        <ResultsRowWrapper />
      </section>
    </main>
  );
};

export default SearchResultsPage;
