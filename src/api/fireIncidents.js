import { API } from '../constants/apiEndpoints'

export async function fetchFireIncidents() {
  const response = await fetch(
    `${API.FIRE_INCIDENTS}&resultRecordCount=1000&orderByFields=ObjectId DESC`
  )
  const data = await response.json()
  return data.features.map(f => ({
    ...f.attributes,
    lat: f.attributes.Latitude,
    lng: f.attributes.Longitude,
  }))
}