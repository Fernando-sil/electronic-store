import { Outlet } from "@tanstack/react-router";

function AppLayout() {
  return (
    <main
      className="space-y-4 max-w-[1200px] mx-auto h-[100%] pb-10"
      id="modal"
    >
      <Outlet />
    </main>
  );
}

export default AppLayout;
