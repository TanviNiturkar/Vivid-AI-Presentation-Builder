import { Button } from '@/components/ui/button';
import { LayoutSlides } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  name: string;
  Icon: React.FC;
  onClick?: () => void;
  isSelected?: boolean;
  type: string;
  component?: LayoutSlides;
};

const LayoutPreviewItem = ({
  Icon,
  name,
  onClick,
  isSelected,
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-between gap-2 p-3 rounded-xl w-full cursor-grab active:cursor-grabbing',
        'transition-all duration-300 transform hover:scale-[1.03]',
        'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700',
        'hover:shadow-xl shadow-md',
        isSelected && 'ring-2 ring-blue-500 ring-offset-2'
      )}
    >
      <div
        className="w-full aspect-[16/9] rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 p-4 shadow-inner flex items-center justify-center"
      >
        <Icon />
      </div>
      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
        {name}
      </span>
    </button>
  );
};

export default LayoutPreviewItem;
