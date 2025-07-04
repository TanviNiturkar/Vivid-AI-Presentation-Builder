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
      aria-hidden="true"
      className={cn(
        'transition-all duration-300 ease-in-out border-0 rounded-full',
        isSidebar ? 'my-2 min-h-[1.5px]' : 'my-6 h-[2px]',
        'hover:scale-[1.01]',
        className
      )}
      style={{
        backgroundColor: currentTheme.accentColor || '#999',
        opacity: 0.8
      }}
    />
  )
}

export default Divider
