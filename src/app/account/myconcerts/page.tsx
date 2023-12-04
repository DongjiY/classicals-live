import { NextPage } from "next";
import MyConcertsList from "./_components/myconcertslist";

const MyConcertsPage: NextPage = () => {
  return (
    <main className="p-4">
      <h1 className="font-modern text-3xl font-bold tracking-wider mb-4">
        My Concerts
      </h1>
      <MyConcertsList />
    </main>
  );
};

export default MyConcertsPage;
