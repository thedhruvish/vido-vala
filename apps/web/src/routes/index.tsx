import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { VideoCard } from "@vido-vala/ui/components/video-card";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/")({
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

const DUMMY_VIDEOS = [
  {
    id: "1",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60",
    title: "Mastering React and TanStack Router in 2024",
    author: "VidoVala Dev",
    views: "1.2M views",
    postedAt: "2 days ago",
    duration: "15:45",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "2",
    thumbnail:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    title: "The Ultimate Guide to Drizzle ORM with PostgreSQL",
    author: "Code Master",
    views: "450K views",
    postedAt: "1 week ago",
    duration: "22:10",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "3",
    thumbnail:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60",
    title: "Why You Should Use Tailwind CSS for Everything",
    author: "Design Pros",
    views: "890K views",
    postedAt: "3 weeks ago",
    duration: "10:30",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "4",
    thumbnail:
      "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&auto=format&fit=crop&q=60",
    title: "Building a Full-stack YouTube Clone with Mono-repo",
    author: "Web Wizards",
    views: "2.1M views",
    postedAt: "1 month ago",
    duration: "1:45:20",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "5",
    thumbnail:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=800&auto=format&fit=crop&q=60",
    title: "The Future of Web Development is Serverless",
    author: "Tech Insider",
    views: "156K views",
    postedAt: "5 hours ago",
    duration: "12:15",
    authorAvatar: "https://github.com/shadcn.png",
  },
  {
    id: "6",
    thumbnail:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60",
    title: "Top 10 VS Code Extensions You Need in 2024",
    author: "Dev Tools",
    views: "2M views",
    postedAt: "2 months ago",
    duration: "08:50",
    authorAvatar: "https://github.com/shadcn.png",
  },
];

function HomeComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pb-10">
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
          {DUMMY_VIDEOS.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
          {/* Duplicate to fill the grid */}
          {DUMMY_VIDEOS.map((video) => (
            <VideoCard key={video.id + "-copy"} {...video} />
          ))}
          {DUMMY_VIDEOS.map((video) => (
            <VideoCard key={video.id + "-copy-2"} {...video} />
          ))}
        </div>
      </main>
    </div>
  );
}
