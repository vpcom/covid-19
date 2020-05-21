
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MainService } from '../services/main/main.service';
import { forkJoin, Observable } from 'rxjs';
import { Country } from '../services/country/country';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-covid-table',
  templateUrl: './covid-table.component.html',
  styleUrls: ['./covid-table.component.scss']
})
export class CovidTableComponent implements OnInit {

  @Input() countries: Country[];
  
  constructor(private mainService: MainService) { }

  displayedColumns: string[] = ['name', 'population', 'deaths', 'deathsRatio'];

  dataSource;
  populations$: Observable<any>;
  deaths$: Observable<any>;


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    // this.craftMyData();

    
    console.log(this.countries);
    this.mainService.getDeaths(this.countries)
      .pipe(take(1))
      .subscribe((deathsPerCountry: any[]) => {

        console.log(deathsPerCountry);

        this.dataSource = new MatTableDataSource(deathsPerCountry);
        this.dataSource.sort = this.sort;
      });

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
