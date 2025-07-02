// app/page.tsx

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth(); // ✅ Await this because it's async

  if (userId) {
    redirect("/dashboard");
  } else {
    redirect("/sign-in");
  }
}
