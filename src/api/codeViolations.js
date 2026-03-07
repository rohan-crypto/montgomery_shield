// Code violations API

import { API } from '../constants/apiEndpoints'

export async function fetchCodeViolations() {
  const response = await fetch(
    `${API.CODE_VIOLATIONS}&resultRecordCount=2000`
  )
  const data = await response.json()
  return data.features.map(f => ({
    ...f.attributes,
    lat: f.geometry?.y,
    lng: f.geometry?.x,
  }))
}