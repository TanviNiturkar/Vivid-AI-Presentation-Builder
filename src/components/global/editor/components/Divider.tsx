import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

type Props = {
  className?: string
  isSidebar?: boolean
}

const Divider = ({ className = '', isSidebar = false }: Props) => {
  const { currentTheme } = useSlideStore()

  return (
    <hr
      className={cn(
        'transition-all duration-300 ease-in-out border-0 rounded-full bg-opacity-70',
        isSidebar ? 'my-2 h-[1px]' : 'my-6 h-[2px]',
        'hover:scale-[1.02] hover:bg-opacity-100',
        className
      )}
      style={{ backgroundColor: currentTheme.accentColor }}
    />
  )
}

export default Divider
