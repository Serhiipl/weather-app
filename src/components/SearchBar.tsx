import { cn } from "@/utils/cn";
import React from "react";
import { IoSearch } from "react-icons/io5";

type SearchBarProps = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBar(props: SearchBarProps) {
  return (
    <form
      onSubmit={props.onSubmit}
      className={cn(
        "flex relative items-center justify-center h-8 sm:h-10",
        props.className
      )}
    >
      <input
        onChange={props.onChange}
        type="text"
        placeholder="Search location..."
        value={props.value}
        className="border-solid border-2 border-gray-400 rounded-l-md shadow-md transition
        focus:outline-none focus:border-zinc-600 px-4 py-2 w-60 h-full"
      />
      <button
        className="bg-green-700 h-full px-4 py-2 rounded-r-md text-white
      border-solid border-2 border-l-transparent border-gray-400 shadow-md transition
      hover:bg-green-600 focus:bg-green-900 whitespace-nowrap"
      >
        <IoSearch className="text-sm sm:text-lg " />
      </button>
    </form>
  );
}
