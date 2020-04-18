


// Format of the top level structure of data taken from JHU endpoint
export interface JhuDataObject {
  latest: number;
  locations: JhuData[];
}

export interface JhuDataReg {
  value: JhuData;
  index: number;
  array: JhuData[];
}

export interface JhuData {
  coordinates: Coordinates;
  country: string;
  country_code: string;
  history: string[];
  latest: string;
  province: string;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}
