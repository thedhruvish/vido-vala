import { createFileRoute } from "@tanstack/react-router";
import { Upload as UploadIcon, X } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/_p/_user/upload")({
  component: UploadComponent,
});

function UploadComponent() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-card border rounded-xl shadow-lg flex flex-col h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Upload videos</h2>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
          <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center">
            <UploadIcon className="h-16 w-16 text-muted-foreground" />
          </div>
          <div className="text-center flex flex-col gap-2">
            <h3 className="text-lg font-medium">Drag and drop video files to upload</h3>
            <p className="text-sm text-muted-foreground">
              Your videos will be private until you publish them.
            </p>
          </div>
          <Button className="rounded px-6">SELECT FILES</Button>
        </div>

        <div className="p-4 text-center border-t">
          <p className="text-[10px] text-muted-foreground">
            By submitting your videos to VidoVala, you acknowledge that you agree to VidoVala's
            Terms of Service and Community Guidelines. Please be sure not to violate others'
            copyright or privacy rights.
          </p>
        </div>
      </div>
    </div>
  );
}
