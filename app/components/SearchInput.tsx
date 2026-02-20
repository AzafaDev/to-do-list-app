import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({
  setSearch,
  darkMode,
}: {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  darkMode: boolean;
}) => {
  return (
    <div
      className={`w-full h-12 sm:h-16 ${
        darkMode ? "bg-[#25273D] border-gray-700" : "bg-white border-gray-100 shadow"
      } flex items-center px-5 sm:px-6 gap-4 sm:gap-6 rounded-t border-b transition-all`}
    >
      <Search className="size-5 sm:size-7 text-gray-400 flex-shrink-0" />
      
      <input
        type="text"
        className={`${
          darkMode ? "text-white" : "text-black"
        } w-full bg-transparent focus:outline-none text-[16px] sm:text-[20px] josefin-sans placeholder:text-gray-500`}
        placeholder="Search tasks..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;