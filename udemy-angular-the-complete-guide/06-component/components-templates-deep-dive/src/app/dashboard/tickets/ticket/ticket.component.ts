import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.ticket);
  }
  @Input() ticket!: Ticket;
  @Output() close = new EventEmitter<string>();
  detailsVisible = false;
  onToggleDetails() {
    this.detailsVisible = !this.detailsVisible;
  }
  onClose(){
    this.close.emit(this.ticket.id);
  }
}
