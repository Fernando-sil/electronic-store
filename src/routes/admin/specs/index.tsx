import { createFileRoute } from "@tanstack/react-router";
import { IoMdAdd } from "react-icons/io";
import { TbEdit } from "react-icons/tb";
import { TIcons } from "../../../Types/Types";
import ActionArea from "../../../UserInterface/ActionArea";

const icons: TIcons = [
  {
    icon: <IoMdAdd />,
    label: "Add specs",
    to: "/admin/specs/addSpecs",
  },
  {
    icon: <TbEdit />,
    label: "Edit specs",
    to: "/admin/specs/editSpecs",
  },
];

export const Route = createFileRoute("/admin/specs/")({
  component: () => <ActionArea icons={icons} />,
});
