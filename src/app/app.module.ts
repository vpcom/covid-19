import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CovidTableComponent } from './covid-table/covid-table.component';
import { HttpClientModule } from '@angular/common/http';
import { IntroComponent } from './intro/intro.component';
import { MainComponent } from './main/main.component';
import { CovidGraphComponent } from './covid-graph/covid-graph.component';
import { SelectCountryDialogComponent } from './select-country-dialog/select-country-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { OVERLAY_PROVIDERS } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    CovidTableComponent,
    IntroComponent,
    MainComponent,
    CovidGraphComponent,
    SelectCountryDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    MatDialog,
    OVERLAY_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
