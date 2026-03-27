import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@vido-vala/ui/lib/utils";

interface VideoPreviewCardProps {
  isUploading: boolean;
  uploadProgress: number;
  className?: string;
}

export function VideoPreviewCard({
  isUploading,
  uploadProgress,
  className,
}: VideoPreviewCardProps) {
  return (
    <div
      className={cn(
        "aspect-video bg-muted rounded-lg flex items-center justify-center border relative overflow-hidden",
        className,
      )}
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <span className="text-sm font-bold">{uploadProgress}%</span>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
      )}
      <p className="text-xs font-medium bg-black/50 text-white px-2 py-1 rounded absolute bottom-2 right-2">
        {isUploading ? "Uploading..." : "Upload complete"}
      </p>
      {isUploading && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <div
            className="bg-primary h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}
