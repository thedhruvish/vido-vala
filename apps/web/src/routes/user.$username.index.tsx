import { createFileRoute } from "@tanstack/react-router";
import { VideoCard } from "@vido-vala/ui/components/video-card";

export const Route = createFileRoute("/user/$username/")({
  component: UserHomeComponent,
});

const USER_VIDEOS = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    title: "Mastering React and TanStack Router in 2024",
    author: "VidoVala Dev",
    views: "1.2M views",
    postedAt: "2 days ago",
    duration: "15:45",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    title: "The Ultimate Guide to Drizzle ORM",
    author: "VidoVala Dev",
    views: "450K views",
    postedAt: "1 week ago",
    duration: "22:10",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    title: "Why You Should Use Tailwind CSS",
    author: "VidoVala Dev",
    views: "890K views",
    postedAt: "3 weeks ago",
    duration: "10:30",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    title: "Building a Full-stack YouTube Clone",
    author: "VidoVala Dev",
    views: "2.1M views",
    postedAt: "1 month ago",
    duration: "1:45:20",
  },
];

function UserHomeComponent() {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4">Featured Video</h2>
      <div className="flex flex-col lg:flex-row gap-6 bg-muted/30 rounded-xl p-4">
        <div className="aspect-video w-full lg:w-[424px] shrink-0 overflow-hidden rounded-xl bg-black">
          <img
            src={USER_VIDEOS[0].thumbnail}
            alt="Featured"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{USER_VIDEOS[0].title}</h3>
          <p className="text-sm text-muted-foreground">
            {USER_VIDEOS[0].views} • {USER_VIDEOS[0].postedAt}
          </p>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
            In this video, we deep dive into the latest features of TanStack Router and how to
            integrate it with React 19. We'll cover everything from basic routing to advanced search
            param validation.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Recent Uploads</h2>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {USER_VIDEOS.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </div>
  );
}
