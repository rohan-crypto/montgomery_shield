// Fetches + processes fire data

import { useState, useEffect } from 'react'
import { fetchFireIncidents } from '../api/fireIncidents'
import { fetchFirePropertySaved } from '../api/firePropertySaved'
import { NFPA_RESPONSE_STANDARD } from '../constants/apiEndpoints'

export function useFireData() {
  const [incidents, setIncidents] = useState([])
  const [propertySaved, setPropertySaved] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    Promise.all([fetchFireIncidents(), fetchFirePropertySaved()])
      .then(([inc, prop]) => {
        setIncidents(inc)
        setPropertySaved(prop)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  // Average response time in seconds
  const avgResponseTime = incidents.length
    ? Math.round(
        incidents
          .filter(i => i.Unit_Response_Time)
          .reduce((sum, i) => sum + i.Unit_Response_Time, 0) /
        incidents.filter(i => i.Unit_Response_Time).length
      )
    : 0

  // How many times over NFPA standard
  const nfpaRatio = (avgResponseTime / NFPA_RESPONSE_STANDARD).toFixed(1)

  // Total property saved across all months
  const totalPropertySaved = propertySaved.reduce(
    (sum, d) => sum + (d.Total_Estimated_Property_Saved || 0), 0
  )

  // Total property lost
  const totalPropertyLost = propertySaved.reduce(
    (sum, d) => sum + (d.Total_Estimated_Property_Loss || 0), 0
  )

  return {
    incidents,
    propertySaved,
    loading,
    error,
    avgResponseTime,
    nfpaRatio,
    totalPropertySaved,
    totalPropertyLost,
  }
}