import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CountryService } from '../country/country.service';
import { map } from 'rxjs/operators';
import { CovidDataService } from '../covid-data/covid-data.service';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  countryFilter = 'CH';

  constructor(
    private countryService: CountryService,
    private covidDataService: CovidDataService,
  ) { }


  public getData(countryList: any[] = undefined): Observable<any[]> {
    // console.log('TableDataService.getData')

    return forkJoin(
      this.countryService.getCountries(),
      this.covidDataService.getCovidData()
    ).pipe(
      map(([countries, deaths]) => {

        // console.log(countries);
        // console.log(deaths);

        const testJson = [];
        countries.forEach(popStat => {
          // console.log(popStat);

          const matchingCountry = deaths[popStat.alpha3code];
          // console.log(matchingCountry);

          // TODO Have a global date
          const lastDate = '06/04/2020';
          const LastCountryData = matchingCountry ? matchingCountry[lastDate] : null;
          // console.log(LastCountryData);

          if (LastCountryData && popStat.population) {
            testJson.push({
              countryCode: LastCountryData.countryCode,
              name: LastCountryData.countryName,
              population: popStat.population,
              deaths: LastCountryData.deaths,
              deathsRatio: Math.round(LastCountryData.deaths / popStat.population * 100000) * 100 / 100
            });
          }

        });
        // console.log(testJson);

        return testJson;
      })
    );
  }

}
