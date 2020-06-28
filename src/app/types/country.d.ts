
export interface Country {
  slug: string; // Understandable identifier
  name: string;
  alpha2Code: string;
  alpha3Code: string;
  population: number;
  region: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}
