"use client";
import React from "react";
import { useToDoListStore } from "@/stores/useToDoListStore";
import { Trash2, AlertTriangle } from "lucide-react";

const ModalDelete = () => {
  const { deletingToDo, setDeletingToDo, deleteToDo } = useToDoListStore();

  if (!deletingToDo) return null;

  const confirmDelete = () => {
    deleteToDo(deletingToDo.id);
    setDeletingToDo(null);
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle transition-all duration-300">
      <div className="modal-box bg-base-100 border border-base-300 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="size-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="size-8 text-error" />
          </div>

          <h3 className="josefin-sans text-xl font-bold mb-2 text-base-content">
            Delete Task?
          </h3>

          <p className="josefin-sans text-sm mb-6 text-base-content/60">
            Are you sure you want to delete{" "}
            <span className="font-bold text-error">"{deletingToDo.text}"</span>?
            This action cannot be undone.
          </p>

          <div className="modal-action w-full flex gap-3 mt-0">
            <button
              onClick={() => setDeletingToDo(null)}
              className="btn flex-1 bg-base-200 hover:bg-base-300 border-none text-base-content font-bold"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="btn btn-error flex-1 text-white font-bold gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal-backdrop bg-black/40 backdrop-blur-sm"
        onClick={() => setDeletingToDo(null)}
      >
        <button>close</button>
      </div>
    </div>
  );
};

export default ModalDelete;
