import { FaLaptop, FaHeadphones } from "react-icons/fa";
import { FaComputer, FaTabletScreenButton } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";

type TCategoryIcons = {
  [key: string]: JSX.Element;
};

export const CategoryIcons: TCategoryIcons = {
  Computers: <FaComputer />,
  Laptops: <FaLaptop />,
  Tablets: <FaTabletScreenButton />,
  "Headphones & Speakers": <FaHeadphones />,
  Cellphones: <MdOutlinePhoneIphone />,
};
