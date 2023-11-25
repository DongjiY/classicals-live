"use client";
import { UserContext } from "@/util/UserContext";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useContext, useState } from "react";

const EditProfilePage: NextPage = () => {
  const user = useContext(UserContext);
  const router = useRouter();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const body: { name?: string; email?: string } = {};
    if (name !== user?.name) {
      body.name = name;
    }
    if (email !== user?.email) {
      body.email = email;
    }

    fetch("https://api.classicals.live/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 200) {
          router.push("/account/profile");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <div className="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px">
            <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 ">
              <div>
                <h1 className="text-xl font-semibold text-gray-800 ">
                  Edit your account
                </h1>
              </div>

              <div className="mt-8 space-y-8">
                <div className="space-y-6">
                  <input
                    className="w-full bg-transparent text-gray-600 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500"
                    placeholder="New Account Name"
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.currentTarget.value)}
                    defaultValue={user?.name}
                  />
                  <input
                    className="w-full bg-transparent text-gray-600 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500"
                    placeholder="New Email"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    defaultValue={user?.email}
                  />
                </div>
                <input
                  type="submit"
                  value="Save Changes"
                  className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
                />
              </div>

              <div className="text-center mt-2">
                <Link href="/account/profile" className="text-center underline">
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
        <div
          className={
            error
              ? "bg-red-100 rounded-lg py-3 px-2 border-l-4 border-red-600 mt-4"
              : "hidden"
          }
        >
          There was an issue saving your changes. Please try again later.
        </div>
      </section>
    </main>
  );
};

export default EditProfilePage;
