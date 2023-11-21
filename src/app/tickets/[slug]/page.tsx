import Navbar from "../../_components/Navbar";

export default function TicketsPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <Navbar />
      <section>
        <p>{params.slug}</p>
      </section>
    </main>
  );
}
