import { NextPage } from "next";
import Link from "next/link";

const SettingsPage: NextPage = () => {
  return (
    <main className="text-black p-4">
      <h1 className="font-modern text-3xl font-bold tracking-wider mb-4">
        Settings
      </h1>
      <Link
        href="/account/scan"
        className="flex gap-x-2 items-center w-max px-3 py-1 rounded-lg bg-gray-800 text-white mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M3.75 2A1.75 1.75 0 002 3.75v3.5C2 8.216 2.784 9 3.75 9h3.5A1.75 1.75 0 009 7.25v-3.5A1.75 1.75 0 007.25 2h-3.5zM3.5 3.75a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.5a.25.25 0 01-.25.25h-3.5a.25.25 0 01-.25-.25v-3.5zM3.75 11A1.75 1.75 0 002 12.75v3.5c0 .966.784 1.75 1.75 1.75h3.5A1.75 1.75 0 009 16.25v-3.5A1.75 1.75 0 007.25 11h-3.5zm-.25 1.75a.25.25 0 01.25-.25h3.5a.25.25 0 01.25.25v3.5a.25.25 0 01-.25.25h-3.5a.25.25 0 01-.25-.25v-3.5zm7.5-9c0-.966.784-1.75 1.75-1.75h3.5c.966 0 1.75.784 1.75 1.75v3.5A1.75 1.75 0 0116.25 9h-3.5A1.75 1.75 0 0111 7.25v-3.5zm1.75-.25a.25.25 0 00-.25.25v3.5c0 .138.112.25.25.25h3.5a.25.25 0 00.25-.25v-3.5a.25.25 0 00-.25-.25h-3.5zm-7.26 1a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V5.5a1 1 0 00-1-1h-.01zm9 0a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V5.5a1 1 0 00-1-1h-.01zm-9 9a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1v-.01a1 1 0 00-1-1h-.01zm9 0a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1v-.01a1 1 0 00-1-1h-.01zm-3.5-1.5a1 1 0 011-1H12a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V12zm6-1a1 1 0 00-1 1v.01a1 1 0 001 1H17a1 1 0 001-1V12a1 1 0 00-1-1h-.01zm-1 6a1 1 0 011-1H17a1 1 0 011 1v.01a1 1 0 01-1 1h-.01a1 1 0 01-1-1V17zm-4-1a1 1 0 00-1 1v.01a1 1 0 001 1H12a1 1 0 001-1V17a1 1 0 00-1-1h-.01z"
            clipRule="evenodd"
          />
        </svg>
        <p>Scan Tickets</p>
      </Link>
      <Link
        href="/account/myconcerts"
        className="flex gap-x-2 items-center w-max px-3 py-1 rounded-lg bg-gray-800 text-white mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M2 4.25A2.25 2.25 0 014.25 2h2.5A2.25 2.25 0 019 4.25v2.5A2.25 2.25 0 016.75 9h-2.5A2.25 2.25 0 012 6.75v-2.5zM2 13.25A2.25 2.25 0 014.25 11h2.5A2.25 2.25 0 019 13.25v2.5A2.25 2.25 0 016.75 18h-2.5A2.25 2.25 0 012 15.75v-2.5zM11 4.25A2.25 2.25 0 0113.25 2h2.5A2.25 2.25 0 0118 4.25v2.5A2.25 2.25 0 0115.75 9h-2.5A2.25 2.25 0 0111 6.75v-2.5zM15.25 11.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
        </svg>
        <p>My Concerts</p>
      </Link>
      <Link
        href="https://api.classicals.live/auth/logout"
        className="flex items-center gap-x-2 w-max px-3 py-1 rounded-lg bg-red-700 text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
            clipRule="evenodd"
          />
        </svg>
        <p>Log Out</p>
      </Link>
    </main>
  );
};

export default SettingsPage;
