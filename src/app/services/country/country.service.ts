import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Country } from '../../types/country.d';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  populationData = '/assets/data/countries_final.json';

  constructor(private http: HttpClient) { }

  /**
   * Provides the data characterising the countries. 
   */
  public getCountries(): Observable<Country[]> {
    return this.http.get(this.populationData).pipe(
      tap(data => { console.log(data) }),
      map((data: Country[]) => {
        data.map(countryData => {
          return countryData;
        });
        // console.log(data);
        return data;
      })
    );
  }

}
