import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'

export default function ResponseTimeChart({ incidents }) {
  const districtData = incidents
    .filter(i => i.Unit_Response_Time && i.District)
    .reduce((acc, i) => {
      if (!acc[i.District]) acc[i.District] = { total: 0, count: 0 }
      acc[i.District].total += i.Unit_Response_Time
      acc[i.District].count += 1
      return acc
    }, {})

  const chartData = Object.entries(districtData)
    .map(([district, { total, count }]) => ({
      district,
      avgSeconds: Math.round(total / count),
      avgMinutes: parseFloat((total / count / 60).toFixed(1))
    }))
    .sort((a, b) => b.avgSeconds - a.avgSeconds)
    .slice(0, 10)

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
      <h3 className="text-white font-semibold mb-1">
        Average Fire Response Time by District
      </h3>
      <p className="text-slate-400 text-xs mb-4">
        White dashed line = NFPA 4-minute safe standard
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="district"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{
                value: 'District',
                position: 'insideBottom',
                offset: -10,
                fill: '#f97316',
                fontSize: 14
            }}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            label={{
                value: 'Minutes',
                angle: -90,
                position: 'insideLeft',
                offset: 10,
                dy: 30,
                fill: '#f97316',
                fontSize: 14
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
            formatter={(value) => [`${value} min`, 'Avg Response']}
          />
          <ReferenceLine
            y={4}
            stroke="#ffffff"
            strokeDasharray="5 5"
            label={{
              value: 'NFPA Standard',
              fill: '#ffffff',
              fontSize: 11
            }}
          />
          <Bar
            dataKey="avgMinutes"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            name="Avg Response (min)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}