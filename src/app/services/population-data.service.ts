import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { countryPopulation } from './population-data';

@Injectable({
  providedIn: 'root'
})
export class PopulationDataService {

  populationData = '/assets/data/population.json';

  constructor(private http: HttpClient) { }

  getPopulations(): Observable<any> {
    return this.http.get(this.populationData).pipe(
      tap(data => { console.log(data) }),
      map((data: countryPopulation[]) => {
        data.map(countryData => {
          console.log(countryData);
          return countryData;
        });
        console.log(data);
        return data;
      })
    );
  }

  // TODO
  // getPopulation(countryName: string): Observable<any> {
  //   return this.http.get();
  // }
}
