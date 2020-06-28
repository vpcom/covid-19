import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-select-country-dialog',
  templateUrl: './select-country-dialog.component.html',
  styleUrls: ['./select-country-dialog.component.scss']
})
export class SelectCountryDialogComponent implements OnInit {

  selectedCountry: string;

  constructor(
    public dialogRef: MatDialogRef<SelectCountryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectCountry(alpha3CodeSeéected) {
    this.selectedCountry = this.data.countries.find(country => country.alpha3Code === alpha3CodeSeéected);
  }

}
