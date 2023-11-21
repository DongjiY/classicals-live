"use client";
import { UserContext } from "@/util/UserContext";
import { NextPage } from "next";
import { useContext } from "react";

export const EditProfilePage: NextPage = () => {
  const user = useContext(UserContext);

  return (
    <main>
      <section>
        <form action="">
          <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
            <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
              <div>
                <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Edit your account
                </h1>
              </div>

              <div className="mt-8 space-y-8">
                <div className="space-y-6">
                  <input
                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="Your Password"
                    type="text"
                    name="name"
                    defaultValue={user?.name}
                  />
                  <input
                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="New Email"
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                  />
                </div>
                <input
                  type="submit"
                  value="Save Changes"
                  className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
                />

                <Link href="/account/profile">Cancel</Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};
