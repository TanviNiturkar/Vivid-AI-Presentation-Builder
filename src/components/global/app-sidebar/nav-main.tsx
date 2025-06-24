"use client"

import React from 'react'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../../ui/sidebar'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const NavMain = ({
  items,
}: {
  items: {
    title: string
    url: string
    icon: React.FC<React.SVGProps<SVGSVGElement>>
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) => {
  const pathname = usePathname()

  return (
    <SidebarGroup className="p-0">
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname.includes(item.url)

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={`
                  group flex items-center justify-start gap-3 px-3 py-2 rounded-lg transition-all
                  duration-200 ease-in-out hover:bg-muted/50
                  ${isActive ? 'bg-muted font-semibold shadow-inner' : ''}
                `}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3 w-full text-base"
                >
                  <item.icon
                    className={`
                      size-5 transition-transform duration-200 group-hover:scale-110
                      ${isActive ? 'text-vivid' : 'text-muted-foreground'}
                    `}
                  />
                  <span
                    className={`transition-all duration-200 ${
                      isActive ? 'text-vivid' : 'text-muted-foreground'
                    } group-hover:text-foreground`}
                  >
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavMain
