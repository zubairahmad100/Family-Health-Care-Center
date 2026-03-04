import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Not Found</h2>
      <Link href="/" className="mt-4 text-dental-600 hover:underline">
        Return Home
      </Link>
    </div>
  );
}
