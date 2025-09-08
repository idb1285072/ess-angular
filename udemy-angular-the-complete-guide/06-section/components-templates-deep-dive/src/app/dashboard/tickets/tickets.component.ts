import { Component, OnInit } from '@angular/core';
import { Ticket } from './ticket/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent {
  tickets: Ticket[] = [];
  onAdd(data: { title: string; data: string }) {
    const ticket: Ticket = {
      title: data.title,
      request: data.data,
      id: Math.random().toString(),
      status: 'open',
    };
    console.log(ticket);
    this.tickets.push(ticket);
  }
  
  onCloseTicket(id: string) {
    this.tickets = this.tickets.map((ticket) => {
      if (ticket.id === id) {
        return { ...ticket, status: 'close' };
      } else {
        return ticket;
      }
    });
  }
}
