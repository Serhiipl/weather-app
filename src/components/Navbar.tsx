import React from "react";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="top-0 left-0 sticky z-50 shadow-sm">
      <div className="flex justify-between items-center w-full h-[5rem] max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          {/* чого не H1? */}
          <h2 className="text-gray-500 text-3xl"> Weather</h2>
        </p>
      </div>
    </nav>
  );
}
