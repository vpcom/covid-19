
// The app's internal type
export interface appCountryData {
  countryCode: string;
  population: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  confirmedRatio: number;
  deathsRatio: number;
  recoveredRatio: number;
}

// Format of the top leevel structure of data taken from JHU endpoint
export interface jhuDataObject {
  latest: number;
  locations: jhuData[];
}

export interface jhuDataReg {
  value: jhuData;
  index: number;
  array: jhuData[];
}

export interface jhuData {
  coordinates: coordinates;
  country: string;
  country_code: string;
  history: string[];
  latest: string;
  province: string;
}

export interface coordinates {
  latitude: string;
  longitude: string;
}
