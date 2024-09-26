import { createFileRoute, redirect } from "@tanstack/react-router";
import Login from "../UserInterface/Login";
import { GetUserSession } from "../Services/BackEndCalls";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const userSession = GetUserSession();

    if (userSession !== null) {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Login />,
});
