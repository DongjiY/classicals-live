import Link from "next/link";
import Logo from "./Logo";
import styles from "./_styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b-[1px] dark:border-none border-gray-300 py-4 dark:bg-gray-900 z-10">
      <div className="w-full pl-4 md:pl-0 md:w-2/3 mx-auto flex items-center justify-between">
        <Logo />

        <div className="gap-x-6 dark:text-white hidden md:flex items-center">
          <Link href="/" className="font-semibold hover:text-red-600">
            Home
          </Link>
          <Link href="/contact" className="font-semibold hover:text-red-600">
            Contact
          </Link>
          <Link
            href="/login"
            className="font-semibold text-red-600 flex items-center gap-x-1"
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
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clipRule="evenodd"
              />
            </svg>
            Login
          </Link>
        </div>

        <label className={`md:hidden ${styles.customlabel}`}>
          <input type="checkbox" className={styles.custominput} />
          <span className={styles.menu}>
            <div className={styles.hamburger}></div>
          </span>
          <ul>
            <li>
              <Link href="/" className="font-semibold hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-semibold hover:text-red-600"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="font-semibold hover:text-red-600 !underline"
              >
                Login
              </Link>
            </li>
          </ul>
        </label>
      </div>
    </nav>
  );
}
