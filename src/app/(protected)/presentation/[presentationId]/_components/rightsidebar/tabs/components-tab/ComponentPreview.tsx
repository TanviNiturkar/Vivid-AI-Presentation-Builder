import { ContentItem } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';
import { useDrag } from 'react-dnd';

type ComponentItemProps = {
  type: string;
  componentType: string;
  name: string;
  component: ContentItem;
  icon: string;
};

const ComponentCard = ({ item }: { item: ComponentItemProps }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'CONTENT_ITEM',
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag as unknown as React.LegacyRef<HTMLDivElement>}
      className={cn(
        'transition-all duration-300 transform',
        isDragging ? 'opacity-40 scale-95' : 'opacity-100'
      )}
    >
      <button
        className={cn(
          'flex flex-col items-center justify-between cursor-grab active:cursor-grabbing gap-2 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700',
          'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-md hover:shadow-xl transition-transform',
          'hover:scale-[1.03] w-full'
        )}
      >
        <div className="w-full aspect-[16/9] rounded-lg bg-gradient-to-tr from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 p-4 flex items-center justify-center shadow-inner">
          <span className="text-3xl text-primary">{item.icon}</span>
        </div>
        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
          {item.name}
        </span>
      </button>
    </div>
  );
};

export default ComponentCard;
