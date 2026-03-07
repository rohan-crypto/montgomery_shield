// Fire + Police stations API

import { API } from '../constants/apiEndpoints'

export async function fetchStations() {
  const response = await fetch(API.STATIONS)
  const data = await response.json()
  return data.features.map(f => ({
    ...f.attributes,
    lat: f.geometry?.y,
    lng: f.geometry?.x,
  }))
}