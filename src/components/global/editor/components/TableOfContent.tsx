import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

type Props = {
  items: string[]
  onItemClick: (id: string) => void
  className?: string
  isSidebar?: boolean
}

const TableOfContent = ({ items, onItemClick, className, isSidebar = false }: Props) => {
  const { currentTheme } = useSlideStore()

  return (
    <nav
      className={cn(
        'space-y-2 p-4 rounded-xl shadow-md backdrop-blur bg-white/20 dark:bg-black/20',
        className,
        isSidebar && 'p-[6px] space-y-1 text-[0.65rem]' // ✅ Sidebar tweaks
      )}
      style={{ color: currentTheme.fontColor }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          onClick={() => onItemClick(item)}
          className={cn(
            `cursor-pointer rounded-md transition-all duration-200 
             hover:scale-[1.02] hover:shadow-md 
             hover:bg-white/30 dark:hover:bg-white/10 active:scale-[0.98]`,
            isSidebar ? 'px-[6px] py-[4px]' : 'px-4 py-2'
          )}
          style={{
            backgroundColor: currentTheme.backgroundColor + '10',
            border: `1px solid ${currentTheme.accentColor}20`,
          }}
        >
          {item}
        </div>
      ))}
    </nav>
  )
}

export default TableOfContent
