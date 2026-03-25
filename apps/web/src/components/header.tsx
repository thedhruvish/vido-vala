import { Link } from "@tanstack/react-router";
import { Search, Bell, Video, User, Menu, Mic } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { Input } from "@vido-vala/ui/components/input";
import { useSidebar } from "../hooks/use-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@vido-vala/ui/components/dropdown-menu";

const notifications = [
  {
    id: 1,
    text: "New video from VidoVala Dev: 'How to build an app'",
    time: "2 hours ago",
  },
  {
    id: 2,
    text: "Someone liked your comment on 'Tailwind CSS'",
    time: "5 hours ago",
  },
  { id: 3, text: "New subscriber: CodeWizard!", time: "1 day ago" },
  { id: 4, text: "Weekly analytics are ready to view.", time: "2 days ago" },
];

export default function Header() {
  const { toggle } = useSidebar();

  return (
    <header className="sticky top-0 z-50 flex h-14 w-full shrink-0 items-center justify-between border-b bg-background px-4">
      <div className="flex items-center gap-4 shrink-0">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={toggle}>
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-1 font-bold tracking-tighter">
          <div className="rounded bg-red-600 px-1 py-0.5 text-white">
            <Video className="h-4 w-4 fill-current" />
          </div>
          <span className="text-xl">VidoVala</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center max-w-[720px] px-4">
        <div className="flex w-full items-center gap-2">
          <div className="flex w-full items-center flex-1">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-4 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search"
                className="h-10 w-full rounded-l-full border-r-0 pl-11 pr-5 focus-visible:ring-0 focus-visible:border-blue-500 focus-visible:relative z-10"
              />
            </div>
            <Button
              variant="secondary"
              className="h-10 rounded-r-full border border-l border-muted/30 px-5 bg-muted/20 hover:bg-muted/40 shrink-0 -ml-[1px]"
              title="Search"
            >
              <Search className="h-5 w-5 text-foreground" />
            </Button>
          </div>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-muted/20 hover:bg-muted/40 shrink-0 hidden sm:flex"
          >
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Link to="/upload">
          <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
            <Video className="h-5 w-5" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full" asChild>
              <button type="button">
                <Bell className="h-5 w-5" />
              </button>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="font-bold p-3 text-base">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[400px] overflow-y-auto no-scrollbar">
              {notifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                >
                  <span className="text-sm line-clamp-2">{n.text}</span>
                  <span className="text-xs text-muted-foreground">{n.time}</span>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link to="/settings">
          <Button variant="ghost" size="icon" className="rounded-full overflow-hidden ml-1">
            <User className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
