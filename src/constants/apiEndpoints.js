// All 9 API URLs in one place

// Base URLs
const ARCGIS_BASE = "https://services7.arcgis.com/xNUwUjOJqYE54USz/arcgis/rest/services";
const GIS_BASE = "https://gis.montgomeryal.gov/server/rest/services/HostedDatasets";

// Common query params
const DEFAULT_PARAMS = "?where=1%3D1&outFields=*&outSR=4326&f=json";

export const API = {

  // 911 Calls — monthly volume by category and provider
  CALLS_911: `${ARCGIS_BASE}/911_Calls_Data/FeatureServer/0/query${DEFAULT_PARAMS}`,

  // Fire Rescue — all incidents with response times and locations
  FIRE_INCIDENTS: `${ARCGIS_BASE}/Fire_Rescue_All_Incidents/FeatureServer/0/query${DEFAULT_PARAMS}`,

  // Fire Property — estimated property value saved vs lost monthly
  FIRE_PROPERTY_SAVED: `${ARCGIS_BASE}/Fire_Rescue_Property_Saved_/FeatureServer/0/query${DEFAULT_PARAMS}`,

  // Fire + Police Stations — all facility locations (layer 3)
  STATIONS: `${ARCGIS_BASE}/Story_Map___Live__1__WFL1/FeatureServer/3/query${DEFAULT_PARAMS}`,

  // 311 Service Requests — citizen complaints by type, status, district
  REQUESTS_311: `${GIS_BASE}/Received_311_Service_Request/MapServer/0/query${DEFAULT_PARAMS}`,

  // Code Violations — nuisance and demolition cases by district
  CODE_VIOLATIONS: `${GIS_BASE}/Code_Violations/FeatureServer/0/query${DEFAULT_PARAMS}`,

  // Business Licenses — active businesses by category and location
  BUSINESS_LICENSES: `${GIS_BASE}/Business_License/FeatureServer/0/query${DEFAULT_PARAMS}`,

  // Environmental Nuisance — litter, dumping, junk vehicles
  ENVIRONMENTAL_NUISANCE: `${ARCGIS_BASE}/Environmental_Nuisance/FeatureServer/0/query${DEFAULT_PARAMS}`,

  // Suspected Rentals — unregistered rental properties as polygons (layer 3)
  SUSPECTED_RENTALS: `${ARCGIS_BASE}/Suspected_Rentals/FeatureServer/3/query${DEFAULT_PARAMS}`,

};

// Montgomery city centre coordinates for map initialisation
export const MONTGOMERY_CENTER = {
  LAT: 32.3668,
  LNG: -86.2999,
  DEFAULT_ZOOM: 12,
};

// NFPA standard response time in seconds (4 minutes)
export const NFPA_RESPONSE_STANDARD = 240;