import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
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

  cachedDeaths: JhuDataObject;
  cachedRecovered: JhuDataObject;
  cachedConfirmed: JhuDataObject;


  repetedCountries = ['Australia', 'Canada', 'China', 'France', 'Denmark', 'France', 'Netherlands', 'United Kingdom', 'US'];


  constructor(private http: HttpClient) { }

  public getDeaths(): Observable<JhuDataObject> {
    // console.log('getDeaths');
    return this.getCachedDeaths().pipe(
      // tap(data => { console.log(data) }),
      map((cachedData: JhuDataObject) => {
        if (typeof cachedData !== 'undefined') {
          return of(cachedData);
        }
      }),
	    switchMap(selectedItems => {
        return this.getDeathFromEndpoint()
      })
    );
  }

  private getCachedDeaths(): Observable<JhuDataObject> {
    return of(this.cachedDeaths);
  }

  /**
   * 
   */
  private getDeathFromEndpoint(): Observable<JhuDataObject> {
    console.log('getDeathFromEndpoint');
    return this.http.get(this.covid19apiEndPoint + 'deaths').pipe(
      tap(data => { console.log(data) }),
      catchError(err => {
        console.log('Error from endpoint: ', err);
        return of(err);
      })
    );
  }

// make an ignorant service
  // improveCountryData(): Observable<any> {
  //   console.log('improveCountryData');
  //   return of();
  // }

}
