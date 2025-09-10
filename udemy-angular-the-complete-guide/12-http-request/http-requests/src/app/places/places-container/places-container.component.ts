import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-places-container',
  templateUrl: './places-container.component.html',
  styleUrls: ['./places-container.component.css'],
})
export class PlacesContainerComponent {
  @Input() title!: string;
}
