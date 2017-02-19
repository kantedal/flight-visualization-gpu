import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule, Http} from '@angular/http';

import { AppComponent } from './app.component';
import {RenderService} from "../services/render.service";
import {LoaderService} from "../services/loader/loader.service";
import {DataService} from "../services/data.service";
import {MapService} from "../services/map.service";
import {FlightsService} from "../services/flights/flights.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    DataService,
    RenderService,
    LoaderService,
    MapService,
    FlightsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }