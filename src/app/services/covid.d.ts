
// deprecated
// export interface countryStat {
//   name: string;
//   population: number;
//   deaths: number;
//   deathsRatio: number;
// }

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

