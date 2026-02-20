"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import { useToDoListStore } from "@/stores/useToDoListStore";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
import ToDoList from "./components/ToDoList";
import Sorting from "./components/Sorting";
import ModalUpdateList from "./components/ModalUpdateList";
import SearchInput from "./components/SearchInput";
import ModalDelete from "./components/ModalDelete";

const Page = () => {
  const { darkMode, setDarkMode } = useThemeStore();
  const [search, setSearch] = useState("");
  const [toDo, setToDo] = useState("");
  const [mounted, setMounted] = useState(false);

  const { toDoList, addToDoList, completedToDos, filter, clearCompletedToDos } =
    useToDoListStore();

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  if (!mounted) return null;

  // Logic Filter & Sort
  let list = toDoList.filter((item) => {
    if (filter === "active") return !completedToDos.includes(item.id);
    if (filter === "completed") return completedToDos.includes(item.id);
    return true;
  });

  const sortedToDoList = [...list].sort((a, b) => b.createdAt - a.createdAt);
  const finalList = sortedToDoList.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase()),
  );
  const itemsLeft = toDoList.filter(
    (toDo) => !completedToDos.includes(toDo.id),
  ).length;

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300 relative w-full">
      <ModalDelete />
      <ModalUpdateList />

      {/* 1. BACKGROUND HEADER (Desktop & Mobile) */}
      <div className="h-[200px] sm:h-[300px] w-full relative">
        <img
          src={darkMode ? "/bg-desktop-dark.png" : "/bg-desktop-light.png"}
          className="w-full h-full object-cover"
          alt="background"
        />
        <div
          className={`absolute inset-0 bg-linear-to-b mix-blend-multiply ${darkMode ? "from-[#3710BD]/90 to-[#A42395]/90" : "from-[#5596FF]/90 to-[#AC2DEB]/90"}`}
        ></div>
      </div>

      {/* 2. MAIN CONTENT AREA (Pusat Kendali) */}
      <div className="absolute top-0 left-0 w-full flex flex-col items-center px-6 pt-12 sm:pt-20">
        <div className="w-full max-w-[540px] flex flex-col gap-5 sm:gap-7">
          {/* HEADER */}
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-[10px] sm:tracking-[15px]">
              TODO
            </h1>
            <button
              onClick={setDarkMode}
              className="btn btn-ghost btn-circle text-white hover:bg-white/10"
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* INPUT FORM */}
          <form
            className="flex items-center gap-4 px-6 h-14 sm:h-16 bg-base-100 rounded-md shadow-xl border border-transparent focus-within:border-primary transition-all"
            onSubmit={(e) => {
              e.preventDefault();
              if (toDo.trim()) {
                addToDoList(toDo);
                setToDo("");
              }
            }}
          >
            <div className="size-5 sm:size-6 rounded-full border border-base-content/30 shrink-0"></div>
            <input
              type="text"
              placeholder="Create a new todo..."
              className="bg-transparent w-full focus:outline-none text-sm sm:text-lg text-base-content"
              value={toDo}
              onChange={(e) => setToDo(e.target.value)}
              autoComplete="off"
            />
          </form>

          {/* SEARCH INPUT */}
          <div className="shadow-lg">
            <SearchInput setSearch={setSearch} />
          </div>

          {/* TODO LIST SECTION */}
          <div className="bg-base-100 rounded-md shadow-2xl overflow-hidden border border-base-300 flex flex-col">
            <div className="max-h-[300px] sm:max-h-[450px] overflow-y-auto divide-y divide-base-300 custom-scrollbar">
              {finalList.length > 0 ? (
                finalList.map((toDo, index) => (
                  <ToDoList key={toDo.id} toDo={toDo} index={index} />
                ))
              ) : (
                <div className="p-10 text-center text-base-content/40">
                  No tasks found
                </div>
              )}
            </div>

            {/* DESKTOP FOOTER */}
            <div className="flex justify-between items-center p-4 sm:p-6 text-xs sm:text-sm text-base-content/50 font-medium">
              <span>{itemsLeft} items left</span>
              <div className="hidden md:block">
                <Sorting />
              </div>
              <button
                onClick={clearCompletedToDos}
                className="hover:text-error transition-colors"
              >
                Clear Completed
              </button>
            </div>
          </div>

          {/* MOBILE SORTING TAB (Hanya muncul di layar kecil) */}
          <div className="md:hidden flex justify-center p-4 bg-base-100 rounded-md shadow-md border border-base-300">
            <Sorting />
          </div>

          <p className="text-center text-xs sm:text-sm text-base-content/40 mt-6 pb-10">
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
