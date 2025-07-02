// src/components/SaveClerkUserIdToStorage.tsx
"use client"

import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

export const SaveClerkUserIdToStorage = () => {
  const { user } = useUser()

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem("clerk-user-id", user.id)
    }
  }, [user?.id])

  return null
}
