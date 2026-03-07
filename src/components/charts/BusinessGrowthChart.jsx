import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

export default function BusinessGrowthChart({ data }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-1">
        Business License Activity by Year
      </h3>
      <p className="text-slate-400 text-xs mb-4">
        New and renewed business licenses issued
      </p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 30, bottom: 20 }}
        >
          <defs>
            <linearGradient id="businessGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="year"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{
              value: 'Year',
              position: 'insideBottom',
              offset: -10,
              fill: '#3b82f6',
              fontSize: 13
            }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{
              value: 'Licenses',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              dy: 35,
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
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#businessGradient)"
            name="Licenses"
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}