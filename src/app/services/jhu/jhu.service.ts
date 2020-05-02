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
    return this.getCachedDeaths().pipe(
      map((cachedData: JhuDataObject) => {
        if (typeof cachedData !== 'undefined') {
          return of(cachedData);
        }
      }),
	    switchMap(cachedData => {
        if (typeof cachedData === 'undefined') {
          return this.getJhuDataFromEndpoint();
        }
      })
    );
  }

  private getCachedDeaths(): Observable<JhuDataObject> {
    return of(this.cachedDeaths);
  }

  /**
   * Getting brut data from end point.
   */
  private getJhuDataFromEndpoint(): Observable<JhuDataObject> {
    // console.log('getJhuDataFromEndpoint');
    return this.http.get(this.covid19apiEndPoint + 'deaths').pipe(
      // tap(data => { console.log(data) }),
      catchError(err => {
        console.error('Error from endpoint: ', err);
        return of(err);
      })
    );
  }

}
