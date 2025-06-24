'use client'

import { cn } from '@/lib/utils'
import { useSlideStore } from '@/store/useSlideStore'
import React from 'react'

function darkenHex(hex: string, factor: number = 0.85): string {
  const color = hex.replace('#', '')
  const r = Math.floor(parseInt(color.substring(0, 2), 16) * factor)
  const g = Math.floor(parseInt(color.substring(2, 4), 16) * factor)
  const b = Math.floor(parseInt(color.substring(4, 6), 16) * factor)
  return `rgb(${r}, ${g}, ${b})`
}

type ListProps = {
  items: string[]
  onChange: (newItems: string[]) => void
  className?: string
  isEditable?: boolean
  isSidebar?: boolean
  isPreview?: boolean
}

type ListItemProps = {
  item: string
  index: number
  onChange: (index: number, value: string) => void
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void
  isEditable: boolean
  fontColor: string
  isSidebar?: boolean
  isPreview?: boolean
}

const ListItem: React.FC<ListItemProps> = ({
  item,
  index,
  onChange,
  onKeyDown,
  isEditable,
  fontColor,
  isSidebar,
  isPreview
}) => (
  <input
    type="text"
    value={item}
    onChange={(e) => onChange(index, e.target.value)}
    onKeyDown={(e) => onKeyDown(e, index)}
    className={cn(
      'bg-transparent outline-none w-full border-b border-dashed border-gray-300 transition-all duration-200',
      isSidebar && isPreview ? 'text-[0.65rem] py-0.5' : 'py-1 text-sm'
    )}
    style={{ color: fontColor }}
    readOnly={!isEditable}
  />
)

const NumberedList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
  isSidebar,
  isPreview
}) => {
  const { currentTheme } = useSlideStore()
  const fontColor = darkenHex(currentTheme.fontColor)

  const handleChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onChange(newItems)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index + 1, 0, '')
      onChange(newItems)
    } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index, 1)
      onChange(newItems)
    }
  }

  return (
    <ol
      className={cn(
        'list-decimal list-inside space-y-2 pl-2',
        isSidebar && isPreview && 'space-y-1 text-[0.65rem]',
        className
      )}
      style={{ color: fontColor }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={fontColor}
            isSidebar={isSidebar}
            isPreview={isPreview}
          />
        </li>
      ))}
    </ol>
  )
}

export const BulletList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
  isSidebar,
  isPreview
}) => {
  const { currentTheme } = useSlideStore()
  const fontColor = darkenHex(currentTheme.fontColor)

  const handleChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value
    onChange(newItems)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index + 1, 0, '')
      onChange(newItems)
    } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index, 1)
      onChange(newItems)
    }
  }

  return (
    <ul
      className={cn(
        'list-disc list-inside space-y-2 pl-3',
        isSidebar && isPreview && 'space-y-1 text-[0.65rem]',
        className
      )}
      style={{ color: fontColor }}
    >
      {items.map((item, index) => (
        <li key={index}>
          <ListItem
            item={item}
            index={index}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={fontColor}
            isSidebar={isSidebar}
            isPreview={isPreview}
          />
        </li>
      ))}
    </ul>
  )
}

export const TodoList: React.FC<ListProps> = ({
  items,
  onChange,
  className,
  isEditable = true,
  isSidebar,
  isPreview
}) => {
  const { currentTheme } = useSlideStore()
  const fontColor = darkenHex(currentTheme.fontColor)

  const toggleCheckbox = (index: number) => {
    const newItems = [...items]
    newItems[index] = newItems[index].startsWith('[x] ')
      ? newItems[index].replace('[x] ', '[ ] ')
      : newItems[index].replace('[ ] ', '[x] ')
    onChange(newItems)
  }

  const handleChange = (index: number, value: string) => {
    const newItems = [...items]
    newItems[index] = value.startsWith('[ ] ') || value.startsWith('[x] ') ? value : `[ ] ${value}`
    onChange(newItems)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index + 1, 0, '')
      onChange(newItems)
    } else if (e.key === 'Backspace' && items[index] === '' && items.length > 1) {
      e.preventDefault()
      const newItems = [...items]
      newItems.splice(index, 1)
      onChange(newItems)
    }
  }

  return (
    <ul
      className={cn(
        'space-y-2 pl-2',
        isSidebar && isPreview && 'space-y-1 text-[0.65rem]',
        className
      )}
      style={{ color: fontColor }}
    >
      {items.map((item, index) => (
        <li
          key={index}
          className={cn('flex items-center gap-2', isSidebar && isPreview && 'gap-1')}
        >
          <input
            type="checkbox"
            checked={item.startsWith('[x] ')}
            onChange={() => toggleCheckbox(index)}
            className="form-checkbox rounded-sm accent-blue-500 scale-110"
            disabled={!isEditable}
          />
          <ListItem
            item={item.replace(/^\[[ x]\] /, '')}
            index={index}
            onChange={(idx, value) =>
              handleChange(idx, `${item.startsWith('[x] ') ? '[x] ' : '[ ] '}${value}`)
            }
            onKeyDown={handleKeyDown}
            isEditable={isEditable}
            fontColor={fontColor}
            isSidebar={isSidebar}
            isPreview={isPreview}
          />
        </li>
      ))}
    </ul>
  )
}

export default NumberedList
