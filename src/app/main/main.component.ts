import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../services/country/country';
import { MainService } from '../services/main/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  countries$: Observable<Country[]>;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {

    this.countries$ = this.mainService.getCountries();

  }

}
