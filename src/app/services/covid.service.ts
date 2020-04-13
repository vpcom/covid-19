import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { JhuDataService } from './jhu-data.service';
import { PopulationDataService } from './population-data.service';

@Injectable({
  providedIn: 'root'
})
export class CovidService {


  constructor(
    private jhuDataService: JhuDataService,
    private populationDataService: PopulationDataService ) { }

  getDeaths(): Observable<any> {
    return this.jhuDataService.getDeaths();
  }

  getPopulations(): Observable<any> {
    return this.populationDataService.getPopulations();
  }

}
