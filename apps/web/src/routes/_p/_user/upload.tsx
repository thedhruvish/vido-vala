import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { useState, useCallback, useEffect } from "react";
import { useGetUploadUrlMutation, useCreateVideoMutation } from "@/api/videos-api";
import { toast } from "sonner";
import axios from "axios";
import { FileSelectionStep } from "@/components/upload/file-selection-step";
import { MetadataFormStep } from "@/components/upload/metadata-form-step";
import { ScrollArea } from "@vido-vala/ui/components/scroll-area";

export const Route = createFileRoute("/_p/_user/upload")({
  component: UploadComponent,
});

type Step = "selection" | "metadata";

function UploadComponent() {
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState<Step>("selection");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileId, setFileId] = useState<string | null>(null);

  const navigate = useNavigate();
  const getUploadUrlMutation = useGetUploadUrlMutation();
  const createVideoMutation = useCreateVideoMutation();

  const handleVideoUpload = useCallback(
    async (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];
      if (!selectedFile) return;

      setFile(selectedFile);

      try {
        setIsUploading(true);
        const {
          data: { uploadUrl, fileId: newFileId },
        } = await getUploadUrlMutation.mutateAsync({
          size: selectedFile.size,
          contentType: selectedFile.type,
          fileName: selectedFile.name,
          type: "ROW_VIDEO",
        });

        setFileId(newFileId);
        setStep("metadata");

        await axios.put(uploadUrl, selectedFile, {
          headers: { "Content-Type": selectedFile.type },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || selectedFile.size),
            );
            setUploadProgress(progress);
          },
        });

        toast.success("Video uploaded successfully!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to upload file.");
        setFile(null);
        setStep("selection");
      } finally {
        setIsUploading(false);
      }
    },
    [getUploadUrlMutation],
  );

  const handleFormSubmit = async (data: any) => {
    try {
      await createVideoMutation.mutateAsync({
        ...data,
        fileId: fileId || undefined,
      });
      navigate({ to: "/" });
    } catch (error) {
      // Error handled by mutation
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isUploading) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isUploading]);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full  bg-card border rounded-xl shadow-lg flex flex-col ">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold truncate pr-4">
            {step === "selection" ? "Upload videos" : file?.name}
          </h2>
          <Button variant="ghost" size="icon" onClick={() => navigate({ to: "/" })}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <ScrollArea className={"h-[80vh] max-h-[90vh]"}>
          {step === "selection" ? (
            <FileSelectionStep
              onDrop={handleVideoUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          ) : (
            <MetadataFormStep
              initialTitle={file?.name.replace(/\.[^/.]+$/, "") || ""}
              isUploadingVideo={isUploading}
              uploadProgress={uploadProgress}
              isSubmitting={createVideoMutation.isPending}
              onBack={() => setStep("selection")}
              onSubmit={handleFormSubmit}
            />
          )}
        </ScrollArea>
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
