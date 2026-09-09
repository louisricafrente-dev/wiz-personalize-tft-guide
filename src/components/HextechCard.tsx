'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface HextechCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'active' | 'danger';
  className?: string;
  glow?: boolean;
}

export function HextechCard({
  children,
  variant = 'default',
  className,
  glow = false,
  ...props
}: HextechCardProps) {
  const baseClasses = 'relative rounded-sm transition-all duration-200 backdrop-blur-md';

  const variants = {
    default:
      'bg-[#091428]/85 border border-[#1E282D] hover:border-[#C8AA6E]/60 hover:shadow-[0_0_15px_rgba(200,170,110,0.15)]',
    gold:
      'bg-[#091428]/90 border border-[#C8AA6E] shadow-[0_0_20px_rgba(200,170,110,0.25)]',
    active:
      'bg-[#0A1A32]/90 border border-[#0AC8B9] shadow-[0_0_20px_rgba(10,200,185,0.25)]',
    danger:
      'bg-[#1F0E14]/90 border border-[#E84057] shadow-[0_0_20px_rgba(232,64,87,0.25)]',
  };

  return (
    <div
      className={twMerge(
        clsx(
          baseClasses,
          variants[variant],
          glow && 'ring-1 ring-[#C8AA6E]/50',
          className
        )
      )}
      {...props}
    >
      {/* Corner Hextech Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C8AA6E]/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C8AA6E]/60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C8AA6E]/60 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C8AA6E]/60 pointer-events-none" />

      {children}
    </div>
  );
}
