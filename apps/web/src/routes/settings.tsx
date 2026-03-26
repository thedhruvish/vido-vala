import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Button } from "@vido-vala/ui/components/button";

export const Route = createFileRoute("/settings")({
  component: SettingsComponent,
});

const SETTINGS_MENU = [{ icon: User, label: "Account" }];

function SettingsComponent() {
  return (
    <div className="px-4 pb-10">
      <div className="max-w-4xl mx-auto pt-6">
        <h1 className="text-2xl font-bold px-4 mb-8">Settings</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-64 flex flex-col gap-1">
            {SETTINGS_MENU.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className="justify-start gap-4 rounded-lg px-4 h-11 font-medium"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Button>
            ))}
          </div>

          <div className="flex-1 px-4">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Choose how you appear and what you see on VidoVala
            </p>

            <div className="flex flex-col gap-8">
              <section className="flex flex-col gap-4">
                <h3 className="font-bold">Your Channel</h3>
                <p className="text-sm text-muted-foreground">
                  This is your public presence on VidoVala. You need a channel to upload your own
                  videos, comment on videos, or create playlists.
                </p>
                <div className="flex items-center gap-4 py-2">
                  <div className="h-20 w-20 rounded-full bg-muted overflow-hidden">
                    <img
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-lg">VidoVala User</span>
                    <Button variant="link" className="p-0 h-auto justify-start text-blue-500">
                      Edit on Google
                    </Button>
                  </div>
                </div>
              </section>

              <hr className="border-muted" />

              <section className="flex flex-col gap-4">
                <h3 className="font-bold">Account settings</h3>
                <p className="text-sm text-muted-foreground">
                  View or change your account settings
                </p>
                <Button variant="link" className="p-0 h-auto justify-start text-blue-500">
                  Google Account
                </Button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
