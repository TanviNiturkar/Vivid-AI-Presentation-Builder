"use client"

import React from 'react'
import { Project } from '@prisma/client'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { JsonValue } from '@prisma/client/runtime/library'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useSlideStore } from '@/store/useSlideStore'

type Props = {
  recentProjects: Project[]
}

const RecentOpen = ({ recentProjects }: Props) => {
  const router = useRouter()
  const { setSlides } = useSlideStore()

  const handleClick = (projectId: string, slides: JsonValue) => {
    if (!projectId || !slides) {
      toast.error('Project not found', {
        description: 'Please try again',
      })
      return
    }
    setSlides(JSON.parse(JSON.stringify(slides)))
    router.push(`/presentation/${projectId}`)
  }

  return recentProjects.length > 0 ? (
    <SidebarGroup>
      <SidebarGroupLabel className="text-sm font-semibold text-muted-foreground">
        Recently Opened
      </SidebarGroupLabel>
      <SidebarMenu>
        {recentProjects.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              className="group hover:bg-muted rounded-lg px-2 py-1 transition-all duration-200"
            >
              <Button
                variant="link"
                onClick={() => handleClick(item.id, item.slides)}
                className="text-sm font-medium text-left w-full truncate text-muted-foreground group-hover:text-primary group-hover:scale-[1.02] transition-all duration-200"
              >
                <span className="truncate">{item.title}</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  ) : null
}

export default RecentOpen
