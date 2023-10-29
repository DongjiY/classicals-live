import { Metadata, NextPage } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 Error",
};

const NotFound: NextPage = () => {
  return (
    <main className="min-h-screen font-modern flex items-center justify-center">
      <div className="w-1/2 relative">
        <div className="z-10 relative">
          <p className="text-red-600 font-bold">404 Error</p>
          <h1 className="text-4xl font-fancy font-bold">Page Not Found</h1>
          <pre className="mt-1 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist.
          </pre>
          <div className="flex items-center mt-6 gap-x-3">
            <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>

              <span>Go back</span>
            </button>

            <Link
              href="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-600 rounded shrink-0 sm:w-auto hover:bg-red-700"
            >
              Take me home
            </Link>
          </div>
        </div>
        <img
          src="/images/spotlight.jpg"
          className="absolute top-0 bottom-0 m-auto right-0"
        ></img>
      </div>
    </main>
  );
};

export default NotFound;
