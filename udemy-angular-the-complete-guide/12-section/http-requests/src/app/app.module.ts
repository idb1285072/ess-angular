import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppComponent } from './app.component';
import { PlacesComponent } from './places/places.component';
import { AvailablePlacesComponent } from './places/available-places/available-places.component';
import { UserPlacesComponent } from './places/user-places/user-places.component';
import { PlacesContainerComponent } from './places/places-container/places-container.component';

@NgModule({
  declarations: [
    AppComponent,
    PlacesComponent,
    AvailablePlacesComponent,
    UserPlacesComponent,
    PlacesContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
