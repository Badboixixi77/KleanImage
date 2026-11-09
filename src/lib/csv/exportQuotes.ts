import type { QuoteRequest } from "@/types/quote";

const CSV_HEADERS = [
  "Ref Number",
  "Date Submitted",
  "Customer Name",
  "Phone",
  "Email",
  "Service",
  "Quantity",
  "Size",
  "Paper / Finish",
  "Finish Options",
  "Deadline",
  "Delivery Method",
  "Delivery Area",
  "Status",
  "Consent Given",
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function escapeCsv(value: string | null | undefined): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function quotesToCsv(quotes: QuoteRequest[]): string {
  const header = CSV_HEADERS.map(escapeCsv).join(",");

  const rows = quotes.map((q) => {
    return [
      q.ref_number,
      formatDate(q.created_at),
      q.customer_name,
      q.customer_phone,
      q.customer_email ?? "",
      q.service_name,
      String(q.quantity),
      q.size ?? "",
      q.paper_finish ?? "",
      q.finish_options ?? "",
      q.deadline,
      q.delivery_method,
      q.delivery_area ?? "",
      q.status,
      q.consent_given ? "Yes" : "No",
    ]
      .map(escapeCsv)
      .join(",");
  });

  return [header, ...rows].join("\n");
}
