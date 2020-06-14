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
        // console.log(deathsPerCountry);

        this.dataSource = new MatTableDataSource(deathsPerCountry);
        this.dataSource.sort = this.sort;
      });

  }

}
