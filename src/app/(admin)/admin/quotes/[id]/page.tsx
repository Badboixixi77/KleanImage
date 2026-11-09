interface QuoteDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function QuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params;
  return <p className="p-8">Quote Detail: {id} — TASK-29</p>;
}
