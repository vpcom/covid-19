import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Country } from '../../types/country.d';
import { LocalStorageService, CaheKey } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  populationData = './assets/data/countries.json';
  cachedData: any;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }


  /**
   * Provides the data characterising the countries. 
   */
  public getCountries(): Observable<Country[]> {
    return this.localStorageService.getCache(CaheKey.COUNTRIES).pipe(
      tap(data => { console.log(data) }),
      map(cachedData => cachedData),
      switchMap(cachedData => {
        if (cachedData !== null) {
          return of(cachedData);
        } else {
          return this.http.get(this.populationData).pipe(
            map((data: any[]) => {
              return data.map(countryData => {
                return {
                  slug: countryData.slug,
                  name: countryData.name,
                  alpha2Code: countryData.alpha2code,
                  alpha3Code: countryData.alpha3code,
                  population: countryData.population,
                  region: countryData.region,
                  coordinates: countryData.coordinates,
                };
              });
            })
          );
        }
      })
    );
  }

  public getCountryWithAlpha3Code(alpha3Code): Observable<Country> {
    return this.getCountries().pipe(
      map((data: Country[]) => 
        data.find(country => country.alpha3Code === alpha3Code)
      )
    );
  }

}
