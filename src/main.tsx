import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TokenProvider } from "./Context/TokenContext.tsx";
import { UserProvider } from "./Context/UserContext.tsx";
import { CartProvider } from "./Context/CartContext.tsx";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <CartProvider>
          <TokenProvider>
            <App />
            <ToastContainer
              position="top-center"
              autoClose={1000}
              closeOnClick
              transition={Bounce}
            />
          </TokenProvider>
        </CartProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>
);
