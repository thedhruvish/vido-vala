import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@vido-vala/ui/components/button";
import { Share2 } from "lucide-react";

export const Route = createFileRoute("/user/$username/about")({
  component: UserAboutComponent,
});

function UserAboutComponent() {
  return (
    <div className="mt-6 flex flex-col lg:flex-row gap-10">
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Description</h2>
          <p className="text-sm whitespace-pre-wrap leading-relaxed">
            Welcome to my channel! I'm a passionate software engineer dedicated to sharing knowledge
            about the ever-evolving world of web development. On this channel, you'll find: • Deep
            dives into React and its ecosystem • Practical tutorials on TypeScript and modern
            JavaScript • Architecture patterns for scalable applications • Full-stack project builds
            from scratch New videos every Tuesday and Friday!
          </p>
        </div>
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Details</h2>
          <div className="flex flex-col gap-3">
            <div className="flex text-sm">
              <span className="w-32 text-muted-foreground">For business inquiries:</span>
              <span className="font-semibold text-blue-500">View email address</span>
            </div>
            <div className="flex text-sm">
              <span className="w-32 text-muted-foreground">Location:</span>
              <span>United States</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-80 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Stats</h2>
          <div className="flex flex-col gap-3 text-sm border-y py-4">
            <span>Joined Oct 12, 2020</span>
            <span>142,567,890 views</span>
            <span>154 videos</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Share2 className="h-5 w-5 text-muted-foreground" />
          <Button variant="ghost" size="sm" className="p-0 h-auto font-semibold">
            Report user
          </Button>
        </div>
      </div>
    </div>
  );
}
