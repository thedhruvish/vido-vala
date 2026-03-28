import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Bell,
  Video,
  User,
  Menu,
  Mic,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";
import { Input } from "@vido-vala/ui/components/input";
import { useSidebar } from "../hooks/use-sidebar";
import { useAuthStore } from "../hooks/use-auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
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
  const { isAuthenticated, user, openAuthModal, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleProtectedAction = (action: () => void) => {
    if (isAuthenticated) {
      action();
    } else {
      openAuthModal();
    }
  };

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
        <Button
          variant="ghost"
          size="icon"
          className="hidden sm:flex rounded-full"
          onClick={() => handleProtectedAction(() => navigate({ to: "/upload" }))}
        >
          <Video className="h-5 w-5" />
        </Button>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full">
                  <Bell className="h-5 w-5" />
                </Button>
              }
            >
              Open
            </DropdownMenuTrigger>
            <DropdownMenuContent className={"w-75"}>
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-bold p-3 text-base">
                  Notifications
                </DropdownMenuLabel>
                {notifications.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                  >
                    <span className="text-sm line-clamp-2">{n.text}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex rounded-full"
            onClick={openAuthModal}
          >
            <Bell className="h-5 w-5" />
          </Button>
        )}

        {isAuthenticated && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full overflow-hidden ml-1 p-0"
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              }
            >
              Open Profile Menu
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="flex items-center gap-3 p-3">
                  <div className="h-10 w-10 overflow-hidden rounded-full shrink-0">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="font-semibold truncate">{user.name}</span>
                    <span className="text-xs text-muted-foreground truncate">@{user.userName}</span>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => navigate({ to: `/user/${user.userName}` })}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Your channel</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="ghost" size="icon" className="rounded-full ml-1" onClick={openAuthModal}>
            <User className="h-5 w-5" />
          </Button>
        )}
      </div>
    </header>
  );
}
