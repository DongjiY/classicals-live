"use client";
import { NextPage } from "next";
import useMyTickets from "./_hooks/useMyTickets";
import Ticket from "./_components/ticket";
import Link from "next/link";

const AccountHome: NextPage = () => {
  const { data, isLoading } = useMyTickets();

  const displayTickets = () => {
    if (isLoading) {
      return (
        <div className="mx-auto w-[250px] h-[250px] flex items-center justify-center">
          <img src="/assets/90-ring-with-bg.svg"></img>
        </div>
      );
    } else {
      if (data) {
        return data.map((item, index: number) => {
          return <Ticket ticket={item} key={index}></Ticket>;
        });
      } else {
        return (
          <div>
            <h1 className="text-xl text-red-600 font-bold">Much empty...</h1>
            <p>Purchased tickets show up here.</p>
            <p>
              Think this is a mistake?{" "}
              <Link href="/contact" className="text-blue-500 hover:underline">
                Contact Us
              </Link>{" "}
              for help.
            </p>
          </div>
        );
      }
    }
  };
  return (
    <main className="p-4">
      <h1 className="font-modern text-3xl font-bold tracking-wider mb-4">
        My Tickets
      </h1>
      <section className="flex flex-wrap w-full gap-8">
        {displayTickets()}
      </section>
    </main>
  );
};

export default AccountHome;
