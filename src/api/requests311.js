// 311 service requests API

import { API } from '../constants/apiEndpoints'

export async function fetch311Requests() {
  const response = await fetch(
    `${API.REQUESTS_311}&resultRecordCount=2000&orderByFields=OBJECTID DESC`
  )
  const data = await response.json()
  return data.features.map(f => ({
    ...f.attributes,
    lat: f.geometry?.y,
    lng: f.geometry?.x,
  }))
}
