// District breakdown chart

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

export default function ViolationsByDistrict({ data }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex flex-col h-full">
      <h3 className="text-white font-semibold mb-1">
        Code Violations by District
      </h3>
      <p className="text-slate-400 text-xs mb-6">
        Higher counts indicate neighbourhood decline
      </p>
      <div className="flex-1">
      <ResponsiveContainer width="100%" height={370}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="district"
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            label={{
              value: 'District',
              position: 'insideBottom',
              offset: -10,
              fill: '#f97316',
              fontSize: 13
            }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{
              value: 'Violations',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              dy: 35,
              fill: '#f97316',
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
          <Bar
            dataKey="count"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            name="Violations"
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}