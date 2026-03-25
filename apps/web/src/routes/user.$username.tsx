import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Button } from "@vido-vala/ui/components/button";
import { Search, Share2, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/user/$username")({
  component: UserLayout,
});

function UserLayout() {
  const { username } = Route.useParams();

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Banner */}
      <div className="w-full aspect-[6/1] overflow-hidden bg-muted">
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&auto=format&fit=crop&q=80"
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* User Info Section */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-32 w-32 sm:h-40 sm:w-40 shrink-0 overflow-hidden rounded-full border-4 border-background bg-muted">
            <img
              src="https://github.com/shadcn.png"
              alt={username}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <h1 className="text-3xl sm:text-4xl font-bold">{username}</h1>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">@{username.toLowerCase()}</span>
              <span>•</span>
              <span>1.2M subscribers</span>
              <span>•</span>
              <span>154 videos</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 max-w-2xl mt-1">
              Welcome to my channel! I share tutorials about web development, focusing on React,
              TypeScript, and modern tools. Subscribe for weekly updates!
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <Button variant="default" className="rounded-full px-6">
                Subscribe
              </Button>
              <Button variant="secondary" className="rounded-full px-4 gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="secondary" size="icon" className="rounded-full">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 border-b mt-8 overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link
            to="/user/$username"
            params={{ username }}
            className="pb-3 text-sm font-semibold border-b-2 transition-colors border-transparent text-muted-foreground hover:text-foreground [&.active]:border-foreground [&.active]:text-foreground"
            activeOptions={{ exact: true }}
          >
            Home
          </Link>
          <Link
            to="/user/$username/videos"
            params={{ username }}
            className="pb-3 text-sm font-semibold border-b-2 transition-colors border-transparent text-muted-foreground hover:text-foreground [&.active]:border-foreground [&.active]:text-foreground"
          >
            Videos
          </Link>
          <Link
            to="/user/$username/about"
            params={{ username }}
            className="pb-3 text-sm font-semibold border-b-2 transition-colors border-transparent text-muted-foreground hover:text-foreground [&.active]:border-foreground [&.active]:text-foreground"
          >
            About
          </Link>
          <div className="flex-1" />
          <button className="pb-3 text-muted-foreground">
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Child Routes */}
        <Outlet />
      </div>
    </div>
  );
}
