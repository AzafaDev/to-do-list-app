import { FilterType, useToDoListStore } from "@/stores/useToDoListStore";
import React from "react";

const Sorting = () => {
  const { filter, setFilter } = useToDoListStore();
  const sortOptions = ["all", "active", "completed"];

  return (
    <div className="flex gap-4 sm:gap-6 justify-center items-center font-bold text-[14px] josefin-sans">
      {sortOptions.map((item) => {
        const isActive = item === filter;

        return (
          <span
            key={item}
            onClick={() => setFilter(item as FilterType)}
            className={`
              cursor-pointer capitalize transition-all duration-300
              ${
                isActive
                  ? "text-primary scale-110"
                  : "text-base-content/50 hover:text-base-content"
              }
            `}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};

export default Sorting;
