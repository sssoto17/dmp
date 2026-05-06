"use client";

import {
  SearchField,
  type SearchFieldProps,
  Input as AriaInput,
  InputProps,
  Group,
  Autocomplete,
  ListBox,
  ListBoxItem,
  Text,
  useAsyncList,
  Collection,
} from "react-aria-components";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";
import Spotify from "@/lib/Spotify";
import { handleSearch } from "@/lib/actions/search";
import { listenerCount } from "process";

interface SearchBarProps extends SearchFieldProps {
  placeholder?: string;
  icon?: ReactNode;
  action?: (payload: FormData) => void;
}

export default function SearchBar({
  placeholder,
  icon,
  isDisabled,
  ...props
}: SearchBarProps) {
  const result = useAsyncList({
    async load({ signal, filterText }) {
      const res = await handleSearch(filterText);
      return { items: res };
    },
  });

  return (
    <Autocomplete
      inputValue={result.filterText}
      onInputChange={result.setFilterText}
    >
      <SearchField aria-label="Search" {...props}>
        <Input placeholder={placeholder} isDisabled={isDisabled} icon={icon} />
      </SearchField>
      <SearchResults items={result.items} />
    </Autocomplete>
  );
}

function SearchResults({ items }) {
  return (
    <ListBox aria-label="Search results">
      {/* different kinds of list box items based on artist vs track vs album vs playlist */}
      <Collection items={items}>
        {(item: { id: string; name: string }) => (
          <ListBoxItem id={item.id} href={`/artist/${item.id}`}>
            <Text slot="label">{item.name}</Text>
            {/* <Text slot="description">{item.artists[0].name}</Text> */}
          </ListBoxItem>
        )}
      </Collection>
    </ListBox>
  );
}

function Input({ placeholder, isDisabled, icon }: SearchBarProps) {
  const {
    group,
    input,
    icon: iconStyle,
  } = fieldStyle({ disabled: isDisabled });

  return (
    <Group className={twMerge(group(), "rounded-full")}>
      <BaseInput
        placeholder={placeholder}
        className={input()}
        disabled={isDisabled}
      />
      {icon && <span className={iconStyle()}>{icon}</span>}
    </Group>
  );
}

function BaseInput({ disabled, ...props }: InputProps) {
  return <AriaInput {...props} disabled={disabled} />;
}

const fieldStyle = tv({
  slots: {
    group:
      "group flex items-center transition [-webkit-tap-highlight-color:transparent] hover:outline has-focus-within:outline",
    input: "flex-1 font-sans",
    icon: "",
  },
  variants: {
    color: {
      primary: {
        group:
          "bg-white outline-slate-100 selection:bg-fuchsia-400 selection:text-white has-focus-within:outline-slate-400",
        input: "text-slate-700 placeholder:text-slate-400",
        icon: "text-amber-700",
      },
    },
    size: {
      md: {
        group: "min-h-9 min-w-0 gap-2 rounded-sm p-2",
      },
    },
    border: {
      true: {
        group: "border border-slate-300",
      },
    },
    disabled: {
      true: {
        input: "text-slate-300 placeholder:text-slate-300",
        icon: "text-slate-400",
      },
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
    border: true,
  },
  compoundSlots: [
    {
      slots: ["group", "input", "icon"],
      class: "outline-0",
    },
  ],
  compoundVariants: [
    {
      disabled: true,
      border: true,
      class: {
        group: "border-slate-200",
      },
    },
  ],
});
