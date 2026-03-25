import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { ThumbsUp } from "lucide-react";

export const Route = createFileRoute("/liked")({
  component: LikedComponent,
});

function LikedComponent() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto px-4 pb-10 flex flex-col items-center justify-center gap-4">
        <ThumbsUp className="h-20 w-20 text-muted-foreground" />
        <h1 className="text-2xl font-bold">Liked videos</h1>
        <p className="text-muted-foreground">You haven't liked any videos yet.</p>
      </main>
    </div>
  );
}
