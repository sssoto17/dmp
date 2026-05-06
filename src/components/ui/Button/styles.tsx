import { tv } from "tailwind-variants";

export const style = tv({
  base: "cursor-pointer font-semibold",
  variants: {
    variant: {
      primary: "bg-fuchsia-600 text-white",
      secondary: "",
      ghost: "",
      inverted: "",
      player: "aspect-square rounded-full",
    },
    size: {
      sm: "rounded-xs",
      md: "rounded-sm",
      lg: "",
      xl: "",
    },
    isDisabled: {
      true: "",
    },
    isPending: {
      true: "animate-pulse",
    },
  },
  compoundVariants: [
    {
      variant: "player",
      size: "xl",
      class: "mx-2 text-3xl",
    },
    {
      variant: "player",
      size: "lg",
      class: "text-2xl",
    },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
