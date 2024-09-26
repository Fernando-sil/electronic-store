import { createFileRoute } from "@tanstack/react-router";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { TIcons } from "../../../Types/Types";
import ActionArea from "../../../UserInterface/ActionArea";

const icons: TIcons = [
  {
    icon: <IoMdAdd />,
    label: "Add categories",
    to: "/admin/categories/addCategories",
  },
  {
    icon: <TbEdit />,
    label: "Edit categories",
    to: "/admin/categories/SearchCategory",
  },
];

export const Route = createFileRoute("/admin/categories/")({
  component: () => <ActionArea icons={icons} />,
});
