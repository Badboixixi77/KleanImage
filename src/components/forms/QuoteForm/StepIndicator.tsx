import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number; // 1-indexed
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Quote form progress">
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <li key={step.label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center w-full">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    isCompleted && "bg-brand-magenta text-white",
                    isActive && "bg-brand-magenta text-white ring-4 ring-brand-magenta/20",
                    !isCompleted && !isActive && "bg-brand-gray-100 text-brand-gray-500",
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    stepNum
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1 hidden sm:block text-[10px] font-medium",
                    isActive ? "text-brand-magenta" : "text-brand-gray-500",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mx-1 transition-colors",
                    isCompleted ? "bg-brand-magenta" : "bg-brand-gray-200",
                  )}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
