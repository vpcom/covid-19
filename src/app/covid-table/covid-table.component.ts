import { CountryService } from './../services/country/country.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableDataService } from './../services/tableData/table-data.service';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-covid-table',
  templateUrl: './covid-table.component.html',
  styleUrls: ['./covid-table.component.scss']
})
export class CovidTableComponent implements OnInit {

  constructor(private tableDataService: TableDataService,
              private countryService: CountryService) { }

  displayedColumns: string[] = ['name', 'population', 'deaths', 'deathsRatio'];

  dataSource;
  populations$: Observable<any>;
  deaths$: Observable<any>;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {

    this.tableDataService.getData([])
      .pipe(take(1))
      .subscribe((deathsPerCountry: any) => {

        console.log(deathsPerCountry); // TODO correct format

        this.dataSource = new MatTableDataSource(deathsPerCountry);
        this.dataSource.sort = this.sort;
      });

  }

  /**
   * Only for development, this methode is used to merged daata sources
   * and create new JSON data.
   */
  craftMyData() {
    this.populations$ = this.countryService.getCountries();
    this.deaths$ = this.tableDataService.getData([]);

    forkJoin(this.populations$, this.deaths$).subscribe(([population, deaths]) => {

      console.log(population);
      console.log(deaths);
      const testJson = [];
      population.forEach(popStat => {

        const matchingCountry = deaths; //.filter(deathsArray => deathsArray.country === popStat.country);

        console.log(popStat);
        if (matchingCountry[0]) {
          testJson.push({
            countryCode: matchingCountry[0].country_code,
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
