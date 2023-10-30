"use client";
import Navbar from "@/app/_components/Navbar";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ConcertAddSuccess: NextPage = () => {
  const router = useRouter();
  const [counter, setCounter] = useState<number>(5);

  const countdown = setInterval(() => {
    if (counter > 0) {
      setCounter(counter - 1);
    } else {
      clearInterval(countdown);
      router.push("/contribute/concert");
    }
  }, 1000);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-800">
      <Navbar />
      <section className="w-2/3 mx-auto text-center translate-y-[40vh] dark:text-white">
        <h1 className="font-fancy text-4xl text-emerald-500">Success!</h1>
        <p>Your Concert Was Added.</p>
        <p>Automatically being redirected in {counter}...</p>
      </section>
    </main>
  );
};

export default ConcertAddSuccess;
