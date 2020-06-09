
export interface Country {
  iso: string;
  name: string;
  slug: string;
}

export enum Status {
  confirmed = 'CONFIRMED',
  recovered = 'RECOVERED',
  deaths = 'DEATHS',
}

export interface Case {
  countryName: string;
  countryCode: string;
  province?: string;
  // city: string;
  // cityCode: string;
  // lat: number;
  // lon: number;
  confirmed: number;
  deaths: number;
  recovered: number;
  // active: number;
  date: string;
}

