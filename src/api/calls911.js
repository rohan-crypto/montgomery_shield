// 911 calls API

import { API } from '../constants/apiEndpoints'

export async function fetch911Calls() {
  const response = await fetch(API.CALLS_911)
  const data = await response.json()
  return data.features.map(f => f.attributes)
}