import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

type Props = {
  code?: string
  language?: string
  onChange: (newCode: string) => void
  className?: string
  isSidebar?: boolean
}

const CodeBlock = ({ code, language, onChange, className, isSidebar = false }: Props) => {
  const { currentTheme } = useSlideStore()

  return (
    <div
      className={cn(
        'relative w-full rounded-xl shadow-inner overflow-hidden border',
        isSidebar && 'text-[0.6rem] min-h-[80px]',
        className
      )}
      style={{
        backgroundColor: currentTheme.accentColor + '20',
        borderColor: currentTheme.accentColor + '50',
      }}
    >
      {language && (
        <div
          className={cn(
            'font-semibold border-b',
            isSidebar ? 'px-2 py-0.5 text-[0.55rem]' : 'px-3 py-1 text-xs'
          )}
          style={{
            color: currentTheme.fontColor,
            borderColor: currentTheme.accentColor + '50',
          }}
        >
          {language.toUpperCase()}
        </div>
      )}

      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'w-full resize-none bg-transparent font-mono outline-none',
          isSidebar ? 'min-h-[80px] p-2 text-[0.6rem]' : 'min-h-[150px] p-4 text-sm'
        )}
        style={{
          color: currentTheme.fontColor,
          lineHeight: '1.5',
        }}
        placeholder="Enter your code here..."
      />
    </div>
  )
}

export default CodeBlock
