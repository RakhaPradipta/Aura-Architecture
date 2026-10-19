"use client";

import Link from "next/link";

export default function TeamMemberError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="text-center max-w-lg">
        <div className="w-16 h-16 rounded-full bg-blueprint-100 flex items-center justify-center mx-auto mb-6">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-blueprint-700"
          >
            <path
              d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="heading-md text-ink-950 mb-4">
          Team Member Unavailable
        </h1>

        <p className="body-md text-ink-500 mb-8">
          We could not load this team member&apos;s profile. It may have been
          moved or temporarily unavailable.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/team" className="btn-secondary">
            Back to Team
          </Link>
        </div>

        {error.digest && (
          <p className="text-xs text-ink-300 mt-6">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </section>
  );
}
