import React from 'react'

type PatternType = 'grid' | 'dots' | 'lines' | 'none'

interface BackgroundPatternProps {
  pattern?: PatternType
  className?: string
  opacity?: number
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  pattern = 'grid',
  className = '',
  opacity = 0.05,
}) => {
  if (pattern === 'none') return null

  const patternId = `bg-pattern-${pattern}-${Math.random().toString(36).substr(2, 9)}`

  return (
    <svg
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        {pattern === 'grid' && (
          <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M0 32V.5H32" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        )}
        {pattern === 'dots' && (
          <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1.5" fill="currentColor" />
          </pattern>
        )}
        {pattern === 'lines' && (
          <pattern
            id={patternId}
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}

interface GradientOrbProps {
  color: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  opacity?: number
  animate?: boolean
}

export const GradientOrb: React.FC<GradientOrbProps> = ({
  color,
  size = 'lg',
  position,
  blur = '3xl',
  opacity = 20,
  animate = true,
}) => {
  const sizeClasses = {
    sm: 'h-48 w-48',
    md: 'h-64 w-64',
    lg: 'h-96 w-96',
    xl: 'h-[32rem] w-[32rem]',
  }

  const positionClasses = {
    'top-left': '-top-32 -left-32',
    'top-right': '-top-32 -right-32',
    'bottom-left': '-bottom-32 -left-32',
    'bottom-right': '-bottom-32 -right-32',
    center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }

  const blurClasses = {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-3xl',
  }

  return (
    <div
      className={`absolute rounded-full ${sizeClasses[size]} ${positionClasses[position]} ${blurClasses[blur]} ${color}/${opacity}`}
      style={animate ? { animation: 'pulse 10s ease-in-out infinite' } : undefined}
    />
  )
}
