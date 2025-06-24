import { Slide } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useSlideStore } from '@/store/useSlideStore';
import React from 'react';
import { MasterRecursiveComponent } from '../../editor/MasterRecursiveComponent';

type Props = {
  slide: Slide | undefined;
  isActive: boolean;
  index: number;
  isSidebar?: boolean;
};

const ScaledPreview = ({ slide, isActive, index, isSidebar = false }: Props) => {
  const { currentTheme } = useSlideStore();

  if (!slide || !slide.id || !slide.content) return null;

  const width = 276; // ✅ thumbnail width
  const height = 160; // ✅ thumbnail height
  const scale = 0.38; // ✅ smaller inner content scale

  return (
    <div
      className={cn(
        'relative rounded-xl overflow-hidden shadow-md transition-all duration-300 transform',
        isActive
          ? 'ring-2 ring-blue-500 ring-offset-2 scale-[1.01]'
          : 'hover:scale-[1.02] hover:shadow-lg'
      )}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        fontFamily: currentTheme.fontFamily,
        backgroundColor: currentTheme.slideBackgroundColor,
        backgroundImage: currentTheme.gradientBackground,
        color: currentTheme.accentColor,
        overflow: 'hidden',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${1080}px`,
          height: `${720}px`,
          overflow: 'hidden', // ✅ prevent content bleed
          pointerEvents: 'none',
        }}
      >
        <MasterRecursiveComponent
          slideId={slide.id}
          content={slide.content}
          isPreview={true}
          isEditable={false}
          isSidebar={true} // ✅ makes child components render in sidebar mode
          onContentChange={() => {}}
        />
      </div>
    </div>
  );
};

export default ScaledPreview;
