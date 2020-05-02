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

@NgModule({
  declarations: [
    AppComponent,
    CovidTableComponent,
    IntroComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
