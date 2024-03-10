import { type Session } from "next-auth";
import Link from "next/link";

export default function Account({ session }: { session: Session | null }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-aqua-600 p-10">
      <p className="justify-center text-center text-sm text-aqua-100">
        {session && (
          <span>Logged in as {session.user?.name ?? session.user?.email}</span>
        )}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-aqua-900 px-10 py-3 font-semibold text-white no-underline transition hover:bg-aqua-700"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
}
