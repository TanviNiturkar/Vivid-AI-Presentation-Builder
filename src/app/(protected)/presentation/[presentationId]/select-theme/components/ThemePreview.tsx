'use client'
import { useSlideStore } from '@/store/useSlideStore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Theme } from '@/lib/types'
import ThemeCard from './ThemeCard'
import ThemePicker from './ThemePicker'
import { themes } from '@/lib/constants'

const ThemePreview = () => {
  const params = useParams()
  const router = useRouter()
  const controls = useAnimation()
  const { currentTheme, setCurrentTheme, project } = useSlideStore()
  const [selectedTheme, setSelectedTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    if (project?.slides) {
      router.push(`/presentation/${params.presentationId}`)
    }
  }, [project])

  useEffect(() => {
    controls.start('visible')
  }, [controls, selectedTheme])

  const leftCardContent = (
    <div className="space-y-4">
      <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
          Quick Start Guide
        </h3>
        <ol className="list-decimal list-inside space-y-2" style={{ color: selectedTheme.accentColor }}>
          <li>Choose a theme</li>
          <li>Customize colors and fonts</li>
          <li>Add your content</li>
          <li>Preview and publish</li>
        </ol>
      </div>
      <Button
        className="w-full h-12 text-lg font-medium"
        style={{ backgroundColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}
      >
        Get Started
      </Button>
    </div>
  )

  const mainCardContent = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
          <p style={{ color: selectedTheme.accentColor }}>
            This is a smart layout: it acts as a text box.
          </p>
        </div>
        <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
          <p style={{ color: selectedTheme.accentColor }}>
            You can get these by typing /smart
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-4">
        <Button
          className="h-12 px-6 text-base font-medium"
          style={{ backgroundColor: selectedTheme.accentColor, color: selectedTheme.fontColor }}
        >
          Primary button
        </Button>
        <Button
          variant="outline"
          className="h-12 px-6 text-base font-medium"
          style={{
            backgroundColor: selectedTheme.accentColor,
            color: selectedTheme.fontColor,
          }}
        >
          Secondary button
        </Button>
      </div>
    </div>
  )

  const rightCardContent = (
    <div className="space-y-4">
      <div className="rounded-xl p-6" style={{ backgroundColor: selectedTheme.accentColor + '10' }}>
        <h3 className="text-xl font-semibold mb-4" style={{ color: selectedTheme.accentColor }}>
          Theme Features
        </h3>
        <ul className="list-disc list-inside space-y-2" style={{ color: selectedTheme.accentColor }}>
          <li>Responsive design</li>
          <li>Dark and light modes</li>
          <li>Custom color schemes</li>
          <li>Accessibility optimized</li>
        </ul>
      </div>
      <Button
        variant="outline"
        className="h-12 px-6 text-base font-medium"
        style={{
          backgroundColor: selectedTheme.accentColor,
          color: selectedTheme.fontColor,
        }}
      >
        Explore Features
      </Button>
    </div>
  )

  const applyTheme = (theme: Theme) => {
    setSelectedTheme(theme)
    setCurrentTheme(theme)
  }

  return (
    <div
      className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden"
      style={{
        background: selectedTheme.backgroundColor,
        color: selectedTheme.accentColor,
        fontFamily: selectedTheme.fontFamily,
      }}
    >
      <div className="flex-grow overflow-y-auto">
        <div className="p-4 sm:p-6 md:p-10 flex flex-col items-center">
          <Button
            variant="outline"
            className="mb-8 self-start"
            style={{
              background: selectedTheme.accentColor + '10',
              color: selectedTheme.accentColor,
              borderColor: selectedTheme.accentColor + '20',
            }}
            onClick={() => router.push('/create-page')}
          >
            <ArrowLeft className="mr-2 h-5 w-5" /> Back
          </Button>

          <div className="relative w-full max-w-3xl aspect-[3/2] flex flex-col md:flex-row gap-4 items-center justify-center">
            <ThemeCard
              title="Quick Start"
              description="Get up and running in no time"
              content={leftCardContent}
              variant="left"
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title="Main Preview"
              description="This is the main theme preview card"
              content={mainCardContent}
              variant="main"
              theme={selectedTheme}
              controls={controls}
            />
            <ThemeCard
              title="Theme Features"
              description="Discover what our themes can do"
              content={rightCardContent}
              variant="right"
              theme={selectedTheme}
              controls={controls}
            />
          </div>
        </div>
      </div>

      {/* Theme Sidebar Picker */}
      <div className="w-full md:w-[400px]">
        <ThemePicker selectedTheme={selectedTheme} themes={themes} onThemeSelect={applyTheme} />
      </div>
    </div>
  )
}

export default ThemePreview
