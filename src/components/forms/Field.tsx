import {
  type FieldErrorProps,
  FieldError as RACFieldError,
} from "react-aria-components/FieldError";
import { Group, type GroupProps } from "react-aria-components/Group";
import {
  type InputProps,
  Input as AriaInput,
} from "react-aria-components/Input";
import {
  TextField,
  type TextFieldProps,
} from "react-aria-components/TextField";
import {
  type LabelProps,
  Label as AriaLabel,
} from "react-aria-components/Label";
import { Text, type TextProps } from "react-aria-components/Text";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { composeTailwindRenderProps } from "@/lib/utils";

export function Label(props: LabelProps) {
  const styles =
    "font-sans text-sm text-neutral-600 dark:text-neutral-300 font-medium cursor-default w-fit";
  return <AriaLabel {...props} className={twMerge(styles, props.className)} />;
}

export function Input({ className, ...props }: InputProps) {
  const styles =
    "min-h-9 min-w-0 flex-1 border-0 bg-white px-3 py-0 font-sans text-sm text-neutral-800 outline outline-0 [-webkit-tap-highlight-color:transparent] placeholder:text-neutral-600 disabled:text-neutral-200 disabled:placeholder:text-neutral-200 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder:text-neutral-400 dark:disabled:text-neutral-600 dark:disabled:placeholder:text-neutral-600";
  return (
    <AriaInput
      {...props}
      className={composeTailwindRenderProps(className, styles)}
    />
  );
}

export function FieldGroup({ className, ...props }: GroupProps) {
  const variants = tv({
    base: "bg-slate-400",
  });

  const style = composeRenderProps(className, (className, renderProps) =>
    variants({ ...renderProps, className }),
  );

  return <Group {...props} className={style} />;
}

export default function Field({ placeholder }) {
  const styles = {
    default: "p-1 border border-slate-600 rounded-sm",
    error: "p-1 border border-rose-600 rounded-sm",
  };
  return (
    <FieldGroup>
      <Input placeholder={placeholder} />
    </FieldGroup>
  );
  //   return (
  //     <TextField
  //       {...props}
  //       className="col-span-2 grid grid-cols-subgrid"
  //       isDisabled={isDisabled}
  //     >
  //       <Label>{children}</Label>
  //       <AriaInput className={error ? styles["error"] : styles["default"]} />
  //     </TextField>
  //   );
}

// export function Description(props: TextProps) {
//   return <Text {...props} slot="description" className={twMerge('text-sm text-neutral-600', props.className)} />;
// }

// export function FieldError(props: FieldErrorProps) {
//   return <RACFieldError {...props} className={composeTailwindRenderProps(props.className, 'text-sm text-red-600 forced-colors:text-[Mark]')} />
// }

// export const fieldBorderStyles = tv({
//   base: 'transition',
//   variants: {
//     isFocusWithin: {
//       false: 'border-neutral-300 hover:border-neutral-400 dark:border-neutral-600 dark:hover:border-neutral-500 forced-colors:border-[ButtonBorder]',
//       true: 'border-neutral-600 dark:border-neutral-300 forced-colors:border-[Highlight]',
//     },
//     isInvalid: {
//       true: 'border-red-600 dark:border-red-600 forced-colors:border-[Mark]'
//     },
//     isDisabled: {
//       true: 'border-neutral-200 dark:border-neutral-700 forced-colors:border-[GrayText]'
//     }
//   }
// });

// export const fieldGroupStyles = tv({
// //   extend: focusRing,
//   base: 'group flex items-center h-9 box-border bg-white dark:bg-neutral-900 forced-colors:bg-[Field] border rounded-lg overflow-hidden transition',
// //   variants: fieldBorderStyles.variants
// });
