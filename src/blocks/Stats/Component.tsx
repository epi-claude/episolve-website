import React from 'react'
import type { StatsBlock as StatsBlockType } from '@/payload-types'

export const StatsBlock: React.FC<StatsBlockType> = ({ heading, stats, columns = '3' }) => {
  const columnClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }[columns]

  return (
    <div className="container my-20">
      {heading && (
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-foreground">
          {heading}
        </h2>
      )}
      <div className={`grid grid-cols-1 gap-6 ${columnClass}`}>
        {stats?.map((stat, index) => (
          <div
            key={index}
            className="group rounded-xl border border-border bg-card p-8 text-center shadow-sm transition-all hover:shadow-md hover:border-primary/50"
          >
            <div className="mb-3 text-5xl font-bold tracking-tight text-primary transition-colors group-hover:text-primary/90">
              {stat.value}
            </div>
            <div className="text-base font-medium text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
