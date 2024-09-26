import { FaComputer, FaListUl, FaUsers } from "react-icons/fa6";
import CustomGrid from "./ReusableComponents/CustomGrid";
import { IconContext } from "react-icons";
import { TbBrandApplePodcast } from "react-icons/tb";
import { PiBookmarksFill } from "react-icons/pi";
import { Link } from "@tanstack/react-router";
import { CustomCard, CustomCardBody } from "./ReusableComponents/CustomCard";
import HeadingElement from "./ReusableComponents/HeadingElement";

const icons = [
  { icon: <FaComputer />, label: "Products", to: "/admin/items" },
  { icon: <TbBrandApplePodcast />, label: "Brands", to: "/admin/brands" },
  { icon: <PiBookmarksFill />, label: "Categories", to: "/admin/categories" },
  { icon: <FaListUl />, label: "Specs", to: "/admin/specs" },
  { icon: <FaUsers />, label: "Users", to: "/admin/users/" },
];

function AdminArea() {
  return (
    <section>
      <CustomGrid numberOfCols={2} colGap={8}>
        <IconContext.Provider
          value={{ size: "250", className: "text-gold-500" }}
        >
          {icons.map((icon) => (
            <Link to={icon.to} key={icon.label}>
              <CustomCard
                cardColor="secondary"
                size="variable"
                className="flex justify-center rounded-full"
              >
                <CustomCardBody className="p-8">{icon.icon}</CustomCardBody>
              </CustomCard>
              <HeadingElement heading="h4" className="text-center">
                {icon.label}
              </HeadingElement>
            </Link>
          ))}
        </IconContext.Provider>
      </CustomGrid>
    </section>
  );
}

export default AdminArea;
