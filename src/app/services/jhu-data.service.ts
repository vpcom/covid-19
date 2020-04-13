import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, never } from 'rxjs';
import { filter, map, tap, switchMap, take } from 'rxjs/operators';
import { jhuDataObject, jhuDataReg, jhuData } from './jhu-data';
import { ChildActivationEnd } from '@angular/router';
import { FullscreenOverlayContainer } from '@angular/cdk/overlay';


export enum jhuEndpoint {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths',
}

export interface jhuDataTypes {
  countryCode: string;
  confirmed: number; // TODO history
  deaths: number; // TODO history
  recovered: number; // TODO history
}

@Injectable({
  providedIn: 'root'
})
export class JhuDataService {

  herokuEndpoint = 'https://covid19api.herokuapp.com/';

  cachedDeaths: jhuData[];
  cachedRecovered: jhuData[];
  cachedConfirmed: jhuData[];


  repetedCountries = ['Australia', 'Canada', 'China', 'France', 'Denmark', 'France', 'Netherlands', 'United Kingdom', 'US'];


  constructor(private http: HttpClient) { }

  getCachedDeaths(): Observable<jhuData[]> {
    return of(this.cachedDeaths);
  }

  retreiveFormatAndStore(): Observable<any> {
    return of();
  }

  getDeaths(): Observable<any> {
    console.log('getDeaths');
    return this.getCachedDeaths().pipe(
      tap(data => { console.log(data) }),
      map((cachedData: jhuData[]) => {
        if (typeof cachedData !== 'undefined') {
          return of(cachedData);
        }
      }),
	    switchMap(selectedItems => this.getDeathFromEndpoint())
    );
  }

  /**
   * TODO manage well the data here because the list include
   * repetitvie entries and specific naming and special places or territories.
   */
  getDeathFromEndpoint(): Observable<jhuData[]> {
    console.log('getDeathFromEndpoint');
    return this.http.get(this.herokuEndpoint + 'deaths').pipe(
      tap(data => { console.log(data) }),
      map((data: jhuDataObject) => {
        // console.log(data);

        // Filter ?

        // Merge repetitive entries

        // Fix names

        // Fix something else?

        return data.locations;
      })
    );
  }

  convert() {

  }

}
