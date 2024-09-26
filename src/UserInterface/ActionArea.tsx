import { IconContext } from "react-icons";

import HeadingElement from "./ReusableComponents/HeadingElement";

import { CustomCard } from "./ReusableComponents/CustomCard";
import { Link } from "@tanstack/react-router";
import { TIcons } from "../Types/Types";

function ActionArea({ icons }: { icons: TIcons }) {
  return (
    <section className="space-y-3 text-center">
      <HeadingElement>Choose an action</HeadingElement>
      <div className="flex flex-wrap gap-8">
        <IconContext.Provider value={{ size: "200" }}>
          {icons.map((icon) => (
            <Link to={icon.to} className="space-y-1" key={icon.label}>
              <CustomCard className="rounded-full p-4" size="variable">
                {icon.icon}
              </CustomCard>
              <HeadingElement heading="h4">{icon.label}</HeadingElement>
            </Link>
          ))}
        </IconContext.Provider>
      </div>
    </section>
  );
}

export default ActionArea;
