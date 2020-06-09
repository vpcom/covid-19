
export interface Country {
  slug: string; // Understandable identifier
  name: string;
  alpha2code: string;
  alpha3code: string;
  population: number;
  region: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  latitude: string;
  longitude: string;
}
