import React from "react";
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessScreenProps {
  refNumber: string;
  whatsappUrl: string;
}

export function SuccessScreen({ refNumber, whatsappUrl }: SuccessScreenProps) {
  return (
    <div className="rounded-2xl bg-white border border-brand-gray-200 shadow-sm p-8 text-center">
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" aria-hidden="true" />
      </div>
      <h2 className="font-display text-2xl font-extrabold text-brand-dark mb-2">
        Request Submitted!
      </h2>
      <p className="text-brand-gray-500 mb-2">
        Your reference number is:
      </p>
      <div className="inline-block rounded-lg bg-brand-magenta/10 px-4 py-2 mb-6">
        <span className="font-display text-xl font-bold text-brand-magenta">{refNumber}</span>
      </div>

      <p className="text-sm text-brand-gray-600 mb-8 max-w-sm mx-auto">
        We&apos;ve received your request and will get back to you as soon as possible.
        For the fastest response, continue on WhatsApp.
      </p>

      <div className="flex flex-col gap-3 max-w-xs mx-auto">
        <Button asChild size="lg" variant="whatsapp" className="w-full">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            Continue on WhatsApp
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="w-full">
          <Link href="/">
            Back to Home
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      {/* What happens next */}
      <div className="mt-8 rounded-xl bg-brand-gray-50 p-5 text-left text-sm text-brand-gray-600">
        <p className="font-semibold text-brand-dark mb-2">What happens next?</p>
        <ol className="space-y-1 list-decimal pl-4">
          <li>Our team reviews your request (usually within a few hours)</li>
          <li>We send you a detailed price quote via WhatsApp or email</li>
          <li>Once you confirm, we start printing</li>
        </ol>
      </div>
    </div>
  );
}
