import { getRecentProjects } from "@/actions/project";
import { onAuthenticateUser } from "@/actions/user";
import AppSidebar from "@/components/global/app-sidebar";
import UpperInfoBar from "@/components/global/upper-info-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";

type Props = { children: React.ReactNode };

export default async function Layout({ children }: Props) {
  // ✅ Auth check
  const checkUser = await onAuthenticateUser();
  if (!checkUser?.user) redirect("/sign-in");

  const user = checkUser.user;
  const recentProjects = await getRecentProjects();

  // ✅ Use real DB value only — no cookie logic
  const hasUpgraded = user.subscription ?? false;

  return (
    <SidebarProvider>
      <AppSidebar
        user={user}
        recentProjects={recentProjects.data || []}
        hasUpgraded={hasUpgraded}
      />
      <SidebarInset>
        <UpperInfoBar user={user} />
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
