"use client";

import Form from "next/form";
import { useActionState } from "react";
import { handleSearch } from "@/lib/actions/search";
import Link from "next/link";
import SearchBar from "./globals/SearchBar";
import { SearchIcon } from "lucide-react";

export default function Search() {
  // const [state, action, isPending] = useActionState(handleSearch, {});

  return (
    <section>
      {/* <Form action={action}> */}
      <SearchBar
        name="search"
        // defaultValue={state?.q}
        placeholder="Search"
        icon={<SearchIcon />}
        // action={action}
        // isRequired
        // isDisabled={isPending}
      />
      {/* </Form> */}
      {/* {isPending ? (
        <p>Loading...</p>
      ) : (
        <article>
          <SearchResult data={state?.artists?.items} />
          <SearchResult data={state?.albums?.items} />
          <SearchResult data={state?.tracks?.items} />
        </article>
      )} */}
    </section>
  );
}

function SearchResult({
  data,
}: {
  data: Record<string, string | number | undefined>[];
}) {
  if (!data) return;

  return (
    <ul>
      {data?.map(({ name, id }, index: number) => {
        return (
          <li key={index}>
            <h3>
              <Link href={`/artist/${id}`}>{name}</Link>
            </h3>
          </li>
        );
      })}
    </ul>
  );
}
