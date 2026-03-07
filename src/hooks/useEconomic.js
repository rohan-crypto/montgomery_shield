import { useState, useEffect } from 'react'
import { fetchBusinessLicenses } from '../api/businessLicenses'
import { fetchFirePropertySaved } from '../api/firePropertySaved'

export function useEconomic() {
  const [businesses, setBusinesses] = useState([])
  const [propertySaved, setPropertySaved] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchBusinessLicenses(),
      fetchFirePropertySaved(),
    ])
      .then(([b, p]) => {
        setBusinesses(b)
        setPropertySaved(p)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  // Businesses by category top 8
  const byCategory = businesses.reduce((acc, b) => {
    const cat = b.scNAME || 'Unknown'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  const topCategories = Object.entries(byCategory)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  // Businesses by year
  const byYear = businesses.reduce((acc, b) => {
    const year = b.pvYEAR || b.postYear || 'Unknown'
    acc[year] = (acc[year] || 0) + 1
    return acc
  }, {})

  const byYearChartData = Object.entries(byYear)
    .filter(([year]) => year !== 'Unknown' && parseInt(year) >= 2019)
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => a.year - b.year)

  // Property saved chart data
  const propertySavedChartData = propertySaved.map(d => ({
    month: new Date(d.Months_in_Incident_Date).toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit'
    }),
    saved: d.Total_Estimated_Property_Saved,
    lost: d.Total_Estimated_Property_Loss,
    savedPct: parseFloat((d.Estimated_Property_Saved____ * 100).toFixed(1))
  }))

  // Totals
  const totalBusinesses = businesses.length
  const totalSaved = propertySaved.reduce((sum, d) => sum + (d.Total_Estimated_Property_Saved || 0), 0)
  const totalLost = propertySaved.reduce((sum, d) => sum + (d.Total_Estimated_Property_Loss || 0), 0)
  const avgSavedPct = propertySaved.length
    ? (propertySaved.reduce((sum, d) => sum + (d.Estimated_Property_Saved____ || 0), 0) / propertySaved.length * 100).toFixed(1)
    : 0

  return {
    businesses,
    propertySaved,
    loading,
    error,
    topCategories,
    byYearChartData,
    propertySavedChartData,
    totalBusinesses,
    totalSaved,
    totalLost,
    avgSavedPct,
  }
}