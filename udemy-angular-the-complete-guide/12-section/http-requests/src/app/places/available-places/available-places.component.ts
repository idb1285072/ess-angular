import { Component, inject, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subscription, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  templateUrl: './available-places.component.html',
  styleUrls: ['./available-places.component.css'],
})
export class AvailablePlacesComponent implements OnInit {
  places?: Place[];
  subscription?: Subscription;
  isFetching: boolean = false;
  error: string = '';
  constructor(
    private httpClient: HttpClient,
    private placesService: PlacesService
  ) {}
  ngOnInit(): void {
    // this.subscription = this.httpClient
    //   .get<{ places: Place[] }>('http://localhost:3000/places')
    //   .subscribe({
    //     next: (data) => {
    //       console.log(data.places);
    //       this.places = data.places;
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });

    // this.subscription = this.httpClient
    //   .get<{ places: Place[] }>('http://localhost:3000/places', {
    //     observe: 'response', // 'event'
    //   })
    //   .subscribe({
    //     next: (response) => {
    //       console.log(response);
    //       this.places = response.body?.places;
    //     },
    //   });

    this.isFetching = true;
    //   this.subscription = this.httpClient
    //     .get<{ places: Place[] }>('http://localhost:3000/places')
    //     .pipe(
    //       map((data) => data.places),
    //       catchError((error) =>
    //         throwError(
    //           () =>
    //             new Error(
    //               'Something went wrong fetching the available places. Please try again later.'
    //             )
    //         )
    //       )
    //     )
    //     .subscribe({
    //       next: (places) => {
    //         console.log(places);
    //         this.places = places;
    //       },
    //       error: (error: Error) => {
    //         console.error(error);
    //         this.error = error.message;
    //       },
    //       complete: () => {
    //         this.isFetching = false;
    //       },
    //     });
    // }
    this.subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places = places;
      },
      error: (error: Error) => {
        console.error(error);
        this.error = error.message;
      },
      complete: () => {
        this.isFetching = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSelectPlace(selectedPlace: Place) {
    // this.httpClient
    //   .put<{userPlaces:Place[]}>('http://localhost:3000/user-places', {
    //     placeId: selectedPlace.id,
    //   })
    //   .subscribe({
    //     next: (responseData) => {
    //       console.log(responseData.userPlaces);
    //     },
    //   });
    this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (responseData) => {
        // this.placesService.loadUserPlaces().subscribe();
        console.log(responseData.userPlaces);
      },
    });
  }
}
