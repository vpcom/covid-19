import { Covid19apiService } from './../covid19api/covid19api.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountryService } from '../country/country.service';
import { CountryData } from './main';
import { CovidService } from '../covid/covid.service';
import { Country } from '../country/country';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  countryFilter = 'CH';

  constructor(
    private covidService: CovidService,
    private countryService: CountryService,
    private covid19apiService: Covid19apiService
  ) { }

  public getCountries(): Observable<Country[]> {
    return this.covid19apiService.getCountries();
  }

  public getCountries_old(): Observable<Country[]> {
    return this.countryService.getCountries();
  }

  public getDeaths(countries: Country[]): Observable<any> {
    return this.covidService.getDeaths(countries);
  }

  public getDeathsForGraph(countries: Country[]): Observable<any> {
    return this.covidService.getDeathsForGraph(countries, this.countryFilter).pipe(
      switchMap(x => {
        // console.log(x);
        return of(x);
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
