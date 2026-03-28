import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@vido-vala/ui/components/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { SidebarProvider } from "../hooks/use-sidebar";
import { AuthSyncer } from "../components/auth-syncer";
import { AuthModal } from "../components/auth-modal";

import appCss from "../index.css?url";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "VidoVala",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  component: RootDocument,
});

const queryClient = new QueryClient();

function RootDocument() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AuthSyncer />
          <html lang="en" className="dark">
            <head>
              <HeadContent />
            </head>
            <body className="overflow-hidden">
              <div className="flex h-svh flex-col">
                <Outlet />
              </div>
              <AuthModal />
              <Toaster richColors />
              <TanStackRouterDevtools position="bottom-left" />
              <Scripts />
            </body>
          </html>
        </SidebarProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}
