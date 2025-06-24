import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { cn } from '@/lib/utils';
import { Slide } from '@/lib/types';
import { useSlideStore } from '@/store/useSlideStore';
import ScaledPreview from './ScaledPreview';

interface Props {
  slide: Slide;
  index: number;
  moveSlide: (dragIndex: number, hoverIndex: number) => void;
}

const DraggableSlidePreview: React.FC<Props> = ({ slide, index, moveSlide }) => {
  const { setCurrentSlide, currentSlide } = useSlideStore();
  const ref = useRef<HTMLDivElement | null>(null);

  const [, drop] = useDrop({
    accept: 'SLIDE',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveSlide(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'SLIDE',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref)); // 🔗 Combine drag and drop

  return (
    <div
      ref={ref}
      onClick={() => setCurrentSlide(index)}
      className={cn(
        'mx-auto w-full max-w-[280px]',
        'cursor-pointer transition-all duration-300',
        isDragging ? 'opacity-50 scale-95' : 'opacity-100'
      )}
    >
      <ScaledPreview
        slide={slide}
        index={index}
        isActive={currentSlide === index}
        isSidebar={true}
      />
    </div>
  );
};

export default DraggableSlidePreview;
