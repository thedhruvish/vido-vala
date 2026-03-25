import * as React from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@vido-vala/ui/components/sonner";

import Header from "../components/header";
import { Sidebar } from "../components/sidebar";
import { SidebarProvider } from "../hooks/use-sidebar";

import appCss from "../index.css?url";

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

function RootDocument() {
  const { pathname } = useLocation();
  const isVideoPage = pathname.startsWith("/video/");

  return (
    <SidebarProvider>
      <html lang="en" className="dark">
        <head>
          <HeadContent />
        </head>
        <body className="overflow-hidden">
          <div className="flex h-svh flex-col">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              {!isVideoPage && <Sidebar />}
              <main className="flex-1 overflow-y-auto">
                <Outlet />
              </main>
            </div>
          </div>
          <Toaster richColors />
          <TanStackRouterDevtools position="bottom-left" />
          <Scripts />
        </body>
      </html>
    </SidebarProvider>
  );
}
