import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { JhuDataObject, JhuData } from '../jhu/jhu.d';


export enum jhuEndpoint {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths',
}

export interface JhuDataTypes {
  countryCode: string;
  confirmed: number; // TODO history
  deaths: number; // TODO history
  recovered: number; // TODO history
}

@Injectable({
  providedIn: 'root'
})
export class JhuService {

  covid19apiEndPoint = 'https://covid19api.herokuapp.com/';

  cachedDeaths: JhuData[];
  cachedRecovered: JhuData[];
  cachedConfirmed: JhuData[];


  repetedCountries = ['Australia', 'Canada', 'China', 'France', 'Denmark', 'France', 'Netherlands', 'United Kingdom', 'US'];


  constructor(private http: HttpClient) { }

  public getDeaths(): Observable<any> {
    console.log('getDeaths');
    return this.getCachedDeaths().pipe(
      tap(data => { console.log(data) }),
      map((cachedData: JhuData[]) => {
        if (typeof cachedData !== 'undefined') {
          return of(cachedData);
        }
      }),
	    switchMap(selectedItems => this.getDeathFromEndpoint())
    );
  }

  private getCachedDeaths(): Observable<JhuData[]> {
    return of(this.cachedDeaths);
  }

  /**
   * TODO manage well the data here because the list include
   * repetitvie entries and specific naming and special places or territories.
   */
  private getDeathFromEndpoint(): Observable<JhuData[]> {
    console.log('getDeathFromEndpoint');
    return this.http.get(this.covid19apiEndPoint + 'deaths').pipe(
      tap(data => { console.log(data) }),
      map((data: JhuDataObject) => {
        return data.locations;
      })
    );
  }
// make an ignorant service
  improveCountryData(): Observable<any> {
    console.log('improveCountryData');
    return of();
  }


}
