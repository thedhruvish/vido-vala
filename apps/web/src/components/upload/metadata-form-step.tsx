import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createVideoValidator } from "@vido-vala/validators";
import { z } from "zod";
import { Button } from "@vido-vala/ui/components/button";
import { Switch } from "@vido-vala/ui/components/switch";
import { Field, FieldLabel, FieldError, FieldContent } from "@vido-vala/ui/components/field";
import { Textarea } from "@vido-vala/ui/components/textarea";
import { Loader2 } from "lucide-react";
import { VideoPreviewCard } from "./video-preview-card";
import { ThumbnailUpload } from "./thumbnail-upload";

type FormValues = z.infer<typeof createVideoValidator>;

interface MetadataFormStepProps {
  initialTitle: string;
  isUploadingVideo: boolean;
  uploadProgress: number;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: (data: FormValues) => void;
}

export function MetadataFormStep({
  initialTitle,
  isUploadingVideo,
  uploadProgress,
  isSubmitting,
  onBack,
  onSubmit,
}: MetadataFormStepProps) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(createVideoValidator),
    defaultValues: {
      title: initialTitle,
      description: "",
      thumbnail: "",
      isPublish: false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 overflow-y-auto p-6 flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Metadata */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <Field>
            <FieldLabel htmlFor="title">Title *</FieldLabel>
            <FieldContent>
              <Textarea
                id="title"
                rows={2}
                placeholder="Add a title that describes your video"
                {...register("title")}
                maxLength={156}
              />
            </FieldContent>
            <FieldError errors={[errors.title]} />
            <p className="text-right text-[10px] text-muted-foreground">
              {watch("title")?.length || 0}/156
            </p>
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <FieldContent>
              <Textarea
                id="description"
                role="10"
                placeholder="Tell viewers about your video"
                {...register("description")}
                maxLength={2024}
              />
            </FieldContent>
            <FieldError errors={[errors.description]} />
            <p className="text-right text-[10px] text-muted-foreground">
              {watch("description")?.length || 0}/2024
            </p>
          </Field>
        </div>

        {/* Right Column - Preview & Actions */}
        <div className="space-y-6">
          <VideoPreviewCard isUploading={isUploadingVideo} uploadProgress={uploadProgress} />

          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <ThumbnailUpload
                value={field.value}
                onChange={field.onChange}
                error={errors.thumbnail}
              />
            )}
          />

          <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
            <div className="grid gap-1.5 leading-none">
              <FieldLabel htmlFor="isPublish" className="text-sm font-medium leading-none">
                Publish now
              </FieldLabel>
              <p className="text-xs text-muted-foreground">Make your video public</p>
            </div>
            <Controller
              name="isPublish"
              control={control}
              render={({ field }) => (
                <Switch id="isPublish" checked={field.value} onCheckedChange={field.onChange} />
              )}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save and Finish
        </Button>
      </div>
    </form>
  );
}
