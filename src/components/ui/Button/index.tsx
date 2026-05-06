import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
} from "react-aria-components/Button";
import { composeTailwindRenderProps } from "@/lib/utils";

import { style } from "./styles";

interface ButtonProps extends AriaButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "inverted" | "player";
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Button(props: ButtonProps) {
  return (
    <AriaButton
      className={composeTailwindRenderProps(
        props.className,
        style({ variant: props.variant, size: props.size }),
      )}
      {...props}
    >
      {props.children}
    </AriaButton>
  );
}
