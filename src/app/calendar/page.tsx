import { NextPage } from "next";
import Navbar from "../_components/Navbar";
import FullCalendar from "./_components/FullCalendar";

const CalendarPage: NextPage = () => {
  return (
    <div>
      <Navbar />
      <FullCalendar />
    </div>
  );
};

export default CalendarPage;
