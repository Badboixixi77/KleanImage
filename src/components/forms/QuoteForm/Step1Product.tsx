import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { QuoteRequestInput } from "@/schemas/quote";
import { SERVICE_CATALOGUE } from "@/config/services";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step1Props {
  form: UseFormReturn<QuoteRequestInput>;
}

export function Step1Product({ form }: Step1Props) {
  const { register, setValue, watch, formState: { errors } } = form;
  const serviceSlug = watch("serviceSlug");

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const slug = e.target.value;
    const service = SERVICE_CATALOGUE.find((s) => s.slug === slug);
    setValue("serviceSlug", slug);
    setValue("serviceName", service?.name ?? "");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-brand-dark mb-1">
          What do you need printed?
        </h2>
        <p className="text-sm text-brand-gray-500">Select a service and tell us the quantity.</p>
      </div>

      {/* Service */}
      <div className="space-y-1.5">
        <Label htmlFor="serviceSlug">Service <span className="text-brand-magenta">*</span></Label>
        <select
          id="serviceSlug"
          value={serviceSlug}
          onChange={handleServiceChange}
          className="flex h-11 w-full rounded-lg border border-brand-gray-200 bg-white px-3 py-2 text-sm text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta focus-visible:border-transparent"
          aria-describedby={errors.serviceSlug ? "serviceSlug-error" : undefined}
        >
          <option value="">— Select a service —</option>
          {SERVICE_CATALOGUE.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
        </select>
        {errors.serviceSlug && (
          <p id="serviceSlug-error" className="text-xs text-red-600" role="alert">
            {errors.serviceSlug.message}
          </p>
        )}
      </div>

      {/* Size */}
      <div className="space-y-1.5">
        <Label htmlFor="size">Size / Dimensions <span className="text-brand-gray-400 font-normal">(optional)</span></Label>
        <Input
          id="size"
          placeholder="e.g. A4, A5, 3.5×2 inches, 4×6 ft, Custom"
          {...register("size")}
        />
        <p className="text-xs text-brand-gray-400">Leave blank if you&apos;re not sure — we&apos;ll advise in the quote.</p>
      </div>

      {/* Quantity */}
      <div className="space-y-1.5">
        <Label htmlFor="quantity">Quantity <span className="text-brand-magenta">*</span></Label>
        <Input
          id="quantity"
          type="number"
          min={1}
          placeholder="e.g. 100, 500, 1000"
          {...register("quantity", { valueAsNumber: true })}
          aria-describedby={errors.quantity ? "quantity-error" : undefined}
        />
        {errors.quantity && (
          <p id="quantity-error" className="text-xs text-red-600" role="alert">
            {errors.quantity.message}
          </p>
        )}
      </div>
    </div>
  );
}
