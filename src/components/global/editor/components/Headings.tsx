'use client'

import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect, useRef, forwardRef } from 'react'

interface HeadingProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
  styles?: React.CSSProperties
  isPreview?: boolean
  isSidebar?: boolean
}

const createHeading = (displayName: string, defaultClassName: string) => {
  const Heading = forwardRef<HTMLTextAreaElement, HeadingProps>(
    ({ styles, isPreview = false, isSidebar = false, className, ...props }, ref) => {
      const textareaRef = useRef<HTMLTextAreaElement>(null)
      const { currentTheme } = useSlideStore()

      useEffect(() => {
        const textarea = textareaRef.current
        if (textarea && !isPreview) {
          const adjustHeight = () => {
            textarea.style.height = '0'
            textarea.style.height = `${textarea.scrollHeight}px`
          }
          textarea.addEventListener('input', adjustHeight)
          adjustHeight()
          return () => textarea.removeEventListener('input', adjustHeight)
        }
      }, [isPreview])

      const editableClassName = !isPreview
        ? 'hover:ring-1 focus:ring-2 ring-blue-300 transition-all duration-200'
        : ''

      const sidebarOverrides = isSidebar
        ? 'font-semibold leading-snug text-[0.75rem]'
        : defaultClassName

      return (
        <textarea
          className={cn(
            'w-full bg-transparent placeholder:text-gray-400 focus:outline-none resize-none overflow-hidden',
            'transition-all duration-200',
            sidebarOverrides,
            editableClassName,
            className
          )}
          style={{
            padding: 0,
            margin: 0,
            boxSizing: 'content-box',
            minHeight: '1.2em',
            color: currentTheme.fontColor + 'DD',
            ...styles,
          }}
          ref={textareaRef}
          readOnly={isPreview}
          {...props}
        />
      )
    }
  )

  Heading.displayName = displayName
  return Heading
}

// ✅ Export themed headings with appropriate styles
const Heading1 = createHeading('Heading1', 'text-4xl leading-tight')
const Heading2 = createHeading('Heading2', 'text-3xl leading-snug')
const Heading3 = createHeading('Heading3', 'text-2xl leading-snug')
const Heading4 = createHeading('Heading4', 'text-xl leading-snug')
const Title = createHeading('Title', 'text-5xl leading-tight')

export { Heading1, Heading2, Heading3, Heading4, Title }
