import React from 'react'
import type { StatsBlock as StatsBlockType } from '@/payload-types'

export const StatsBlock: React.FC<StatsBlockType> = ({ heading, stats, columns = '3' }) => {
  const columnClass = {
    '2': 'md:grid-cols-2',
    '3': 'md:grid-cols-3',
    '4': 'md:grid-cols-4',
  }[columns]

  return (
    <div className="container my-16">
      {heading && <h2 className="mb-8 text-center text-3xl font-bold">{heading}</h2>}
      <div className={`grid grid-cols-1 gap-8 ${columnClass}`}>
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="mb-2 text-4xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-lg text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
