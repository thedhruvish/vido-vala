import { Upload as UploadIcon, Loader2 } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@vido-vala/ui/components/button";
import { cn } from "@vido-vala/ui/lib/utils";

interface FileSelectionStepProps {
  onDrop: (files: File[]) => void;
  isUploading: boolean;
  uploadProgress: number;
}

export function FileSelectionStep({ onDrop, isUploading, uploadProgress }: FileSelectionStepProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex-1 flex flex-col items-center justify-center gap-6 p-8 cursor-pointer transition-colors",
        isDragActive ? "bg-primary/5 border-2 border-dashed border-primary" : "",
        isUploading ? "pointer-events-none opacity-50" : "",
      )}
    >
      <input {...getInputProps()} />
      <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center relative">
        {isUploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <span className="text-xs font-bold">{uploadProgress}%</span>
          </div>
        ) : (
          <UploadIcon className="h-16 w-16 text-muted-foreground" />
        )}
      </div>
      <div className="text-center flex flex-col gap-2">
        <h3 className="text-lg font-medium">
          {isUploading ? "Uploading video..." : "Drag and drop video files to upload"}
        </h3>
        <p className="text-sm text-muted-foreground">
          {isUploading
            ? "Please stay on this page until the upload is complete"
            : "Your videos will be private until you publish them."}
        </p>
      </div>
      {!isUploading && <Button className="rounded px-6">SELECT FILES</Button>}

      {isUploading && (
        <div className="w-full max-w-md bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}
