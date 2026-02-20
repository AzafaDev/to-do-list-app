import { FilterType, useToDoListStore } from "@/stores/useToDoListStore";
import React from "react";

const Sorting = ({darkMode}: {darkMode: boolean}) => {
  const { filter, setFilter } = useToDoListStore();
  const sort = ["all", "active", "completed"];
  return (
    <div className="w-41.5 flex justify-between">
      {sort.map((item, index) => (
        <span
          key={index}
          className={`${item === filter && darkMode ? "text-blue-500" : darkMode ? "text-white" : "text-black"} cursor-pointer`}
          onClick={() => setFilter(item as FilterType)}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

export default Sorting;
