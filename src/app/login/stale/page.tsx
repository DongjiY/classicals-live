import Navbar from "@/app/_components/Navbar";
import { NextPage } from "next";
import Link from "next/link";

const StaleLoginPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <section className="w-2/3 mx-auto text-center translate-y-[40vh] dark:text-white">
        <h1 className="font-fancy text-4xl text-red-500">Uh Oh!</h1>
        <p>
          The link you followed has expired. Please try{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            logging in again
          </Link>
          .
        </p>
      </section>
    </main>
  );
};

export default StaleLoginPage;
