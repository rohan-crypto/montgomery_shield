// Fetches + processes 911 data

import { useState, useEffect } from 'react'
import { fetch911Calls } from '../api/calls911'

export function use911Calls() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch911Calls()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  // Total emergency calls for latest month
  const latestEmergencyTotal = data
    .filter(d => d.Year === 2026 && d.Call_Category === 'Emergency' && d.Call_Origin === 'Incoming')
    .reduce((sum, d) => sum + d.Call_Count_By_Origin, 0)

  // Monthly totals for chart
  const monthlyTotals = data
    .filter(d => d.Call_Category === 'Emergency' && d.Call_Origin === 'Incoming')
    .reduce((acc, d) => {
      const key = `${d.Year}-${d.Month}`
      acc[key] = (acc[key] || 0) + d.Call_Count_By_Origin
      return acc
    }, {})

  const chartData = Object.entries(monthlyTotals).map(([key, total]) => ({
    month: key.split('-')[1].split(' - ')[1]?.slice(0, 3) || key,
    total,
  }))

  return { data, loading, error, latestEmergencyTotal, chartData }
}