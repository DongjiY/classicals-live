import Logo from "@/app/_components/Logo";
import RecentSearches from "@/app/_components/RecentSearches";
import SearchBar from "@/app/_components/SearchBar";
import { NextPage } from "next";

const MobileSearchPage: NextPage = () => {
  return (
    <main className="px-3">
      <section className="dark:text-slate-200">
        <div className="w-full flex flex-col items-center justify-center mt-[18dvh] gap-y-4">
          <Logo />

          <span className="w-full">
            <SearchBar />
          </span>
        </div>
      </section>

      <br></br>

      <section className="dark:text-slate-200 font-modern">
        <RecentSearches bannerTextSize="small" />
      </section>
    </main>
  );
};

export default MobileSearchPage;
