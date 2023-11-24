"use client";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FunctionComponent, SyntheticEvent, useState } from "react";

const LoginForm: FunctionComponent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    fetch("https://api.classicals.live/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: email,
        onSuccessRedirect: searchParams.get("redirect"),
      }),
      credentials: "include",
      mode: "cors",
    })
      .then((res) => {
        if (res.status === 201) {
          router.push("/login/sent");
        } else {
          router.push(`/register?email=${email}`);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Oops, we hit an error. Please try again later.");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-offwhite dark:bg-gray-900">
      <div className="w-[25rem] p-10 border-[1px] -mt-10 border-slate-200 bg-white dark:border-gray-500 dark:bg-gray-800 rounded-md flex flex-col items-center space-y-3">
        <div className="py-8">
          <Logo />
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="p-3 border-[1px] border-slate-500 rounded w-80 mb-6 dark:bg-gray-200"
            placeholder="Email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <div className="flex flex-col space-y-5 w-full">
            <input
              type="submit"
              className="w-full bg-red-600 rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-red-800"
              value="Log in"
            ></input>
            <p
              className={
                error
                  ? "bg-red-100 max-w-full flex mb-4 p-2 rounded-lg border-l-4 border-red-600"
                  : "hidden"
              }
            >
              {error}
            </p>
            <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
              <div className="-mt-1 font-bod bg-white px-5 absolute dark:bg-gray-800 dark:text-white">
                Or
              </div>
            </div>
            <Link
              href="/register"
              type="button"
              className="text-center w-full border-red-800 hover:border-red-700 hover:border-[2px] border-[1px] rounded-3xl p-3 text-red-700 font-bold transition duration-200"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
