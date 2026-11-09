export type QuoteStatus =
  | "new"
  | "quoted"
  | "confirmed"
  | "in_production"
  | "ready"
  | "delivered"
  | "cancelled";

export type DeliveryMethod = "pickup" | "delivery";

export interface QuoteRequest {
  id: string;
  ref_number: string;
  service_slug: string;
  service_name: string;
  size: string | null;
  quantity: number;
  paper_finish: string | null;
  finish_options: string | null;
  deadline: string; // ISO date
  delivery_method: DeliveryMethod;
  delivery_area: string | null;
  customer_name: string;
  customer_phone: string; // E.164
  customer_email: string | null;
  status: QuoteStatus;
  has_artwork: boolean;
  artwork_upload_failed: boolean;
  consent_given: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteFile {
  id: string;
  quote_id: string;
  storage_path: string;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  virus_scan_status: "pending" | "clean" | "infected";
  created_at: string;
  // Populated by API when admin fetches detail
  signedUrl?: string;
}

export interface QuoteStatusHistory {
  id: string;
  quote_id: string;
  from_status: QuoteStatus | null;
  to_status: QuoteStatus;
  changed_by: string | null;
  note: string | null;
  created_at: string;
}

export interface AdminNote {
  id: string;
  quote_id: string;
  author_id: string;
  body: string;
  created_at: string;
}

export interface QuoteListItem {
  id: string;
  ref_number: string;
  customer_name: string;
  service_name: string;
  quantity: number;
  status: QuoteStatus;
  created_at: string;
}

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  new: "New",
  quoted: "Quoted",
  confirmed: "Confirmed",
  in_production: "In Production",
  ready: "Ready",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const QUOTE_STATUS_COLOURS: Record<QuoteStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  quoted: "bg-purple-100 text-purple-800",
  confirmed: "bg-indigo-100 text-indigo-800",
  in_production: "bg-amber-100 text-amber-800",
  ready: "bg-green-100 text-green-800",
  delivered: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};
