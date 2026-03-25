import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/watch-later")({
  component: WatchLaterComponent,
});

function WatchLaterComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pb-10 flex flex-col items-center justify-center gap-4">
        <Clock className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Watch Later</h1>
        <p className="text-muted-foreground">Your watch later list is empty.</p>
      </main>
    </div>
  );
}
