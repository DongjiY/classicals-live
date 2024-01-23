"use client";
import { NextPage } from "next";
import Navbar from "../_components/Navbar";
import FullCalendar from "./_components/FullCalendar";
import { useEffect } from "react";

const CalendarPage: NextPage = () => {
  useEffect(() => {
    document.documentElement.style.overscrollBehaviorY = "none";

    return () => {
      document.documentElement.style.overscrollBehaviorY = "auto";
    };
  }, []);

  return (
    <div>
      <Navbar />
      <FullCalendar />
    </div>
  );
};

export default CalendarPage;
