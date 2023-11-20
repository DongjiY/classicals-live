import { NextPage } from "next";
import Ticket from "./_components/ticket";

const AccountHome: NextPage = () => {
  return (
    <main>
      <section className="flex flex-wrap w-full gap-8">
        <Ticket />
      </section>
    </main>
  );
};

export default AccountHome;
