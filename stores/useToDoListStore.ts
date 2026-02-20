import { create } from "zustand";

export type FilterType = "all" | "active" | "completed";

export interface ToDoItem {
  id: string;
  text: string;
  createdAt: number; 
}

interface ToDoListStore {
  toDoList: ToDoItem[];
  filter: FilterType;
  completedToDos: string[];
  editingToDo: ToDoItem | null;
  deletingToDo: ToDoItem | null;
  setDeletingToDo: (todo: ToDoItem | null) => void;
  setEditingToDo: (todo: ToDoItem | null) => void;
  setFilter: (filter: FilterType) => void;
  addToDoList: (text: string) => void;
  toggleToDo: (id: string) => void;
  clearCompletedToDos: () => void;
  updateToDo: (id: string, text: string) => void;
  deleteToDo: (id: string) => void;
}

export const useToDoListStore = create<ToDoListStore>((set) => ({
  toDoList: [
    { id: '1', text: "Javascript", createdAt: Date.now() },
    { id: '2', text: "TypeScript", createdAt: Date.now() + 1 },
    { id: '3', text: "React", createdAt: Date.now() + 2 },
    { id: '4', text: "NextJS", createdAt: Date.now() + 3 },
    { id: '5', text: "Express", createdAt: Date.now() + 4 },
    { id: '6', text: "Node", createdAt: Date.now() + 5 },
  ],
  completedToDos: [],
  filter: "all",
  editingToDo: null,
  deletingToDo: null,
  setDeletingToDo: (todo) => set({ deletingToDo: todo }),
  
  setFilter: (filter) => set({ filter }),

  addToDoList: (text) =>
    set((state) => ({
      toDoList: [
        ...state.toDoList,
        { id: Math.random().toString(36), text, createdAt: Date.now() },
      ],
    })),

  toggleToDo: (id) =>
    set((state) => {
      const isAlreadyCompleted = state.completedToDos.includes(id);
      return {
        completedToDos: isAlreadyCompleted
          ? state.completedToDos.filter((todoId) => todoId !== id)
          : [...state.completedToDos, id],
      };
    }),

  setEditingToDo: (todo) => set({ editingToDo: todo }),

  clearCompletedToDos: () =>
    set((state) => ({
      toDoList: state.toDoList.filter((todo) => !state.completedToDos.includes(todo.id)),
      completedToDos: [],
    })),

  updateToDo: (id, text) =>
    set((state) => ({
      toDoList: state.toDoList.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
    })),

  deleteToDo: (id) =>
    set((state) => ({
      toDoList: state.toDoList.filter((todo) => todo.id !== id),
      completedToDos: state.completedToDos.filter((todoId) => todoId !== id),
    })),
}));