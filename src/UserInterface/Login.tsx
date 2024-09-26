import { FaUnlockAlt } from "react-icons/fa";
import {
  CustomCard,
  CustomCardBody,
  CustomCardHeader,
  CustomCardTitle,
} from "./ReusableComponents/CustomCard";
import { IconContext } from "react-icons";
import HeadingElement from "./ReusableComponents/HeadingElement";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <section className="h-full flex items-center">
      <CustomCard size="full">
        <div className="grid grid-cols-2">
          <CustomCard size="large" className="flex items-center justify-center">
            <HeadingElement role="heading">Welcome back!</HeadingElement>
          </CustomCard>
          <CustomCard size="large" cardColor="primary" className="shadow-md">
            <CustomCardHeader>
              <CustomCardTitle>
                <HeadingElement heading="h4">
                  Log into your account
                </HeadingElement>
              </CustomCardTitle>
              <CustomCardBody className="space-y-6">
                <IconContext.Provider
                  value={{
                    size: "6rem",
                    className: "mx-auto text-gold-700",
                  }}
                >
                  <FaUnlockAlt />
                </IconContext.Provider>
                <LoginForm />
                <div>
                  <p>Forgot password?</p>
                  <p>Don't have an account?</p>
                </div>
              </CustomCardBody>
            </CustomCardHeader>
          </CustomCard>
        </div>
      </CustomCard>
    </section>
  );
}

export default Login;
