
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../services/main/main.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-cases-deaths',
  templateUrl: './cases-deaths.component.html',
  styleUrls: ['./cases-deaths.component.scss']
})
export class CasesDeathsComponent implements OnInit {

  constructor(private mainService: MainService) { }

  displayedColumns: string[] = ['name', 'population', 'deaths', 'deathsRatio'];

  dataSource;
  populations$: Observable<any>;
  deaths$: Observable<any>;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // this.craftMyData();

    this.populations$ = this.mainService.getCountries();
    this.deaths$ = this.mainService.getDeaths(null);

    forkJoin(this.populations$, this.deaths$).subscribe(([population, deaths]) => {

      console.log(population);
      console.log(deaths);

      // TODO convertions in the service
      deaths.find(country => {
        if (country.country === 'US') {
          country.country = 'United States';
        }
      })

      const merge = this.mergeArrayObjects(population, deaths);
      console.log(merge);

      this.dataSource = new MatTableDataSource(merge);
      this.dataSource.sort = this.sort;
    });
  }


  mergeArrayObjects(populationsArray, deathsArray){
    return populationsArray.map(popStat => {
      const matchingCountry = deathsArray.filter(deathsArray => deathsArray.country === popStat.country)
      // console.log(matchingCountry);
      if (matchingCountry[0]) {
        return {
          name: matchingCountry[0].country,
          population: popStat.population,
          deaths: matchingCountry[0].history['4/10/20'],
          deathsRatio: Math.round(matchingCountry[0].history['4/10/20'] / popStat.population * 100000)
        }
      }
      else {
        // TODO get all countries within the list, but in service
        // console.log(popStat.country);
      }
    }).filter(data => typeof data !== 'undefined');
  }


  /**
   * Only for development, this methode is used to merged daata sources
   * and create new JSON data.
   */
  craftMyData() {
    this.populations$ = this.mainService.getCountries();
    this.deaths$ = this.mainService.getDeaths(null);

    forkJoin(this.populations$, this.deaths$).subscribe(([population, deaths]) => {

      console.log(population);
      console.log(deaths);

      // TODO convertions in the service
      deaths.find(country => {
        if (country.country === 'US') {
          country.country = 'United States';
        }
      })

      console.log(population);
      const testJson = [];
      population.forEach(popStat => {

        const matchingCountry = deaths.filter(deathsArray => deathsArray.country === popStat.country);

        // console.log(matchingCountry);
        if (matchingCountry[0]) {
          testJson.push({
            countryCoude: matchingCountry[0].country_code,
            name: matchingCountry[0].country,
            population: popStat.population,
            coordinates: matchingCountry[0].coordinates
          });
        }

      });
      console.log(testJson);

      const obj = JSON.stringify(testJson);
      console.log(obj);
    });
  }

}
