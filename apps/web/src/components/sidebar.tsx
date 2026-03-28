import { useNavigate, useLocation } from "@tanstack/react-router";
import { Home, History, Clock, ThumbsUp, Settings, Users } from "lucide-react";
import { cn } from "@vido-vala/ui/lib/utils";
import { useSidebar } from "../hooks/use-sidebar";
import { useAuthStore } from "../hooks/use-auth-store";

const sidebarItems = [
  { icon: Home, label: "Home", to: "/", isHeader: false, public: true },
  { icon: Users, label: "Subscriptions", to: "/subscriptions", public: false },
  { separator: true },
  { icon: History, label: "History", to: "/history", public: false },
  { icon: Clock, label: "Watch later", to: "/watch-later", public: false },
  { icon: ThumbsUp, label: "Liked videos", to: "/liked", public: false },
  { separator: true },
  { icon: Settings, label: "Settings", to: "/settings", public: false },
];

export function Sidebar({ className }: { className?: string }) {
  const { isOpen } = useSidebar();
  const { isAuthenticated, openAuthModal } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isOpen) {
    return null;
  }

  const handleNavigation = (to: string, isPublic: boolean) => {
    if (isPublic || isAuthenticated) {
      navigate({ to });
    } else {
      openAuthModal();
    }
  };

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
        const isActive = location.pathname === item.to;

        return (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.to!, !!item.public)}
            className={cn(
              "flex w-full items-center gap-4 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted active:bg-accent text-left transition-colors",
              isActive && "bg-accent",
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="truncate">{item.label}</span>
          </button>
        );
      })}
    </aside>
  );
}
