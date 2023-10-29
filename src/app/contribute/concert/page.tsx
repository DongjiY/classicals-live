import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { Metadata, NextPage } from "next";
import NewPerfForm from "./_components/NewPerfForm";

export const metadata: Metadata = {
  title: "Add Performance",
};

const ContributeConcertPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <NewPerfForm />
      <Footer />
    </main>
  );
};

export default ContributeConcertPage;
