import { GraphDataService, defaultCountryAlpha3Code } from './../services/graphData/graph-data.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { map, switchMap, tap } from 'rxjs/operators';
import { CovidDataService } from '../services/covid-data/covid-data.service';
import { Observable, pipe } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectCountryDialogComponent } from '../select-country-dialog/select-country-dialog.component';
import { CountryService } from '../services/country/country.service';
import { Country } from '../types/country';
declare let Plotly: any ;

export interface countryItem {
  name: string,
  alpha3Code: string
}

@Component({
  selector: 'app-covid-graph',
  templateUrl: './covid-graph.component.html',
  styleUrls: ['./covid-graph.component.scss']
})
export class CovidGraphComponent implements OnInit {
  graphElement;
  data;
  layout;
  traceCH;
  config;
  currentCountries: countryItem[];
  selectedCountry: Country;
  
  constructor(
    private graphDataService: GraphDataService,
    private localStorageService: LocalStorageService,
    private countryService: CountryService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.countryService.getCountryWithAlpha3Code(defaultCountryAlpha3Code)
      .subscribe(country => {
        this.selectedCountry = country;
        this.initGraph(country);
        this.loadGraph(this.selectedCountry);
      }
    );
  }

  loadGraph(selectedCountry): void {
    this.graphDataService.getData(selectedCountry)
      .pipe(take(1))
      .subscribe((deathsPerCountry: any) => {
        // console.log(deathsPerCountry, [deathsPerCountry['x'], deathsPerCountry['y']]);

        // format data
        this.traceCH.x = deathsPerCountry['x'];
        this.traceCH.y = deathsPerCountry['y'];
        this.traceCH.name = 'Switzerland';
        this.data = [this.traceCH];

        // Display
        Plotly.newPlot(this.graphElement, this.data, this.layout, this.config);
      }
    );
  }

  initGraph(country: Country): void {
    if (!country) {
      console.warn('initGraph: No country provided.')
      return;
    }

    this.graphElement = document.getElementById('covid-graph');

    this.config = {
      displayModeBar: false,
      responsive: true
    }

    this.traceCH = {
      x: undefined,
      y: undefined,
      name: country.name,
      marker: {color: 'red'},
      type: 'scatter',
      fixedrange: true,
      rangeslider: false
    };

    this.layout = {
      autosize: true,
      margin: {
        t: 10,
        r: 20,
        b: 90,
        l: 70,
        pad: 10
      },
      // hovermode: false,
      clickmode: 'select',
      xaxis: {
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      yaxis: {
        title: 'people',
        titlefont: {
          size: 16,
          color: 'rgb(107, 107, 107)'
        },
        tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }
      },
      legend: {
        x: 0,
        y: 1.0,
        bgcolor: 'rgba(255, 255, 255, 0)',
        bordercolor: 'rgba(255, 255, 255, 0)'
      },
      paper_bgcolor: '#303030',
      plot_bgcolor: '#303030'
    };
  }

  refresh(): void {
    this.localStorageService.emptyCache();
    this.loadGraph(this.selectedCountry);
  }

  openDialog(): void {
    let dialogRef;

    this.countryService.getCountries().subscribe((countries: any[]) => {
      dialogRef = this.dialog.open(SelectCountryDialogComponent, {
        data: {
          countries: countries,
          currentCountries: this.currentCountries}
      });

      dialogRef.afterClosed().subscribe(result => {
        this.selectedCountry = result;
        this.loadGraph(this.selectedCountry);
      });
    });

  }

}
