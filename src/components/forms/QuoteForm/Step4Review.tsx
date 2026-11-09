import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { QuoteRequestInput } from "@/schemas/quote";
import { SERVICE_CATALOGUE } from "@/config/services";
import Link from "next/link";

interface Step4Props {
  form: UseFormReturn<QuoteRequestInput>;
  isSubmitting: boolean;
}

export function Step4Review({ form, isSubmitting }: Step4Props) {
  const { register, watch, formState: { errors } } = form;
  const values = watch();

  const serviceName =
    SERVICE_CATALOGUE.find((s) => s.slug === values.serviceSlug)?.name ??
    values.serviceSlug;

  const fields: Array<[string, string | null | undefined]> = [
    ["Service", serviceName],
    ["Size / Dimensions", values.size || "Not specified"],
    ["Quantity", values.quantity ? String(values.quantity) : "—"],
    ["Paper / Material", values.paperFinish || "Not specified"],
    ["Finish", values.finishOptions || "Not specified"],
    ["Deadline", values.deadline ? new Date(values.deadline).toLocaleDateString("en-GB") : "—"],
    [
      "Delivery",
      values.deliveryMethod === "pickup"
        ? "Pickup from shop"
        : `Delivery to ${values.deliveryArea || "—"}`,
    ],
    ["Your name", values.customerName],
    ["Phone", values.customerPhone],
    ["Email", values.customerEmail || "Not provided"],
    ["Artwork file", values.artworkStoragePath ? "Uploaded ✓" : "Not attached"],
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-brand-dark mb-1">
          Review your request
        </h2>
        <p className="text-sm text-brand-gray-500">
          Check everything looks correct before submitting.
        </p>
      </div>

      {/* Summary table */}
      <dl className="divide-y divide-brand-gray-100 rounded-xl border border-brand-gray-200 overflow-hidden">
        {fields.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-3 even:bg-brand-gray-50">
            <dt className="text-sm font-medium text-brand-gray-500 shrink-0">{label}</dt>
            <dd className="text-sm text-brand-dark text-right">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>

      {/* Consent checkbox */}
      <div className="space-y-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("consentGiven")}
            className="mt-0.5 h-4 w-4 accent-brand-magenta"
            aria-describedby={errors.consentGiven ? "consent-error" : "consent-hint"}
          />
          <span className="text-sm text-brand-gray-700" id="consent-hint">
            I agree to the{" "}
            <Link href="/legal/privacy" target="_blank" className="text-brand-magenta underline hover:no-underline">
              Privacy Policy
            </Link>{" "}
            and consent to Klean Image storing my contact details and artwork to
            process this quote request.{" "}
            <span className="text-brand-magenta">*</span>
          </span>
        </label>
        {errors.consentGiven && (
          <p id="consent-error" className="text-xs text-red-600 pl-7" role="alert">
            {errors.consentGiven.message}
          </p>
        )}
      </div>

      {isSubmitting && (
        <div className="flex items-center gap-2 text-sm text-brand-gray-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-magenta border-t-transparent" aria-hidden="true" />
          Submitting your request…
        </div>
      )}
    </div>
  );
}
