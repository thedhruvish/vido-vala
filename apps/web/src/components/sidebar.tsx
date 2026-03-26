import { Link } from "@tanstack/react-router";
import { Home, History, Clock, ThumbsUp, Settings, Users } from "lucide-react";
import { cn } from "@vido-vala/ui/lib/utils";
import { useSidebar } from "../hooks/use-sidebar";

const sidebarItems = [
  { icon: Home, label: "Home", to: "/", isHeader: false },
  { icon: Users, label: "Subscriptions", to: "/subscriptions" },
  { separator: true },
  { icon: History, label: "History", to: "/history" },
  { icon: Clock, label: "Watch later", to: "/watch-later" },
  { icon: ThumbsUp, label: "Liked videos", to: "/liked" },
  { separator: true },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export function Sidebar({ className }: { className?: string }) {
  const { isOpen } = useSidebar();

  if (!isOpen) {
    return null;
  }

  return (
    <aside
      className={cn(
        "flex w-64 flex-col gap-1 overflow-y-auto px-2 py-2 no-scrollbar shrink-0 border-r",
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
