import { createFileRoute, redirect } from "@tanstack/react-router";
import AdminArea from "../../UserInterface/AdminArea";
import { GetUserSession } from "../../Services/BackEndCalls";
import { GetUserById } from "../../Queries/Authentication/GetUserOptions";

export const Route = createFileRoute("/admin/")({
  beforeLoad: async ({ context }) => {
    const UserSession = GetUserSession();
    if (UserSession === null) {
      throw redirect({ to: "/" });
    }
    if (UserSession.id === "") {
      throw redirect({ to: "/" });
    }
    const { data: user } = await context.queryClient.ensureQueryData(
      GetUserById(UserSession.id)
    );

    if (user.role !== "Admin") {
      throw redirect({ to: "/" });
    }
  },
  component: () => <AdminArea />,
});
