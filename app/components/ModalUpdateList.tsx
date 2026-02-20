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
    <div className="modal modal-open modal-bottom sm:modal-middle transition-all duration-300">
      <div className="modal-box bg-base-100 border border-base-300 shadow-2xl">
        <h3 className="josefin-sans text-xl font-bold mb-4 text-base-content">
          Update Task
        </h3>

        <div className="form-control w-full">
          <input
            autoFocus
            type="text"
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="input input-bordered w-full bg-base-200 focus:input-primary text-base-content josefin-sans"
            placeholder="Edit your task..."
          />
        </div>

        <div className="modal-action gap-3">
          <button
            onClick={() => setEditingToDo(null)}
            className="btn btn-ghost text-base-content/60 hover:bg-base-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn btn-primary px-8 text-white font-bold"
          >
            Update
          </button>
        </div>
      </div>

      <div
        className="modal-backdrop bg-black/40 backdrop-blur-sm"
        onClick={() => setEditingToDo(null)}
      >
        <button>close</button>
      </div>
    </div>
  );
};

export default ModalUpdateList;
