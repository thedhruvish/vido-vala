import { Link } from "@tanstack/react-router";
import { Home, History, PlaySquare, Clock, ThumbsUp, Flame, Settings } from "lucide-react";
import { cn } from "@vido-vala/ui/lib/utils";
import { useSidebar } from "../routes/__root";

const sidebarItems = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Flame, label: "Trending", to: "/trending" },
  { separator: true },
  { icon: History, label: "History", to: "/history" },
  { icon: PlaySquare, label: "Your videos", to: "/my-videos" },
  { icon: Clock, label: "Watch later", to: "/watch-later" },
  { icon: ThumbsUp, label: "Liked videos", to: "/liked" },
  { separator: true },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export function Sidebar({ className }: { className?: string }) {
  const { isOpen } = useSidebar();

  if (!isOpen) {
    return (
      <aside
        className={cn(
          "flex w-16 flex-col items-center gap-4 px-2 py-4 no-scrollbar shrink-0",
          className,
        )}
      >
        {sidebarItems
          .filter((i) => i.icon && !i.isHeader && !i.separator)
          .slice(0, 4)
          .map((item, index) => {
            const Icon = item.icon!;
            return (
              <Link
                key={item.label}
                to={item.to!}
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-[10px] hover:bg-muted"
                activeProps={{ className: "bg-accent" }}
              >
                <Icon className="h-6 w-6" />
                <span className="truncate w-full text-center">{item.label}</span>
              </Link>
            );
          })}
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        "hidden w-64 flex-col gap-1 overflow-y-auto px-2 py-2 lg:flex no-scrollbar shrink-0",
        className,
      )}
    >
      {sidebarItems.map((item, index) => {
        if (item.separator) {
          return <hr key={index} className="my-2 border-muted" />;
        }
        if (item.isHeader) {
          return (
            <h3 key={index} className="px-3 py-2 text-sm font-semibold">
              {item.label}
            </h3>
          );
        }
        const Icon = item.icon!;
        return (
          <Link
            key={item.label}
            to={item.to!}
            className="flex items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted active:bg-accent"
            activeProps={{ className: "bg-accent" }}
          >
            <Icon className="h-5 w-5" />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
