import { GraphDataService } from './../services/graphData/graph-data.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CovidDataService } from '../services/covid-data/covid-data.service';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
declare let Plotly: any ;

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
  
  constructor(
    private graphDataService: GraphDataService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.initGraph();
    this.loadGraph();
  }

  loadGraph(): void {
    this.graphDataService.getData()
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

  initGraph(): void {
    this.graphElement = document.getElementById('covid-graph');

    this.config = {
      displayModeBar: false,
      responsive: true
    }

    this.traceCH = {
      x: undefined,
      y: undefined,
      name: 'Switzerland',
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
    this.loadGraph();
  }

}
