// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-cases-deaths',
//   templateUrl: './cases-deaths.component.html',
//   styleUrls: ['./cases-deaths.component.scss']
// })
// export class CasesDeathsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CovidService } from '../covid.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-cases-deaths',
  templateUrl: './cases-deaths.component.html',
  styleUrls: ['./cases-deaths.component.scss']
})
export class CasesDeathsComponent implements OnInit {

  constructor(private covidService: CovidService) { }


  // ELEMENT_DATA: countryStat[] = [
  //   { countryName: 'Hydrogen', population: 1.0079, deaths: 111},
  //   { countryName: 'Helium', population: 4.0026, deaths: 22},
  //   { countryName: 'Lithium', population: 6.941, deaths: 333},
  //   { countryName: 'Beryllium', population: 9.0122, deaths: 333},
  //   { countryName: 'Boron', population: 10.811, deaths: 333},
  //   { countryName: 'Carbon', population: 12.0107, deaths: 333},
  //   { countryName: 'Nitrogen', population: 14.0067, deaths: 333},
  //   { countryName: 'Oxygen', population: 15.9994, deaths: 333},
  //   { countryName: 'Fluorine', population: 18.9984, deaths: 333},
  //   { countryName: 'Neon', population: 20.1797, deaths: 333},
  // ];


  displayedColumns: string[] = ['name', 'population', 'deaths', 'deathsRatio'];
  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  dataSource;
  populations$: Observable<any>;
  deaths$: Observable<any>;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {



    this.populations$ = this.covidService.getPopulations();
    this.deaths$ = this.covidService.getDeaths();

    forkJoin(this.populations$, this.deaths$).subscribe(([population, deaths]) => {

      console.log(population);
      console.log(deaths.locations);
      deaths.locations.find(country => {
        if (country.country === 'US') {
          country.country = 'United States';
        }
      })

      const merge = this.mergeArrayObjects(population, deaths.locations);
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
        console.log(popStat.country);
      }
    }).filter(data => typeof data !== 'undefined');
  }
}

export interface countryStat {
  name: string;
  population: number;
  deaths: number;
  deathsRatio: number;
}
