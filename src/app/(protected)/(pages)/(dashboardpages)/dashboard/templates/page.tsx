'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const templates = [
  {
    title: 'Creative AI',
    description: 'Vibrant & modern slides for AI, design & tech projects.',
    image: '/ai',
  },
  {
    title: 'Study Notes',
    description: 'Clean and minimal layout for education or notes.',
    image: 'https://i.pinimg.com/736x/6a/e9/84/6ae98466c3e26610ccadf2e861357dce.jpg',
  },
  {
    title: 'Dark Portfolio',
    description: 'Professional black & white theme for portfolios.',
    image: '/portfolio.jpg',
  },
];

export default function TemplateMarketPage() {
  return (
    <main className="min-h-screen px-4 sm:px-6 lg:px-10 py-12 bg-background text-foreground">
      <h1 className="text-center text-4xl font-bold mb-12 text-vivid">
        Choose a Template
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template, index) => (
          <div
            key={index}
            className="group relative rounded-xl bg-card border border-border shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="overflow-hidden rounded-t-xl">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-52 object-cover rounded-md transition-transform duration-300 hover:scale-105"
/>
            </div>

            <div className="p-5">
              <h2 className="text-xl font-semibold">{template.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 mb-4">
                {template.description}
              </p>

              <div className="flex flex-wrap justify-between items-center gap-3">
                <Link href="/presentation">
                  <button className="px-4 py-2 rounded-md text-white font-semibold shadow-md transition-all bg-gradient-to-br from-pink-500 to-yellow-400 hover:scale-[1.03]">
                    Use Template
                  </button>
                </Link>

                <button
                  className="px-4 py-2 rounded-md border border-border text-sm text-foreground bg-muted hover:bg-muted/80 transition-all"
                  onClick={() => alert('Download feature coming soon!')}
                >
                  Download
                </button>
              </div>
            </div>

            {/* 3D gradient glow border on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[hsl(var(--chart-1))] transition-all duration-500 pointer-events-none"></div>
          </div>
        ))}
      </div>
    </main>
  );
}
