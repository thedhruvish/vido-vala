import { createFileRoute } from "@tanstack/react-router";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Button } from "@vido-vala/ui/components/button";
import { useVideosQuery } from "@/api/videos-api";
import Loader from "@/components/loader";

export const Route = createFileRoute("/_p/")({
  component: HomeComponent,
});

const CATEGORIES = [
  "All",
  "Music",
  "Gaming",
  "React",
  "Typescript",
  "Tailwind CSS",
  "Drizzle ORM",
  "Next.js",
  "TanStack Router",
  "Programming",
  "Live",
  "Podcasts",
  "Mixes",
  "News",
];

function HomeComponent() {
  const { data: videos, isPending, error } = useVideosQuery();

  if (isPending) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-destructive font-medium">Failed to load videos.</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-10">
      <div className="sticky top-0 z-40 bg-background py-3">
        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              size="sm"
              className="whitespace-nowrap rounded-lg px-3 py-1 font-medium"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {videos?.map((video: any) => (
          <VideoCard
            key={video.id}
            id={String(video.id)}
            thumbnail={
              video.thumbnail ||
              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
            }
            title={video.title}
            author={video.user?.name || "Anonymous"}
            views="0 views"
            postedAt="Just now"
            duration={
              video.seconds
                ? `${Math.floor(video.seconds / 60)}:${String(video.seconds % 60).padStart(2, "0")}`
                : "00:00"
            }
            authorAvatar={video.user?.picture || "https://github.com/shadcn.png"}
          />
        ))}
        {videos?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-xl font-semibold">No videos found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
