import { OutlineCard } from "@/lib/types";
import { set } from "date-fns";
import { create } from "zustand";
import { persist ,devtools} from "zustand/middleware";

type page = 'create'| 'creative-ai' | 'create-scratch'

type Prompt = {
    id : string 
    createdAt :  string
    title : string 
    outlines : OutlineCard[] | []
}
type PromptStore = {
    prompts: Prompt[] | []
    page : page
    setPage : (page:page)=> void
    addPrompt : (prompt : Prompt) => void
    removePrompt : (id: string) =>void
}
const usePromtStore = create<PromptStore>()(
    devtools(
        persist(
            (set)=> ({
     page: 'create',setPage :(page : page) => {
        set({page})
    },
    removePrompt:(id:string) => {
        set((state)=> ({
            prompts : state.prompts.filter((prompt : Prompt) => prompt.id !== id),

        }))
    },
    prompts : [],
    addPrompt : (prompt : Prompt) => {
        set((state)=> ({
            prompts : [prompt, ...state.prompts],
        }))
    }
,}),

    {name :'prompts' }
)))
export default usePromtStore