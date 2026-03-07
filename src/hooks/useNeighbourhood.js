// Fetches violations + nuisance

import { useState, useEffect } from 'react'
import { fetchCodeViolations } from '../api/codeViolations'
import { fetchEnvironmentalNuisance } from '../api/environmentalNuisance'
import { fetch311Requests } from '../api/requests311'

export function useNeighbourhood() {
  const [violations, setViolations] = useState([])
  const [nuisance, setNuisance] = useState([])
  const [requests311, setRequests311] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchCodeViolations(),
      fetchEnvironmentalNuisance(),
      fetch311Requests(),
    ])
      .then(([v, n, r]) => {
        setViolations(v)
        setNuisance(n)
        setRequests311(r)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  // Violations by district
  const violationsByDistrict = violations.reduce((acc, v) => {
    const district = v.CouncilDistrict || 'Unknown'
    acc[district] = (acc[district] || 0) + 1
    return acc
  }, {})

  const violationsChartData = Object.entries(violationsByDistrict)
    .map(([district, count]) => ({ district, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)

  // 311 by status
  const requestsByStatus = requests311.reduce((acc, r) => {
    const status = r.Status || 'Unknown'
    acc[status] = (acc[status] || 0) + 1
    return acc
  }, {})

  // 311 by type top 5
  const requestsByType = requests311.reduce((acc, r) => {
    const type = r.Request_Type || 'Unknown'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  const topRequestTypes = Object.entries(requestsByType)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Open requests count
  const openRequests = requests311.filter(r => r.Status === 'Open').length
  const inProgressRequests = requests311.filter(r => r.Status === 'In Progress').length

  return {
    violations,
    nuisance,
    requests311,
    loading,
    error,
    violationsChartData,
    requestsByStatus,
    topRequestTypes,
    openRequests,
    inProgressRequests,
  }
}