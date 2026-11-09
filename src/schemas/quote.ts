import { z } from "zod";
import { NigerianPhoneSchema } from "./phone";

/**
 * Shared Zod schema for quote request form and API validation.
 * Used on both client (React Hook Form resolver) and server (route handler).
 */
export const QuoteRequestSchema = z
  .object({
    // Step 1 — Product
    serviceSlug: z.string().min(1, "Please select a service"),
    serviceName: z.string().min(1, "Service name is required"),
    size: z.string().nullable().optional(),
    quantity: z
      .number({ invalid_type_error: "Quantity must be a number" })
      .int("Quantity must be a whole number")
      .min(1, "Quantity must be at least 1"),

    // Step 2 — Finish & Deadline
    paperFinish: z.string().nullable().optional(),
    finishOptions: z.string().nullable().optional(),
    deadline: z
      .string()
      .min(1, "Please select a deadline")
      .refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    deliveryMethod: z.enum(["pickup", "delivery"], {
      required_error: "Please select a delivery method",
    }),
    deliveryArea: z.string().nullable().optional(),

    // Step 3 — Contact
    customerName: z
      .string()
      .min(2, "Please enter your full name")
      .max(100, "Name is too long"),
    customerPhone: NigerianPhoneSchema,
    customerEmail: z
      .string()
      .email("Please enter a valid email address")
      .nullable()
      .optional()
      .or(z.literal("")),
    artworkStoragePath: z.string().nullable().optional(),

    // Step 4 — Consent
    consentGiven: z.literal(true, {
      errorMap: () => ({
        message: "You must agree to the Privacy Policy to submit your request",
      }),
    }),

    // Bot protection
    _honey: z.string().max(0, "Bot detected"),
    turnstileToken: z.string().min(1, "Please complete the verification"),
  })
  .refine(
    (data) =>
      data.deliveryMethod !== "delivery" ||
      (data.deliveryArea && data.deliveryArea.trim().length > 0),
    {
      message: "Please provide your delivery area",
      path: ["deliveryArea"],
    },
  );

export type QuoteRequestInput = z.infer<typeof QuoteRequestSchema>;

/** Schema for admin PATCH /api/quotes/[id] */
export const QuoteUpdateSchema = z.object({
  status: z
    .enum([
      "new",
      "quoted",
      "confirmed",
      "in_production",
      "ready",
      "delivered",
      "cancelled",
    ])
    .optional(),
  note: z.string().max(2000, "Note is too long").optional(),
});

export type QuoteUpdateInput = z.infer<typeof QuoteUpdateSchema>;
