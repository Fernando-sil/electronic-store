import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRoute,
  Outlet,
  createRoute,
  createRouter,
  createMemoryHistory,
  RouterProvider,
} from "@tanstack/react-router";
import { UserContext } from "../Context/UserContext";
import { TLoginResponse } from "../Types/AuthenticationTypes";
import { render } from "@testing-library/react";

const queryClient = new QueryClient();
// const router = createRouter({
//   routeTree,
//   context: { queryClient, user: undefined!, cart: undefined! },
// });

function SetUser() {
  return jest.fn();
}

function createTestRouter(component: () => JSX.Element) {
  const rootRoute = createRootRoute({
    component: Outlet,
  });

  const componentRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/",
    component,
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([componentRoute]),
    history: createMemoryHistory(),
  });

  return router;
}

const userTest: TLoginResponse = {
  id: "dfsdgsfgsf",
  userName: "xvxcvxcvxc cvxvdd",
  emailAddress: "testEmail",
  confirmedEmail: false,
  role: "User",
  isActive: true,
  token: "fsdgwr45445ghd",
};
export function renderWithContext(component: () => JSX.Element) {
  const router = createTestRouter(component);
  return render(
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user: userTest, setUser: SetUser }}>
        {/* @ts-expect-error, router has changed type */}
        <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
export function withContext(component: () => JSX.Element) {
  const router = createTestRouter(component);
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={{ user: userTest, setUser: SetUser }}>
        {/* @ts-expect-error, router has changed type */}
        <RouterProvider router={router} />
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
