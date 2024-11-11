import Link from "next/link";

export default function Films({ films }) {
  if (!films || films.length === 0) {
    return <p>No films found.</p>;
  }

  return (
    <ul className="space-y-4">
      {films.data.map((elem) => (
        <li key={elem.id} className="text-black">
          <Link href={`/film/${elem.id}`}>{elem.title}</Link>
        </li>
      ))}
    </ul>
  );
}
