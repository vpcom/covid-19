import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { CountryService } from '../country/country.service';
import { CountryData } from '../../types/main';
import { CovidDataService } from '../covid-data/covid-data.service';
import { map } from 'rxjs/operators';
import { Country } from 'src/app/types/country';

export const defaultCountryAlpha3Code = 'CHE';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {


  constructor(
    private countryService: CountryService,
    private covidDataService: CovidDataService
  ) { }

  public getData(country: Country = undefined): Observable<{ x: any[]; y: any; }> {
    // console.log('graphDataService.getData', country)

    let countries$ = this.countryService.getCountryWithAlpha3Code(country.alpha3Code);
    let covidData$ = this.covidDataService.getCovidData();


    return combineLatest(countries$, covidData$).pipe(
      map(([countries, covidData]) => {
        // console.log(countries);
        // console.log(covidData);

        const x = [];
        const y = [];
        for (const dateKey in covidData[country.alpha3Code]) {
          x.push(dateKey);
          y.push(covidData[country.alpha3Code][dateKey].deaths);
        }

        // console.log(x, y)

        return {x: x, y: y};
      })
    );
  }

  convertCountryData(data: any): CountryData[] {
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
