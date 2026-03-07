// Business licenses API

import { API } from '../constants/apiEndpoints'

export async function fetchBusinessLicenses() {
  const response = await fetch(
    `${API.BUSINESS_LICENSES}&resultRecordCount=2000&orderByFields=OBJECTID DESC`
  )
  const data = await response.json()
  return data.features
    .filter(f => f.geometry)
    .map(f => ({
      ...f.attributes,
      lat: f.geometry?.y,
      lng: f.geometry?.x,
    }))
}