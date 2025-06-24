import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useSlideStore } from '@/store/useSlideStore';
import React, { useEffect, useState } from 'react';
import DraggableSlidePreview from './DraggableSlidePreview';

const LayoutPreview = () => {
  const { getOrderedSlides, reorderSlides, currentTheme } = useSlideStore();
  const slides = getOrderedSlides();
  const [loading, setLoading] = useState(true);

  const moveSlide = (dragIndex: number, hoverIndex: number) => {
    reorderSlides(dragIndex, hoverIndex);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') setLoading(false);
  }, []);

  return (
    <aside
      className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 border-r shadow-xl z-20" // ✅ widened from w-72 to w-80
      style={{
        background: currentTheme.sidebarColor || currentTheme.backgroundColor,
        color: currentTheme.fontColor,
        fontFamily: currentTheme.fontFamily,
      }}
    >
      <ScrollArea className="h-full w-full px-4 pt-2 pb-10 space-y-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
            <Skeleton className="h-20 w-full rounded-lg" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2 ">
              <h2 className="text-base font-semibold tracking-tight ">
                Slides
              </h2>
              <span className="text-sm">{slides?.length}</span>
            </div>
            <div className="space-y-4">
              {slides.map((slide, index) => (
                <DraggableSlidePreview
                  key={slide.id || index}
                  slide={slide}
                  index={index}
                  moveSlide={moveSlide}
                />
              ))}
            </div>
          </>
        )}
      </ScrollArea>
    </aside>
  );
};

export default LayoutPreview;
