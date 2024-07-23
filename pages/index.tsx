import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Link href="/in-nextjs">I exist in Next.js</Link>
      </div>
      <div>
        <Link href="/somewhere-else">I do not</Link>
      </div>
    </>
  );
}
