"use client";
import { UserContext } from "@/util/UserContext";
import { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";

const ProfilePage: NextPage = () => {
  const user = useContext(UserContext);
  return (
    <main>
      <h1 className="font-modern text-3xl font-bold tracking-wider mb-4">
        My Profile
      </h1>
      <section className="font-modern flex flex-col gap-y-2 max-w-md">
        <div className="flex justify-between border-b-2 border-dashed pb-2 border-gray-400">
          <p className="font-semibold">User ID:&nbsp;</p>
          <p>{user?._id}</p>
        </div>
        <div className="flex justify-between border-b-2 border-dashed pb-2 border-gray-400">
          <p className="font-semibold">Full Name:&nbsp;</p>
          <p>{user?.name}</p>
        </div>
        <div className="flex justify-between border-b-2 border-dashed pb-2 border-gray-400">
          <p className="font-semibold">Email:&nbsp;</p>
          <p>{user?.email}</p>
        </div>
        <Link
          className="bg-red-700 w-max px-6 py-1 rounded-lg text-white mt-3"
          href="account/profile/edit"
        >
          Edit
        </Link>
      </section>
    </main>
  );
};

export default ProfilePage;
