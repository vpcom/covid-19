import { Covid19apiService } from './../covid19api/covid19api.service';
import { Injectable } from '@angular/core';
import { Observable, of, forkJoin } from 'rxjs';
import { CountryService } from '../country/country.service';
import { CountryData } from '../../types/main';
import { CovidService } from '../covid/covid.service';
import { Country } from '../../types/country.d';
import { map, switchMap } from 'rxjs/operators';
import { CovidDataService } from '../covid-data/covid-data.service';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  countryFilter = 'CH';

  constructor(
    private covidService: CovidService,
    private countryService: CountryService,
    private covidDataService: CovidDataService,
  ) { }


  // displayedColumns: string[] = ['name', 'population', 'deaths', 'deathsRatio'];

  public getData(countryList: any[] = undefined): Observable<any[]> {
    console.log('TableDataService.getData')

    return forkJoin(
      this.countryService.getCountries(),
      this.covidDataService.getCovidData()
    ).pipe(
      map(([countries, deaths]) => {

        console.log(countries);
        console.log(deaths);

        const testJson = [];
        countries.forEach(popStat => {

          const matchingCountry = deaths.filter(deathsArray => deathsArray.country === popStat.slug);

          console.log(popStat);
          if (matchingCountry[0]) {
            testJson.push({
              countryCode: matchingCountry[0].country_code,
              name: matchingCountry[0].country,
              population: popStat.population,
              coordinates: matchingCountry[0].coordinates
            });
          }

        });
        console.log(testJson);

        return testJson;
      })
    );
  }


  // public getDeaths_old(countries: Country[]): Observable<any> {
  //   console.log(countries);
  //   return this.covidService.getDeaths_old(countries);
  // }

  // public getDeathsForTable(countries: Country[]): Observable<any> {
  //   return this.covidService.getDeaths().pipe(
  //     switchMap(x => {
  //       console.log(x);
  //       return of(x);
  //     })
  //   );
  // }




  private convertCountryData(data: any): CountryData[] {
    let test: CountryData[];
    data.locations.forEach(loc => {
      return {
        countryCode: undefined,
        name: loc.country,
        population: loc.population,
        coordinates: undefined
      }
    });

    return test;
  }

}
