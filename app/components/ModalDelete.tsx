"use client";
import React from "react";
import { useToDoListStore } from "@/stores/useToDoListStore";
import { Trash2, AlertTriangle } from "lucide-react";

const ModalDelete = ({darkMode}: {darkMode: boolean}) => {
  const { deletingToDo, setDeletingToDo, deleteToDo } = useToDoListStore();

  if (!deletingToDo) return null;

  const confirmDelete = () => {
    deleteToDo(deletingToDo.id);
    setDeletingToDo(null); // Tutup modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-6">
      <div 
        className={`w-full max-w-sm ${darkMode ? "bg-[#25273D]" : "bg-white"} rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200`}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon Warning */}
          <div className="size-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="size-8 text-red-500" />
          </div>

          <h2 className={`josefin-sans text-xl font-bold mb-2 ${darkMode ? "text-white" : "text-black"}`}>
            Delete Task?
          </h2>
          
          <p className={`josefin-sans text-sm mb-6 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            Are you sure you want to delete <span className="font-bold text-red-500">"{deletingToDo.text}"</span>? This action cannot be undone.
          </p>

          <div className="flex w-full gap-3">
            <button 
              onClick={() => setDeletingToDo(null)}
              className={`flex-1 py-3 rounded-xl font-bold transition-colors ${
                darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Cancel
            </button>
            <button 
              onClick={confirmDelete}
              className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Trash2 className="size-4" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;