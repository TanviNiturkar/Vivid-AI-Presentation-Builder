// src/components/PromptResetOnUserChange.tsx

"use client";

import usePromptStore from "@/store/usePromtStore";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";


export const PromptResetOnUserChange = () => {
  const { user } = useUser();

  useEffect(() => {
    usePromptStore.getState().resetPrompts();
  }, [user?.id]);

  return null;
};
