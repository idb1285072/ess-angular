import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrls: ['./user-places.component.css'],
})
export class UserPlacesComponent implements OnInit, OnDestroy {
  places: Place[] = [];
  error: string = '';
  isFetching = false;
  subcription?: Subscription;
  constructor(
    private httpClient: HttpClient,
    private placesService: PlacesService
  ) {}
  ngOnDestroy(): void {
    this.subcription?.unsubscribe();
  }

  ngOnInit(): void {
    this.isFetching = true;

    // this.subcription = this.httpClient
    //   .get<{ places: Place[] }>('http://localhost:3000/user-places')
    //   .pipe(
    //     map((data) => data.places),
    //     catchError((error) =>
    //       throwError(
    //         () =>
    //           new Error(
    //             'Something went wrong fetching the favorite places. Please try again later.'
    //           )
    //       )
    //     )
    //   )
    //   .subscribe({
    //     next: (places) => {
    //       console.log(places);
    //       this.places = places;
    //     },
    //     error: (error: Error) => {
    //       console.log(error);
    //       this.error = error.message;
    //     },
    //     complete: () => {
    //       this.isFetching = false;
    //     },
    //   });
    this.subcription = this.placesService.loadUserPlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places = places;
      },
      error: (error: Error) => {
        console.log(error);
        this.error = error.message;
      },
      complete: () => {
        this.isFetching = false;
      },
    });
  }
}
