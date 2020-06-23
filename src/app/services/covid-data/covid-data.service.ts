import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
import { Case } from 'src/app/types/covid19api';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {

  urlBingEndpoint = 'https://raw.githubusercontent.com/microsoft/Bing-COVID-19-Data/master/data/Bing-COVID19-Data.csv';
  fullLocalData = './assets/data/Bing-COVID19-Data.csv';
  partialLocalData = './assets/data/Bing-COVID19-Data-reduced.csv';

  cachedData: any;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }


  public getCovidData(): Observable<any> {
    return this.localStorageService.getCache().pipe(
      // tap(data => { console.log(data) }),
      map(cachedData => cachedData),
      switchMap(cachedData => {
        if (cachedData !== null) {
          return of(cachedData);
        } else {
          return this.getDataFromEndpoint().pipe(
            map(rawData => {
              const transformedData = this.transformCsvToTypedArray(rawData);
              this.localStorageService.setCache(transformedData);
              return transformedData;
            }))
        }
      })
    );
  }

  private getDataFromEndpoint(): Observable<any> {
    return this.http.get(this.urlBingEndpoint, {responseType: 'text'});
  }

  private transformCsvToTypedArray(data): any {
    var csvData = {};
    var jsonObject = data.split(/\r?\n|\r/);
    let aCase: Case;

    for (var i = 0; i < jsonObject.length; i++) {
      // excludes the header
      if (i === 0) continue;

      const result = jsonObject[i].split(',');

      // excludes the empty lines
      if (result.length <= 1) continue;
      // restricts to countries only
      if (result[13] !== '') continue;
      // excludes the "world" category
      if (result[11] === '') continue;

      aCase = {
        countryName: result[12],
        countryCode: result[11],
        // province: result[13],
        confirmed: parseInt(result[2]),
        deaths: parseInt(result[4]),
        recovered: parseInt(result[6]),
        date: result[1], // "MM/DD/YYYY"
      }
      
      if (typeof csvData[aCase.countryCode] === 'undefined') {
        csvData[aCase.countryCode] = {};
      } 
      csvData[aCase.countryCode][aCase.date] = aCase;
    }
    
    // console.log(csvData);

    return csvData;
  }
  
}
