import * as React from "react";
import { cn } from "../lib/utils";

interface VideoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  thumbnail: string;
  title: string;
  author: string;
  views: string;
  postedAt: string;
  duration?: string;
  authorAvatar?: string;
  variant?: "vertical" | "horizontal";
  description?: string;
  href?: string;
}

export function VideoCard({
  className,
  thumbnail,
  title,
  author,
  views,
  postedAt,
  duration,
  authorAvatar,
  variant = "vertical",
  description,
  href,
  ...props
}: VideoCardProps) {
  const content = (
    <>
      {variant === "horizontal" ? (
        <div className={cn("group flex cursor-pointer gap-4", className)} {...props}>
          <div className="relative aspect-video w-64 shrink-0 overflow-hidden rounded-xl bg-muted">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {duration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                {duration}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 py-1">
            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{views}</span>
              <span>•</span>
              <span>{postedAt}</span>
            </div>
            <div className="flex items-center gap-2 py-2">
              {authorAvatar && (
                <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-muted">
                  <img src={authorAvatar} alt={author} className="h-full w-full object-cover" />
                </div>
              )}
              <span className="text-xs text-muted-foreground hover:text-foreground">{author}</span>
            </div>
            {description && (
              <p className="line-clamp-2 text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </div>
      ) : (
        <div className={cn("group flex cursor-pointer flex-col gap-3", className)} {...props}>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            {duration && (
              <div className="absolute bottom-2 right-2 rounded bg-black/80 px-1 py-0.5 text-[10px] font-medium text-white">
                {duration}
              </div>
            )}
          </div>
          <div className="flex gap-3 px-1">
            {authorAvatar && (
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-muted">
                <img src={authorAvatar} alt={author} className="h-full w-full object-cover" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-foreground transition-colors group-hover:text-primary">
                {title}
              </h3>
              <div className="flex flex-col text-xs text-muted-foreground">
                <span className="hover:text-foreground">{author}</span>
                <span>
                  {views} • {postedAt}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return content;
}
