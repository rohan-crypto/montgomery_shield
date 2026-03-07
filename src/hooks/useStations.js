// Fetches station locations

import { useState, useEffect } from 'react'
import { fetchStations } from '../api/stations'

export function useStations() {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStations()
      .then(setStations)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const fireStations = stations.filter(s => s.category === 'Fire Station')
  const policeStations = stations.filter(s => s.category === 'Police Station')

  return {
    stations,
    fireStations,
    policeStations,
    loading,
    error,
  }
}