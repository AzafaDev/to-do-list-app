import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({
  setSearch,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full h-12 sm:h-16 flex items-center px-5 sm:px-6 gap-4 sm:gap-6 rounded-t border-b border-base-300 bg-base-100 transition-all duration-300 shadow-sm">
      <Search className="size-5 sm:size-7 shrink-0 transition-colors duration-300 text-base-content/50" />

      <input
        type="text"
        spellCheck="false"
        className="input input-ghost w-full focus:bg-transparent focus:outline-none text-[16px] sm:text-[20px] josefin-sans p-0 text-base-content placeholder:text-base-content/40"
        placeholder="Search tasks..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
