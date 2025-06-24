// app/api/user/route.ts
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { client } from "@/lib/prisma"

export async function GET() {
  const { userId } =await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await client.user.findUnique({
    where: { clerkId: userId },
    include: {
      PurchasedProjects: true,
    },
  })

  return NextResponse.json(user)
}
