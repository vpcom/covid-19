import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  herokuEndpoint = 'https://covid19api.herokuapp.com/';
  populationData: string = '/assets/data/population.json';

  dataType: any;

  constructor(private http: HttpClient) { }

  getDeaths(): Observable<any> {
    return this.http.get(this.herokuEndpoint + 'deaths');
  }

  getPopulations(): Observable<any> {
    return this.http.get(this.populationData);
  }

  getPopulation(countryName: string): Observable<any> {
    return this.http.get(this.herokuEndpoint + 'deaths');
  }

}
