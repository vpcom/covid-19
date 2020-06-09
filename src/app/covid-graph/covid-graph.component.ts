import { GraphDataService } from './../services/graphData/graph-data.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { CovidDataService } from '../services/covid-data/covid-data.service';
import { Observable } from 'rxjs';
declare let Plotly: any ;

@Component({
  selector: 'app-covid-graph',
  templateUrl: './covid-graph.component.html',
  styleUrls: ['./covid-graph.component.scss']
})
export class CovidGraphComponent implements OnInit {

  covidData$: Observable<any>;
  
  constructor(private graphDataService: GraphDataService) { }

  ngOnInit(): void {

    this.graphDataService.getData()
      .pipe(take(1))
      .subscribe((deathsPerCountry: any) => {
        // console.log(deathsPerCountry, [deathsPerCountry['x'], deathsPerCountry['y']]);

        const graph = document.getElementById('covid-graph');

        const traceCH = {
          x: deathsPerCountry['x'],
          y: deathsPerCountry['y'],
          name: 'Switzerland',
          marker: {color: 'red'},
          type: 'scatter',
          fixedrange: true,
          rangeslider: false
        };

        const data = [traceCH];

        const layout = {

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

        const config = {
          displayModeBar: false,
          responsive: true
        }

        Plotly.newPlot(graph, data, layout, config);

      }
    );

  }

}
