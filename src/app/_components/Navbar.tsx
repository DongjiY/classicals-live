import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="w-full bg-white border-b-[1px] dark:border-none border-gray-300 py-4 dark:bg-gray-900">
      <div className="w-2/3 mx-auto flex items-center justify-between">
        <Logo />

        <div className="flex gap-x-6 dark:text-white">
          <Link href="/" className="font-semibold hover:text-red-600">
            Home
          </Link>
          <Link href="/contact" className="font-semibold hover:text-red-600">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
