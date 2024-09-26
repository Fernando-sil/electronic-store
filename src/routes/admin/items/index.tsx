import { createFileRoute } from "@tanstack/react-router";
import ActionArea from "../../../UserInterface/ActionArea";
import { TIcons } from "../../../Types/Types";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";

const icons: TIcons = [
  { icon: <IoMdAdd />, label: "Add new item", to: "/admin/items/addItem" },
  { icon: <TbEdit />, label: "Edit an item", to: "/admin/items/searchItem" },
];
// /admin/items/searchItem
export const Route = createFileRoute("/admin/items/")({
  component: () => <ActionArea icons={icons} />,
});
