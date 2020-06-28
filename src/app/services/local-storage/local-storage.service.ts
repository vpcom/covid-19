import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum CaheKey {
  COVID_DATA = "COVID_DATA",
  COUNTRIES = "COUNTRIES"
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorageKey = 'VIP-CovidExplorer';

  constructor() { }

  public getCache(key: CaheKey): Observable<any> {
    // console.log('cachedData', localStorage.getItem(this.localStorageKey));
    return of(JSON.parse(localStorage.getItem(this.localStorageKey + '.' + key)));
  }

  public setCache(key, data) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
    // console.log(JSON.stringify(data));
  }

  public isCacheSet(): Observable<boolean> {
    return of(localStorage.getItem(this.localStorageKey) === null);
  }

  public emptyCache() {
    localStorage.setItem(this.localStorageKey, null);
  }

}
