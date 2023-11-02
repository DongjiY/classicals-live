import Link from "next/link";
import Logo from "./Logo";
import styles from "./_styles/navbar.module.css";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b-[1px] dark:border-none border-gray-300 py-4 dark:bg-gray-900 z-10">
      <div className="w-full pl-4 md:pl-0 md:w-2/3 mx-auto flex items-center justify-between">
        <Logo />

        <div className="gap-x-6 dark:text-white hidden md:flex">
          <Link href="/" className="font-semibold hover:text-red-600">
            Home
          </Link>
          <Link href="/contact" className="font-semibold hover:text-red-600">
            Contact
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
          </ul>
        </label>
      </div>
    </nav>
  );
}
