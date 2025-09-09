import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Place } from './place.model';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent {
  @Input() places!: Place[];
  @Output() selectPlace = new EventEmitter<Place>();
  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
