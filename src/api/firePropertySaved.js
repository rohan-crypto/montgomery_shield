// Fire property saved API

import { API } from '../constants/apiEndpoints'

export async function fetchFirePropertySaved() {
  const response = await fetch(API.FIRE_PROPERTY_SAVED)
  const data = await response.json()
  return data.features.map(f => f.attributes)
}