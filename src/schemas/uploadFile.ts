import { z } from "zod";

/** Allowed MIME types for artwork uploads */
export const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "application/postscript", // .ai
  "image/vnd.adobe.photoshop", // .psd
  "application/x-photoshop", // .psd (alternative)
  "application/photoshop",
  "application/x-coreldraw", // .cdr
  "application/zip",
  "application/x-zip-compressed",
] as const;

/** Allowed file extensions (for display in error messages) */
export const ALLOWED_EXTENSIONS = [
  "PDF",
  "PNG",
  "JPG",
  "JPEG",
  "AI",
  "PSD",
  "CDR",
  "ZIP",
];

/** Maximum file size: 25 MB in bytes */
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024;

export const UploadFileQuerySchema = z.object({
  filename: z.string().min(1, "Filename is required"),
  mimeType: z
    .string()
    .refine(
      (type): type is (typeof ALLOWED_MIME_TYPES)[number] =>
        (ALLOWED_MIME_TYPES as readonly string[]).includes(type),
      {
        message: `File type not allowed. Accepted types: ${ALLOWED_EXTENSIONS.join(", ")}`,
      },
    ),
});

export type UploadFileQuery = z.infer<typeof UploadFileQuerySchema>;
