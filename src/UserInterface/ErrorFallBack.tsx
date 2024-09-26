import { FallbackProps } from "react-error-boundary";
import {
  CustomCard,
  CustomCardBody,
  CustomCardTitle,
} from "./ReusableComponents/CustomCard";
import { CustomButton } from "./ReusableComponents/CutomButton";
import HeadingElement from "./ReusableComponents/HeadingElement";

function ErrorFallBack({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <section className="h-[90%] place-content-center">
      <CustomCard size={"large"}>
        <CustomCardTitle>
          <HeadingElement heading={"h3"} className="pt-3">
            An error has occurred
          </HeadingElement>
        </CustomCardTitle>
        <CustomCardBody className="flex flex-col gap-4">
          <HeadingElement heading={"h4"} className="text-rose-gold-300">
            {error.message}
          </HeadingElement>
          <CustomButton onClick={resetErrorBoundary}>Try again</CustomButton>
        </CustomCardBody>
      </CustomCard>
    </section>
  );
}

export default ErrorFallBack;
