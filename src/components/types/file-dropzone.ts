// Types for FileDropzone component
export interface FileDropzoneProps {
  onUpload: (formData: FormData) => Promise<void>;
  className?: string;
  tone?: "neutral" | "gold" | "magenta";
}

