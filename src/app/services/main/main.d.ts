
// Country related data
export interface CountryData {
  countryCode: string;
  name: string; 
  population: number;
  coordinates: Coordinates;
}

// COVID related data
export interface CovidData {
  confirmed: number;
  deaths: number;
  recovered: number;
  confirmedRatio: number;
  deathsRatio: number;
  recoveredRatio: number;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}