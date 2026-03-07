// Property saved/lost chart

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts'

export default function PropertySavedChart({ data }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-1">
        Property Saved vs Lost in Fires — Monthly
      </h3>
      <p className="text-slate-400 text-xs mb-4">
        Economic impact of fire response on city property
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 50, bottom: 35 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="month"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{
                value: 'Month',
                position: 'insideBottom',
                offset: -15,
                fill: '#3b82f6',
                fontSize: 13,
                dx: -20
            }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            tickFormatter={v => `$${(v / 1e6).toFixed(1)}M`}
            domain={[0, 'dataMax + 2000000']}
            label={{
                value: 'Value ($)',
                angle: -90,
                position: 'insideLeft',
                offset: -10,
                dy: 40,
                fill: '#3b82f6',
                fontSize: 13
            }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#f1f5f9'
            }}
            formatter={(value) => [`$${(value / 1e6).toFixed(2)}M`]}
          />
          <Legend
            verticalAlign="top"
            align="right"
            wrapperStyle={{
                color: '#94a3b8',
                fontSize: 12,
                paddingBottom: '10px'
            }}
          />
          <Bar
            dataKey="saved"
            fill="#10b981"
            radius={[4, 4, 0, 0]}
            name="Property Saved"
          />
          <Bar
            dataKey="lost"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
            name="Property Lost"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}