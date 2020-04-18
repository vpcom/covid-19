import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JhuService } from '../jhu/jhu.service';
import { CountryService } from '../country/country.service';
import { JhuDataObject } from '../jhu/jhu';
import { CountryData } from './main';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private jhuService: JhuService,
    private populationDataService: CountryService ) { }

    public getPopulations(): Observable<any> {
      return this.populationDataService.getPopulations();
    }
  
    public getDeaths(): Observable<any> {
      return this.jhuService.getDeaths();
    }

    improveCountryData(): Observable<any> {
      return this.jhuService.improveCountryData();
    }



  // TODO
  // getPopulation(countryName: string): Observable<any> {
  //   return this.http.get();
  // }

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
    // test.append
    // {
    //   countryCode: 'string',
    //   population: 0,
    //   confirmed: 0,
    //   deaths: 0,
    //   recovered: 0,
    //   confirmedRatio: 0,
    //   deathsRatio: 0,
    //   recoveredRatio: 0,
    // }

    return test;

  }

  /**
   * TODO manage well the data here because the list include
   * repetitvie entries and specific naming and special places or territories.
   */

  // Filter ?
  // Merge repetitive entries
  // Fix names
  // Fix something else?

  convertCovidData(data: JhuDataObject):CountryData[] {

    let test: CountryData[];
    data.locations.forEach(loc => {
      return {
        countryCode: undefined,
        name: loc.country,
        population: undefined,
        coordinates: undefined
      }
    });
    // test.append

    return test;

  }


}
