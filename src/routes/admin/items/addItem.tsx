import { createFileRoute } from "@tanstack/react-router";
import AddItem from "../../../UserInterface/AddItem";

export const Route = createFileRoute("/admin/items/addItem")({
  component: () => <AddItem />,
});
