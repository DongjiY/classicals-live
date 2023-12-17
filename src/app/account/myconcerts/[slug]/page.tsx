import Link from "next/link";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <section className="w-full font-modern">
      <div className="py-2 px-4 rounded-full relative bg-red-700 hover:opacity-50 text-white w-max">
        <Link href={`${params.slug}/seating`}>Manage Seating</Link>
      </div>

      <div>
        <p>Dummy stuff</p>
      </div>
    </section>
  );
}
