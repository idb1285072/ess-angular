import { Injectable } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  userPlaces: Place[] = [];
  // readonly loadedUserPlaces = this.userPlaces;
  get loadedUserPlaces() {
    return this.userPlaces;
  }
  constructor(private httpClient: HttpClient) {}

  loadAvailablePlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/places',
      'Something went wrong fetching the favourite places. Please try again later.'
    );
  }

  loadUserPlaces() {
    return this.fetchPlaces(
      'http://localhost:3000/user-places',
      'Something went wrong fetching the available places. Please try again later.'
    );
    // .pipe(tap({
    //   next:userPlaces=>this.userPlaces=userPlaces
    // }));
  }

  addPlaceToUserPlaces(selectedPlace: Place) {
    // this.userPlaces = [...this.userPlaces, selectedPlace];

    return this.httpClient.put<{ userPlaces: Place[] }>(
      'http://localhost:3000/user-places',
      {
        placeId: selectedPlace.id,
      }
    );
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient.get<{ places: Place[] }>(url).pipe(
      map((data) => data.places),
      catchError((error) => throwError(() => new Error(errorMessage)))
    );
  }
}
