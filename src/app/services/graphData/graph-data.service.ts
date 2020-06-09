import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { CountryService } from '../country/country.service';
import { CountryData } from '../../types/main';
import { CovidDataService } from '../covid-data/covid-data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {

  countryFilter = 'CHE';

  constructor(
    private countryService: CountryService,
    private covidDataService: CovidDataService
  ) { }

  public getData(countryList: any[] = undefined): Observable<{ x: any[]; y: any; }> {
    console.log('graphDataService.getData')

    let countries$ = this.countryService.getCountries();
    let covidData$ = this.covidDataService.getCovidData();


    return combineLatest(countries$, covidData$).pipe(
      map(([countries, covidData]) => {
        // console.log(countries);
        // console.log(covidData);

        const x = [];
        const y = [];
        for (const dateKey in covidData[this.countryFilter]) {
          console.log(`${dateKey}: ${covidData[this.countryFilter][dateKey]}`);
          x.push(dateKey);
          y.push(covidData[this.countryFilter][dateKey].deaths);
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
