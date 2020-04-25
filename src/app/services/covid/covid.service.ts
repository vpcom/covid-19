import { CovidData } from './../main/main.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, switchMap, catchError } from 'rxjs/operators';
import { JhuDataObject, JhuData } from '../jhu/jhu.d';
import { JhuService } from '../jhu/jhu.service';
import { Country } from '../country/country';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private jhuService: JhuService) { }

  /**
   * TODO manage well the data here because the list include
   * repetitvie entries and specific naming and special places or territories.
   * 
   * CovidData
   * 
   */
  public getDeaths(countries: Country[]): Observable<any> {
    console.log('getDeaths');
    return this.jhuService.getDeaths().pipe(
      tap(data => { console.log(data) }),
      map((data: JhuDataObject) => {

        console.log('getDeaths');
        return data.locations;
      })
    )
  }

}
