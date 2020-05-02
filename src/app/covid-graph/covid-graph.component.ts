import { Component, OnInit, Input } from '@angular/core';
import { Country } from '../services/country/country';
declare let Plotly: any ;

@Component({
  selector: 'app-covid-graph',
  templateUrl: './covid-graph.component.html',
  styleUrls: ['./covid-graph.component.scss']
})
export class CovidGraphComponent implements OnInit {

  @Input() countries: Country[];
  
  constructor() { }

  ngOnInit(): void {
    const graph = document.getElementById('covid-graph');

    const trace1 = {
      x: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
      y: [219, 146, 112, 127, 124, 180, 236, 207, 236, 263, 350, 430, 474, 526, 488, 537, 500, 439],
      name: 'Switzerland',
      marker: {color: 'rgb(55, 83, 109)'},
      type: 'scatter'
    };
    
    const trace2 = {
      x: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012],
      y: [16, 13, 10, 11, 28, 37, 43, 55, 56, 88, 105, 156, 270, 299, 340, 403, 549, 499],
      name: 'Germany',
      marker: {color: 'rgb(26, 118, 255)'},
      type: 'scatter'
    };

    const data = [trace1, trace2];

    const layout = {
      xaxis: {tickfont: {
          size: 14,
          color: 'rgb(107, 107, 107)'
        }},
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
      displayModeBar: false
    }

    Plotly.newPlot(graph, data, layout, config);

  }

}
