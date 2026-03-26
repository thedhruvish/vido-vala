import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { createFileRoute, Outlet, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_p")({
  component: RouteComponent,
});

function RouteComponent() {
  const { pathname } = useLocation();
  const isVideoPage = pathname.startsWith("/video/");
  return (
    <>
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {!isVideoPage && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
