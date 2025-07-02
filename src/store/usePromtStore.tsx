// File: src/store/usePromptStore.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { OutlineCard } from "@/lib/types";

type Page = "create" | "creative-ai" | "create-scratch";

type Prompt = {
  id: string;
  createdAt: string;
  title: string;
  outlines: OutlineCard[] | [];
};

type PromptStore = {
  prompts: Prompt[];
  page: Page;
  setPage: (page: Page) => void;
  addPrompt: (prompt: Prompt) => void;
  removePrompt: (id: string) => void;
  resetPrompts: () => void;
};

const getUserScopedStorageKey = () => {
  if (typeof window === "undefined") return "prompts-guest";
  const id = localStorage.getItem("clerk-user-id");
  return `prompts-${id || "guest"}`;
};

const usePromptStore = create<PromptStore>()(
  devtools(
    persist(
      (set, get) => ({
        page: "create",
        prompts: [],
        setPage: (page) => set({ page }),
        addPrompt: (prompt) =>
          set((state) => ({ prompts: [prompt, ...state.prompts] })),
        removePrompt: (id) =>
          set((state) => ({
            prompts: state.prompts.filter((p) => p.id !== id),
          })),
        resetPrompts: () => set({ prompts: [] }),
      }),
      {
        name: getUserScopedStorageKey(),
      }
    )
  )
);

export default usePromptStore;
