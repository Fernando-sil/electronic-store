import { createFileRoute } from "@tanstack/react-router";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { TIcons } from "../../../Types/Types";
import ActionArea from "../../../UserInterface/ActionArea";

const icons: TIcons = [
  {
    icon: <IoMdAdd />,
    label: "Add brands",
    to: "/admin/brands/addBrands",
  },
  {
    icon: <TbEdit />,
    label: "Edit brands",
    to: "/admin/brands/editBrands",
  },
];

export const Route = createFileRoute("/admin/brands/")({
  component: () => <ActionArea icons={icons} />,
});
