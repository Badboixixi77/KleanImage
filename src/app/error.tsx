"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log to Sentry in production (wired up in TASK-09)
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="font-display text-4xl font-black text-brand-magenta">
        Something went wrong
      </h1>
      <p className="mt-4 text-brand-gray-500">
        We&apos;re sorry — an unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-brand-magenta px-6 py-3 font-semibold text-white hover:bg-brand-magenta/90"
      >
        Try again
      </button>
    </main>
  );
}
