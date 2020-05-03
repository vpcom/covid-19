import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JhuDataObject } from '../jhu/jhu.d';
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
    // console.log('getDeaths', countries);
    return this.jhuService.getDeaths().pipe(
      // tap(data => { console.log(data) }),
      map((data: JhuDataObject) => {
        // console.log('getDeaths', data);

        const merge = this.mergeArrayObjects(countries, data.locations);
        // console.log(merge);

        return merge;
      })
    )
  }

  public getDeathsForGraph(countries: Country[], countryFilter: string): Observable<any> {
    // console.log('getDeathsForGraph', countries, countryFilter);
    return this.jhuService.getDeaths().pipe(
      // tap(data => { console.log(data) }),
      map((data: JhuDataObject) => {
        // console.log('getDeathsForGraph', data);

        const merge = data.locations.filter(x => x.country_code === countryFilter);
        // console.log(merge);

        const x = [];
        const y = [];

        if (merge.length === 1) {
          Object.keys(merge[0].history).forEach(key => {
            x.push(key);
            y.push(merge[0].history[key]);
        });
        }

        return {x: x, y: y};
      })
    )
  }



  mergeArrayObjects(populationsArray, deathsArray){
    return populationsArray.map(popStat => {
      const matchingCountry = deathsArray.filter(deathsArray => deathsArray.country_code === popStat.countryCode)
     // console.log(matchingCountry);
      if (matchingCountry[0]) {
        return {
          name: matchingCountry[0].country,
          population: popStat.population,
          deaths: matchingCountry[0].history.latest,
          deathsRatio: Math.round(matchingCountry[0].latest / popStat.population * 100000)
        }
      }
      else {
        // TODO get all countries within the list, but in service
        // console.log(popStat.country);
      }
    }).filter(data => typeof data !== 'undefined');
  }


}
