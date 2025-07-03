// src/components/global/upper-info-bar.tsx

import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { User } from '@prisma/client'
import React from 'react'
import SearchBar from './upper-info-searchbar'
import ThemeSwitcher from '../mode-toggle'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'
import NewProjectButton from './new-project-button'

type Props = {
  user: User
}

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-4">

        {/* Left: Sidebar + Search */}
        <div className="flex items-center gap-2 flex-grow min-w-0">
          <SidebarTrigger className="shrink-0" />
          <Separator orientation="vertical" className="h-4" />
          <div className="flex-grow min-w-[100px] max-w-full">
            <SearchBar />
          </div>
        </div>

        {/* Right: Theme toggle + Buttons */}
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <ThemeSwitcher />
          <Button
            className="bg-primary-80 rounded-lg hover:bg-background-80 text-primary font-semibold cursor-not-allowed"
            disabled
          >
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <NewProjectButton user={user} />
        </div>
      </div>
    </header>
  )
}

export default UpperInfoBar
