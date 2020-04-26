import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryService } from '../country/country.service';
import { CountryData } from './main';
import { CovidService } from '../covid/covid.service';
import { Country } from '../country/country';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private covidService: CovidService,
    private countryService: CountryService
  ) { }

  public getCountries(): Observable<Country[]> {
    return this.countryService.getCountries();
  }

  public getDeaths(countries: Country[]): Observable<any> {
    return this.covidService.getDeaths(countries);
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
