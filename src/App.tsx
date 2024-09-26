import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { CartContext } from "./Context/CartContext";

import ErrorFallBack from "./UserInterface/ErrorFallBack";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient, user: undefined!, cart: undefined! },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
function App() {
  const user = useContext(UserContext);
  const cart = useContext(CartContext);
  const { reset } = useQueryErrorResetBoundary();
  return (
    <>
      <RouterProvider
        router={router}
        context={{ queryClient, user, cart }}
        defaultErrorComponent={({ error }) => (
          <ErrorFallBack error={error} resetErrorBoundary={reset} />
        )}
      />
    </>
  );
}

export default App;
