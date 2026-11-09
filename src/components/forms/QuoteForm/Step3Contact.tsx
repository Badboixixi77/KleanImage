import React, { useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { QuoteRequestInput } from "@/schemas/quote";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, X, FileText } from "lucide-react";
import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "@/schemas/uploadFile";

interface Step3Props {
  form: UseFormReturn<QuoteRequestInput>;
}

interface UploadedFile {
  name: string;
  storagePath: string;
}

export function Step3Contact({ form }: Step3Props) {
  const { register, setValue, formState: { errors } } = form;
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Client-side size check
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setUploadError(`File is too large. Maximum size is 25 MB.`);
      return;
    }

    setIsUploading(true);
    try {
      // Get signed upload URL
      const params = new URLSearchParams({
        filename: file.name,
        mimeType: file.type,
      });
      const urlRes = await fetch(`/api/upload-url?${params.toString()}`);
      if (!urlRes.ok) {
        const err = await urlRes.json() as { error?: string };
        setUploadError(err.error ?? "File type not allowed. Accepted: " + ALLOWED_EXTENSIONS.join(", "));
        return;
      }
      const { uploadUrl, storagePath } = await urlRes.json() as { uploadUrl: string; storagePath: string };

      // Upload directly to Supabase Storage
      const uploadRes = await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!uploadRes.ok) {
        setUploadError("Upload failed. Please try again.");
        return;
      }

      setUploadedFile({ name: file.name, storagePath });
      setValue("artworkStoragePath", storagePath);
    } catch {
      setUploadError("Upload failed. Please check your connection and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setValue("artworkStoragePath", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold text-brand-dark mb-1">
          Your contact details
        </h2>
        <p className="text-sm text-brand-gray-500">We need this to send you the quote.</p>
      </div>

      {/* Full name */}
      <div className="space-y-1.5">
        <Label htmlFor="customerName">Full name <span className="text-brand-magenta">*</span></Label>
        <Input
          id="customerName"
          placeholder="e.g. Chukwuemeka Obi"
          {...register("customerName")}
          aria-describedby={errors.customerName ? "name-error" : undefined}
        />
        {errors.customerName && (
          <p id="name-error" className="text-xs text-red-600" role="alert">
            {errors.customerName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="customerPhone">Phone number <span className="text-brand-magenta">*</span></Label>
        <Input
          id="customerPhone"
          type="tel"
          placeholder="e.g. 0808 299 6711"
          inputMode="tel"
          autoComplete="tel"
          {...register("customerPhone")}
          aria-describedby="phone-hint phone-error"
        />
        <p id="phone-hint" className="text-xs text-brand-gray-400">
          Nigerian numbers accepted: 080x, 070x, 081x, 090x, +234…
        </p>
        {errors.customerPhone && (
          <p id="phone-error" className="text-xs text-red-600" role="alert">
            {errors.customerPhone.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label htmlFor="customerEmail">
          Email address <span className="text-brand-gray-400 font-normal">(optional)</span>
        </Label>
        <Input
          id="customerEmail"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register("customerEmail")}
          aria-describedby={errors.customerEmail ? "email-error" : undefined}
        />
        {errors.customerEmail && (
          <p id="email-error" className="text-xs text-red-600" role="alert">
            {errors.customerEmail.message}
          </p>
        )}
      </div>

      {/* Artwork upload */}
      <div className="space-y-1.5">
        <Label>
          Artwork file <span className="text-brand-gray-400 font-normal">(optional)</span>
        </Label>
        <p className="text-xs text-brand-gray-400">
          Accepted: {ALLOWED_EXTENSIONS.join(", ")} — Max 25 MB
        </p>

        {uploadedFile ? (
          <div className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span className="truncate max-w-[200px]">{uploadedFile.name}</span>
              <span className="text-green-600 font-medium">✓ Uploaded</span>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              aria-label="Remove uploaded file"
              className="text-green-600 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-gray-200 p-6 cursor-pointer hover:border-brand-magenta/50 hover:bg-brand-gray-50 transition-colors">
            {isUploading ? (
              <div className="flex items-center gap-2 text-sm text-brand-gray-500">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-magenta border-t-transparent" aria-hidden="true" />
                Uploading…
              </div>
            ) : (
              <>
                <Upload className="h-6 w-6 text-brand-gray-400 mb-2" aria-hidden="true" />
                <span className="text-sm font-medium text-brand-dark">Click to upload your artwork</span>
                <span className="text-xs text-brand-gray-400 mt-1">or drag and drop</span>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              className="sr-only"
              accept=".pdf,.png,.jpg,.jpeg,.ai,.psd,.cdr,.zip"
              onChange={handleFileChange}
              aria-label="Upload artwork file"
              disabled={isUploading}
            />
          </label>
        )}

        {uploadError && (
          <p className="text-xs text-red-600" role="alert">{uploadError}</p>
        )}
      </div>
    </div>
  );
}
