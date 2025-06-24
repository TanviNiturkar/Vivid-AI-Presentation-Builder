import { Theme } from '@/lib/types'
import { AnimationControls } from 'framer-motion'
import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

type Props = {
  title: string
  description: string
  content: React.ReactNode
  variant: 'left' | 'main' | 'right'
  theme: Theme
  controls: AnimationControls
}

const ThemeCard = ({
  content,
  controls,
  description,
  theme,
  title,
  variant,
}: Props) => {
  const variants = {
    left: {
      hidden: { opacity: 0, x: '-50%', y: '-50', scale: 0.9, rotate: 0 },
      visible: {
        opacity: 1,
        x: '-25%',
        y: '-25%',
        scale: 0.95,
        rotate: -10,
        transitions: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        },
      },
    },
    right: {
      hidden: { opacity: 0, x: '50%', y: '50', scale: 0.9, rotate: 0 },
      visible: {
        opacity: 1,
        x: '25%',
        y: '25%',
        scale: 0.95,
        rotate: 10,
        transitions: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.1,
        },
      },
    },
    main: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: {
        opacity: 1,
        scale: 1,
        transitions: {
          type: 'spring',
          stiffness: 300,
          damping: 30,
          delay: 0.2,
        },
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={variants[variant]}
      className="absolute w-full max-w-3xl px-4 sm:px-6 lg:px-8"
      style={{
        zIndex: variant === 'main' ? 10 : 0,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <Card
        className="h-full shadow-2xl backdrop-blur-sm"
        style={{
          background: theme.slideBackgroundColor,
          border: `1px solid ${theme.accentColor}20`,
        }}
      >
        <div className="flex flex-col md:flex-row">
          <CardContent className="flex-1 p-6 sm:p-8 space-y-6">
            <div className="space-y-3">
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: theme.accentColor }}
              >
                {title}
              </h2>
              <p
                className="text-base sm:text-lg"
                style={{ color: `${theme.accentColor}90` }}
              >
                {description}
              </p>
            </div>
            {content}
          </CardContent>

          <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden rounded-b-md md:rounded-r-lg md:rounded-bl-none">
            <Image
              src="https://i.pinimg.com/736x/92/23/bd/9223bdac50042c041fd185b0b2046ebc.jpg"
              alt="Theme preview image"
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-500 hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ThemeCard
