import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { JhuDataObject } from '../jhu/jhu.d';
import { JhuService } from '../jhu/jhu.service';
import { Country } from '../../types/country.d';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private jhuService: JhuService) { }

  /**
   * TODO get from cache or new endpoint and call a function to transform the data.
   * 
   * CovidData
   * 
   *
  public getDeaths(): Observable<any> {
    console.log('getDeaths',);
    return this.jhuService.getDeaths().pipe(
      // tap(data => { console.log(data) }),
      map((data: JhuDataObject) => {
        // console.log('getDeaths', data);

        return data;
      })
    )
  }

  /**
   * TODO manage well the data here because the list include
   * repetitvie entries and specific naming and special places or territories.
   * 
   * CovidData
   * 
   *
  public getDeaths_old(countries: Country[]): Observable<any> {
    console.log('getDeaths', countries);
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

  /*
  // TODO use new endpoint
  public getDeathsForGraph(countries: Country[], countryFilter: string): Observable<any> {
    // console.log('getDeathsForGraph', countries, countryFilter);
    return this.jhuService.getDeaths().pipe(
      // tap(data => { console.log(data) }),
      map((data: JhuDataObject) => {
        // console.log('getDeathsForGraph', data);

        const countryData = data.locations.filter(x => x.country_code === countryFilter);
        console.log(countryData);

        const x = [];
        const y = [];

        if (countryData.length === 1) {
          console.log(countryData[0].history)
          for(let i in countryData[0].history) {
       //     console.log( i + " : " + countryData[0].history[i]);
          }

          Object.keys(countryData[0].history).forEach(key => {
            // console.log(key)
            x.push(key);
            y.push(countryData[0].history[key]);
        });
        }

        return {x: x, y: y};
      })
    )
  }
  */



  mergeArrayObjects(populationsArray, deathsArray){
    console.log(populationsArray, deathsArray)
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
