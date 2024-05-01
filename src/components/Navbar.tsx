import React from "react";
import { ImLocation2 } from "react-icons/im";
import { MdMyLocation, MdWbSunny } from "react-icons/md";
import SearchBar from "./SearchBar";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="top-0 left-0 sticky z-50 shadow-sm bg-white">
      <div className="flex justify-between items-center w-full h-[5rem] max-w-7xl px-3 mx-auto">
        <div className="flex items-center justify-center gap-2">
          {/* чого не H1? */}
          <h2 className="text-gray-500 text-3xl"> Weather</h2>
          <MdWbSunny className="text-3xl mt-1 text-yellow-500" />
        </div>
        {/*  */}
        <section className="flex items-center gap-2">
          <MdMyLocation className="text-3xl text-gray-500 hover:opacity-80 cursor-pointer" />
          <ImLocation2 className="text-3xl text-gray-500 hover:opacity-80 cursor-pointer" />
          <p className="text-slate-900/80 text-lg">Poland</p>
          <div>
            {/* search */}
            <SearchBar value={""} onChange={undefined} onSubmit={undefined} />
          </div>
        </section>
      </div>
    </nav>
  );
}
