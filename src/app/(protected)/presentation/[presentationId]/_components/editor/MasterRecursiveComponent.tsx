'use client';

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Title,
} from '@/components/global/editor/components/Headings';
import DropZone from './DropZone';
import Paragraph from '@/components/global/editor/components/Paragraph';
import Table from '@/components/global/editor/components/Table';
import ColumnComponent from '@/components/global/editor/components/ColumnComponent';
import CustomImage from '@/components/global/editor/components/image';
import BlockQuote from '@/components/global/editor/components/BlockQuote';
import NumberedList, {
  BulletList,
  TodoList,
} from '@/components/global/editor/components/ListComponent';
import CalloutBox from '@/components/global/editor/components/CalloutBox';
import CodeBlock from '@/components/global/editor/components/CodeBlock';
import TableOfContent from '@/components/global/editor/components/TableOfContent';
import Divider from '@/components/global/editor/components/Divider';
import { ContentItem } from '@/lib/types';

type MasterRecursiveComponentProps = {
  content: ContentItem | ContentItem[];
  onContentChange: (
    contentId: string,
    newContent: string | string[] | string[][]
  ) => void;
  isPreview?: boolean;
  isEditable?: boolean;
  slideId: string;
  index?: number;
  isSidebar?: boolean;
};

const ContentRenderer: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, isSidebar, index, isPreview, isEditable }) => {
    if (!content || typeof content !== 'object' || !('id' in content) || !('type' in content)) {
      console.warn('❌ Invalid content item in ContentRenderer:', content);
      return null;
    }

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onContentChange(content.id, e.target.value);
      },
      [content.id, onContentChange]
    );

    const commonProps = {
      placeholder: (content as any).placeholder ?? '',
      value: typeof content.content === 'string' ? content.content : '',
      onChange: handleChange,
      isPreview,
      isSidebar,
    };

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
    };

    const Wrapper = ({ children }: { children: React.ReactNode }) => (
      <motion.div
        {...animationProps}
        className={cn(
          'w-full h-full overflow-hidden break-words whitespace-pre-wrap',
          isSidebar ? 'text-[10px]' : 'text-base'
        )}
      >
        {children}
      </motion.div>
    );

    switch (content.type) {
      case 'heading1':
        return <Wrapper><Heading1 {...commonProps} /></Wrapper>;
      case 'heading2':
        return <Wrapper><Heading2 {...commonProps} /></Wrapper>;
      case 'heading3':
        return <Wrapper><Heading3 {...commonProps} /></Wrapper>;
      case 'heading4':
        return <Wrapper><Heading4 {...commonProps} /></Wrapper>;
      case 'title':
        return <Wrapper><Title {...commonProps} /></Wrapper>;
      case 'paragraph':
        return <Wrapper><Paragraph {...commonProps} /></Wrapper>;

      case 'table': {
        const isValidTableData =
          Array.isArray(content.content) &&
          Array.isArray(content.content[0]) &&
          typeof content.content[0][0] === 'string';

        const safeTableContent: string[][] = isValidTableData ? (content.content as string[][]) : [['']];

        return (
          <Wrapper>
            <Table
              content={safeTableContent}
              onChange={(newContent) =>
                onContentChange(content.id, newContent || [['']])
              }
              initialRowSize={content.initialColumns || 2}
              initialColSize={content.initialRows || 2}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </Wrapper>
        );
      }

      case 'resizable-column': {
        const colContent = Array.isArray(content.content)
          ? content.content.filter((item): item is ContentItem => typeof item === 'object' && item !== null && 'type' in item)
          : [];

        return (
          <Wrapper>
            <ColumnComponent
              content={colContent}
              className={content.className}
              onContentChange={onContentChange}
              slideId={slideId}
              isPreview={isPreview}
              isEditable={isEditable}
            />
          </Wrapper>
        );
      }

      case 'image':
        return (
          <Wrapper>
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
          </Wrapper>
        );

      case 'blockquote':
        return (
          <Wrapper>
            <BlockQuote>
              <Paragraph {...commonProps} />
            </BlockQuote>
          </Wrapper>
        );

      case 'numberedList':
      case 'bulletList':
      case 'todoList': {
        const ListComponent = {
          numberedList: NumberedList,
          bulletList: BulletList,
          todoList: TodoList,
        }[content.type];

        const listItems = Array.isArray(content.content)
          ? (content.content as string[])
          : [];

        return (
          <Wrapper>
            <ListComponent
              items={listItems}
              onChange={(newItems) => onContentChange(content.id, newItems)}
              className={content.className}
            />
          </Wrapper>
        );
      }

      case 'calloutBox': {
        const normalizeCalloutType = (
          type?: string
        ): 'success' | 'warning' | 'info' | 'question' | 'caution' => {
          const valid = ['success', 'warning', 'info', 'question', 'caution'];
          return valid.includes(type?.trim() || '') ? (type as any) : 'info';
        };

        return (
          <Wrapper>
            <CalloutBox
              type={normalizeCalloutType(content.callOutType)}
              className={content.className}
            >
              <Paragraph {...commonProps} />
            </CalloutBox>
          </Wrapper>
        );
      }

      case 'codeBlock':
        return (
          <Wrapper>
            <CodeBlock
              code={content.code}
              language={content.language}
              onChange={() => {}}
              className={content.className}
            />
          </Wrapper>
        );

      case 'tableOfContents':
        return (
          <Wrapper>
            <TableOfContent
              items={Array.isArray(content.content) ? (content.content as string[]) : []}
              onItemClick={(id) => console.log(`Navigate to section: ${id}`)}
              className={content.className}
            />
          </Wrapper>
        );

      case 'divider':
        return <Wrapper><Divider className={content.className} /></Wrapper>;

      case 'column': {
        const columnItems = Array.isArray(content.content)
          ? content.content.filter((item): item is ContentItem => typeof item === 'object' && item !== null && 'type' in item)
          : [];

        return (
          <Wrapper>
            {columnItems.map((subItem, subIndex) => (
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
                  <DropZone index={subIndex + 1} parentId={content.id} slideId={slideId} />
                )}
              </React.Fragment>
            ))}
          </Wrapper>
        );
      }

      default:
        return null;
    }
  }
);

ContentRenderer.displayName = 'ContentRenderer';

export const MasterRecursiveComponent: React.FC<MasterRecursiveComponentProps> = React.memo(
  ({ content, onContentChange, slideId, index, isEditable = true, isPreview = false, isSidebar = false }) => {
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
      );
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
    );
  }
);

MasterRecursiveComponent.displayName = 'MasterRecursiveComponent';
