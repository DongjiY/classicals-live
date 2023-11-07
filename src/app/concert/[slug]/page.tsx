import Navbar from "@/app/_components/Navbar";
import ConcertInfo from "../_components/concertInfo";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="h-full w-full">
      <Navbar />
      <ConcertInfo id={params.slug} />
    </section>
  );
}
