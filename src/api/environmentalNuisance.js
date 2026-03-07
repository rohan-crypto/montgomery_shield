// Environmental nuisance API

import { API } from '../constants/apiEndpoints'

export async function fetchEnvironmentalNuisance() {
  const response = await fetch(
    `${API.ENVIRONMENTAL_NUISANCE}&resultRecordCount=2000`
  )
  const data = await response.json()
  return data.features.map(f => ({
    ...f.attributes,
    lat: f.geometry?.y,
    lng: f.geometry?.x,
  }))
}