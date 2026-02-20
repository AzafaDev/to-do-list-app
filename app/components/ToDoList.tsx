"use client";
import { ToDoItem, useToDoListStore } from "@/stores/useToDoListStore";
import { X, MoreVertical } from "lucide-react";
import React from "react";

const ToDoList = ({
  toDo,
  darkMode,
}: {
  toDo: ToDoItem;
  index: number;
  darkMode: boolean;
}) => {
  const { toggleToDo, completedToDos, setEditingToDo, deleteToDo, setDeletingToDo } = useToDoListStore();
  const isCompleted = completedToDos.includes(toDo.id);

  return (
    <div
      className={`w-full min-h-[56px] sm:h-16 flex items-center px-5 sm:px-6 py-3 gap-4 sm:gap-6 border-b transition-colors group
      ${darkMode ? "border-gray-700 hover:bg-gray-800/50" : "border-gray-100 hover:bg-gray-50"} 
      cursor-pointer`}
      onClick={() => toggleToDo(toDo.id)}
    >
      {/* CHECKBOX */}
      <div 
        className={`flex-shrink-0 size-5 sm:size-6 rounded-full flex items-center justify-center transition-all
        ${isCompleted 
          ? 'bg-gradient-to-br from-[#5596FF] to-[#AC2DEB]' 
          : 'border-2 border-gray-300 dark:border-gray-600'}`}
      >
        {isCompleted && (
          <img src="/check.png" className="w-2.5 sm:w-3" alt="checked" />
        )}
      </div>

      {/* TEXT SECTION */}
      <div className="flex-1 min-w-0">
        <p 
          className={`josefin-sans font-normal text-[14px] sm:text-[18px] leading-tight tracking-[-0.25px] truncate sm:whitespace-normal
          ${isCompleted 
            ? 'text-gray-400 line-through' 
            : darkMode ? 'text-gray-200' : 'text-gray-700'}`}
          onDoubleClick={(e) => {
            e.stopPropagation(); 
            setEditingToDo(toDo);
          }}
        >
          {toDo.text}
        </p>
      </div>

      {/* AREA ACTION (HAPUS/EDIT) */}
      <div className="flex items-center gap-2">
        
        {/* DESKTOP: Muncul hanya saat Hover (X Button) */}
        <button 
          className="hidden md:block opacity-0 group-hover:opacity-100 transition-all duration-200 p-1 hover:scale-110"
          onClick={(e) => {
            e.stopPropagation(); // Biar list nggak ter-toggle (centang)
            deleteToDo(toDo.id);
          }}
        >
          <X className={`size-5 ${darkMode ? "text-gray-500 hover:text-red-400" : "text-gray-400 hover:text-red-500"}`} />
        </button>

        {/* MOBILE: Muncul Tombol Menu/Titik Tiga (Action Menu) */}
        <button 
          className="md:hidden p-2 active:bg-gray-200 dark:active:bg-gray-700 rounded-full transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setDeletingToDo(toDo);
          }}
        >
          <MoreVertical className={`size-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
        </button>

        {/* TOMBOL EDIT (TETAP ADA SEBAGAI OPSIONAL) */}
        <button 
          className={`hidden sm:block text-[10px] ${darkMode ? "text-gray-500 hover:text-blue-400" : "text-gray-400 hover:text-blue-500"} font-bold opacity-0 group-hover:opacity-100 transition-all`}
          onClick={(e) => {
            e.stopPropagation();
            setEditingToDo(toDo);
          }}
        >
          EDIT
        </button>
      </div>
    </div>
  );
};

export default ToDoList;