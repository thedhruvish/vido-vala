import * as React from "react";
import { cn } from "../lib/utils";
import { MoreVertical } from "lucide-react";
import { Button } from "./button";

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  video: any;
  variant?: "vertical" | "horizontal";
  videoPostedAt: string;
  onVideoClick?: () => void;
  onAuthorClick?: (e: React.MouseEvent) => void;
}

export function VideoCard({
  video,
  className,
  variant = "vertical",
  onVideoClick,
  onAuthorClick,
  videoPostedAt,

  ...props
}: VideoCardProps) {
  const videoDuration = video?.seconds
    ? `${Math.floor(video.seconds / 60)}:${String(video.seconds % 60).padStart(2, "0")}`
    : "00:00";

  const handleAuthorClick = (e: React.MouseEvent) => {
    if (onAuthorClick) {
      e.stopPropagation();
      onAuthorClick(e);
    }
  };

  const handleVideoClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onVideoClick) {
      onVideoClick();
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  return (
    <div
      className={cn("group relative cursor-pointer", className)}
      {...props}
      onClick={handleVideoClick}
    >
      {variant === "horizontal" ? (
        <div className="flex gap-4">
          <div className="relative aspect-video w-64 shrink-0 overflow-hidden rounded-xl bg-muted">
            <img
              src={video?.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {videoDuration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                {videoDuration}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 py-1 pr-8">
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
              {video.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{video.views}</span>
              <span>•</span>
              <span>{videoPostedAt}</span>
            </div>
            <div className="flex items-center gap-2 py-2">
              {video.user?.picture && (
                <div
                  className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted hover:ring-2 hover:ring-primary transition-all"
                  onClick={handleAuthorClick}
                >
                  <img
                    src={video.user?.picture}
                    alt={video.user?.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <span
                className="text-xs text-muted-foreground hover:text-foreground"
                onClick={handleAuthorClick}
              >
                {video.user?.name}
              </span>
            </div>
            {video?.description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">{video.description}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <img
              src={video?.thumbnail}
              alt={video.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {video?.duration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                {videoDuration}
              </div>
            )}
          </div>
          <div className="flex gap-3 px-1 pr-8">
            {video.user?.picture && (
              <div
                className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted hover:ring-2 hover:ring-primary transition-all"
                onClick={handleAuthorClick}
              >
                <img
                  src={video.user?.picture}
                  alt={video.author}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                {video.title}
              </h3>
              <div className="flex flex-col text-xs text-muted-foreground">
                <span className="hover:text-foreground" onClick={handleAuthorClick}>
                  {video.user?.name}
                </span>
                <span>
                  {video.views} • {videoPostedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
