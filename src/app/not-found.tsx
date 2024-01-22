import { Metadata, NextPage } from "next";
import Link from "next/link";
import BackButton from "./_components/BackButton";

export const metadata: Metadata = {
  title: "404 Error",
};

const NotFound: NextPage = () => {
  return (
    <main className="min-h-screen font-modern flex items-center justify-center bg-white">
      <div className="w-1/2 relative">
        <div className="z-10 relative">
          <p className="text-red-600 font-bold">404 Error</p>
          <h1 className="text-4xl font-fancy font-bold">Page Not Found</h1>
          <pre className="mt-1 text-gray-500 dark:text-gray-400 whitespace-normal">
            Sorry, the page you are looking for doesn&apos;t exist.
          </pre>
          <div className="flex items-center mt-6 gap-x-3">
            <BackButton />

            <Link
              href="/"
              className="w-max px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-600 rounded shrink-0 sm:w-auto hover:bg-red-700"
            >
              Take me home
            </Link>
          </div>
        </div>
        <img
          src="/images/spotlight.jpg"
          className="absolute top-0 bottom-0 m-auto right-0 max-h-screen"
        ></img>
      </div>
    </main>
  );
};

export default NotFound;
