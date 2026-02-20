"use client";
import { useThemeStore } from "@/stores/useThemeStore";
import { useToDoListStore } from "@/stores/useToDoListStore";
import { Moon, Sun } from "lucide-react"; 
import React from "react";
import ToDoList from "./components/ToDoList";
import Sorting from "./components/Sorting";
import ModalUpdateList from "./components/ModalUpdateList";
import SearchInput from "./components/SearchInput";
import ModalDelete from "./components/ModalDelete";

const Page = () => {
  const { darkMode, setDarkMode } = useThemeStore();
  const [search, setSearch] = React.useState("");
  const [toDo, setToDo] = React.useState("");
  const { toDoList, addToDoList, completedToDos, filter, clearCompletedToDos } = useToDoListStore();

  // Logic filter & sort tetap sama
  let list = toDoList.filter((item) => {
    if (filter === "active") return !completedToDos.includes(item.id);
    if (filter === "completed") return completedToDos.includes(item.id);
    return true;
  });

  const sortedToDoList = [...list].sort((a, b) => b.createdAt - a.createdAt);

  const finalList = sortedToDoList.filter((item) =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const itemsLeft = toDoList.filter((toDo) => !completedToDos.includes(toDo.id)).length;

  return (
    <>
    <ModalDelete darkMode={darkMode}/>
      <ModalUpdateList />
      {/* Container Utama: Pakai min-h-screen dan w-full */}
      <div className={`w-full min-h-screen flex flex-col relative ${darkMode ? "bg-[#171823]" : "bg-[#FAFAFA]"}`}>
        
        {/* Konten Todo: Kita buat absolut-tengah tapi lebar responsive */}
        <div className="absolute w-full px-6 top-12 sm:top-20 md:top-39.5 left-0 z-10 flex flex-col items-center">
          <div className="w-full max-w-[540px] flex flex-col gap-6">
            
            {/* HEADER (TODO + TOGGLE) - Pindah ke dalam agar sejajar */}
            <div className="flex items-center justify-between w-full mb-4">
              <h1 className="font-josefin-sans font-bold text-white text-[28px] sm:text-[40px] leading-[100%] tracking-[10px] sm:tracking-[15px]">
                TODO
              </h1>
              <button onClick={setDarkMode} className="transition-transform active:scale-90">
                {darkMode ? <Sun className="text-white fill-white size-5 sm:size-6" /> : <Moon className="text-white fill-white size-5 sm:size-6" />}
              </button>
            </div>

            {/* CREATE NEW TODO */}
            <form className="w-full" onSubmit={(e) => e.preventDefault()}>
              <div className={`w-full h-12 sm:h-16 ${darkMode ? "bg-[#25273D]" : "bg-white"} flex items-center px-5 sm:p-6 gap-4 sm:gap-6 rounded shadow-md`}>
                <div className="size-5 sm:size-6 rounded-full border-2 border-gray-300 flex-shrink-0"></div>
                <input
                  type="text"
                  placeholder="Create a new todo..."
                  className={`w-full bg-transparent focus:outline-none josefin-sans text-[14px] sm:text-[18px] ${darkMode ? "text-white" : "text-black"}`}
                  onChange={(e) => setToDo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && toDo.trim()) {
                      addToDoList(toDo);
                      setToDo("");
                    }
                  }}
                  value={toDo}
                />
              </div>
            </form>

            <SearchInput setSearch={setSearch} darkMode={darkMode} />

            {/* LIST ITEMS */}
            <div className={`w-full ${darkMode ? "bg-[#25273D] text-white" : "bg-white"} rounded shadow-2xl overflow-hidden`}>
              <div className="w-full max-h-61 sm:max-h-112.5 overflow-y-auto">
                {finalList.map((toDo, index) => (
                  <ToDoList key={toDo.id} toDo={toDo} index={index} darkMode={darkMode} />
                ))}
              </div>

              {/* FOOTER */}
              <div className="w-full h-12 sm:h-16 flex justify-between items-center px-4 sm:px-6 text-[12px] sm:text-[14px] text-gray-500 border-t dark:border-gray-700">
                <span>{itemsLeft} items left</span>
                <div className="hidden md:block"> {/* Sorting muncul di tengah hanya di desktop */}
                  <Sorting darkMode={darkMode}/>
                </div>
                <span className="cursor-pointer hover:text-blue-500" onClick={clearCompletedToDos}>
                  Clear Completed
                </span>
              </div>
            </div>

            {/* MOBILE SORTING (Hanya muncul di HP) */}
            <div className={`md:hidden w-full h-12 flex justify-center items-center rounded shadow-md ${darkMode ? "bg-[#25273D]" : "bg-white"}`}>
              <Sorting darkMode={darkMode}/>
            </div>

            <p className="font-josefin-sans text-center text-[#9495A5] text-xs sm:text-sm mt-4 sm:mt-10">
              Drag and drop to reorder list
            </p>
          </div>
        </div>

        {/* BACKGROUND IMAGE - Responsive height */}
        <div className="w-full h-[200px] sm:h-[300px] relative overflow-hidden">
          <img
            src={darkMode ? "/bg-desktop-dark.png" : "/bg-desktop-light.png"}
            className="w-full h-full object-cover"
            alt="background"
          />
          <div className={`w-full h-full absolute top-0 left-0 bg-gradient-to-b ${darkMode ? "from-[#3710BD]/90 to-[#A42395]/90" : "from-[#5596FF]/80 to-[#AC2DEB]/80"}`}></div>
        </div>
      </div>
    </>
  );
};

export default Page;