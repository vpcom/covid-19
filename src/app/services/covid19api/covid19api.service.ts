import { Country } from './../../types/country.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Covid19apiService {

  SERVER_URL = 'https://api.covid19api.com';
  SEGMENT_COUNTRIES = '/countries';
  SEGMENT_COUNTRY = '/country';
  SLUG_COUNTRY_DEFAULT = '/switzerland';
  SLUG_ALL_SUMMARY = '/summary';

  cachedCountries: Country[];

  countriesEndpoint = this.SERVER_URL + this.SEGMENT_COUNTRIES;
  defaultCountryUrl =  this.SERVER_URL + this.SEGMENT_COUNTRY + this.SLUG_COUNTRY_DEFAULT;
  allCountriesSummaryEndpoint = this.SERVER_URL + this.SLUG_ALL_SUMMARY;


  constructor(private http: HttpClient) { }

  /**
   * Provides the COVID data for countries.
   * @param countryList list of country slugs 
   */
  public getCountriesData(countryList: any[]): Observable<any[]> {

    return this.getData(this.defaultCountryUrl);
  }

  /**
   * Provides ...
   * TODO caching
   * @param country country slug
   */
  public getAllCountriesSumary(): Observable<any[]> {
    return this.getData(this.allCountriesSummaryEndpoint);
  }

  /**
   * Provides the COVID data for countries.
   * @param countryList list of country slugs 
   */
  public getCountryDataGraph(countryList: any[]): Observable<{ x: any[]; y: any; }> {

    return this.getData(this.defaultCountryUrl).pipe(
      map(response => {
        const resultX = [];
        const resultY = [];
        try {
          console.log(response);
          

          response.forEach(dailyStat => {
            console.log(dailyStat);
            resultX.push({
              x: dailyStat.Date
            })
            resultY.push({
              y: dailyStat.Deaths
            })
          });

        } catch (error) {
          console.log(error);
        }


      return {
        x: resultX,
        y: resultY
      };
        
    }));



    // reached request limit
    // console.log('covid19apiService.getCountries')
    // return this.getCachedCountries().pipe(
    //   map((cachedCountries: Country[]) => {
    //     if (typeof cachedCountries !== 'undefined') {
    //       return of(cachedCountries);
    //     }
    //   }),
	  //   switchMap(cachedCountries => {
    //     if (typeof cachedCountries === 'undefined') {
    //       return this.getCountriesFromEndpoint();
    //     }
    //   })
    // );
  }

  /**
   * Getting brut data from end point.
   */
  private getDataFromEndpoint(): Observable<Country[]> {
    console.log('getJhuDataFromEndpoint');
    return this.http.get(this.countriesEndpoint).pipe(
      tap(data => { console.log(data) }),
      catchError(err => {
        console.error('Error from endpoint: ', err);
        return of(err);
      })
    );
  }

  private getCachedCountries(): Observable<Country[]> {
    return of(this.cachedCountries);
  }


  public getData(fileName): Observable<any[]> {
    return this.http.get(fileName).pipe(
      tap(data => { console.log(data) }),
      map((data: any[]) => {
        // data.map(data => {
        //   return data;
        // });
        // console.log(data);
        return data;
      })
    );
  }
}
