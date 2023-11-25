import { NextPage } from "next";
import Ticket from "./_components/ticket";

const AccountHome: NextPage = () => {
  return (
    <main className="p-4">
      <h1 className="font-modern text-3xl font-bold tracking-wider mb-4">
        My Tickets
      </h1>
      <section className="flex flex-wrap w-full gap-8">
        <Ticket />
      </section>
    </main>
  );
};

export default AccountHome;
