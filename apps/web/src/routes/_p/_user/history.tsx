import { createFileRoute } from "@tanstack/react-router";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Trash2, Pause, Settings } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { useMyWatchHistoryQuery } from "@/api/watch-histories-api";
import Loader from "@/components/loader";

export const Route = createFileRoute("/_p/_user/history")({
  component: HistoryComponent,
});

function HistoryComponent() {
  const { data: history, isPending, error } = useMyWatchHistoryQuery();

  if (isPending) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-destructive">
        <p className="font-medium">Failed to load watch history.</p>
      </div>
    );
  }

  return (
    <div className="px-4 pb-10">
      <div className="flex flex-col lg:flex-row gap-8 pt-6 max-w-6xl mx-auto">
        <div className="flex-1 flex flex-col gap-6">
          <h1 className="text-3xl font-bold px-4">Watch history</h1>
          <div className="flex flex-col gap-4">
            {history?.length === 0 ? (
              <p className="px-4 text-muted-foreground mt-4">This list has no videos.</p>
            ) : (
              history?.map((entry: any) => (
                <VideoCard
                  key={entry.id}
                  id={String(entry.video?.id)}
                  thumbnail={
                    entry.video?.thumbnail ||
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60"
                  }
                  title={entry.video?.title}
                  author={entry.video?.user?.name || "Anonymous"}
                  views="0 views"
                  postedAt="Recently"
                  duration={
                    entry.video?.seconds
                      ? `${Math.floor(entry.video?.seconds / 60)}:${String(entry.video?.seconds % 60).padStart(2, "0")}`
                      : "00:00"
                  }
                  description={entry.video?.description}
                  authorAvatar={entry.video?.user?.picture || "https://github.com/shadcn.png"}
                  variant="horizontal"
                  className="px-4"
                />
              ))
            )}
          </div>
        </div>

        <div className="w-full lg:w-80 flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-2">
            <Button variant="ghost" className="justify-start gap-4 rounded-full px-4 h-11">
              <Trash2 className="h-5 w-5" />
              <span>Clear all watch history</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-4 rounded-full px-4 h-11">
              <Pause className="h-5 w-5" />
              <span>Pause watch history</span>
            </Button>
            <Button variant="ghost" className="justify-start gap-4 rounded-full px-4 h-11">
              <Settings className="h-5 w-5" />
              <span>Manage all history</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
