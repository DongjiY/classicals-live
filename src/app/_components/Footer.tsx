import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="w-full text-gray-700 bg-gray-100 body-font mt-12 dark:bg-gray-900">
      <div className="max-w-[1248px] w-2/3 container flex flex-col flex-wrap py-24 mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
        <div className="flex-shrink-0 w-64 mx-auto text-center md:mx-0 md:text-left flex flex-col items-center md:block">
          <Logo />
          <p className="mt-2 text-sm text-gray-500 dark:text-white">
            Find concerts near you.
          </p>
        </div>
        <div className="flex flex-wrap flex-grow mt-10 -mb-10 text-center md:pl-20 md:mt-0 md:text-left">
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font dark:text-white">
              SiteMap
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <Link
                  href="/"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600  dark:text-white"
                >
                  Home
                </Link>
              </li>
              <li className="mt-3">
                <Link
                  href="/contact"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600 dark:text-white"
                >
                  Contact
                </Link>
              </li>
            </nav>
          </div>
          <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font dark:text-white">
              Contribute
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <Link
                  href="/contribute/concert"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600 dark:text-white"
                >
                  Add Performance
                </Link>
              </li>
              <li className="mt-3">
                <Link
                  href="https://github.com/DongjiY/classicals-live"
                  className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600 dark:text-white"
                >
                  Source Code
                </Link>
              </li>
            </nav>
          </div>
          {/* <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Platform
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600">
                  Terms &amp; Privacy
                </a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600">
                  Pricing
                </a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600">
                  FAQ
                </a>
              </li>
            </nav>
          </div> */}
          {/* <div className="w-full px-4 lg:w-1/4 md:w-1/2">
            <h2 className="mb-3 text-sm font-medium tracking-widest text-gray-900 uppercase title-font">
              Contact
            </h2>
            <nav className="mb-10 list-none">
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600">
                  Send a Message
                </a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600">
                  Request a Quote
                </a>
              </li>
              <li className="mt-3">
                <a className="text-gray-500 cursor-pointer hover:text-gray-900 dark:hover:text-red-600">
                  +123-456-7890
                </a>
              </li>
            </nav>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
