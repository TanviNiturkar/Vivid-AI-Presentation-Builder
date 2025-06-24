'use server'

import { currentUser } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"
import { User } from "@prisma/client"

type UserWithPurchases = User & {
  PurchasedProjects: { id: string }[]
}

type AuthResponse = 
  | { status: 200 | 201; user: UserWithPurchases }
  | { status: 400 | 403 | 500; user?: undefined }

export const onAuthenticateUser = async (): Promise<AuthResponse> => {
  try {
    const user = await currentUser()

    if (!user || !user.id) {
      throw new Error("Clerk user is null or missing ID")
    }

    const userExist = await client.user.findUnique({
      where: { clerkId: user.id },
      select: {
        id: true,
        clerkId: true,
        name: true,
        email: true,
        profileImage: true,
        subscription: true,
        PurchasedProjects: {
          select: { id: true },
        },
      },
    }) as UserWithPurchases

    if (userExist) return { status: 200, user: userExist }

    const email = user.emailAddresses?.[0]?.emailAddress || ""
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim()
    const profileImage = user.imageUrl || ""

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email,
        name,
        profileImage,
        subscription: false, // default false
      },
      select: {
        id: true,
        clerkId: true,
        name: true,
        email: true,
        profileImage: true,
        subscription: true,
        PurchasedProjects: {
          select: { id: true },
        },
      },
    }) as UserWithPurchases

    return { status: 201, user: newUser }

  } catch (error) {
    console.error('Authentication error:', error)
    return { status: 500 }
  }
}
