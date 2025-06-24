"use client";

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import React, { useEffect, useState } from 'react';
import NavMain from './nav-main';
import { data } from '@/lib/constants';
import { Project, User } from '@prisma/client';
import RecentOpen from './recent-open';
import NavFooter from './nav-footer';
import { useTheme } from 'next-themes';

const AppSidebar = ({
  recentProjects,
  user,
  hasUpgraded = false,
  ...props
}: {
  recentProjects: Project[];
  user: User;
  hasUpgraded?: boolean;
} & React.ComponentProps<typeof Sidebar>) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = theme === 'light';
  const logoSrc = isLight ? '/vividblack.png.png' : '/vivid.png';

  return (
    <Sidebar
      collapsible="icon"
      className="max-w-[225px] bg-gradient-to-b from-background to-background-90 shadow-lg transition-all duration-300"
      {...props}
    >
      <SidebarHeader className="pt-6 px-2 pb-0" />

      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-muted hover:scale-[1.02] transition-all duration-200 ease-in-out rounded-lg px-2"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
          <Avatar
            className={`rounded-full pl-2 shadow-md hover:scale-105 transition-transform duration-200 ${
              isLight ? 'w-10 h-7 bg-transparent pr-2 pb-0.5' : 'h-11 w-12'
            }`}
          >
            <AvatarImage src={logoSrc} />
            <AvatarFallback
              className={`rounded-lg text-foreground ${
                isLight ? 'bg-transparent' : 'bg-muted'
              }`}
            >
              VI
            </AvatarFallback>
          </Avatar>
        </div>
        <span className="truncate text-primary text-3xl font-semibold pl-0.5 tracking-tight">
          Vivid
        </span>
      </SidebarMenuButton>

      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain} />
        <RecentOpen recentProjects={recentProjects} />
      </SidebarContent>

      <SidebarFooter className="border-t border-border mt-2 pt-2">
        <NavFooter prismaUser={user} hasUpgraded={hasUpgraded} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
