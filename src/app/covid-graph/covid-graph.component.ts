import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../services/country/country';
import { MainService } from '../services/main/main.service';
import { take } from 'rxjs/operators';
declare let Plotly: any ;

@Component({
  selector: 'app-covid-graph',
  templateUrl: './covid-graph.component.html',
  styleUrls: ['./covid-graph.component.scss']
})
export class CovidGraphComponent implements OnInit {

  @Input() countries: Country[];

  @Input() x: Number[];
  @Input() y: Number[];
  
  constructor(private mainService: MainService) { }

  ngOnInit(): void {


    this.mainService.getDeathsForGraph(this.countries)
      .pipe(take(1))
      .subscribe((deathsPerCountry: any[]) => {
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
