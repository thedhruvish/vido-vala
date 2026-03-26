import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Video, Twitter, Linkedin, Globe } from "lucide-react";

export const Route = createFileRoute("/_auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center p-4 gap-8">
      {/* Website Logo */}
      <Link to="/" className="flex items-center gap-1 font-bold tracking-tighter">
        <div className="rounded bg-red-600 px-1.5 py-1 text-white">
          <Video className="h-7 w-7 fill-current" />
        </div>
        <span className="text-4xl">VidoVala</span>
      </Link>

      <div className="w-full max-w-md">
        <Outlet />
      </div>

      {/* Social Media Links */}
      <div className="flex items-center justify-center gap-6 border-t border-muted/50 pt-6 w-full max-w-md">
        <a
          href="https://x.com/dhruvishlathiya"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="X (Twitter)"
        >
          <Twitter className="h-5 w-5" />
        </a>
        <a
          href="https://linkedin.com/in/dhruvishlathiya"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://dhruvish.in"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Website"
        >
          <Globe className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}
