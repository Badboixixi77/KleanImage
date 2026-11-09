"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuoteRequestSchema, type QuoteRequestInput } from "@/schemas/quote";
import { SERVICE_CATALOGUE } from "@/config/services";
import { StepIndicator } from "./StepIndicator";
import { Step1Product } from "./Step1Product";
import { Step2Finish } from "./Step2Finish";
import { Step3Contact } from "./Step3Contact";
import { Step4Review } from "./Step4Review";
import { SuccessScreen } from "./SuccessScreen";

interface QuoteFormProps {
  preselectedService?: string;
}

export function QuoteForm({ preselectedService }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    quoteId: string;
    refNumber: string;
    whatsappUrl: string;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Find preselected service name
  const preselectedServiceObj = preselectedService
    ? SERVICE_CATALOGUE.find((s) => s.slug === preselectedService)
    : undefined;

  const form = useForm<QuoteRequestInput>({
    resolver: zodResolver(QuoteRequestSchema),
    defaultValues: {
      serviceSlug: preselectedServiceObj?.slug ?? "",
      serviceName: preselectedServiceObj?.name ?? "",
      size: null,
      quantity: undefined as unknown as number,
      paperFinish: null,
      finishOptions: null,
      deadline: "",
      deliveryMethod: "pickup",
      deliveryArea: null,
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      artworkStoragePath: null,
      consentGiven: undefined as unknown as true,
      _honey: "",
      turnstileToken: "dev-bypass", // TODO TASK-22: replace with real Turnstile token
    },
  });

  const STEPS = [
    { label: "Product" },
    { label: "Finish & Deadline" },
    { label: "Contact" },
    { label: "Review" },
  ];

  const handleNext = async () => {
    // Validate only the fields for the current step
    const stepFields: Record<number, (keyof QuoteRequestInput)[]> = {
      1: ["serviceSlug", "serviceName", "quantity"],
      2: ["deadline", "deliveryMethod"],
      3: ["customerName", "customerPhone"],
    };
    const fields = stepFields[currentStep];
    if (fields) {
      const valid = await form.trigger(fields);
      if (!valid) return;
    }
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (data: QuoteRequestInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as {
        quoteId?: string;
        refNumber?: string;
        whatsappUrl?: string;
        error?: string;
      };
      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitResult({
        quoteId: json.quoteId!,
        refNumber: json.refNumber!,
        whatsappUrl: json.whatsappUrl!,
      });
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitResult) {
    return (
      <SuccessScreen
        refNumber={submitResult.refNumber}
        whatsappUrl={submitResult.whatsappUrl}
      />
    );
  }

  return (
    <div className="rounded-2xl bg-white border border-brand-gray-200 shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="px-6 pt-6 pb-4 border-b border-brand-gray-100">
        <StepIndicator steps={STEPS} currentStep={currentStep} />
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {/* Hidden honeypot */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="sr-only"
          {...form.register("_honey")}
        />

        <div className="px-6 py-8">
          {currentStep === 1 && <Step1Product form={form} />}
          {currentStep === 2 && <Step2Finish form={form} />}
          {currentStep === 3 && <Step3Contact form={form} />}
          {currentStep === 4 && (
            <Step4Review form={form} isSubmitting={isSubmitting} />
          )}
        </div>

        {/* Error message */}
        {submitError && (
          <div
            className="mx-6 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-brand-gray-100 bg-brand-gray-50">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="rounded-lg border border-brand-gray-200 px-4 py-2 text-sm font-medium text-brand-gray-700 hover:bg-brand-gray-100 transition-colors"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="rounded-lg bg-brand-magenta px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-magenta/90 transition-colors"
            >
              Next →
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-brand-magenta px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-magenta/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? "Submitting…" : "Submit Request"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
