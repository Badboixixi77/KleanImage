import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { QuoteRequestInput } from "@/schemas/quote";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Step2Props {
  form: UseFormReturn<QuoteRequestInput>;
}

const PAPER_OPTIONS = [
  "80gsm Bond",
  "90gsm Art Paper",
  "130gsm Gloss",
  "150gsm Matt",
  "250gsm Art Card",
  "300gsm Art Card",
  "350gsm Art Card (Business Card standard)",
  "400gsm Board",
  "Canvas",
  "Vinyl",
  "Fabric",
  "Not sure — advise me",
];

const FINISH_OPTIONS = [
  "Matt Lamination",
  "Gloss Lamination",
  "Spot UV",
  "Embossing",
  "Foiling",
  "No finish / standard",
];

export function Step2Finish({ form }: Step2Props) {
  const { register, watch, formState: { errors } } = form;
  const deliveryMethod = watch("deliveryMethod");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-brand-dark mb-1">
          Paper, finish &amp; deadline
        </h2>
        <p className="text-sm text-brand-gray-500">Tell us about the paper, finish, and when you need it.</p>
      </div>

      {/* Paper */}
      <div className="space-y-1.5">
        <Label htmlFor="paperFinish">Paper / Material <span className="text-brand-gray-400 font-normal">(optional)</span></Label>
        <select
          id="paperFinish"
          {...register("paperFinish")}
          className="flex h-11 w-full rounded-lg border border-brand-gray-200 bg-white px-3 py-2 text-sm text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
        >
          <option value="">— Not sure / Any —</option>
          {PAPER_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Finish */}
      <div className="space-y-1.5">
        <Label htmlFor="finishOptions">Finish <span className="text-brand-gray-400 font-normal">(optional)</span></Label>
        <select
          id="finishOptions"
          {...register("finishOptions")}
          className="flex h-11 w-full rounded-lg border border-brand-gray-200 bg-white px-3 py-2 text-sm text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-magenta"
        >
          <option value="">— No preference —</option>
          {FINISH_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Deadline */}
      <div className="space-y-1.5">
        <Label htmlFor="deadline">When do you need it? <span className="text-brand-magenta">*</span></Label>
        <Input
          id="deadline"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          {...register("deadline")}
          aria-describedby={errors.deadline ? "deadline-error" : undefined}
        />
        {errors.deadline && (
          <p id="deadline-error" className="text-xs text-red-600" role="alert">
            {errors.deadline.message}
          </p>
        )}
      </div>

      {/* Delivery method */}
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-brand-dark">
          Delivery method <span className="text-brand-magenta">*</span>
        </legend>
        <div className="flex gap-4">
          {[
            { value: "pickup", label: "Pickup from shop" },
            { value: "delivery", label: "Delivery to me" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value={opt.value}
                {...register("deliveryMethod")}
                className="accent-brand-magenta"
              />
              <span className="text-sm text-brand-dark">{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Delivery area (conditional) */}
      {deliveryMethod === "delivery" && (
        <div className="space-y-1.5">
          <Label htmlFor="deliveryArea">Delivery area / LGA <span className="text-brand-magenta">*</span></Label>
          <Input
            id="deliveryArea"
            placeholder="e.g. Victoria Island, Ikeja, Lekki"
            {...register("deliveryArea")}
            aria-describedby={errors.deliveryArea ? "deliveryArea-error" : undefined}
          />
          {errors.deliveryArea && (
            <p id="deliveryArea-error" className="text-xs text-red-600" role="alert">
              {errors.deliveryArea.message}
            </p>
          )}
          <p className="text-xs text-brand-gray-400">Delivery fees will be included in your quote.</p>
        </div>
      )}
    </div>
  );
}
