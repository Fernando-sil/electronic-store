import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import CustomLink from "./ReusableComponents/CustomLink";
import { FaHome } from "react-icons/fa";
import { CustomButton } from "./ReusableComponents/CutomButton";
import { useLogout } from "../Queries/Authentication/useLogout";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

type TUrl = "/" | "/login" | "/yourCart" | "/products" | "/admin";
const activeProps = {
  default: "underline",
  primary: "bg--gold-400",
  secondary: "bg-secondary-blue-400",
  accent: "bg-rose-gold-500",
};

const linkStyle =
  "hover:text-text-color-100 h-full px-2 before:-z-20 before:rounded-md before:absolute before:top-0 before:left-0 before:h-0 hover:before:w-full hover:before:bg-gradient-to-b from-dark-blue-500/60 to-secondary-blue-100/40 before:transition-all before:ease-in-out hover:before:duration-[1000ms] before:transform hover:before:h-full";
const linkStyleActive =
  "text-text-color-100 h-full px-2 after:-z-10 after:rounded-md after:absolute after:top-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-b from-dark-blue-500/60 to-secondary-blue-100/40";

function Navbar() {
  const path = useLocation({ select: (location) => location.pathname });
  const navigate = useNavigate({ from: path });
  const user = useContext(UserContext);
  const { logout, isPending } = useLogout();

  return (
    <nav className="flex justify-between items-center px-10 py-5 border-b-2 border-text-color-700">
      <h1 className="text-gold-500 text-5xl">Cyber Warehouse</h1>
      <ul className="flex gap-4 items-center h-full">
        <li>
          <Link to="/">
            {({ isActive }) => (
              <CustomLink
                linkStyle="accent"
                variant="button"
                className={`${isActive && activeProps.accent}`}
              >
                {isActive && <FaHome />} Home
              </CustomLink>
            )}
          </Link>
        </li>
        <NavBarItem url="/products">Products</NavBarItem>
        <NavBarItem url="/yourCart">Your Cart</NavBarItem>
        {user.user?.role === "Admin" && (
          <NavBarItem url="/admin">Admin Area</NavBarItem>
        )}
        {user.user?.userName === "" && (
          <NavBarItem url="/login">Log in</NavBarItem>
        )}
        {user.user?.userName !== "" && (
          <CustomButton
            size="variable"
            className="py-1 px-3"
            onClick={() => {
              logout();
              if (path !== "/") {
                navigate({ to: "/login" });
              }
            }}
            disabled={isPending}
          >
            Log out
          </CustomButton>
        )}
      </ul>
    </nav>
  );
}

function NavBarItem({
  url,
  children,
}: {
  url: TUrl;
  children: React.ReactNode;
}) {
  return (
    <li className="relative h-full place-content-center">
      <Link
        className={linkStyle}
        to={url}
        activeProps={{ className: `${linkStyleActive}` }}
      >
        {children}
      </Link>
    </li>
  );
}

export default Navbar;
