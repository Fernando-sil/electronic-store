import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { cva, VariantProps } from "cva";
import { cn } from "../../CN";

const starGeneratorStyles = cva("flex gap-1 items-center", {
  variants: {
    size: {
      small: "2rem",
      medium: "4rem",
      large: "8rem",
    },
    starColor: {
      primary: "text-gold-400",
      secondary: "text-secondaryblue-400",
      accent: "text-rose-gold-400",
    },
  },
  defaultVariants: {
    size: "small",
    starColor: "accent",
  },
});

export interface StarGeneratorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof starGeneratorStyles> {}

type Props = {
  score: number;
} & StarGeneratorProps;

function StarGenerator({ className, starColor, size, score, ...props }: Props) {
  const emptyStars = 5 - Math.ceil(score);

  return (
    <div
      className={cn(starGeneratorStyles({ size, starColor }), className)}
      {...props}
    >
      {Array.from({ length: Math.trunc(score) }, (_, i) => (
        <FaStar key={i} />
      ))}
      {Math.abs(Math.trunc(score) - score) > 0 && <FaStarHalfStroke />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
}

export default StarGenerator;
