'use client';

import { cn, getSlideTitle } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Theme } from '@/lib/types';
import { Image } from 'lucide-react';
import React from 'react';


type Props = {
  slide: any;
  theme: Theme;
};

const ThumbnailPreview = ({ slide, theme }: Props) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03, rotateX: 2, rotateY: -2 }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className={cn(
        'w-full relative aspect-[16/9] rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 cursor-pointer'
      )}
      style={{
        fontFamily: theme.fontFamily,
        color: theme.accentColor,
        backgroundColor: theme.slideBackgroundColor,
        backgroundImage: theme.gradientBackground,
      }}
    >
      {slide ? (
        <div className="scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden p-3 text-xl font-semibold text-ellipsis whitespace-nowrap">
          {getSlideTitle(slide)}
        </div>
      ) : (
        <div className="w-full h-full bg-gray-300/20 flex justify-center items-center">
          <Image className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </motion.div>
  );
};

export default ThumbnailPreview;
