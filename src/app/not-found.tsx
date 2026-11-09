import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-6xl font-black text-brand-magenta">
        404
      </h1>
      <h2 className="mt-4 font-display text-2xl font-bold text-brand-dark">
        Page not found
      </h2>
      <p className="mt-2 text-brand-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-brand-magenta px-6 py-3 font-semibold text-white hover:bg-brand-magenta/90 focus-visible:outline-brand-magenta"
      >
        Back to Home
      </Link>
    </main>
  );
}
