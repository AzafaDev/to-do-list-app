"use client";
import { ToDoItem, useToDoListStore } from "@/stores/useToDoListStore";
import { X, MoreVertical, Edit2 } from "lucide-react";
import React from "react";

const ToDoList = ({ toDo }: { toDo: ToDoItem; index: number }) => {
  const {
    toggleToDo,
    completedToDos,
    setEditingToDo,
    deleteToDo,
    setDeletingToDo,
  } = useToDoListStore();
  const isCompleted = completedToDos.includes(toDo.id);

  return (
    <div
      className="group w-full min-h-[56px] sm:h-16 flex items-center px-4 sm:px-6 py-3 gap-3 sm:gap-6 border-b border-base-300 bg-base-100 hover:bg-base-200/50 transition-all cursor-pointer"
      onClick={() => toggleToDo(toDo.id)}
    >
      {/* CHECKBOX */}
      <div
        className={`flex-shrink-0 size-5 sm:size-6 rounded-full flex items-center justify-center transition-all border
        ${
          isCompleted
            ? "bg-gradient-to-br from-[#5596FF] to-[#AC2DEB] border-none"
            : "border-base-content/20"
        }`}
      >
        {isCompleted && (
          <img src="/check.png" className="w-full" alt="checked" />
        )}
      </div>

      {/* TEXT SECTION */}
      <div className="flex-1 min-w-0">
        <p
          className={`josefin-sans font-normal text-[14px] sm:text-[18px] leading-tight tracking-[-0.25px] truncate sm:whitespace-normal
          ${isCompleted ? "text-base-content/30 line-through" : "text-base-content"}`}
        >
          {toDo.text}
        </p>
      </div>

      {/* AREA ACTION */}
      <div className="flex items-center gap-1">
        {/* TOMBOL EDIT */}
        <button
          className="btn btn-ghost btn-sm sm:btn-xs text-primary font-bold px-2 sm:px-3"
          onClick={(e) => {
            e.stopPropagation();
            setEditingToDo(toDo);
          }}
        >
          <span className="hidden sm:inline">EDIT</span>
          <Edit2 size={16} className="sm:hidden" />
        </button>

        {/* DESKTOP DELETE */}
        <button
          className="hidden md:flex btn btn-ghost btn-xs btn-circle opacity-0 group-hover:opacity-100 transition-opacity text-base-content/40 hover:text-error"
          onClick={(e) => {
            e.stopPropagation();
            deleteToDo(toDo.id);
          }}
        >
          <X size={18} />
        </button>

        {/* MOBILE DELETE */}
        <button
          className="md:hidden btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-error"
          onClick={(e) => {
            e.stopPropagation();
            setDeletingToDo(toDo);
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
