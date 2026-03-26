import { createFileRoute } from "@tanstack/react-router";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Button } from "@vido-vala/ui/components/button";
import { useVideosQuery } from "@/api/videos-api";
import Loader from "@/components/loader";
import { formatPostedAt } from "@/lib/format-posted-at";

export const Route = createFileRoute("/_p/")({
  component: HomeComponent,
});

function HomeComponent() {
  const navigator = Route.useNavigate();
  const { data: resData, isPending, error } = useVideosQuery();
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
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {resData?.videos?.map((video: any) => (
          <VideoCard
            key={video.id}
            id={String(video.id)}
            video={video}
            onVideoClick={() =>
              navigator({
                to: "/video/$videoId",
                params: {
                  videoId: video.id,
                },
              })
            }
            onAuthorClick={() =>
              navigator({
                to: "/user/$username",
                params: {
                  username: video.user?.userName,
                },
              })
            }
            videoPostedAt={formatPostedAt(video.created_at)}
          />
        ))}
        {resData?.videos?.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-xl font-semibold">No videos found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
