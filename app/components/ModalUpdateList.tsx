"use client";
import React, { useState, useEffect } from "react";
import { useToDoListStore } from "@/stores/useToDoListStore";

const ModalUpdateList = () => {
  const { editingToDo, setEditingToDo, updateToDo } = useToDoListStore();
  const [tempText, setTempText] = useState("");

  useEffect(() => {
    if (editingToDo) setTempText(editingToDo.text);
  }, [editingToDo]);

  if (!editingToDo) return null; 

  const handleSave = () => {
    if (tempText.trim()) {
      updateToDo(editingToDo.id, tempText);
      setEditingToDo(null); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-white dark:bg-[#25273D] rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <h2 className="josefin-sans text-xl font-bold mb-4 dark:text-white">Update Task</h2>
        
        <input
          autoFocus
          type="text"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-[#171823] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />

        <div className="flex justify-end gap-3">
          <button 
            onClick={() => setEditingToDo(null)}
            className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition-all active:scale-95"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateList;