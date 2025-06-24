'use client'

import React, { useCallback } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from '@/components/global/editor/components/Headings'
import DropZone from './DropZone'
import Paragraph from '@/components/global/editor/components/Paragraph'
import Table from '../../../../../../components/global/editor/components/Table'
import ColumnComponent from '@/components/global/editor/components/ColumnComponent'
import CustomImage from '@/components/global/editor/components/image'
import BlockQuote from '@/components/global/editor/components/BlockQuote'
import NumberedList, {
  BulletList,
  TodoList,
} from '@/components/global/editor/components/ListComponent'
import CalloutBox from '@/components/global/editor/components/CalloutBox'
import CodeBlock from '@/components/global/editor/components/CodeBlock'
import TableOfContent from '@/components/global/editor/components/TableOfContent'
import Divider from '@/components/global/editor/components/Divider'
import { ContentItem } from '@/lib/types'

type MasterRecursiveComponentProps = {
  content: ContentItem
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void
  isPreview?: boolean
  isEditable?: boolean
  slideId: string
  index?: number
  isSidebar?: boolean
}

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, isSidebar, index, isPreview, isEditable }) => {
    if (
      !content ||
      typeof content !== 'object' ||
      !('id' in content) ||
      !('type' in content)
    ) {
      console.warn('❌ Invalid content item in ContentRenderer:', content)
      return null
    }

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value)
      },
      [content.id, onContentChange]
    )

    const commonProps = {
      placeholder: (content as any).placeholder ?? '',
      value: content.content as string,
      onChange: handleChange,
      isPreview,
      isSidebar,
    }

    const animationProps = {
      initial: { opacity: 0, y: 30, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.4, ease: 'easeOut' },
      ...(isPreview
        ? {}
        : {
            whileHover: { scale: 1.02 },
            whileTap: { scale: 0.98 },
            transition: { duration: 0.2 },
          }),
    }

    switch (content.type) {
      case 'heading1':
        return <motion.div {...animationProps}><Heading1 {...commonProps} /></motion.div>
      case 'heading2':
        return <motion.div {...animationProps}><Heading2 {...commonProps} /></motion.div>
      case 'heading3':
        return <motion.div {...animationProps}><Heading3 {...commonProps} /></motion.div>
      case 'heading4':
        return <motion.div {...animationProps}><Heading4 {...commonProps} /></motion.div>
      case 'title':
        return <motion.div {...animationProps}><Title {...commonProps} /></motion.div>
      case 'paragraph':
        return <motion.div {...animationProps}><Paragraph {...commonProps} /></motion.div>
      case 'table':
        return (
          <motion.div {...animationProps}>
            <Table
              content={content.content as string[][]}
              onChange={(newContent) =>
                onContentChange(content.id, newContent !== null ? newContent : '')
              }
              initialRowSize={content.initialColumns}
              initialColSize={content.initialRows}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </motion.div>
        )
      case 'resizable-column':
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps}>
              <ColumnComponent
                content={content.content as ContentItem[]}
                className={content.className}
                onContentChange={onContentChange}
                slideId={slideId}
                isPreview={isPreview}
                isEditable={isEditable}
              />
            </motion.div>
          )
        }
        return null
      case 'image':
        return (
          <motion.div {...animationProps}>
            <CustomImage
              src={content.content as string}
              alt={content.alt || 'image'}
              className={content.className}
              isPreview={isPreview}
              contentId={content.id}
              onContentChange={onContentChange}
              isEditable={isEditable}
              isSidebar={isSidebar}
            />
          </motion.div>
        )
      case 'blockquote':
        return (
          <motion.div {...animationProps} className={cn('flex flex-col', content.className)}>
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </motion.div>
        )
      case 'numberedList':
        return (
          <motion.div {...animationProps}>
            <NumberedList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        )
      case 'bulletList':
        return (
          <motion.div {...animationProps}>
            <BulletList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        )
      case 'todoList':
        return (
          <motion.div {...animationProps}>
            <TodoList
              items={content.content as string[]}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </motion.div>
        )
      case 'calloutBox':
        const normalizeCalloutType = (
          type?: string
        ): 'success' | 'warning' | 'info' | 'question' | 'caution' => {
          const validTypes = ['success', 'warning', 'info', 'question', 'caution'] as const
          const trimmed = type?.trim()
          return validTypes.includes(trimmed as any)
            ? (trimmed as any)
            : 'info'
        }
        return (
          <motion.div {...animationProps}>
            <CalloutBox
              type={normalizeCalloutType(content.callOutType) || 'info'}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </motion.div>
        )
      case 'codeBlock':
        return (
          <motion.div {...animationProps}>
            <CodeBlock
              code={content.code}
              language={content.language}
              onChange={() => {}}
              className={content.className}
            />
          </motion.div>
        )
      case 'tableOfContents':
        return (
          <motion.div {...animationProps}>
            <TableOfContent
              items={content.content as string[]}
              onItemClick={(id) => {
                console.log(`Navigate to section : ${id}`)
              }}
              className={content.className}
            />
          </motion.div>
        )
      case 'divider':
        return (
          <motion.div {...animationProps}>
            <Divider className={content.className as string} />
          </motion.div>
        )
      case 'column':
        if (Array.isArray(content.content)) {
          return (
            <motion.div {...animationProps} className={cn('flex flex-col', content.className)}>
              {content.content.map((subItem, subIndex) => {
                if (
                  !subItem ||
                  typeof subItem !== 'object' ||
                  !('id' in subItem) ||
                  !('type' in subItem)
                ) {
                  console.warn('❌ Skipping invalid subItem in column:', subItem)
                  return null
                }
                return (
                  <React.Fragment key={subItem.id ?? `item-${subIndex}`}>
                    {!isPreview && !subItem.restrictToDrop && subIndex === 0 && isEditable && (
                      <DropZone index={0} parentId={content.id} slideId={slideId} />
                    )}
                    <MasterRecursiveComponent
                      content={subItem}
                      onContentChange={onContentChange}
                      isPreview={isPreview}
                      slideId={slideId}
                      index={subIndex}
                      isEditable={isEditable}
                      isSidebar={isSidebar}
                    />
                    {!isPreview && !subItem.restrictToDrop && isEditable && (
                      <DropZone
                        index={subIndex + 1}
                        parentId={content.id}
                        slideId={slideId}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </motion.div>
          )
        }
        return null
      default:
        return null
    }
  }
)

ContentRenderer.displayName = 'ContentRenderer'

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({
    content,
    onContentChange,
    slideId,
    index,
    isEditable = true,
    isPreview = false,
    isSidebar = false,
  }) => {
    if (Array.isArray(content)) {
      return (
        <>
          {content.map((item, i) => (
            <MasterRecursiveComponent
              key={item.id ?? `item-${i}`}
              content={item}
              onContentChange={onContentChange}
              slideId={slideId}
              index={i}
              isEditable={isEditable}
              isPreview={isPreview}
              isSidebar={isSidebar}
            />
          ))}
        </>
      )
    }

    return (
      <ContentRenderer
        content={content}
        onContentChange={onContentChange}
        isPreview={isPreview}
        isEditable={isEditable}
        slideId={slideId}
        index={index}
        isSidebar={isSidebar}
      />
    )
  }
)

MasterRecursiveComponent.displayName = 'MasterRecursiveComponent'
