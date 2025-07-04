'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from '@/components/ui/resizable'
import { useSlideStore } from '@/store/useSlideStore'
import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'

interface TableProps {
  content: string[][]
  onChange: (newContent: string[][]) => void
  isPreview?: boolean
  isEditable?: boolean
  isSidebar?: boolean
  initialRowSize?: number
  initialColSize?: number
}

const Table = ({
  content,
  isEditable = true,
  isPreview = false,
  isSidebar = false,
  onChange,
  initialColSize = 3,
  initialRowSize = 3
}: TableProps) => {
  const { currentTheme } = useSlideStore()
  const [rowSizes, setRowSizes] = useState<number[]>([])
  const [colSizes, setColSizes] = useState<number[]>([])

  const [tableData, setTableData] = useState<string[][]>(() => {
    if (!content?.length || !content[0]?.length) {
      return Array(initialRowSize)
        .fill(null)
        .map(() => Array(initialColSize).fill(''))
    }
    return content
  })

  const handleResizeCol = (index: number, newSize: number) => {
    if (!isEditable) return
    const newSizes = [...colSizes]
    newSizes[index] = newSize
    setColSizes(newSizes)
  }

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    if (!isEditable) return
    const newData = tableData.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
        : row
    )
    setTableData(newData)
    onChange(newData)
  }

  useEffect(() => {
    setRowSizes(new Array(tableData.length).fill(100 / tableData.length))
    setColSizes(new Array(tableData[0].length).fill(100 / tableData[0].length))
  }, [tableData])

  // 🪄 Preview / Sidebar Compact Table
  if (isPreview || isSidebar) {
    return (
      <div
        className={cn(
          'overflow-x-auto w-full max-w-full',
          isSidebar ? 'text-[0.7rem] leading-tight' : 'text-xs'
        )}
      >
        <table
          className={cn(
            'w-full border border-gray-300 text-left table-fixed',
            isSidebar ? '' : 'shadow-md rounded-lg'
          )}
        >
          <thead className="bg-gray-100">
            <tr>
              {tableData[0]?.map((cell, index) => (
                <th
                  key={index}
                  className={cn(
                    'border font-medium text-gray-700 truncate',
                    isSidebar ? 'p-1' : 'p-2'
                  )}
                  style={{
                    width: `${colSizes[index] || 100 / tableData[0].length}%`,
                    minWidth: isSidebar ? '48px' : undefined,
                    maxWidth: isSidebar ? '100px' : undefined
                  }}
                >
                  {cell || '—'}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={cn(
                      'border text-gray-800 align-top break-words',
                      isSidebar ? 'p-1' : 'p-2'
                    )}
                  >
                    {cell || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // 🧑‍💻 Main Editor Resizable Table
  return (
    <div
      className="w-full h-full relative rounded-xl shadow-lg backdrop-blur-md"
      style={{
        background:
          currentTheme.gradientBackground || currentTheme.backgroundColor,
        borderRadius: '12px',
        boxShadow: `0 4px 30px ${currentTheme.accentColor}55`
      }}
    >
      <ResizablePanelGroup
        direction="vertical"
        className={cn(
          'h-full w-full rounded-lg border border-gray-300/50 overflow-hidden',
          initialColSize === 2
            ? 'min-h-[100px]'
            : initialColSize === 3
            ? 'min-h-[150px]'
            : initialColSize === 4
            ? 'min-h-[200px]'
            : 'min-h-[100px]'
        )}
        onLayout={(sizes) => setRowSizes(sizes)}
      >
        {tableData.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}>
            {rowIndex > 0 && (
              <ResizableHandle className="bg-gray-300/30 hover:bg-blue-400/50" />
            )}
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes) => setColSizes(sizes)}
              className="w-full h-full"
            >
              {row.map((cell, colIndex) => (
                <React.Fragment key={colIndex}>
                  {colIndex > 0 && (
                    <ResizableHandle className="bg-gray-300/30 hover:bg-blue-400/50" />
                  )}
                  <ResizablePanel
                    defaultSize={colSizes[colIndex]}
                    onResize={(size) => handleResizeCol(colIndex, size)}
                    className="w-full h-full min-h-9 transition-all duration-300 hover:scale-[1.01]"
                  >
                    <div className="relative w-full h-full">
                      <input
                        value={cell}
                        onChange={(e) =>
                          updateCell(rowIndex, colIndex, e.target.value)
                        }
                        className="w-full h-full p-3 bg-white/20 backdrop-blur-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md text-sm placeholder:italic placeholder:text-gray-400"
                        style={{
                          color: currentTheme.fontColor,
                          whiteSpace: 'normal',
                          wordBreak: 'break-word'
                        }}
                        placeholder="Type here"
                        readOnly={!isEditable}
                      />
                    </div>
                  </ResizablePanel>
                </React.Fragment>
              ))}
            </ResizablePanelGroup>
          </React.Fragment>
        ))}
      </ResizablePanelGroup>
    </div>
  )
}

export default Table
