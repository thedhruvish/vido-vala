import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, Loader2 } from "lucide-react";
import { cn } from "@vido-vala/ui/lib/utils";
import { FieldLabel, FieldError } from "@vido-vala/ui/components/field";
import { useGetUploadUrlMutation } from "@/api/videos-api";
import { toast } from "sonner";
import axios from "axios";

interface ThumbnailUploadProps {
  value: string;
  onChange: (url: string) => void;
  error?: { message?: string };
}

export function ThumbnailUpload({ value, onChange, error }: ThumbnailUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const getUploadUrlMutation = useGetUploadUrlMutation();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const thumbnailFile = acceptedFiles[0];
      if (!thumbnailFile) return;

      try {
        setIsThumbnailUploading(true);
        const {
          data: { uploadUrl },
        } = await getUploadUrlMutation.mutateAsync({
          size: thumbnailFile.size,
          contentType: thumbnailFile.type,
        });

        await axios.put(uploadUrl, thumbnailFile, {
          headers: { "Content-Type": thumbnailFile.type },
        });

        const mockUrl = URL.createObjectURL(thumbnailFile);
        onChange(mockUrl);
        toast.success("Thumbnail uploaded!");
      } catch (err: any) {
        toast.error("Failed to upload thumbnail.");
      } finally {
        setIsThumbnailUploading(false);
      }
    },
    [getUploadUrlMutation, onChange],
  );

  const [isThumbnailUploading, setIsThumbnailUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    disabled: isThumbnailUploading,
  });

  return (
    <div className="space-y-2">
      <FieldLabel>Thumbnail (required)</FieldLabel>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-muted/50 aspect-video relative overflow-hidden",
          value ? "border-solid" : "border-dashed",
          error ? "border-destructive" : "",
        )}
      >
        <input {...getInputProps()} />
        {value ? (
          <img
            src={value}
            alt="Thumbnail preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <>
            {isThumbnailUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <ImagePlus className="h-8 w-8 text-muted-foreground" />
                <p className="text-[10px] text-muted-foreground text-center">
                  Click or drag to upload thumbnail
                </p>
              </>
            )}
          </>
        )}
        {value && !isThumbnailUploading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <p className="text-white text-xs font-medium">Change</p>
          </div>
        )}
      </div>
      <FieldError errors={[error]} />
    </div>
  );
}
