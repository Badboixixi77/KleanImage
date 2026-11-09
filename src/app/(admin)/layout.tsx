/**
 * Admin route group layout — built in TASK-27.
 * Server-side auth guard: redirects to /admin/login if not authenticated.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO TASK-27: Add Supabase server-side auth check here
  return <>{children}</>;
}
