import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

export default function CallsTrendChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-4">
        911 Emergency Call Volume — Monthly Trend
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 5 }}
          onTouchStart={e => {
            if (e.activeTooltipIndex !== undefined)
              setActiveIndex(e.activeTooltipIndex)
          }}
          onTouchMove={e => {
            if (e.activeTooltipIndex !== undefined)
              setActiveIndex(e.activeTooltipIndex)
          }}
          onTouchEnd={() => setActiveIndex(null)}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
            label={{
              value: 'Call Volume',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              dy: 40,
              fill: '#3b82f6',
              fontSize: 14,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9',
            }}
            active={activeIndex !== null ? true : undefined}
            payloadIndex={activeIndex}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Emergency Calls"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}